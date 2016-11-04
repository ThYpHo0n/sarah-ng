# Smart Bulb Lixada! Control With Bluez
# Author: Niklas Grebe
# Original Script by: Tony DiCola
#
# This script will cycle a Smart Bulb Lixada! Bluetooth Low Energy light bulb
# through a rainbow of different hues.
#
# Dependencies:
# - You must install the pexpect library, typically with 'sudo pip install pexpect'.
# - You must have bluez installed and gatttool in your path (copy it from the
#   attrib directory after building bluez into the /usr/bin/ location).
#
# License: Released under an MIT license: http://opensource.org/licenses/MIT
import colorsys
import math
import sys
import time

import pexpect

# cycle. Stick with 0 to 1 to cover all hues.
SATURATION = 1.0  # Color saturation for hues (1 is full color).
VALUE = 1.0  # Color value for hues (1 is full value).

# Get bulb address from command parameters.
if len(sys.argv) != 5:
    print 'Error must specify bulb address as parameter!'
    print 'Usage: sudo python lixada.py <bulb address> R G B'
    print 'Example: sudo python lixada.py 5C:31:3E:F2:16:13 ff ff ff'
    sys.exit(1)
bulb = sys.argv[1]

# Run gatttool interactively.
gatt = pexpect.spawn('gatttool -I')

# Connect to the device.
gatt.sendline('connect {0}'.format(bulb))
gatt.expect('Connection successful')

# Set light color by sending color change packet over BLE.
gatt.sendline('char-write-cmd 0x0027 d0{0}{1}{2}'.format(sys.argv[2], sys.argv[3], sys.argv[4]))
gatt.sendline('disconnect')
gatt.expect('\[LE\]>')
gatt.sendline('exit')

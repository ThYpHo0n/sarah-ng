var os = require('os');

function executeCommand(command) {
	var process = require('child_process');
	var isWin = /^win/.test(os.platform());
	if(isWin) {
		console.log(command);
	} else {
		return process.execSync(command, {'cwd': '/opt/sarah-ng/'});
	}
}

function switchOn(protocolData) {
	return executeCommand('python bin/scripts/lixada/lixada.py '+protocolData + ' FF FF FF');
}

function switchOff(protocolData) {
	return executeCommand('python bin/scripts/lixada/lixada.py '+protocolData + ' 00 00 00');
}

function changeColor(protocolData, color) {
	return executeCommand('python bin/scripts/lixada/lixada.py '+protocolData + ' ' + color);
}

exports.switchOn = switchOn;
exports.switchOff = switchOff;
exports.changeColor = changeColor;
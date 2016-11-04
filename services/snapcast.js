var os = require('os');

function executeCommand(command) {
	var process = require('child_process');
	var isWin = /^win/.test(os.platform());
	console.log(process.platform);
	if(isWin) {
		console.log(command);
	} else {
		return process.execSync(command, {'cwd': '/opt/sarah-ng/'});
	}
}

function getServerStatus() {
	var clients = executeCommand('python bin/scripts/snapcast/getClients.py');
	var aClients = JSON.parse(clients);

	return aClients;
}

function setVolume(client, volume) {
	var result = executeCommand('python bin/scripts/snapcast/setVolume.py '+ client + ' ' + volume);

	return result;
}

function mute(client, mute) {
	var result = executeCommand('python bin/scripts/snapcast/mute.py '+ client, mute);

	return result;
}

exports.getServerStatus = getServerStatus;
exports.setVolume = setVolume;
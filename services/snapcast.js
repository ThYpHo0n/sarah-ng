var os = require('os');

function executeCommand(command) {
	var process = require('child_process');
	var isWin = /^win/.test(os.platform());
	console.log(process.platform);
	if (isWin) {
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

function getStreams() {
	var streams = executeCommand('python bin/scripts/snapcast/getStreams.py');
	var aStreams = JSON.parse(streams);

	return aStreams;
}

function setVolume(client, volume) {
	var result = executeCommand('python bin/scripts/snapcast/setVolume.py ' + client + ' ' + volume);

	return result;
}

function setMute(client, mute) {
	console.log(mute);
	var result = executeCommand('python bin/scripts/snapcast/setMute.py ' + client, mute);

	return result;
}

function setStream(client, stream) {
	console.log(stream);
	var result = executeCommand('python bin/scripts/snapcast/setStream.py ' + client, stream);

	return result;
}

exports.getServerStatus = getServerStatus;
exports.setVolume = setVolume;
exports.setMute = setMute;
exports.setStream = setStream;
exports.getStreams = getStreams;

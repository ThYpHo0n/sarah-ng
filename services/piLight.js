var os = require('os');

function getParamsFromData(data) {
	var splitData = data.split(";");
	var params = "";

	splitData.forEach(function(value) {
		var dataValues = value.split(":");
		params += " -" + dataValues[0] + " " + dataValues[1];
	});

	return params;
}

function buildCommand(protocol, protocolData) {
	var params = getParamsFromData(protocolData);
	var command = 'sudo pilight-send';

	command += ' -p ' + protocol;
	command += params;

	return command;
}

function executeCommand(command) {
	var process = require('child_process');
	var isWin = /^win/.test(os.platform);
	console.log(isWin);
	if(isWin) {
		console.log(command);
	} else {
		return process.execSync(command);
	}
}

function switchOn(protocol, protocolData) {
	var command = buildCommand(protocol, protocolData);
	command += ' -t';

	return executeCommand(command);
}

function switchOff(protocol, protocolData) {
	var command = buildCommand(protocol, protocolData);
	command += ' -f';

	return executeCommand(command);
}

exports.switchOn = switchOn;
exports.switchOff = switchOff;
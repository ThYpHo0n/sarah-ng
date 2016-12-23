var express = require('express');
var router = express.Router();
var snapcast = require('../services/snapcast');
var config = require('../config/music.json');

router.get('/', function(req, res) {
	try {
		result = snapcast.getServerStatus();
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

router.get('/config', function(req, res) {
	res.send(config);
});

router.post('/volume', function(req, res) {
	try {
		var result = snapcast.setVolume(req.body.client, req.body.volume);
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

router.post('/mute', function(req, res) {
	try {
		var result = snapcast.setMute(req.body.client, req.body.mute);
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

router.post('/stream', function(req, res) {
	try {
		var result = snapcast.setStream(req.body.client, req.body.stream);
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

router.get('/streams', function(req, res) {
	try {
		result = snapcast.getStreams();
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

module.exports = router;

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
		var result = snapcast.mute(req.body.client, req.body.mute);
		res.send(result);
	} catch (err) {
		res.send({'error': err});
	}
});

module.exports = router;

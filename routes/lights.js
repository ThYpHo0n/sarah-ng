var express = require('express');
var router = express.Router();
var piLight = require('../services/piLight');
var lixada = require('../services/lixada');

router.get('/', function(req, res, next) {
	req.app.db.all("SELECT * FROM light_states", function(err, result) {
		res.send(result);
	});
});

router.post('/toggle/:id', function(req, res, next) {
	req.app.db.get("SELECT * FROM light_states WHERE id = ?", req.params.id, function(err, result) {
		if (result == undefined) {
			res.status(404).send('No light found with that id');
		} else if(result.type == 'pilight') {
			if(result.state == 1) {
				var message = piLight.switchOff(result.type_protocol, result.type_detail);
				req.app.db.run("UPDATE light_states SET state = 0 WHERE id = ?", req.params.id);
				res.send({'id': req.params.id, 'state': '0', 'message': message});
			} else {
				var message = piLight.switchOn(result.type_protocol, result.type_detail);
				req.app.db.run("UPDATE light_states SET state = 1 WHERE id = ?", req.params.id);
				res.send({'id': req.params.id, 'state': '1', 'message': message});
			}
		} else if(result.type == 'lixada') {
			if(result.state == 1) {
				var message = lixada.switchOff(result.type_detail);
				req.app.db.run("UPDATE light_states SET state = 0 WHERE id = ?", req.params.id);
				res.send({'id': req.params.id, 'state': '0', 'message': message});
			} else {
				var message = lixada.switchOn(result.type_detail);
				req.app.db.run("UPDATE light_states SET state = 1 WHERE id = ?", req.params.id);
				res.send({'id': req.params.id, 'state': '1', 'message': message});
			}
		} else if (err) {
			res.status(500).send(err);
		} else {
			res.status(500).send('Given protocol unknown.');
		}
	});
});

router.post('/toggle-room/:room', function(req, res, next) {
	req.app.db.all("SELECT * FROM light_states WHERE room = ?", req.body.room, function(err, result) {
		var error;
		result.forEach(function (light) {
			if (light == undefined) {
				error = 'No light found for that room';
			} else if(light.type == 'pilight') {
				if(req.body.state == 0) {
					var message = piLight.switchOff(light.type_protocol, light.type_detail);
					req.app.db.run("UPDATE light_states SET state = 0 WHERE id = ?", light.id);
				} else {
					var message = piLight.switchOn(light.type_protocol, light.type_detail);
					req.app.db.run("UPDATE light_states SET state = 1 WHERE id = ?", light.id);
				}
			} else if(light.type == 'lixada') {
				if(light.state == 1) {
					var message = lixada.switchOff(light.type_detail);
					req.app.db.run("UPDATE light_states SET state = 0 WHERE id = ?", req.params.id);
					res.send({'id': req.params.id, 'state': '0', 'message': message});
				} else {
					var message = lixada.switchOn(light.type_detail);
					req.app.db.run("UPDATE light_states SET state = 1 WHERE id = ?", req.params.id);
					res.send({'id': req.params.id, 'state': '1', 'message': message});
				}
			} else if (err != undefined) {
				error = err;
			} else {
				error = 'Given protocol (' + light.type + ') unknown.';
			}
		});
		if(error != undefined) {
			res.status(500).send(error);
		} else {
			res.send({'room': req.body.room, 'state' : req.body.state});
		}
	});
});

router.post('/colorize/:id', function(req, res, next) {
	req.app.db.get("SELECT * FROM light_states WHERE id = ?", req.params.id, function(err, result) {
		if (result == undefined) {
			res.status(404).send('No light found with that id');
		} else if(result.type == 'lixada' && result.type_protocol == 'color') {
			var message = lixada.changeColor(result.type_detail, req.body.color);
			req.app.db.run("UPDATE light_states SET state = 1 WHERE id = ?", req.params.id);
			res.send({'id': req.params.id, 'state': '1', 'message': message});
		} else  if (err) {
			res.status(500).send(err);
		} else {
			res.status(500).send('Given protocol unknown.');
		}
	});
});

module.exports = router;

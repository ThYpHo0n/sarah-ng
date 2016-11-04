var express = require('express');
var router = express.Router();

/* GET app page. */
router.get('/', function(req, res, next) {
	res.render('index', {title: 'S.A.R.A.H.'});
});

module.exports = router;

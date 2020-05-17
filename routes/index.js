var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/Users');

/* JWT */
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
	const { username, password } = req.body;

	bcrypt.hash(password, 10).then((hash) => {
		const user = new User({
			username: username,
			password: hash
		});
	
		const promise = user.save();
	
		promise.then((data) => {
			res.json(data);
		}).catch((err) => {
			res.json(err);
		});
	
	});	

});

router.post('/authenticate', (req, res, next) => {
	const { username, password } = req.body;


	const promise = User.findOne({
		username
	});

	promise.then((data) => {
		if(!data)
			res.json({ status: false, message: 'The user was not found.' })

		bcrypt.compare(password, data.password).then((result) => {
			if(!result)
				res.json({ status: false, message: 'The user wrong password..' })
		
			const payload = {
				username: username,
			};

			const token = jwt.sign(payload, req.app.get('api_secret_key'), {
				expiresIn: 720 // 12 saat
			})

			res.json({
				status: true,
				token: token
			})
		}).catch((err) => {
			next({ status: false, message: 'User wrong password'})
		})
	}).catch((err) => {
		res.json(err)
	})


})

module.exports = router;

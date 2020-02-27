const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secrets = require('../.config/secrets.js');

const Users = require('../database/user-model.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({ message: "Successfully registered user", user: saved, token: token});
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to register user." });
    });
});

router.post('/login', (req, res) => {
	const {username, password} = req.body;

	Users.findBy({username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ username: user.username, token: token });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: '1h'
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

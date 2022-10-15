const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
  });

  res.json('User Created!!!');
});

// First we need to check if the User is already exists?!
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.json({ error: "User doesn't exist" });
  } else {
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        res.json({ error: 'Wrong Password' });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          process.env.JWT_ACCESS_TOKEN
        );

        res.json(accessToken);
      }
    });
  }
});

module.exports = router;

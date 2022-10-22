const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');
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
          { id: user.id, username: user.username },
          process.env.JWT_ACCESS_TOKEN
        );

        res.json({ accessToken: accessToken, id: user.id, username: user.username });
      }
    });
  }
});

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

router.get('/userinfo/:id', async (req, res) => {
  const id = req.params.id;

  const userProfile = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  res.json(userProfile);
});

module.exports = router;

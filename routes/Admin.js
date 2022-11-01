const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get('/', async (req, res) => {
  const users = await Users.findAll(
    { where: { role: 'user' } },
    { attributes: { exclude: ['password'] } }
  );
  res.json(users);
});

router.delete('/', async (req, res) => {
  const userId = req.params.userId;
  await Users.destroy({ where: { id: userId } });
  res.json('User Deleted');
});

module.exports = router;

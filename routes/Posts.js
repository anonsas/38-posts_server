const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
  const allPosts = await Posts.findAll();
  res.json(allPosts);
});

router.post('/', async (req, res) => {
  const newPost = req.body;
  await Posts.create(newPost);
  res.json(newPost);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const postById = await Posts.findByPk(id);
  res.json(postById);
});

module.exports = router;

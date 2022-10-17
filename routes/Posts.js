const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
  const allPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ postList: allPosts, likedPostList: likedPosts });
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

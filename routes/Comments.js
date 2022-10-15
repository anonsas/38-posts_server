const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// Go to the Comments table and return every single element
// where PostId column is the same as (postId) from the req.params

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
  const newComment = req.body;
  await Comments.create(newComment);
  res.json(newComment);
});

module.exports = router;

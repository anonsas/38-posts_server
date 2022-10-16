const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/', validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  // Check if the user already Liked this post.
  // If yes, then remove the Like.
  const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });

  if (!found) {
    await Likes.create({ PostId, UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId, UserId } });
    res.json({ liked: false });
  }
});

module.exports = router;

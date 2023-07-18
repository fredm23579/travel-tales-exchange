const router = require('express').Router();
const { Post, Comment } = require('../models');

router.post('/post/:id', async (req, res) => {
  try {
    const newComment = {
      content: req.body.content,
      creator: "irene", // replace with login when we finish adding session
      post_id: req.params.id,
    }
    await Comment.create(newComment);
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

router.post('/dashboard', async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      creator: "irene", // replace with login when we finish adding session
    }
    await Post.create(newPost);
    res.redirect(`/dashboard`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
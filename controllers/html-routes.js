const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
        },
      ],
    });
    const posts = dbPostData.map((post) => 
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const dbUserPostData = await Post.findAll({
      where: {
        creator: req.session.username,
      },
      include: [
        {
          model: Comment,
        }
      ]
    });
    const posts = dbUserPostData.map((post) => {
      const userPost = post.get({ plain: true });
      userPost.commentCount = userPost.Comments.length;
      return userPost;
    });
    res.render('dashboard', {
      posts,
      username: req.session.username,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
})
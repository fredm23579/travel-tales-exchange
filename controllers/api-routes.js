const router = require('express').Router();
const { User, Post, Comment } = require('../models');

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

router.post('/login', async (req, res) => {

  if (req.body.loginuser) {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.loginuser,
        }
      });
  
      if (!dbUserData) {
        res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.loginpassword);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.body.signupuser) {
    try {
      const newUser = {
        username: req.body.signupuser,
        password: req.body.signuppassword
      }
      User.create(newUser);
      req.session.loggedIn = true;
      req.session.username = req.body.signupuser;
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session: ", err);
        }
        res
          .status(200)
      });
      res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
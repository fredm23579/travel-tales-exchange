const router = require('express').Router(); // import express router (https://expressjs.com/en/4x/api.html#router)
const { User, Post, Comment } = require('../models'); // import models (https://sequelize.org/docs/v6/core-concepts/model-basics/)

// In one of the route files, like routes/authRoutes.js we have an app.use() statement that calls app.use('/api', apiRoutes). This means that all the routes in apiRoutes will be added to the /api path. So, if we have a route in apiRoutes that looks like this: router.get('/users', (req, res) => { ... }), the full path to that route will be /api/users.
// In the same file, we have another app.use() statement that calls app.use('/auth', authRoutes). This means that all the routes in authRoutes will be added to the /auth path. So, if we have a route in authRoutes that looks like this: router.get('/login', (req, res) => { ... }), the full path to that route will be /auth/login.
router.post('/post/:id', async (req, res) => {  // add comment to post (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
  try {
    const newComment = { // create new comment (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      content: req.body.content, // content from request body (https://expressjs.com/en/4x/api.html#req.body)
      creator: req.session.username, // creator from session (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
      post_id: req.params.id, // post id from request params (https://expressjs.com/en/4x/api.html#req.params) (https://sequelize.org/master/manual/model-querying-basics.html)
    }
    await Comment.create(newComment); // create new comment (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.redirect(`/post/${req.params.id}`);  // go back to post we just commented on (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
  } catch (err) {
    res.status(500).send(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
  }
});

// create new post (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html) for more information on how to use the create method
router.post('/dashboard', async (req, res) => { // create new post (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
  try {
    const newPost = { // create new post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      title: req.body.title, // title from request body (https://expressjs.com/en/4x/api.html#req.body)
      content: req.body.content, // content from request body (https://expressjs.com/en/4x/api.html#req.body)
      creator: req.session.username, // creator from session (https://expressjs.com/en/4x/api.html#req.session)
    }
    await Post.create(newPost); // create new post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.redirect(`/dashboard`); // go back to dashboard (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
  } catch (err) { // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.status(500).send(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
  }
});

// update post (https://expressjs.com/en/4x/api.html#router.put) (https://sequelize.org/master/manual/model-querying-basics.html) for more information on how to use the update method
router.put('/post/:id/edit', async (req, res) => { // update post (https://expressjs.com/en/4x/api.html#router.put) (https://sequelize.org/master/manual/model-querying-basics.html)
  try {
    await Post.update( // update post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      {
        title: req.body.title, // title from request body (https://expressjs.com/en/4x/api.html#req.body)
        content: req.body.content, // content from request body (https://expressjs.com/en/4x/api.html#req.body) (https://sequelize.org/master/manual/model-querying-basics.html)
      },
      {
        where: { // where condition for post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
          id: req.params.id, // post id from request params (https://expressjs.com/en/4x/api.html#req.params) (https://sequelize.org/master/manual/model-querying-basics.html)
          creator: req.session.username, // make sure user owns the post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
        },
      }
    );
    res.redirect(`/post/${req.params.id}`); // go back to post we just edited (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
  } catch (err) { // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.status(500).json(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
  }
});

// delete post (https://expressjs.com/en/4x/api.html#router.delete) (https://sequelize.org/master/manual/model-querying-basics.html) for more information on how to use the destroy method
router.delete('/post/:id/edit', async (req, res) => { // delete post (https://expressjs.com/en/4x/api.html#router.delete) (https://sequelize.org/master/manual/model-querying-basics.html)
  try { // delete post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
    await Post.destroy({ // destroy post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      where: { // where condition for post (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
        id: req.params.id, // post id from request params (https://expressjs.com/en/4x/api.html#req.params) (https://sequelize.org/master/manual/model-querying-basics.html)
        creator: req.session.username, // make sure user owns the post
      }
    });
    res.redirect('/dashboard'); // redirect to dashboard (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
  } catch (err) { // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    console.log(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.status(500).json(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
  }
});

// login handling (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html) for more information on how to use the checkPassword method
router.post('/login', async (req, res) => { // login handling (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)

  // checking if login field was submitted because we are handling login/signup at once and not separately (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
  if (req.body.loginuser) { // if login submitted handle that first before signing up (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
    try {
      const dbUserData = await User.findOne({ // find user (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
        where: { // where condition for user (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
          username: req.body.loginuser, // username from request body (https://expressjs.com/en/4x/api.html#req.body) (https://sequelize.org/master/manual/model-querying-basics.html)
        }
      });
  
      if (!dbUserData) { // if no user found send error (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        res
        .status(400).redirect('/login') // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        .json('Incorrect username or password. Please try again!'); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      return; // return to prevent further execution (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.loginpassword); // check password (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
  
      if (!validPassword) { // if password is incorrect send error (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html) 
        res
          .status(400).redirect('/login') // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
          .send('Incorrect username or password. Please try again!'); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        return; // return to prevent further execution (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
      }
  
      req.session.save(() => { // save session (https://expressjs.com/en/4x/api.html#req.session.save) (https://sequelize.org/master/manual/model-querying-basics.html) 
        req.session.loggedIn = true; // set loggedIn to true (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
        req.session.username = dbUserData.username; // set username (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
        res.redirect('/login'); // redirect to login page (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
      }); // end save session (https://expressjs.com/en/4x/api.html#req.session.save) (https://sequelize.org/master/manual/model-querying-basics.html) 
    } catch (err) { // catch error (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      console.log(err); // log error (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    }
  } else if (req.body.signupuser) { // if no login submitted, we know user is signing up instead so handle that here (https://expressjs.com/en/4x/api.html#router.post)
    const newUser = { // create new user object (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      username: req.body.signupuser, // username from request body (https://expressjs.com/en/4x/api.html#req.body) (https://sequelize.org/master/manual/model-querying-basics.html)
      password: req.body.signuppassword // password from request body (https://expressjs.com/en/4x/api.html#req.body) (https://sequelize.org/master/manual/model-querying-basics.html)
    }
    try {
      await User.create(newUser); // create new user (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
      req.session.save(() => { // save session (https://expressjs.com/en/4x/api.html#req.session.save) (https://sequelize.org/master/manual/model-querying-basics.html) (https://
        req.session.loggedIn = true; // set loggedIn to true (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
        req.session.username = newUser.username; // set username (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
        res.redirect('/dashboard'); // redirect to dashboard page (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
      });
    } catch (err) { // catch error (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      if (err.name === 'SequelizeUniqueConstraintError') { // handle existing username error (https://sequelize.org/master/manual/model-querying-basics.html)
        res
        .status(400) // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        .send('Username already exists! Please try again.'); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      } else if (err.name === 'SequelizeValidationError') { // handle password length error (https://sequelize.org/master/manual/model-querying-basics.html)
        res
        .status(400) // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        .send('Password must be at least 8 characters long.'); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      } else { // handle other errors (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
        res
          .status(400) // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
          .send(err); // send error status code (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
      }
      return; // return (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    }
  }
});

router.post('/logout', (req, res) => { // logout route (https://expressjs.com/en/4x/api.html#router.post) (https://sequelize.org/master/manual/model-querying-basics.html)
  if (req.session.loggedIn) { // if user is logged in (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
    req.session.destroy(() => { // destroy session (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
      res.status(204).end(); // send status code 204 (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
    });
    res.redirect('/login'); // redirect to login page (https://expressjs.com/en/4x/api.html#res.redirect) (https://sequelize.org/master/manual/model-querying-basics.html)
  } else { // if user is not logged in (https://expressjs.com/en/4x/api.html#req.session) (https://sequelize.org/master/manual/model-querying-basics.html)
    res.status(404).end(); // send status code 404 (https://expressjs.com/en/4x/api.html#res.status) (https://sequelize.org/master/manual/model-querying-basics.html)
  }
});

module.exports = router; // export router (https://expressjs.com/en/4x/api.html#router) (https://sequelize.org/master/manual/model-querying-basics.html) (https://sequelize.org/master/manual/model-querying-basics.html)
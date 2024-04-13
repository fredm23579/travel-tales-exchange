const router = require('express').Router(); // import express router (https://expressjs.com/en/4x/api.html#router) from 'express module' (https://www.npmjs.com/package/express)
const { Post, Comment } = require('../models'); // import Post and Comment models (https://sequelize.org/docs/v6/core-concepts/model-basics/)

// render homepage - contains all user posts
router.get('/', async (req, res) => { // get method (https://expressjs.com/en/4x/api.html#router.get)
  try { // try...catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
    const dbPostData = await Post.findAll({ // findAll method (https://sequelize.org/docs/v6/core-concepts/model-basics/#findall)
      include: [ // include option (https://sequelize.org/master/manual/eager-loading.html)
        {
          model: Comment, // include comments (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
        },
      ],
    });
    const posts = dbPostData.map((post) => { // map method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
      const userPost = post.get({ plain: true }) // get method (https://sequelize.org/docs/v6/core-concepts/model-basics/#get)
      userPost.commentCount = userPost.comments.length; // count number of comments (https://sequelize.org/docs/v6/core-concepts/model-basics/#count)
      return userPost; // return post with comment count added (https://sequelize.org/docs/v6/core-concepts/model-basics/#count)
    });
    posts.reverse(); // sort by most recent first (https://sequelize.org/docs/v6/core-concepts/model-basics/#order)
    res.render('homepage', { // render homepage (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status
      posts, // posts parameter (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      loggedIn: req.session.loggedIn, // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    });
  } catch (err) { // catch error (https://expressjs.com/en/4x/api.html#res.status) and render error page (https://expressjs.com/en/4x/api.html#res.render) with error message
    console.log(err); // log error message (https://developer.mozilla.org/en-US/docs/Web/API/console/log) to console
    res.status(500).json(err); // render error page (https://expressjs.com/en/4x/api.html#res.render) with error message
  }
});

// render dashboard - contains personal user posts and comments (https://expressjs.com/en/4x/api.html#res.render)
router.get('/dashboard', async (req, res) => { // get method (https://expressjs.com/en/4x/api.html#router.get)
  if (!req.session.loggedIn) { // if user is not logged in (https://expressjs.com/en/4x/api.html#req.session) redirect to login page
    res.render('dashboard'); // render dashboard (https://expressjs.com/en/4x/api.html#res.render) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    return;
  }
  try { // try...catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
    const dbUserPostData = await Post.findAll({ // findAll method (https://sequelize.org/docs/v6/core-concepts/model-basics/#findall) with where clause (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-where-queries)
      where: { // where clause (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-where-queries)
        creator: req.session.username, // can't figure out getting username rn will edit later (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-where-queries)
      }, // include option (https://sequelize.org/master/manual/eager-loading.html)
      include: [ // include option (https://sequelize.org/master/manual/eager-loading.html) with comments (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
        {
          model: Comment, // include comments (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many) with where clause (https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-where-queries)
        }
      ]
    });
    const posts = dbUserPostData.map((post) => { // map method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) with get method (https://sequelize.org/docs/v6/core-concepts/model-basics/#get)
      const userPost = post.get({ plain: true }) // get method (https://sequelize.org/docs/v6/core-concepts/model-basics/#get) with plain option (https://sequelize.org/docs/v6/core-concepts/model-basics/#get)
      userPost.commentCount = userPost.comments.length; // count number of comments (https://sequelize.org/docs/v6/core-concepts/model-basics/#count) with length property (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
      return userPost; // return post with comment count added (https://sequelize.org/docs/v6/core-concepts/model-basics/#count) with plain option (https://sequelize.org/docs/v6/core-concepts/model-basics/#get) 
    });
    posts.reverse(); // sort by most recent first (https://sequelize.org/docs/v6/core-concepts/model-basics/#order)
    res.render('dashboard', { // render dashboard (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      posts, // posts parameter (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      username: req.session.username, // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      loggedIn: req.session.loggedIn // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with posts and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    });
  } catch (err) { // catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/catch)
    console.log(err); // log error to console
    res.status(500).json(err); // send error status (https://expressjs.com/en/4x/api.html#res.status)
  }
});

// render individual post page
router.get('/post/:id', async (req, res) => { // get method (https://expressjs.com/en/4x/api.html#router.get)
  try { // try...catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
    const dbPostData = await Post.findByPk(req.params.id, { // findByPk method (https://sequelize.org/docs/v6/core-concepts/model-basics/#findbyid) with include option (https://sequelize.org/master/manual/eager-loading.html)
      include: [ // include option (https://sequelize.org/master/manual/eager-loading.html)
        {
          model: Comment, // include comments (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
        }
      ]
    });
    const post = dbPostData.get({ plain: true }); // get method (https://sequelize.org/docs/v6/core-concepts/model-basics/#get) with plain option (https://sequelize.org/docs/v6/core-concepts/model-basics/#get)
    res.render('post', { // render post (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      post, // post parameter (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      username: req.session.username, // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      loggedIn: req.session.loggedIn, // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    });
  } catch (err) { // catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/catch)
    res.status(500).json(err); // send error status (https://expressjs.com/en/4x/api.html#res.status)
  }
});

// render update page for posts (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
router.get('/post/:id/edit', async (req, res) => { // get method (https://expressjs.com/en/4x/api.html#router.get)
  try { // try...catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
    const dbPostData = await Post.findByPk(req.params.id); // findByPk method (https://sequelize.org/docs/v6/core-concepts/model-basics/#findbyid)
    const post = dbPostData.get({ plain: true }); // get method (https://sequelize.org/docs/v6/core-concepts/model-basics/#get) with plain option (https://sequelize.org/docs/v6/core-concepts/model-basics/#get)
    if (post.creator !== req.session.username) { // if statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if) with redirect (https://expressjs.com/en/4x/api.html#res.redirect)
      res.redirect('/'); // redirect (https://expressjs.com/en/4x/api.html#res.redirect)
    }
    res.render('update-post', { // render update-post (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      post, // post parameter (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
      loggedIn: req.session.loggedIn // loggedIn parameter (https://expressjs.com/en/4x/api.html#res.render) with post and loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    });
  } catch (err) { // catch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/catch)
    res.status(500).json(err); // send error status (https://expressjs.com/en/4x/api.html#res.status)
  }
});

// renders login page (https://expressjs.com/en/4x/api.html#res.render) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render) if user is logged in (https://expressjs.com/en/4x/api.html#req.session)
router.get('/login', (req, res) => { // get method (https://expressjs.com/en/4x/api.html#router.get) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
  if (req.session.loggedIn) { // if statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if) with redirect (https://expressjs.com/en/4x/api.html#res.redirect)
    res.redirect('/'); // redirect (https://expressjs.com/en/4x/api.html#res.redirect) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
    return;
  }
  res.render('login'); // render login (https://expressjs.com/en/4x/api.html#res.render) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render)
});

module.exports = router; // export router (https://expressjs.com/en/4x/api.html#router) with loggedIn status (https://expressjs.com/en/4x/api.html#res.render) with loggedOut status (https
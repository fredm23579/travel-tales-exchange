const path = require('path'); // for file paths
const express = require('express'); // for server
const session = require('express-session'); // for sessions
const exphbs = require('express-handlebars'); // for handlebars
const methodOverride = require('method-override'); // for handling PUT requests
// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store); // for storing sessions in db store (sequelize) instead of memory store (cookie)

const app = express(); // initializes express
const PORT = process.env.PORT || 3001; // sets port to 3001 if not set in environment

const routes = require('./controllers'); // routes for server and client side files (default is ./controllers/index.js) 
const sequelize = require('./config/connection');  // for connecting to db with sequelize (default is ./config/connection.js) 

app.use(methodOverride('_method')); // for handling PUT requests (method-override) 

// Sets up session and connect to our Sequelize db
const sess = { // session settings for server and client side files (default is ./controllers/index.js) 
  secret: 'Super secret secret', // secret key for session cookie
  cookie: { // session cookie settings for server and client side files (default is ./controllers/index.js)
    maxAge: 30 * 60 * 1000, // 30 minutes (default is 10 minutes)
    httpOnly: true, // default is true (https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#HTTP_only)
    secure: false, // default is true (https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_attribute)
    sameSite: 'strict', // default is 'lax' (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
  }, // session cookie settings for server and client side files (default is ./controllers/index.js)
  resave: false, // session cookie settings for server and client side files (default is ./controllers/index.js)
  saveUninitialized: true, // session cookie settings for server and client side files (default is ./controllers/index.js)
  expires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes (30 * 60 * 1000) = 30 minutes (default is 10 minutes)
  // Sets up session store for server and client side files (default is ./controllers/index.js)
  store: new SequelizeStore({ // session store settings for server and client side files (default is ./controllers/index.js)
    db: sequelize, // for connecting to db with sequelize (default is ./config/connection.js)
  }),
};

app.use(session(sess)); // session settings for server and client side files (default is ./controllers/index.js)

const hbs = exphbs.create(); // initializes handlebars

app.engine('handlebars', hbs.engine); // engine for handlebars (default is ./controllers/index.js)
app.set('view engine', 'handlebars'); // view engine for handlebars (default is ./controllers/index.js)

app.use(express.json()); // for parsing json data (https://expressjs.com/en/api.html#express.json)
app.use(express.urlencoded({ extended: false })); // for parsing url encoded data (https://expressjs.com/en/api.html#express.urlencoded)
app.use(express.static(path.join(__dirname, 'public'))); // for serving static files (https://expressjs.com/en/starter/static-files.html)

app.use(routes); // routes for server and client side files (default is ./controllers/index.js)

app.use((req, res, next) => { // middleware for checking if user is logged in or authenticated via session store (https://expressjs.com/en/guide/behind-proxies.html)
  // List of paths that do not require authentication
  const authFreePaths = ['/login', '/signup', '/logout', '/css/', '/js/']; // paths that do not require authentication (https://expressjs.com/en/guide/behind-proxies.html)
  if (!req.session.userId && !authFreePaths.some(path => req.path.startsWith(path))) { // if user is not logged in and path is not in authFreePaths list then redirect to login
    return res.redirect('/login'); // redirect to login page (https://expressjs.com/en/guide/behind-proxies.html)
  }
  next(); // next middleware (https://expressjs.com/en/guide/behind-proxies.html)
});


// middleware for checking if session has expired
app.use((req, res, next) => { // middleware for checking if session has expired (https://expressjs.com/en/guide/behind-proxies.html)
  if (req.session.expires && Date.now() > req.session.expires) { // if session has expired then destroy session and redirect to login
    req.session.destroy(() => { // destroy session and redirect to login page (https://expressjs.com/en/guide/behind-proxies.html)
      res.redirect('/login'); // redirect to login page (https://expressjs.com/en/guide/behind-proxies.html)
    });
  } else { // if session has not expired then next middleware (https://expressjs.com/en/guide/behind-proxies.html)
    next();
  }
});

// refreshes expiration time so site doesn't log out active users
app.use((req, res, next) => { // middleware for checking if session has expired (https://expressjs.com/en/guide/behind-proxies.html)
  if (req.session.expires) {   
    const extendedExpirationTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes (30 * 60 * 1000) = 30 minutes (default is 10 minutes)
    req.session.expires = extendedExpirationTime; // refreshes expiration time so site doesn't log out active users
  }
  next(); // next middleware (https://expressjs.com/en/guide/behind-proxies.html)
});

 // middleware for checking if user is logged in or authenticated via session store (https://expressjs.com/en/guide/behind-proxies.html)
sequelize.sync({ force: false }).then(() => {   // syncs sequelize with db (default is ./config/connection.js)
  app.listen(PORT, () =>    // listens on port 3001 (default is 3001)
    console.log( 
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
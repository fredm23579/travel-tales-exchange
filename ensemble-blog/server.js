const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override'); // for handling PUT requests
// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./controllers');
const sequelize = require('./config/connection');

app.use(methodOverride('_method'));

// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  expires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((req, res, next) => {
  // List of paths that do not require authentication
  const authFreePaths = ['/login', '/signup', '/logout', '/css/', '/js/'];
  if (!req.session.userId && !authFreePaths.some(path => req.path.startsWith(path))) {
    return res.redirect('/login');
  }
  next();
});


// middleware for checking if session has expired
app.use((req, res, next) => {
  if (req.session.expires && Date.now() > req.session.expires) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  } else {
    next();
  }
});

// refreshes expiration time so site doesn't log out active users
app.use((req, res, next) => {
  if (req.session.expires) {
    const extendedExpirationTime = new Date(Date.now() + 30 * 60 * 1000);
    req.session.expires = extendedExpirationTime;
  }
  next();
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
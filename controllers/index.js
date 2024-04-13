const router = require('express').Router(); // import express router (https://expressjs.com/en/4x/api.html#router)

const apiRoutes = require('./api-routes'); // import api routes (default is ./api-routes)
const htmlRoutes = require('./html-routes'); // import html routes (default is ./html-routes)

router.use(htmlRoutes); // use html routes
router.use(apiRoutes); // use api routes

module.exports = router; // export router (https://expressjs.com/en/4x/api.html#router)
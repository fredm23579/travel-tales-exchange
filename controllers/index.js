const router = require('express').Router();

const apiRoutes = require('./api-routes');
const htmlRoutes = require('./html-routes');

router.use(htmlRoutes);
router.use(apiRoutes);

module.exports = router;
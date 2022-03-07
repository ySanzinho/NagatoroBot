const router = require("express").Router();
const { route } = require("./auth");
const auth = require('./auth');
const discord = require( './discord' );

router.use( '/auth', auth );
router.use( "/discord", discord);

module.exports = router;
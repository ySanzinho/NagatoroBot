const router = require("express").Router();
const passport = require("passport");

router.get('/discord', passport.authenticate('discord') );

router.get( '/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect(301, 'http://localhost:3000/menu');
})

router.get('/', (req, res) => {
    if(req.user) {
        res.user(req.user);
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
})

module.exports = router;
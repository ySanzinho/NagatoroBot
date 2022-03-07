const router = require("express").Router();

router.get('/', (req, res) => {
    res.sendStatus( {
        msg: 'Discord'
    });
})

module.exports = router;
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



router.use('/beverage', require('./beverage.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;

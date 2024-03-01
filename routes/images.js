var express = require('express');
var router = express.Router();

router.get("/upload"),(req,res) => {
    res.render("üpload")
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
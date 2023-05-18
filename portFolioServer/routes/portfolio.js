var express = require('express');
var router = express.Router();
const portfolioController = require("../controllers/portfolio");

router.get('/',portfolioController.getportfolios);
router.post('/',portfolioController.createPortfolio);
router.get('/:id',portfolioController.getportfolio);


module.exports = router;
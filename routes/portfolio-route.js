const express = require('express');
const portfolioController = require("./../controllers/portfolio-controller");
const authController = require("./../controllers/auth-controller");
const router = express.Router();

router.use(authController.isLogged);

router.get('/allDesign', portfolioController.getAllDesign);
router
    .route('/')
    .get(portfolioController.getPortfolio)
    .patch(portfolioController.updatePortfolio);
module.exports = router;
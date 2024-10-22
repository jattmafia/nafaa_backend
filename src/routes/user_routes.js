const userRoutes = require('express').Router();
const authController = require('../controller/auth_controller');


userRoutes.post("/signup",authController.signup);
userRoutes.post("/login",authController.login);



module.exports = userRoutes;
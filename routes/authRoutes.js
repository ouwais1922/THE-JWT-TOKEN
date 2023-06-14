const {Router} = require('express');
const { singUpGetController, midFunction,singUpPostController, loginGetController, loginPostController } = require('../controllers/authController.js');
const authRoute = Router();

authRoute.get('/signup',singUpGetController);
authRoute.post('/signup',singUpPostController);
authRoute.get('/login',loginGetController);
authRoute.post('/login',loginPostController);



module.exports = authRoute;
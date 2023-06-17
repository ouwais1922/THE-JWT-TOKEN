const { Router } = require('express');
const authRouter = Router();
const {
    loginGetController,
    loginPostController,
    signupGetController,
    signupPostController,
    logoutGetController } = require('../controllers/authControllers.js')

authRouter.get('/login',loginGetController);
authRouter.post('/login',loginPostController);

authRouter.get('/signup',signupGetController);
authRouter.post('/signup',signupPostController);
authRouter.get('/logout',loginGetController);

module.exports = authRouter

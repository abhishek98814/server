const express = require('express');

const authController = require('../../controller/auth/auth');
const authRouter = express.Router();

authRouter.post('/register', authController.createRegister);
authRouter.post('/login', authController.createLogin);
authRouter.get('/profile', authController.getProfile)
authRouter.post('/logout', authController.createLogout)


module.exports = authRouter;
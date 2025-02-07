import {Router} from 'express';
import * as userController from '../controllers/user.controller'
import {body} from 'express-validator'
import * as authMiddleware from '../middleware/auth.middleware';
const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('email must be a valid email'),
    body('password').isLength({min:3}).withMessage('password must be at least 3 characters and 3 number and 3 words'),
    userController.createUserController);

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({mis:3}).withMessage('Password must be at least 3 characters and 3 number and 3 words'),
    userController.loginController);

router.get('/profile',authMiddleware.authUser,userController.profileController);

router.get('/logout',authMiddleware.authUser,userController.logoutController);

export default router;
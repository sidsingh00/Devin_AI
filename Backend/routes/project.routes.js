import { Router } from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/project.controller'
import * as authMiddleWare from '../middleware/auth.middleware';

const router = Router();

router.post('/create',

    authMiddleWare.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
    
)

export default router;
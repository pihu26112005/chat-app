import express from 'express'
import { getAllUser, userLogin, userRegister , verifyToken} from '../Controllers/userController.js';
import {protect} from '../Middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.post('/verify', verifyToken);
userRouter.get('/',protect,getAllUser)

export default userRouter;

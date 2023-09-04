import {Router} from 'express';
import { loginUser } from './login.controller';

const loginRouter = Router();

loginRouter.post('/', loginUser);


export default loginRouter;
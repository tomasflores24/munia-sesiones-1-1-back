import { Router } from 'express';
import { useValidatorMiddelware } from './middleware/authValidation';
import { authProfile } from './auth.controller';

const authRouter = Router();

authRouter.post('/', useValidatorMiddelware, authProfile);

export default authRouter;

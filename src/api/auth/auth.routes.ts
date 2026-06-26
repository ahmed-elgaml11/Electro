import { Router } from 'express';
import { register, login } from './auth.controllers';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();

router.post('/register', validate({ body: registerSchema }), register);
router.post('/login', validate({ body: loginSchema }), login);

export default router;

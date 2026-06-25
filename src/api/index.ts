import express from "express";
import firstResponse from "../types/firstResponse";
import authRoutes from './auth/auth.routes';
const router = express.Router();

router.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from api.'
    })
})

router.use('/auth', authRoutes);
export default router
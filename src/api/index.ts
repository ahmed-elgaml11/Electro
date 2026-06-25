import express from "express";
import firstResponse from "../types/firstResponse";
import authRoutes from './auth/auth.routes';
import projectRoutes from './projects/projects.routes';
import taskRoutes from './tasks/tasks.routes';

const router = express.Router();

router.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from api.'
    })
})

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router
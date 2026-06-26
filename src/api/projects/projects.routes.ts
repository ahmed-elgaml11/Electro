import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from './projects.controllers';
import { validate } from '../../middlewares/validate';
import { protect, restrictTo } from '../../middlewares/protectRoutes';
import { createProjectSchema, updateProjectSchema, queryProjectSchema, idParamSchema } from './projects.schema';
import taskRoutes from '../tasks/tasks.routes';

const router = Router();

// Apply protect middleware to all project routes
router.use(protect);

router
  .route('/')
  .get(
    restrictTo('Admin', 'Member'),
    validate({ query: queryProjectSchema }),
    getProjects
  )
  .post(
    restrictTo('Admin', 'Member'),
    validate({ body: createProjectSchema }),
    createProject
  );

router
  .route('/:id')
  .all(validate({ params: idParamSchema }))
  .get(
    restrictTo('Admin', 'Member'),
    getProject
  )
  .patch(
    restrictTo('Admin', 'Member'),
    validate({ body: updateProjectSchema }),
    updateProject
  )
  .delete(
    restrictTo('Admin', 'Member'),
    deleteProject
  );

// Nest task routes under /projects/:projectId/tasks
router.use('/:projectId/tasks', taskRoutes);

export default router;

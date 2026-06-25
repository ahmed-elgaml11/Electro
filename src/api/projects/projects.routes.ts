import { Router } from 'express';
import {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from './projects.controllers';
import { validate } from '../../middlewares/validate';
import { protect, restrictTo } from '../../middlewares/protectRoutes';
import { createProjectSchema, updateProjectSchema, queryProjectSchema, idParamSchema } from './projects.schema';

const router = Router();

// Apply protect middleware to all project routes
router.use(protect);

router
  .route('/')
  .get(
    restrictTo('Admin', 'Member'),
    validate(queryProjectSchema),
    getAllProjectsHandler
  )
  .post(
    restrictTo('Admin'),
    validate(createProjectSchema),
    createProjectHandler
  );

router
  .route('/:id')
  .all(validate(idParamSchema))
  .get(
    restrictTo('Admin', 'Member'),
    getProjectHandler
  )
  .patch(
    restrictTo('Admin'),
    validate(updateProjectSchema),
    updateProjectHandler
  )
  .delete(
    restrictTo('Admin'),
    deleteProjectHandler
  );

export default router;

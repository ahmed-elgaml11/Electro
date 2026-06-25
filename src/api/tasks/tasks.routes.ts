import { Router } from 'express';
import {
  createTaskHandler,
  getAllTasksHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from './tasks.controllers';
import { validate } from '../../middlewares/validate';
import { protect, restrictTo } from '../../middlewares/protectRoutes';
import { createTaskSchema, updateTaskSchema, queryTaskSchema } from './tasks.schema';
import { idParamSchema } from '../projects/projects.schema';

const router = Router();

// Apply protect middleware to all task routes
router.use(protect);

router
  .route('/')
  .get(
    restrictTo('Admin', 'Member'),
    validate(queryTaskSchema),
    getAllTasksHandler
  )
  .post(
    restrictTo('Admin'),
    validate(createTaskSchema),
    createTaskHandler
  );

router
  .route('/:id')
  .all(validate(idParamSchema))
  .get(
    restrictTo('Admin', 'Member'),
    getTaskHandler
  )
  .patch(
    restrictTo('Admin'),
    validate(updateTaskSchema),
    updateTaskHandler
  )
  .delete(
    restrictTo('Admin'),
    deleteTaskHandler
  );

export default router;

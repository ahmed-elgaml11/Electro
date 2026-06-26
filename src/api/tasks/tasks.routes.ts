import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from './tasks.controllers';
import { validate } from '../../middlewares/validate';
import { protect, restrictTo } from '../../middlewares/protectRoutes';
import { createTaskSchema, updateTaskSchema, queryTaskSchema, taskIdParamSchema, projectIdParamSchema } from './tasks.schema';

// mergeParams: true allows access to :projectId from the parent router
const router = Router({ mergeParams: true });

// All task routes require authentication
router.use(protect);

router
  .route('/')
  .get(
    restrictTo('Admin', 'Member'),
    validate({ params: projectIdParamSchema }),
    validate({ query: queryTaskSchema }),
    getTasks
  )
  .post(
    restrictTo('Admin', 'Member'),
    validate({ params: projectIdParamSchema }),
    validate({ body: createTaskSchema }),
    createTask
  );

router
  .route('/:taskId')
  .get(
    restrictTo('Admin', 'Member'),
    validate({ params: taskIdParamSchema }),
    getTaskById
  )
  .patch(
    restrictTo('Admin', 'Member'),
    validate({ params: taskIdParamSchema }),
    validate({ body: updateTaskSchema }),
    updateTask
  )
  .delete(
    restrictTo('Admin', 'Member'),
    validate({ params: taskIdParamSchema }),
    deleteTask
  );

export default router;

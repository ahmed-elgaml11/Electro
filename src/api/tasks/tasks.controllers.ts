import { Request, Response, NextFunction } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from './tasks.services';
import { AppError } from '../../utils/appError';
import { successResponse } from '../../utils/responses';

export const createTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await createTask(req.body);
    successResponse(res, 201, 'Task created successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const getAllTasksHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getTasks(req.query);
    successResponse(res, 200, 'Tasks retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) {
      return next(new AppError('Task not found', 404));
    }
    successResponse(res, 200, 'Task retrieved successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    if (!task) {
      return next(new AppError('Task not found', 404));
    }
    successResponse(res, 200, 'Task updated successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await deleteTask(req.params.id);
    if (!task) {
      return next(new AppError('Task not found', 404));
    }
    successResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

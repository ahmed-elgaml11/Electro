import { Response, NextFunction } from 'express';
import * as taskService from './tasks.services';
import { successResponse } from '../../utils/responses';
import { AuthRequest } from '../../middlewares/protectRoutes';

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask(req.params.projectId, req.body, req.user!);
    successResponse(res, 201, 'Task created successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await taskService.getTasks(req.params.projectId, req.query, req.user!);
    successResponse(res, 200, 'Tasks retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskById(req.params.projectId, req.params.taskId, req.user!);
    successResponse(res, 200, 'Task retrieved successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.updateTask(req.params.projectId, req.params.taskId, req.body, req.user!);
    successResponse(res, 200, 'Task updated successfully', { task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.params.projectId, req.params.taskId, req.user!);
    successResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

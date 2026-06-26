import { Response, NextFunction } from 'express';
import * as projectService from './projects.services';
import { successResponse } from '../../utils/responses';
import { AuthRequest } from '../../middlewares/protectRoutes';

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.createProject(req.body, req.user!);
    successResponse(res, 201, 'Project created successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.getProjects(req.query, req.user!);
    successResponse(res, 200, 'Projects retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user!);
    successResponse(res, 200, 'Project retrieved successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body, req.user!);
    successResponse(res, 200, 'Project updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await projectService.deleteProject(req.params.id, req.user!);
    successResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

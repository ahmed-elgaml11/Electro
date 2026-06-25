import { Request, Response, NextFunction } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from './projects.services';
import { AppError } from '../../utils/appError';
import { successResponse } from '../../utils/responses';

export const createProjectHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await createProject(req.body);
    successResponse(res, 201, 'Project created successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const getAllProjectsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getProjects(req.query);
    successResponse(res, 200, 'Projects retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getProjectHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }
    successResponse(res, 200, 'Project retrieved successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const updateProjectHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await updateProject(req.params.id, req.body);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }
    successResponse(res, 200, 'Project updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await deleteProject(req.params.id);
    if (!project) {
      return next(new AppError('Project not found', 404));
    }
    successResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

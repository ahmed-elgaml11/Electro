import { Task, ITask } from './tasks.model';
import { Project } from '../projects/projects.model';
import { AppError } from '../../utils/appError';
import { IUser } from '../auth/auth.model';

const verifyProjectAccess = async (projectId: string, user: IUser) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  if (user.role !== 'Admin' && project.owner.toString() !== user._id.toString()) {
    throw new AppError('Forbidden: You do not own this project', 403);
  }
  return project;
};

export const createTask = async (projectId: string, data: any, user: IUser): Promise<ITask> => {
  await verifyProjectAccess(projectId, user);

  const task = new Task({ ...data, project: projectId });
  await task.save();
  return task;
};

export const getTasks = async (projectId: string, query: any, user: IUser) => {
  await verifyProjectAccess(projectId, user);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const sortBy = (query.sortBy as string) || 'createdAt';
  const order = (query.order as string) === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  // Build dynamic filter — always scoped to this project
  const filter: any = { project: projectId };
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  const tasks = await Task.find(filter)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (projectId: string, taskId: string, user: IUser): Promise<ITask> => {
  await verifyProjectAccess(projectId, user);

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
};

export const updateTask = async (projectId: string, taskId: string, data: any, user: IUser): Promise<ITask> => {
  await verifyProjectAccess(projectId, user);

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  Object.assign(task, data);
  await task.save();
  return task;
};

export const deleteTask = async (projectId: string, taskId: string, user: IUser): Promise<ITask> => {
  await verifyProjectAccess(projectId, user);

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  await task.deleteOne();
  return task;
};

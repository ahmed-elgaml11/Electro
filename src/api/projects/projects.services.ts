import { Project, IProject } from './projects.model';
import { AppError } from '../../utils/appError';
import { IUser } from '../auth/auth.model';

export const createProject = async (data: any, user: IUser): Promise<IProject> => {
  const project = new Project({ ...data, owner: user._id });
  await project.save();
  return project;
};

export const getProjects = async (query: any, user: IUser) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const sortBy = (query.sortBy as string) || 'createdAt';
  const order = (query.order as string) === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  const filter: any = {};
  if (user.role !== 'Admin') {
    filter.owner = user._id;
  }

  const projects = await Project.find(filter)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(filter);

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProjectById = async (id: string, user: IUser): Promise<IProject> => {
  const filter: any = { _id: id };
  if (user.role !== 'Admin') {
    filter.owner = user._id;
  }
  const project = await Project.findOne(filter);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  return project;
};

export const updateProject = async (id: string, data: any, user: IUser): Promise<IProject> => {
  const filter: any = { _id: id };
  if (user.role !== 'Admin') {
    filter.owner = user._id;
  }
  const project = await Project.findOne(filter);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  Object.assign(project, data);
  await project.save();
  return project;
};

export const deleteProject = async (id: string, user: IUser): Promise<IProject> => {
  const filter: any = { _id: id };
  if (user.role !== 'Admin') {
    filter.owner = user._id;
  }
  const project = await Project.findOne(filter);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  await project.deleteOne();
  return project;
};

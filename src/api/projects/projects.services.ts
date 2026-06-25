import { Project, IProject } from './projects.model';

export const createProject = async (data: any): Promise<IProject> => {
  const project = new Project(data);
  await project.save();
  return project;
};

export const getProjects = async (query: any) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const sortBy = (query.sortBy as string) || 'createdAt';
  const order = (query.order as string) === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  const projects = await Project.find()
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

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

export const getProjectById = async (id: string): Promise<IProject | null> => {
  return Project.findById(id);
};

export const updateProject = async (id: string, data: any): Promise<IProject | null> => {
  return Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProject = async (id: string): Promise<IProject | null> => {
  return Project.findByIdAndDelete(id);
};

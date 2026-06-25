import { Task, ITask } from './tasks.model';

export const createTask = async (data: any): Promise<ITask> => {
  const task = new Task(data);
  await task.save();
  return task;
};

export const getTasks = async (query: any) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const sortBy = (query.sortBy as string) || 'createdAt';
  const order = (query.order as string) === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  // Build dynamic filter
  const filter: any = {};
  if (query.project) filter.project = query.project;
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  const tasks = await Task.find(filter)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .populate('project', 'title status'); // populate project details

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

export const getTaskById = async (id: string): Promise<ITask | null> => {
  return Task.findById(id).populate('project', 'title status');
};

export const updateTask = async (id: string, data: any): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('project', 'title status');
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(id);
};

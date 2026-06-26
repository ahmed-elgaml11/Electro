import { z } from 'zod';
import { Types } from 'mongoose';

// Helper to validate Mongoose ObjectIds
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  status: z.enum(['pending', 'in progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().datetime({ message: 'dueDate must be a valid ISO Date string' }),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(5, 'Description must be at least 5 characters').optional(),
  status: z.enum(['pending', 'in progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().datetime().optional(),
});

export const queryTaskSchema = z.object({
  page: z.string().regex(/^\d+$/).optional().transform(Number),
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  status: z.enum(['pending', 'in progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const taskIdParamSchema = z.object({
  projectId: objectIdSchema,
  taskId: objectIdSchema,
});

export const projectIdParamSchema = z.object({
  projectId: objectIdSchema,
});

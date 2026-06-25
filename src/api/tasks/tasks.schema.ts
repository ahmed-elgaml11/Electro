import { z } from 'zod';
import { Types } from 'mongoose';

// Helper to validate Mongoose ObjectIds
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    status: z.enum(['pending', 'in progress', 'done']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime({ message: 'dueDate must be a valid ISO Date string' }),
    project: objectIdSchema,
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().min(5, 'Description must be at least 5 characters').optional(),
    status: z.enum(['pending', 'in progress', 'done']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
    project: objectIdSchema.optional(),
  }),
});

export const queryTaskSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    sortBy: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    project: objectIdSchema.optional(),
    status: z.enum(['pending', 'in progress', 'done']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  }).optional()
});

import { z } from 'zod';
import { Types } from 'mongoose';

// Helper to validate Mongoose ObjectIds
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

export const queryProjectSchema = z.object({
  page: z.string().regex(/^\d+$/).optional().transform(Number),
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export const idParamSchema = z.object({ id: objectIdSchema });

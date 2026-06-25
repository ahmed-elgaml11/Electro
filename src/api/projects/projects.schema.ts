import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  }),
});

export const queryProjectSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    sortBy: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }).optional()
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid('Invalid UUID format') })
});

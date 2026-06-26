import mongoose from 'mongoose';
import { createTaskSchema, updateTaskSchema, queryTaskSchema, taskIdParamSchema, projectIdParamSchema } from './tasks.schema';

const validObjectId = new mongoose.Types.ObjectId().toString();

describe('Task Schemas', () => {
  describe('createTaskSchema', () => {
    it('should validate a correct create payload', () => {
      const validData = {
        title: 'Write tests',
        description: 'Write unit tests for the project',
        status: 'pending',
        priority: 'high',
        dueDate: '2026-07-01T00:00:00.000Z',
      };
      const result = createTaskSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should pass with only required fields', () => {
      const data = {
        title: 'Write tests',
        description: 'Write unit tests for the project',
        dueDate: '2026-07-01T00:00:00.000Z',
      };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if title is too short', () => {
      const data = {
        title: 'AB',
        description: 'Write unit tests',
        dueDate: '2026-07-01T00:00:00.000Z',
      };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if dueDate is not a valid ISO datetime', () => {
      const data = {
        title: 'Write tests',
        description: 'Write unit tests',
        dueDate: 'not-a-date',
      };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if status is not a valid enum', () => {
      const data = {
        title: 'Write tests',
        description: 'Write unit tests',
        dueDate: '2026-07-01T00:00:00.000Z',
        status: 'cancelled',
      };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if priority is not a valid enum', () => {
      const data = {
        title: 'Write tests',
        description: 'Write unit tests',
        dueDate: '2026-07-01T00:00:00.000Z',
        priority: 'critical',
      };
      const result = createTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('updateTaskSchema', () => {
    it('should validate with only status provided', () => {
      const data = { status: 'done' };
      const result = updateTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should validate with only priority provided', () => {
      const data = { priority: 'low' };
      const result = updateTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should validate with empty body', () => {
      const data = {};
      const result = updateTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if status value is invalid', () => {
      const data = { status: 'archived' };
      const result = updateTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('queryTaskSchema', () => {
    it('should validate correct query params with filters', () => {
      const data = {
        page: '2',
        limit: '5',
        sortBy: 'dueDate',
        order: 'desc',
        status: 'pending',
        priority: 'high',
      };
      const result = queryTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should pass with empty query (all optional)', () => {
      const data = {};
      const result = queryTaskSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if status filter is invalid', () => {
      const data = { status: 'cancelled' };
      const result = queryTaskSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('projectIdParamSchema', () => {
    it('should validate a correct ObjectId', () => {
      const data = { projectId: validObjectId };
      const result = projectIdParamSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail with an invalid ObjectId', () => {
      const data = { projectId: 'not-a-valid-id' };
      const result = projectIdParamSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('taskIdParamSchema', () => {
    it('should validate correct ObjectIds', () => {
      const data = {
        projectId: validObjectId,
        taskId: new mongoose.Types.ObjectId().toString(),
      };
      const result = taskIdParamSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if taskId is invalid', () => {
      const data = {
        projectId: validObjectId,
        taskId: 'bad-id',
      };
      const result = taskIdParamSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

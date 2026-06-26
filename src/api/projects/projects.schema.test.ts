import { createProjectSchema, updateProjectSchema, queryProjectSchema, idParamSchema } from './projects.schema';
import mongoose from 'mongoose';

const validObjectId = new mongoose.Types.ObjectId().toString();

describe('Project Schemas', () => {
  describe('createProjectSchema', () => {
    it('should validate a correct create payload', () => {
      const validData = {
        title: 'My Project',
        description: 'A long enough project description',
        status: 'pending',
      };
      const result = createProjectSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should pass when status is omitted (defaults to pending)', () => {
      const data = {
        title: 'My Project',
        description: 'A long enough project description',
      };
      const result = createProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if title is too short', () => {
      const data = {
        title: 'AB',
        description: 'A long enough project description',
      };
      const result = createProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if description is too short', () => {
      const data = {
        title: 'My Project',
        description: 'short',
      };
      const result = createProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if status is not a valid enum value', () => {
      const data = {
        title: 'My Project',
        description: 'A long enough project description',
        status: 'invalid-status',
      };
      const result = createProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('updateProjectSchema', () => {
    it('should validate with only title provided', () => {
      const data = { title: 'Updated Title' };
      const result = updateProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should validate with only status provided', () => {
      const data = { status: 'completed' };
      const result = updateProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should validate with empty body (no fields to update)', () => {
      const data = {};
      const result = updateProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if status is invalid', () => {
      const data = { status: 'archived' };
      const result = updateProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('queryProjectSchema', () => {
    it('should validate correct query params', () => {
      const data = {
        page: '1',
        limit: '10',
        sortBy: 'title',
        order: 'asc',
      };
      const result = queryProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should pass with empty query (all optional)', () => {
      const data = {};
      const result = queryProjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if page is not a number string', () => {
      const data = { page: 'abc' };
      const result = queryProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if order is invalid', () => {
      const data = { order: 'sideways' };
      const result = queryProjectSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('idParamSchema', () => {
    it('should validate a correct ObjectId', () => {
      const data = { id: validObjectId };
      const result = idParamSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail with an invalid ObjectId', () => {
      const data = { id: 'not-a-valid-id' };
      const result = idParamSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

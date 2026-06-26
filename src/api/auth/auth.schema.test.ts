import { registerSchema, loginSchema } from './auth.schema';

describe('Auth Schemas', () => {
  describe('registerSchema', () => {
    it('should validate a correct register payload', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if name is too short', () => {
      const data = {
        name: 'J',
        email: 'john@example.com',
        password: 'password123',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if email is invalid', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if password is too short', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if required fields are missing', () => {
      const data = {};
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('should validate a correct login payload', () => {
      const validData = {
        email: 'john@example.com',
        password: 'password123',
      };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if email is missing', () => {
      const data = { password: 'password123' };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should fail if password is missing', () => {
      const data = { email: 'john@example.com' };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

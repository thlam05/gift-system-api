export const RESPONSE_MESSAGES = {
  SUCCESS: 'Success',
} as const;

export const AUTH_MESSAGES = {
  EMAIL_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_ADMIN_CREDENTIALS: 'Invalid admin credentials',
  ADMIN_ONLY: 'Access denied. Admin only.',
} as const;

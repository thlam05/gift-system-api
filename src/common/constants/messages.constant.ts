export const RESPONSE_MESSAGES = {
  SUCCESS: 'Success',
} as const;

export const AUTH_MESSAGES = {
  EMAIL_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_ADMIN_CREDENTIALS: 'Invalid admin credentials',
  ADMIN_ONLY: 'Access denied. Admin only.',
} as const;

export const USER_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  OLD_PASSWORD_INCORRECT: 'Old password is incorrect',
  NEW_PASSWORD_MUST_BE_DIFFERENT:
    'New password must be different from old password',
} as const;

export const GIFT_MESSAGES = {
  GIFT_NOT_FOUND: 'Gift not found',
} as const;

export const CONFIG_MESSAGES = {
  JWT_SECRET_NOT_CONFIGURED: 'JWT secret is not configured',
  JWT_EXPIRES_IN_NOT_CONFIGURED: 'JWT expiresIn is not configured',
} as const;

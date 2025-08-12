// ドメインエラー
export class DomainError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class UserNotFoundError extends DomainError {
  constructor(id?: string) {
    super(id ? `User with id ${id} not found` : 'User not found', 'USER_NOT_FOUND');
  }
}

export class UsernameAlreadyExistsError extends DomainError {
  constructor(username: string) {
    super(`Username ${username} already exists`, 'USERNAME_ALREADY_EXISTS');
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`Email ${email} already exists`, 'EMAIL_ALREADY_EXISTS');
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid username or password', 'INVALID_CREDENTIALS');
  }
}

export class InvalidPasswordError extends DomainError {
  constructor() {
    super('Current password is incorrect', 'INVALID_PASSWORD');
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Unauthorized access', 'UNAUTHORIZED');
  }
}

export class ValidationError extends DomainError {
  constructor(field: string, message: string) {
    super(`Validation error for ${field}: ${message}`, 'VALIDATION_ERROR');
  }
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^\+?[\d\s-()]+$/.test(phone);
}

// TODO: Review implementation

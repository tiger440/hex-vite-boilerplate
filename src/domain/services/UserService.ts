export class UserService {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateName(name: string): boolean {
    return name.trim().length >= 2;
  }

  static canCreateUser(email: string, name: string): boolean {
    return this.validateEmail(email) && this.validateName(name);
  }
}
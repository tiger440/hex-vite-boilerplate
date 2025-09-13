export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity implements User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(email: string, name: string): UserEntity {
    const now = new Date();
    const id = crypto.randomUUID();

    return new UserEntity(id, email, name, now, now);
  }

  updateName(newName: string): UserEntity {
    return new UserEntity(
      this.id,
      this.email,
      newName,
      this.createdAt,
      new Date()
    );
  }
}
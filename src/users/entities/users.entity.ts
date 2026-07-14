export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  id: string;
  name!: string;
  email!: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.id = this.id || crypto.randomUUID();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
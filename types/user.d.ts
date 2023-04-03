export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
  active?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}


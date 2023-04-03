export interface IUrlModel {
  id?: number;
  longUrl?: string;
  shortUrl?: string;
  count?: number;
  userId?: number;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface IToken {
  id?: number;
  authToken?: string;
  refreshToken?: string | null;
  refreshedTokenAt?: Date | null;
  tokenIp?: string | null;
  userId?: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};


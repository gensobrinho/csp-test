export type Role = 'admin' | 'agilist' | 'developer';

export interface IHashAdapter {
  hash(plain: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}

export type JwtPayload = {
  sub: string;
  role: Role;
};

export interface IJwtAdapter {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
}

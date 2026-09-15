import bcrypt from 'bcrypt';
import type { IHashAdapter } from './types.js';

export class BcryptHashAdapter implements IHashAdapter {
  constructor(private readonly saltRounds: number) {}

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}

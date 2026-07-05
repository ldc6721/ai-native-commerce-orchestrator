import { AuthUserRecord } from '../auth.types';

export interface UserCredentialsRepository {
  findByEmail(email: string): Promise<AuthUserRecord | null>;
  findById(id: string): Promise<AuthUserRecord | null>;
}

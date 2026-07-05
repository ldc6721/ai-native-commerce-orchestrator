export interface PasswordHasher {
  verify(hash: string, password: string): Promise<boolean>;
}

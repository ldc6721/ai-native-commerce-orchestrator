import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PasswordHasher } from './password-hasher';

@Injectable()
export class Argon2PasswordHasher implements PasswordHasher {
  verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}

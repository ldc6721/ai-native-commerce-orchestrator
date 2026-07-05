import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../platform/database/prisma.service';
import { AuthUserRecord } from '../auth.types';
import { UserCredentialsRepository } from './user-credentials.repository';

@Injectable()
export class PrismaUserCredentialsRepository implements UserCredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AuthUserRecord | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ? this.toAuthUserRecord(user) : null;
  }

  async findById(id: string): Promise<AuthUserRecord | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toAuthUserRecord(user) : null;
  }

  private toAuthUserRecord(user: {
    id: string;
    email: string;
    displayName: string;
    passwordHash: string;
  }): AuthUserRecord {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      passwordHash: user.passwordHash,
    };
  }
}

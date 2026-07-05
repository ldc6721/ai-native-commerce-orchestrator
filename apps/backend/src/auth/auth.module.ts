import { Module } from '@nestjs/common';
import { PrismaService } from '../platform/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  PASSWORD_HASHER,
  SESSION_STORE,
  USER_CREDENTIALS_REPOSITORY,
} from './auth.tokens';
import { Argon2PasswordHasher } from './password/argon2-password-hasher';
import { InMemorySessionStore } from './sessions/in-memory-session-store';
import { RedisSessionStore } from './sessions/redis-session-store';
import { PrismaUserCredentialsRepository } from './users/prisma-user-credentials.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    Argon2PasswordHasher,
    PrismaUserCredentialsRepository,
    InMemorySessionStore,
    {
      provide: PASSWORD_HASHER,
      useExisting: Argon2PasswordHasher,
    },
    {
      provide: USER_CREDENTIALS_REPOSITORY,
      useExisting: PrismaUserCredentialsRepository,
    },
    {
      provide: SESSION_STORE,
      useFactory: (inMemorySessionStore: InMemorySessionStore) => {
        return process.env.REDIS_URL
          ? new RedisSessionStore()
          : inMemorySessionStore;
      },
      inject: [InMemorySessionStore],
    },
  ],
})
export class AuthModule {}

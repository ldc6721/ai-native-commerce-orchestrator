# Backend Scaffold

## Purpose

This is the Stage 2B backend scaffold for the commerce orchestrator project.

The backend uses NestJS and is currently limited to scaffold validation. It does not implement Auth behavior, Redis session storage, PostgreSQL domain models, or application domain APIs.

## Current Scope

Allowed in this scaffold:

- NestJS application skeleton.
- Health endpoint for scaffold smoke validation.
- Prisma schema skeleton with generator and datasource only.
- Auth boundary placeholder.
- Platform boundary placeholders for config, database, and Redis.

Forbidden in this scaffold:

- Auth controller, service, module, DTO, guard, or middleware.
- Login, logout, current user, or session endpoint implementation.
- User model.
- Prisma migration.
- Raw SQL.
- Redis client runtime implementation.
- Redis-backed session implementation.
- Cookie/session handling implementation.
- Shared package or generated contract package.

## Validation Commands

Expected scaffold validation commands:

```text
npm install
npm run build
npm run test
npm run lint
```

These commands validate scaffold buildability only. They do not validate Auth behavior.

## Related Artifacts

- `.ai/scaffold/backend-scaffold-plan.md`
- `.ai/architecture/backend-architecture-plan.md`
- `.ai/domains/auth/auth-domain-contract.md`
- `.ai/domains/auth/auth-api-contract.md`

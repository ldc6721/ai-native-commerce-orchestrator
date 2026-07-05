# Frontend Scaffold

## Purpose

This is the Stage 2B frontend scaffold for the commerce orchestrator project.

The frontend uses Vite, React, and TypeScript. It is currently limited to scaffold validation and does not implement Auth UI, Auth API clients, protected routing, or session bootstrap behavior.

## Current Scope

Allowed in this scaffold:

- Vite + React + TypeScript application skeleton.
- React Router provider boundary.
- TanStack Query provider boundary.
- React Hook Form and Zod dependencies for future domain-owned feature work.
- Tailwind CSS setup.
- Auth feature boundary placeholder.

Forbidden in this scaffold:

- Login page or login form.
- Auth API client file.
- Auth hooks.
- Protected route implementation.
- Session bootstrap implementation.
- Shared API client layer.
- Shared type package.
- Generated API client.
- Auth behavior tests.

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

- `.ai/scaffold/frontend-scaffold-plan.md`
- `.ai/architecture/frontend-architecture-plan.md`
- `.ai/domains/auth/auth-api-contract.md`

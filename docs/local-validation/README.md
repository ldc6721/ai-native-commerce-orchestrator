# Local Validation Guide

## Purpose

This document defines the Stage 2B local validation path for scaffold work.

It is documentation only. It does not create Docker Compose files, executable scripts, Kubernetes manifests, database schemas, seed data, or feature behavior tests.

## Scope

This guide covers:

- Tool availability checks.
- kind cluster config validation.
- External PostgreSQL dependency validation.
- External Redis dependency validation.
- Backend scaffold validation.
- Frontend scaffold validation.
- Local reset guidance.
- Troubleshooting expectations.

This guide does not cover:

- Auth behavior validation.
- Login/session E2E validation.
- Kubernetes application deployment.
- NGINX live routing validation.
- Prisma migration execution.
- Redis session store validation.

## Tool Availability

Run:

```text
docker --version
kind version
kubectl version --client
node --version
npm --version
```

Expected result:

- Each command prints a version.
- If a tool is unavailable, resolve the prerequisite before running dependent validation.

Known environment note:

- This repository may be accessed through a WSL UNC path from Windows.
- When Windows Node reads dependencies directly from the UNC-backed worktree, Vitest or ESLint may fail with file read errors.
- If that happens, validate from a native WSL Node installation or copy the scaffold package to a Windows temporary directory for validation.

## kind Validation

Run:

```text
kind version
kind create cluster --config infra/kind/cluster-config.yaml
kubectl cluster-info
kind delete cluster --name ai-commerce-local
```

Expected result:

- kind CLI is available.
- The cluster is created from `infra/kind/cluster-config.yaml`.
- kubectl can read cluster info.
- The cluster can be deleted by name.

Notes:

- Stage 2B does not deploy application manifests.
- Stage 2B does not deploy PostgreSQL, Redis, or NGINX workloads into kind.
- If kind is unavailable, mark cluster creation validation as blocked and keep scaffold boundary validation separate.

## External PostgreSQL Validation

PostgreSQL is an external local dependency.

Recommended local values:

```text
container name: ai-commerce-postgres
host port: 5432
database name: ai_commerce
username: ai_commerce
password: local-only value supplied by the developer
```

Candidate command:

```text
docker run --name ai-commerce-postgres \
  -e POSTGRES_DB=ai_commerce \
  -e POSTGRES_USER=ai_commerce \
  -e POSTGRES_PASSWORD=<local-password> \
  -p 5432:5432 \
  -d postgres:16
```

Expected result:

- PostgreSQL container starts.
- Host port `5432` is reachable.
- Backend `DATABASE_URL` shape can be documented as:

```text
postgresql://ai_commerce:<local-password>@localhost:5432/ai_commerce
```

Forbidden in Stage 2B:

- Prisma migration execution.
- User model creation.
- Raw SQL schema changes.
- Seed data.
- PostgreSQL Kubernetes workload.

## External Redis Validation

Redis is an external local dependency.

Recommended local values:

```text
container name: ai-commerce-redis
host port: 6379
persistence: disabled for scaffold validation
```

Candidate command:

```text
docker run --name ai-commerce-redis \
  -p 6379:6379 \
  -d redis:7
```

Expected result:

- Redis container starts.
- Host port `6379` is reachable.
- Backend `REDIS_URL` shape can be documented as:

```text
redis://localhost:6379
```

Forbidden in Stage 2B:

- Redis session store implementation.
- Redis key creation.
- TTL policy implementation.
- Cache, queue, or event behavior validation.
- Redis Kubernetes workload.

## Backend Scaffold Validation

Run:

```text
cd apps/backend
npm ci
npm run build
npm run test
npm run lint
npm audit --audit-level=high
```

Expected result:

- Install succeeds from `package-lock.json`.
- Build succeeds.
- Scaffold tests pass.
- Lint passes.
- High severity audit reports no vulnerabilities.

Forbidden in Stage 2B:

- Auth behavior tests.
- Prisma migration tests.
- Redis session tests.
- Database connectivity requirements.

## Frontend Scaffold Validation

Run:

```text
cd apps/frontend
npm ci
npm run build
npm run test
npm run lint
npm audit --audit-level=high
```

Expected result:

- Install succeeds from `package-lock.json`.
- Build succeeds.
- Scaffold tests pass.
- Lint passes.
- High severity audit reports no vulnerabilities.

Forbidden in Stage 2B:

- Login UI tests.
- Auth API client tests.
- Protected route tests.
- Session bootstrap tests.
- Browser E2E tests.

## Local Reset Guidance

kind:

```text
kind delete cluster --name ai-commerce-local
```

PostgreSQL:

```text
docker stop ai-commerce-postgres
docker rm ai-commerce-postgres
```

Redis:

```text
docker stop ai-commerce-redis
docker rm ai-commerce-redis
```

Notes:

- These are manual commands, not repository scripts.
- Do not add reset scripts in Stage 2B.
- Do not remove volumes or data unless the developer explicitly chooses to do so.

## Troubleshooting

Docker unavailable:

- Confirm Docker Desktop or Docker daemon is running.
- Re-run `docker --version`.

kind unavailable:

- Install kind before cluster validation.
- Keep scaffold boundary review separate from cluster creation validation.

kubectl context mismatch:

- Run `kubectl config current-context`.
- Confirm the context points to the local kind cluster.

Port conflict:

- PostgreSQL expects host port `5432`.
- Redis expects host port `6379`.
- Future gateway work reserves host ports `8080` and `8443`.

Node/npm path mismatch:

- Prefer a native runtime for the filesystem being validated.
- Avoid mixing Windows Node with WSL UNC dependency trees when Vitest or ESLint read errors appear.

Stage boundary violation:

- Stop and review `.ai/scaffold/scaffold-pr-plan.md`.
- Do not add Auth behavior, Docker Compose, Kubernetes application manifests, shared packages, or shared API clients in Stage 2B.

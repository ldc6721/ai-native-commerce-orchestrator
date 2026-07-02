# Infrastructure Scaffold

## Purpose

This directory contains the Stage 2B infrastructure scaffold for the local-first engineering workflow.

The current scope is limited to infrastructure boundaries and local Kubernetes cluster configuration. It does not contain application runtime manifests, Docker Compose files, executable scripts, or feature implementation.

## Current Scope

Allowed in this scaffold:

- `kind` local Kubernetes cluster configuration.
- Boundary documentation for future Kubernetes manifests.
- Boundary documentation for future NGINX gateway work.
- Boundary documentation for future local helper scripts.
- External PostgreSQL and Redis dependency notes.

Not allowed in this scaffold:

- Backend or frontend application code.
- Kubernetes application manifests.
- NGINX Kubernetes workload or NGINX config.
- PostgreSQL or Redis Kubernetes workload.
- Docker Compose file.
- Executable scripts.
- Auth gateway behavior, rate limiting, or service mesh configuration.

## Local Dependency Direction

PostgreSQL and Redis are external dependencies for the local environment.

- PostgreSQL expected local port: `5432`.
- Redis expected local port: `6379`.
- They are not deployed into the kind cluster in this stage.
- Their startup automation is intentionally deferred.

## Related Artifacts

- `.ai/scaffold/infrastructure-scaffold-plan.md`
- `.ai/scaffold/local-environment-validation-plan.md`
- `.ai/scaffold/scaffold-pr-plan.md`
- `.ai/architecture/adrs/ADR-004-kind-local-kubernetes.md`

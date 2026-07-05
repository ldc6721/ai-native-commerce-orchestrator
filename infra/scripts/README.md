# Local Scripts Boundary

## Purpose

This directory is reserved for future local environment helper scripts.

Stage 2B PR-001 does not create executable scripts. It only documents the intended script boundary.

## Future Script Candidates

Future work may consider scripts for:

- kind cluster creation.
- kind cluster deletion.
- local prerequisite checks.
- external PostgreSQL dependency startup.
- external Redis dependency startup.
- local reset support.

## Forbidden In PR-001

- `.sh` script.
- `.ps1` script.
- `.bat` script.
- Any script that creates Docker or Kubernetes resources.
- Any script that starts backend or frontend applications.

## Validation Direction

For PR-001, validation should remain command-based and documented in the PR evidence.

Candidate commands:

```text
kind version
kind create cluster --config infra/kind/cluster-config.yaml
kind delete cluster --name ai-commerce-local
```

Actual local environment automation must be reviewed in a separate stage or PR.

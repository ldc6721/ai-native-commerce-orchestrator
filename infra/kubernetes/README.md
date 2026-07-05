# Kubernetes Boundary

## Purpose

This directory is reserved for future Kubernetes manifests.

Stage 2B PR-001 does not create application manifests. The only Kubernetes-related file created in this PR is the kind cluster config under `infra/kind/`.

## Current Status

No Kubernetes application manifests are allowed in this stage.

Forbidden in this directory for PR-001:

- Namespace manifest.
- Deployment manifest.
- Service manifest.
- Ingress manifest.
- ConfigMap manifest.
- Secret manifest.
- PVC or PV manifest.
- PostgreSQL workload manifest.
- Redis workload manifest.
- NGINX workload manifest.

## Future Direction

Future Kubernetes work must be introduced through a separate scaffold or implementation PR after ownership, validation, and review gates are confirmed.

Expected future review owners:

- Infrastructure Team.
- Backend Platform Team when backend runtime is involved.
- Frontend Team when frontend runtime is involved.
- Reviewer Agent.
- QA Team when validation expectations change.

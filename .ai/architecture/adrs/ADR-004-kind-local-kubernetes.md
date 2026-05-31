# ADR-004 kind Local Kubernetes

## Status

Approved.

## Context

이 project는 Kubernetes-oriented cloud-native architecture와 local-first development workflow를 목표로 합니다. Stage 1에서는 local Kubernetes 기준을 확정해야 Stage 2 infrastructure scaffold planning이 가능합니다.

## Decision

Local Kubernetes 환경은 `kind`를 기준으로 구성합니다.

PostgreSQL과 Redis는 local kind cluster 내부가 아니라 외부 local dependency로 구성합니다.

Stage 1에서는 Kubernetes manifest, Docker Compose, bootstrap script를 생성하지 않습니다.

## Consequences

- Stage 2 infrastructure scaffold는 kind를 primary local Kubernetes path로 사용합니다.
- PostgreSQL/Redis는 cluster 외부 dependency로 연결하는 방향을 기준으로 계획합니다.
- Docker Compose는 primary path가 아니며, 필요 시 dependency fallback으로만 별도 검토합니다.
- NGINX local 배치와 ingress/controller 관계는 Stage 2 scaffold readiness에서 구체화합니다.

## Source Artifact

- `.ai/architecture/local-infrastructure-strategy.md`

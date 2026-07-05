# Local Environment Validation Plan

## Artifact Metadata

- Artifact name: Local Environment Validation Plan.
- Artifact type: validation planning.
- Owning team: Infrastructure Team.
- Owning domain: Local Environment.
- Status: active.
- Related backlog: S2-004 Local Environment Validation Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2 scaffold가 local-first 환경에서 검증될 수 있도록 validation 기준을 정의합니다. 실제 script, Docker Compose, Kubernetes manifest, backend/frontend scaffold는 이 문서에서 생성하지 않습니다.

## Validation 목표

Local environment validation은 다음을 확인하기 위한 기준입니다.

- kind 기반 local Kubernetes 경로가 유효한가.
- PostgreSQL과 Redis external dependency 연결 기준이 명확한가.
- backend/frontend scaffold가 나중에 local에서 검증될 수 있는가.
- scaffold PR에서 어떤 command와 expected result를 요구할지 명확한가.
- reset/troubleshooting expectation이 문서화되어 있는가.

## Stage 2 확정 입력

- Local Kubernetes는 `kind`를 사용한다.
- PostgreSQL과 Redis는 kind cluster 외부 Docker container dependency로 계획한다.
- Docker Compose는 primary path가 아니다.
- Docker Compose file은 Stage 2에서 생성하지 않는다.
- Scripts는 Stage 2에서 생성하지 않고 계획만 작성한다.
- NGINX는 kind 내부 gateway workload 방향으로 계획한다.
- Kubernetes application manifest는 Stage 2 plan review 전 생성하지 않는다.

## Validation Scope

In scope:

- Tool availability validation.
- kind config validation.
- external PostgreSQL dependency validation.
- external Redis dependency validation.
- backend scaffold validation 후보.
- frontend scaffold validation 후보.
- local reset strategy 후보.
- troubleshooting expectation.

Out of scope:

- 실제 cluster 생성 script.
- 실제 dependency up/down script.
- Docker Compose file.
- Kubernetes application manifest.
- backend feature behavior validation.
- frontend feature behavior validation.
- Auth login/session behavior validation.

## Tool Availability Validation

Stage 2 local validation은 다음 도구의 availability check를 후보로 둡니다.

```text
docker --version
kind --version
kubectl version --client
node --version
npm --version
```

Expected result:

- 각 command가 성공적으로 version을 출력한다.
- 실패 시 setup prerequisite 문서 또는 troubleshooting으로 연결한다.

주의:

- 이 문서는 도구 설치를 수행하지 않는다.
- 설치 자동화 script는 Stage 2 범위가 아니다.

## kind Validation

kind validation 후보:

```text
kind version
kind create cluster --config infra/kind/cluster-config.yaml
kubectl cluster-info
kind delete cluster --name <cluster-name>
```

Expected result:

- kind CLI가 사용 가능하다.
- cluster config syntax가 유효하다.
- cluster 생성 후 kubectl client가 cluster context를 볼 수 있다.
- cluster 삭제가 가능하다.

주의:

- `infra/kind/cluster-config.yaml`은 Infrastructure Scaffold PR에서 생성될 수 있다.
- dry-run은 필수 검증이 아니며, syntax validation이 지원될 경우 optional로만 사용한다.
- Stage 2 planning 문서에서는 cluster를 생성하지 않는다.

## External PostgreSQL Validation

PostgreSQL은 kind cluster 외부 Docker container dependency로 계획합니다.

Validation 후보:

```text
docker run postgres image availability check
container starts
port is reachable from host
DATABASE_URL shape is documented
```

Expected result:

- PostgreSQL container가 local host에서 실행 가능하다.
- backend scaffold가 사용할 `DATABASE_URL` 형식이 문서화되어 있다.
- Prisma migration command가 실행될 수 있는 환경 조건이 문서화되어 있다.

금지:

- Stage 2에서 Prisma migration file 생성.
- Stage 2에서 User schema 생성.
- Stage 2에서 seed data 생성.
- Raw SQL 사용.

Resolved by Stage 2B PR-004:

- PostgreSQL container name: ai-commerce-postgres.
- PostgreSQL port: 5432.
- database name: ai_commerce.
- local username: ai_commerce.
- password: local-only value supplied by the developer.
- reset command: manual docker stop and docker rm commands documented in docs/local-validation/README.md.

## External Redis Validation

Redis는 kind cluster 외부 Docker container dependency로 계획합니다.

Validation 후보:

```text
docker run redis image availability check
container starts
port is reachable from host
REDIS_URL shape is documented
```

Expected result:

- Redis container가 local host에서 실행 가능하다.
- backend scaffold가 사용할 `REDIS_URL` 형식이 문서화되어 있다.
- Redis는 session management용 dependency로만 계획된다.

금지:

- Stage 2에서 Redis session store 구현.
- Redis key 생성.
- TTL policy implementation.
- cache/queue/event usage.

Resolved by Stage 2B PR-004:

- Redis container name: ai-commerce-redis.
- Redis port: 6379.
- local reset command: manual docker stop and docker rm commands documented in docs/local-validation/README.md.
- Redis persistence mode: disabled for scaffold validation.

## Backend Scaffold Validation 후보

Backend scaffold validation은 S2-001 Backend Scaffold Plan을 따릅니다.

후보 command:

```text
cd apps/backend
npm install
npm run build
npm run test
npm run lint
```

Expected result:

- NestJS scaffold가 build 가능하다.
- health endpoint scaffold가 compile된다.
- Auth behavior test는 존재하지 않는다.
- Prisma model/migration 없이 scaffold validation이 가능하다.

주의:

- `apps/backend`는 아직 생성하지 않는다.
- 실제 command는 Backend Scaffold PR에서 확정한다.

## Frontend Scaffold Validation 후보

Frontend scaffold validation은 S2-002 Frontend Scaffold Plan을 따릅니다.

후보 command:

```text
cd apps/frontend
npm install
npm run build
npm run test
npm run lint
```

Expected result:

- Vite + React + TypeScript scaffold가 build 가능하다.
- Auth UI implementation은 존재하지 않는다.
- Auth API client file은 존재하지 않는다.
- shared API client layer는 존재하지 않는다.

주의:

- `apps/frontend`는 아직 생성하지 않는다.
- 실제 command는 Frontend Scaffold PR에서 확정한다.

## Backend / Frontend Connectivity 후보

Stage 2 planning에서 connectivity는 후보 수준으로만 정의합니다.

후보:

- backend health endpoint reachable.
- frontend dev server starts.
- NGINX gateway routing expectation documented.

금지:

- Auth login flow validation.
- `/api/auth/login` behavior validation.
- session cookie validation.
- end-to-end Auth scenario.

Connectivity validation은 Stage 2 scaffold PR 이후 또는 Stage 3 readiness에서 구체화합니다.

## Local Reset Strategy 후보

Reset strategy는 Stage 2에서 다음 후보로 관리합니다.

PostgreSQL:

- stop/remove container.
- remove local volume.
- recreate database.
- rerun Prisma migration when migration exists in later stage.

Redis:

- stop/remove container.
- flush local Redis data.
- recreate container.

kind:

- delete cluster.
- recreate cluster from config.

주의:

- Stage 2에서는 reset script를 만들지 않는다.
- reset command는 Scaffold PR Plan 또는 후속 script plan에서 확정한다.

## Troubleshooting Expectations

Troubleshooting 문서는 다음 실패를 다뤄야 합니다.

- Docker daemon unavailable.
- kind unavailable.
- kubectl context mismatch.
- PostgreSQL port conflict.
- Redis port conflict.
- npm install failure.
- frontend/backend port conflict.
- Prisma connection failure.

Stage 2에서는 troubleshooting section을 scaffold README 후보로 정의하고, 실제 문서는 scaffold PR에서 작성합니다.

## PR Boundary

Local environment validation 관련 PR은 다음만 포함해야 합니다.

- validation plan.
- README candidate.
- expected command list.
- expected result list.

포함하면 안 되는 것:

- executable scripts.
- Docker Compose file.
- Kubernetes manifest.
- DB schema.
- seed data.
- feature behavior tests.

## Review 기준

Reviewer는 다음을 확인합니다.

- validation plan이 Stage 2 forbidden scope를 위반하지 않는다.
- PostgreSQL/Redis가 kind 내부 workload로 바뀌지 않는다.
- Docker Compose가 primary path로 도입되지 않는다.
- script나 manifest가 plan 없이 생성되지 않는다.
- Auth behavior validation이 Stage 2로 당겨지지 않는다.

## QA 기준

QA는 다음을 확인합니다.

- local validation expected result가 명확하다.
- failure case와 troubleshooting expectation이 있다.
- Stage 3 Auth behavior QA와 Stage 2 scaffold validation이 분리되어 있다.

## Completion Criteria

S2-004는 다음 조건을 만족하면 완료됩니다.

- kind validation 기준이 정의되어 있다.
- external PostgreSQL validation 기준이 정의되어 있다.
- external Redis validation 기준이 정의되어 있다.
- backend/frontend scaffold validation 후보가 정의되어 있다.
- local reset strategy 후보가 정의되어 있다.
- troubleshooting expectation이 정의되어 있다.
- 실제 script/manifest/compose는 생성하지 않았다.

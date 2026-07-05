# Scaffold PR Plan

## Artifact Metadata

- Artifact name: Scaffold PR Plan.
- Artifact type: PR planning.
- Owning team: PM / Orchestrator.
- Owning domain: Scaffold Integration Governance.
- Status: active.
- Related backlog: S2-006 Scaffold PR Plan.
- Related PR: TBD.
- Last updated: 2026-07-02.

## Stage 2 Phase Policy Reference

이 문서는 `.ai/scaffold/stage-2-phase-policy.md`를 따른다.

- 현재 문서 작성은 Stage 2A - Scaffold Readiness Planning에 속한다.
- 실제 scaffold 파일 생성은 Stage 2B - Scaffold Execution에서만 허용된다.

## 목적

이 문서는 Stage 2에서 실제 scaffold 파일을 생성할 경우 어떤 PR 단위로 나누고, 어떤 순서로 review/validation을 통과해야 하는지 정의합니다. 이 문서는 scaffold 파일을 생성하지 않습니다.

## Stage 2 Scaffold 원칙

- Scaffold PR은 feature implementation을 포함하지 않는다.
- Backend, frontend, infrastructure scaffold는 분리된 PR로 진행한다.
- 각 PR은 validation evidence를 포함한다.
- 각 PR은 forbidden scope를 명시한다.
- 각 PR은 artifact source of truth를 참조한다.
- Auth implementation은 Stage 3 전까지 금지한다.

## PR Dependency Order

권장 PR 순서:

```text
PR-001 Infrastructure base scaffold
  -> PR-002 Backend scaffold
  -> PR-003 Frontend scaffold
  -> PR-004 Local validation docs
  -> PR-005 CI validation scaffold
```

주의:

- 실제 PR 번호는 예시입니다.
- Backend와 frontend scaffold는 infrastructure base scaffold 이후 병렬화 가능하지만, 초기에는 순차 진행을 권장합니다.
- CI validation scaffold는 backend/frontend/infra scaffold 후보가 정리된 뒤 진행합니다.

## PR-001 Infrastructure Base Scaffold

Owner:

- Infrastructure Team.

Related artifact:

- `.ai/scaffold/infrastructure-scaffold-plan.md`
- `.ai/scaffold/local-environment-validation-plan.md`
- `.ai/architecture/adrs/ADR-004-kind-local-kubernetes.md`

Allowed scope:

- `infra/` directory skeleton.
- `infra/kind/cluster-config.yaml`.
- `infra/nginx/README.md`.
- `infra/kubernetes/README.md`.
- `infra/scripts/README.md`.
- external PostgreSQL/Redis dependency notes.

Forbidden scope:

- Kubernetes application manifest.
- Docker Compose file.
- executable script.
- backend/frontend code.
- PostgreSQL/Redis Kubernetes workload.
- NGINX Kubernetes workload.
- Auth gateway/rate limiting/service mesh config.

Required validation evidence:

- kind config syntax validation command and result.
- confirmation that no application manifest exists.
- confirmation that PostgreSQL/Redis are external dependency only.

Reviewers:

- Infrastructure Team.
- Backend Platform Team.
- Frontend Team.
- Reviewer Agent.

QA expectation:

- No behavior QA.
- Scaffold boundary and validation evidence review only.

## PR-002 Backend Scaffold

Owner:

- Backend Platform Team.

Related artifact:

- `.ai/scaffold/backend-scaffold-plan.md`
- `.ai/architecture/backend-architecture-plan.md`
- `.ai/domains/auth/auth-domain-contract.md`
- `.ai/domains/auth/auth-api-contract.md`

Allowed scope:

- `apps/backend` NestJS skeleton.
- `npm` package setup.
- TypeScript/Nest configuration.
- health endpoint.
- `src/auth/README.md` placeholder.
- platform boundary placeholders.
- `prisma/schema.prisma` with generator and datasource only.

Forbidden scope:

- Auth endpoint implementation.
- Auth service/controller/module implementation.
- User model.
- Prisma migration.
- Raw SQL.
- Redis session implementation.
- Cookie handling implementation.
- NGINX/Kubernetes config.

Required validation evidence:

- `npm install` or `npm ci` result.
- `npm run build` result.
- `npm run test` result.
- `npm run lint` result.
- confirmation that Prisma model/migration does not exist.
- confirmation that Auth implementation does not exist.

Reviewers:

- Backend Platform Team.
- Auth Team.
- Infrastructure Team.
- Reviewer Agent.

QA expectation:

- No Auth behavior QA.
- Health endpoint may be treated as scaffold smoke check only.

## PR-003 Frontend Scaffold

Owner:

- Frontend Team.

Related artifact:

- `.ai/scaffold/frontend-scaffold-plan.md`
- `.ai/architecture/frontend-architecture-plan.md`
- `.ai/domains/auth/auth-api-contract.md`

Allowed scope:

- `apps/frontend` Vite + React + TypeScript skeleton.
- `npm` package setup.
- React Router setup boundary.
- TanStack Query setup boundary.
- React Hook Form + Zod setup boundary.
- Tailwind CSS setup.
- `src/features/auth/README.md` placeholder.

Forbidden scope:

- Login UI implementation.
- Auth API client file.
- Auth hooks.
- Protected route implementation.
- session bootstrap implementation.
- shared API client layer.
- shared type package.
- generated API client.

Required validation evidence:

- `npm install` or `npm ci` result.
- `npm run build` result.
- `npm run test` result.
- `npm run lint` result.
- confirmation that Auth UI implementation does not exist.
- confirmation that shared API client layer does not exist.

Reviewers:

- Frontend Team.
- Auth Team.
- Backend Platform Team.
- Reviewer Agent.

QA expectation:

- No UI behavior QA.
- Build/lint/test validation only.

## PR-004 Local Validation Docs

Owner:

- Infrastructure Team.

Related artifact:

- `.ai/scaffold/local-environment-validation-plan.md`

Allowed scope:

- local validation README.
- tool prerequisite documentation.
- kind validation command documentation.
- external PostgreSQL/Redis validation documentation.
- local reset strategy documentation.
- troubleshooting documentation.

Forbidden scope:

- executable script.
- Docker Compose file.
- Kubernetes manifest.
- actual dependency bootstrap automation.
- feature behavior validation.

Required validation evidence:

- documentation includes expected commands.
- documentation includes expected results.
- documentation includes known failure cases.
- documentation keeps scripts as future work.

Reviewers:

- Infrastructure Team.
- Backend Platform Team.
- Frontend Team.
- QA Team.
- Reviewer Agent.

QA expectation:

- QA reviews clarity of expected results and troubleshooting paths.

## PR-005 CI Validation Scaffold

Owner:

- Platform Team.

Related artifact:

- `.ai/scaffold/ci-validation-plan.md`

Allowed scope:

- CI workflow file only after PR-001 through PR-004 scope is stable.
- backend scaffold validation job.
- frontend scaffold validation job.
- infrastructure scaffold validation job.
- artifact consistency validation job candidate.

Forbidden scope:

- Auth E2E workflow.
- deployment workflow.
- database migration execution.
- Redis session behavior validation.
- Docker Compose primary path.

Required validation evidence:

- CI job list.
- expected command list.
- owner mapping for failures.
- forbidden behavior validation not included.

Reviewers:

- Platform Team.
- Backend Platform Team.
- Frontend Team.
- Infrastructure Team.
- QA Team.
- Reviewer Agent.

QA expectation:

- QA confirms CI does not claim behavior readiness.
- QA confirms scaffold failure can become actionable issue.

## Merge Gate

Each scaffold PR must satisfy:

- PR template completed.
- Related scaffold plan linked.
- Validation evidence included.
- Forbidden scope checklist completed.
- Reviewer approval.
- QA review when validation expectation or troubleshooting docs are affected.

## Forbidden Scope Checklist

Every scaffold PR must explicitly confirm:

- No Auth implementation.
- No login UI.
- No Auth API client.
- No Prisma migration.
- No User model.
- No Raw SQL.
- No Redis session implementation.
- No Docker Compose primary path.
- No Kubernetes application manifest unless explicitly approved by the relevant scaffold plan.
- No shared package.
- No shared API client layer.

## Stage 2 Completion Dependency

Stage 2 Completion Review may begin when:

- Backend scaffold plan is active.
- Frontend scaffold plan is active.
- Infrastructure scaffold plan is active.
- Local environment validation plan is active.
- CI validation plan is active.
- This scaffold PR plan is active.

Actual scaffold file creation may begin only after PM / Orchestrator confirms the PR order and scope.

## Open Questions

Resolved by Stage 2B execution:

- PR-001 and PR-004 are separate PR units.
- CI workflow is created after infrastructure, backend, frontend, and local validation docs scaffolds.
- Artifact consistency starts as basic automated CI shell checks.
- kind cluster creation does not run in Stage 2B CI.

Still open for later stages:

- Whether kind cluster creation should be added to CI after infrastructure approval.
- Whether artifact consistency should become a dedicated validation tool.

These questions do not block Stage 2 planning, but must be resolved before actual scaffold PR execution.

## Completion Criteria

S2-006 is complete when:

- Backend scaffold PR unit is defined.
- Frontend scaffold PR unit is defined.
- Infrastructure scaffold PR unit is defined.
- Local validation PR unit is defined.
- CI validation PR unit is defined.
- PR dependency order is defined.
- Forbidden scope checklist is defined.

# Artifact Registry

## 목적

Artifact Registry는 `.ai` 아래에서 어떤 문서가 현재 source of truth인지 추적합니다. Agent는 대화 기억보다 이 registry와 각 artifact를 우선합니다.

## 상태 값

- draft: 작성 중이며 아직 운영 기준으로 고정되지 않음.
- approved draft: Stage 2 planning에 참조 가능하지만 일부 세부 결정은 남아 있음.
- active: 현재 운영 기준으로 사용.
- deprecated: 더 이상 기준으로 사용하지 않음.

## Core Artifacts

| Artifact | Type | Owner | Status | Purpose |
| --- | --- | --- | --- | --- |
| `.ai/README.md` | Entry point | PM / Orchestrator | active | AI 조직 운영 문서의 시작점. |
| `.ai/stage-roadmap.md` | Roadmap | PM / Orchestrator | active | Stage별 목표와 다음 작업 순서 정의. |
| `.ai/stage-1-architecture-planning-backlog.md` | Backlog | PM / Orchestrator | active | Stage 1 architecture planning 작업 목록과 실행 순서. |
| `.ai/stage-1-completion-review.md` | Stage review | PM / Orchestrator | active | Stage 1 완료 조건별 evidence와 Stage 2 진입 판단. |
| `.ai/stage-2-scaffold-readiness-backlog.md` | Backlog | PM / Orchestrator | active | Stage 2 scaffold readiness 작업 목록과 실행 순서. |
| `.ai/stage-2-completion-review.md` | Stage review | PM / Orchestrator | active | Stage 2A 완료 조건별 evidence와 Stage 2B 진입 판단. |
| `.ai/stage-2b-pr-001-infrastructure-base-scaffold-review.md` | Scaffold execution review | Infrastructure Team | active | Stage 2B PR-001 infrastructure base scaffold 범위와 validation evidence. |
| `.ai/stage-2b-pr-002-backend-scaffold-review.md` | Scaffold execution review | Backend Platform Team | active | Stage 2B PR-002 backend scaffold 범위와 validation evidence. |
| `.ai/scaffold/backend-scaffold-plan.md` | Scaffold plan | Backend Platform Team | active | Backend scaffold 허용 범위, 금지 범위, validation 기준. |
| `.ai/scaffold/frontend-scaffold-plan.md` | Scaffold plan | Frontend Team | active | Frontend scaffold 허용 범위, 금지 범위, validation 기준. |
| `.ai/scaffold/infrastructure-scaffold-plan.md` | Scaffold plan | Infrastructure Team | active | Infrastructure scaffold 허용 범위, 금지 범위, validation 기준. |
| `.ai/scaffold/local-environment-validation-plan.md` | Validation plan | Infrastructure Team | active | Local kind/external dependency/scaffold validation 기준. |
| `.ai/scaffold/ci-validation-plan.md` | Validation plan | Platform Team | active | Scaffold PR CI validation 후보와 범위 기준. |
| `.ai/scaffold/stage-2-phase-policy.md` | Scaffold policy | PM / Orchestrator | active | Stage 2A planning과 Stage 2B execution 경계 기준. |
| `.ai/scaffold/scaffold-pr-plan.md` | PR plan | PM / Orchestrator | active | Scaffold PR 단위, 순서, merge gate, forbidden scope 기준. |
| `.ai/architecture/monorepo-structure-decision.md` | Architecture decision | PM / Orchestrator | active | Stage 2 scaffold를 위한 repository top-level 구조 결정. |
| `.ai/architecture/backend-architecture-plan.md` | Architecture plan | Backend Platform Team | approved draft | NestJS backend boundary와 Auth session 중심 backend 계획. |
| `.ai/architecture/frontend-architecture-plan.md` | Architecture plan | Frontend Team | approved draft | React frontend feature boundary와 Auth integration 계획. |
| `.ai/architecture/local-infrastructure-strategy.md` | Infrastructure strategy | Infrastructure Team | approved draft | kind 기반 local infrastructure 방향. |
| `.ai/architecture/postgresql-migration-strategy.md` | Architecture strategy | Backend Platform Team | approved draft | PostgreSQL migration 기반 운영 전략. |
| `.ai/architecture/redis-usage-strategy.md` | Architecture strategy | Backend Platform Team | approved draft | Redis session management 중심 사용 전략. |
| `.ai/architecture/nginx-gateway-strategy.md` | Infrastructure strategy | Infrastructure Team | approved draft | NGINX reverse proxy/gateway 역할 전략. |
| `.ai/architecture/adr-backlog.md` | Architecture backlog | PM / Orchestrator | approved draft | Stage 1 architecture decision ADR 후보 목록. |
| `.ai/architecture/adrs/ADR-001-monorepo-structure.md` | ADR | PM / Orchestrator | active | Monorepo top-level 구조 결정. |
| `.ai/architecture/adrs/ADR-004-kind-local-kubernetes.md` | ADR | Infrastructure Team | active | kind 기반 local Kubernetes 결정. |
| `.ai/architecture/adrs/ADR-008-contract-as-domain-owned-artifact.md` | ADR | PM / Orchestrator | active | Contract를 domain-owned artifact로 관리하는 결정. |
| `.ai/workflows/workflow-entrypoint.md` | Workflow | PM / Orchestrator | active | 요청 유형 분류와 workflow routing. |
| `.ai/workflows/workstream-lifecycle.md` | Workflow | PM / Orchestrator | active | 요건 파악부터 최종 리뷰까지 공통 작업 생명주기. |
| `.ai/workflows/issue-management-workflow.md` | Workflow | PM / Orchestrator | active | Issue 생성, triage, closure 흐름. |
| `.ai/workflows/pr-workflow.md` | Workflow | PM / Orchestrator | active | PR 기반 협업과 merge gate. |
| `.ai/workflows/review-workflow.md` | Workflow | Reviewer Agent | active | Review 단계와 finding 기준. |
| `.ai/workflows/stage-validation-workflow.md` | Workflow | QA Team / Integration Team | active | Stage promotion 검증 기준. |
| `.ai/agents/pm-orchestrator-agent.md` | Agent | PM / Orchestrator | active | 최상위 orchestration 역할 정의. |
| `.ai/agents/team-agents.md` | Agent | PM / Orchestrator | active | Team Agent 역할과 처리팀 workstream 정의. |
| `.ai/agents/reviewer-agent.md` | Agent | Reviewer Agent | active | 독립 review 역할 정의. |
| `.ai/agents/qa-team.md` | Agent | QA Team | active | QA 역할과 failure 처리 기준. |
| `.ai/agents/minimum-operating-loops.md` | Agent workflow | PM / Orchestrator | active | Agent별 최소 운영 루프. |
| `.ai/domains/domain-ownership.md` | Ownership | PM / Orchestrator | active | 초기 domain owner와 boundary. |
| `.ai/domains/auth/auth-domain-contract.md` | Domain contract | Auth Team | approved draft | Auth domain 책임, 경계, session expectation. |
| `.ai/domains/auth/auth-api-contract.md` | API contract | Auth Team | approved draft | Auth first vertical slice API boundary. |
| `.ai/policies/architecture-policy.md` | Policy | PM / Orchestrator | active | Architecture 원칙과 boundary rule. |
| `.ai/policies/testing-policy.md` | Policy | QA Team | active | Test와 validation 기대치. |
| `.ai/policies/contract-artifact-policy.md` | Policy | PM / Orchestrator | active | Contract를 package가 아닌 domain-owned artifact로 관리하는 기준. |
| `.ai/policies/definition-of-ready.md` | Policy | PM / Orchestrator | active | 작업 시작 조건. |
| `.ai/policies/definition-of-done.md` | Policy | PM / Orchestrator | active | 작업 완료 조건. |
| `.ai/templates/artifact-template.md` | Template | PM / Orchestrator | active | Artifact 작성 기본 양식. |
| `.ai/templates/issue-template.md` | Template | PM / Orchestrator | active | Issue 작성 기본 양식. |
| `.ai/templates/pr-template.md` | Template | PM / Orchestrator | active | PR 작성 기본 양식. |

## Registry 갱신 규칙

새 artifact를 추가하거나 기존 artifact의 역할을 바꾸면 이 registry를 갱신해야 합니다.

갱신 시 확인할 항목:

- artifact path.
- artifact type.
- owner.
- status.
- purpose.
- deprecated artifact가 있다면 대체 artifact.

## Source of Truth 규칙

- 작업 시작 기준은 `.ai/README.md`와 `.ai/workflows/workflow-entrypoint.md`입니다.
- Stage 판단 기준은 `.ai/stage-roadmap.md`입니다.
- 작업 lifecycle 기준은 `.ai/workflows/workstream-lifecycle.md`입니다.
- Contract 관리 기준은 `.ai/policies/contract-artifact-policy.md`입니다.
- 시작 가능 여부는 `.ai/policies/definition-of-ready.md`입니다.
- 완료 가능 여부는 `.ai/policies/definition-of-done.md`입니다.
- artifact 목록 기준은 이 문서입니다.

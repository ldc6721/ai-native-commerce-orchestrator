# Artifact Registry

## 목적

Artifact Registry는 `.ai` 아래에서 어떤 문서가 현재 source of truth인지 추적합니다. Agent는 대화 기억보다 이 registry와 각 artifact를 우선합니다.

## 상태 값

- draft: 작성 중이며 아직 운영 기준으로 고정되지 않음.
- active: 현재 운영 기준으로 사용.
- deprecated: 더 이상 기준으로 사용하지 않음.

## Core Artifacts

| Artifact | Type | Owner | Status | Purpose |
| --- | --- | --- | --- | --- |
| `.ai/README.md` | Entry point | PM / Orchestrator | active | AI 조직 운영 문서의 시작점. |
| `.ai/stage-roadmap.md` | Roadmap | PM / Orchestrator | active | Stage별 목표와 다음 작업 순서 정의. |
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
| `.ai/policies/architecture-policy.md` | Policy | PM / Orchestrator | active | Architecture 원칙과 boundary rule. |
| `.ai/policies/testing-policy.md` | Policy | QA Team | active | Test와 validation 기대치. |
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
- 시작 가능 여부는 `.ai/policies/definition-of-ready.md`입니다.
- 완료 가능 여부는 `.ai/policies/definition-of-done.md`입니다.
- artifact 목록 기준은 이 문서입니다.

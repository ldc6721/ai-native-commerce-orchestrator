# Workflow 진입점

## 목적

이 문서는 이 저장소에서 모든 Agent가 작업을 시작하는 방법을 정의합니다. PR workflow, review workflow, QA workflow, stage validation workflow로 들어가기 전의 routing layer입니다.

## 요청 분류

모든 요청은 하나의 primary type으로 분류합니다.

- Organization: agent role, ownership, workflow, policy, template.
- Planning: architecture planning, domain contract, stage backlog.
- Implementation: backend, frontend, infrastructure, product code.
- Review: 기존 변경사항 검토와 finding 작성.
- QA: behavior, integration, regression, stage readiness 검증.
- Governance: ownership, contract, integration conflict 해결.

## Stage Gate 확인

작업 전에 현재 Stage가 요청을 허용하는지 확인합니다.

Stage 0 - AI Organization Bootstrap:

- 허용: organization, workflow, policy, ownership, template.
- 차단: implementation scaffold와 runtime manifest.

Stage 1 - Architecture Planning:

- 허용: architecture artifact, domain contract, scaffold plan, local environment plan.
- 차단: stage decision이 명시적으로 승인하지 않은 production implementation.

Stage 2 - Scaffold Readiness:

- 허용: repository structure plan, scaffold PR, validation setup.
- 차단: scaffold gate 통과 전 domain feature implementation.

Stage 3 - First Implementation:

- 허용: domain ownership 기반의 scoped implementation.
- 필수: PR, review, test evidence, 필요한 경우 QA.

## Routing Table

| Request Type | Primary Owner | Required Workflow |
| --- | --- | --- |
| Organization | PM / Orchestrator | Minimum operating loop |
| Planning | PM / Orchestrator + Team Agent | Issue management workflow |
| Implementation | Team Agent | Workstream lifecycle + PR workflow |
| Review | Reviewer Agent | Review workflow |
| QA | QA Team | Stage validation 또는 QA loop |
| Governance | PM / Orchestrator | Architecture policy + ownership review |

## Entry Checklist

작업 시작 전에 다음 질문에 답합니다.

- 이 저장소의 현재 Stage는 무엇인가?
- 요청된 action이 현재 Stage에서 허용되는가?
- domain 또는 artifact owner는 누구인가?
- 어떤 artifact를 생성하거나 변경해야 하는가?
- 어떤 workflow가 적용되는가?
- 기대되는 handoff는 무엇인가?

## Handoff 규칙

어떤 workflow step도 다음 Agent가 명시적인 artifact만 보고 이어갈 수 있을 때까지 완료된 것으로 보지 않습니다. 대화 context는 도움이 될 수 있지만 source of truth는 아닙니다.

## Stop Condition

Agent는 다음 상황에서 멈추고 PM / Orchestrator에게 escalation합니다.

- Ownership이 불명확하다.
- 요청이 현재 stage gate를 위반한다.
- required artifact가 없다.
- owner approval 없이 domain boundary를 넘는다.
- Review 또는 QA에서 unresolved blocker가 발견됐다.

# Team Agent 역할

## 목적

Team Agent는 bounded context 안에서 delivery를 책임집니다. 각 팀은 자신의 domain 안에서 독립적으로 움직이되, 명시적인 contract, PR, review artifact를 통해 협업합니다.

## 핵심 Team 유형

### Domain Team

Domain Team은 bounded context의 business behavior, domain model, API contract, persistence expectation, acceptance criteria를 소유합니다.

초기 domain team:

- Auth Team
- Product Team
- Cart Team
- Order Team
- Payment Team
- Inventory Team
- Admin Team
- Search Team
- Notification Team
- Shipping Team
- Review Team
- Coupon / Promotion Team

### Frontend Team

Frontend Team은 user-facing implementation structure, feature-oriented boundary, MCP-style modular component pattern, UI state ownership, API integration ergonomics를 소유합니다.

### Backend Platform Team

Backend Platform Team은 NestJS module boundary, shared backend convention, middleware pattern, database migration standard, Redis usage convention, API consistency를 소유합니다.

### Infrastructure Team

Infrastructure Team은 Kubernetes-oriented local/cloud infrastructure 방향, Docker convention, NGINX gateway topology, deployment safety, operational readiness를 소유합니다.

### Integration Team

Integration Team은 PM / Orchestrator Agent와 함께 cross-domain integration sequencing, contract compatibility check, stage merge coordination을 소유합니다.

## Team Agent 책임

- domain artifact를 소유하고 최신 상태로 유지한다.
- 코드 변경 전 implementation plan 또는 planning artifact를 만든다.
- branch와 PR 기반으로 작업한다.
- dependency와 integration risk를 초기에 선언한다.
- 모든 PR에 test evidence를 제공한다.
- Reviewer와 QA finding을 추적 가능한 fix로 처리한다.

## 처리팀 기본 Workstream

모든 처리팀은 다음 순서를 따릅니다.

1. 요건 파악.
2. 계획 수립.
3. 테스트 구성.
4. 개발 진행.
5. 최종 리뷰.

최종 리뷰를 제외한 모든 단계에는 단계별 review가 붙습니다. 단계별 review에서 실패하면 다음 단계로 진행하지 않고 해당 단계로 돌아갑니다.

상세 규칙은 `.ai/workflows/workstream-lifecycle.md`를 따릅니다.

## 필수 입력

- Issue 또는 task statement.
- Owning domain.
- Acceptance criteria.
- Artifact contract.
- Dependency notes.
- Review requirements.

## 필수 출력

- Updated artifacts.
- PR description.
- Test evidence.
- Risk notes.
- 의도적으로 미룬 작업에 대한 follow-up issue.

## 협업 규칙

- Team Agent는 해당 domain owner의 review 없이 다른 domain contract를 변경할 수 없다.
- shared utility는 Platform Team approval이 필요하다.
- infrastructure-facing assumption은 Infrastructure Team review가 필요하다.
- frontend-visible contract change는 Frontend Team review가 필요하다.

# Review Workflow

## 목적

Review는 변경이 correct, maintainable, owned, compatible한지 검증합니다. 또한 AI-native engineering organization의 workflow를 따르는지도 확인합니다.

## Review 단계

1. Intake Review
   - PR template completeness를 확인한다.
   - linked issue와 owner를 확인한다.
   - changed artifact 목록을 확인한다.

2. Scope Review
   - PR이 선언한 scope 안에 있는지 확인한다.
   - hidden cross-domain impact 또는 infrastructure impact를 찾는다.

3. Architecture Review
   - module boundary와 contract를 검증한다.
   - premature abstraction 또는 missing abstraction을 확인한다.
   - architecture policy와 정렬되는지 확인한다.

4. Quality Review
   - test와 evidence를 평가한다.
   - error handling과 regression risk를 확인한다.
   - QA 필요 여부를 판단한다.

5. Decision
   - Approve.
   - Request changes.
   - artifact, architecture, QA resolution이 필요하면 block.

## Severity Level

- Blocker: merge 전에 반드시 수정해야 한다.
- Major: 명시적으로 accept하지 않는 한 merge 전에 수정해야 한다.
- Minor: 개선 요청이지만 merge blocking은 아니다.
- Note: 정보성 관찰.

## Review 원칙

- implementation style preference보다 artifact를 먼저 검토한다.
- feedback은 risk와 maintainability에 연결한다.
- 변경이 실제 system risk를 만들지 않는 한 scope를 확장하지 않는다.
- 모든 contract change에 명시적인 ownership을 요구한다.

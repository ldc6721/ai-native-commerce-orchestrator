# Workstream Lifecycle

## 목적

이 문서는 모든 처리팀이 작업을 수행할 때 따르는 공통 lifecycle을 정의합니다. 각 팀은 별도의 하위 Agent 조직을 복제하지 않고, PM / Orchestrator가 조율하는 하나의 workstream으로 동작합니다.

핵심은 다음과 같습니다.

- 모든 작업은 동일한 lifecycle을 따른다.
- 각 단계는 명시적인 artifact를 남긴다.
- 최종 리뷰 전 단계에는 단계별 리뷰가 붙는다.
- 단계별 리뷰에서 실패하면 해당 단계로 돌아간다.
- 구현보다 요건, 계획, 테스트 설계가 먼저 안정화되어야 한다.

## 기본 단계

1. 요건 파악.
2. 계획 수립.
3. 테스트 구성.
4. 개발 진행.
5. 최종 리뷰.

## 전체 흐름

```text
요건 파악
  -> 요건 리뷰
    -> 실패 시 요건 파악으로 복귀

계획 수립
  -> 계획 리뷰
    -> 실패 시 계획 수립으로 복귀

테스트 구성
  -> 테스트 리뷰
    -> 실패 시 테스트 구성으로 복귀

개발 진행
  -> 개발 리뷰
    -> 실패 시 개발 진행으로 복귀

최종 리뷰
  -> 실패 원인에 따라 필요한 이전 단계로 복귀
```

## 1. 요건 파악

### 목적

작업이 해결해야 하는 문제, 사용자 가치, domain boundary, acceptance criteria를 명확히 합니다.

### 입력

- 사용자 요청.
- Issue 또는 task statement.
- 관련 domain ownership.
- 기존 artifact.
- PM / Orchestrator 지시.

### 출력

- 요건 요약.
- In scope / out of scope.
- Acceptance criteria 초안.
- 관련 domain과 owner.
- 불명확한 질문 목록.
- dependency와 risk 초안.

### 리뷰 기준

- 요건이 구현 가능한 단위로 분해되었는가.
- owner와 domain이 명확한가.
- acceptance criteria가 검증 가능한가.
- 숨은 cross-domain impact가 없는가.

리뷰 실패 시 요건 파악 단계로 돌아갑니다.

## 2. 계획 수립

### 목적

요건을 실행 가능한 작업 계획, artifact 변경 계획, PR 단위, handoff 계획으로 변환합니다.

### 입력

- 승인된 요건 요약.
- Acceptance criteria.
- Domain ownership.
- Architecture policy.
- Testing policy.

### 출력

- 작업 계획.
- 변경할 artifact 목록.
- 필요한 PR 또는 branch 전략.
- dependency order.
- risk와 mitigation.
- 필요한 review와 QA 조건.

### 리뷰 기준

- 계획이 현재 Stage gate를 위반하지 않는가.
- 작업 단위가 PR로 나누기 적절한가.
- artifact 변경 범위가 명확한가.
- 다른 team approval이 필요한 지점이 식별되었는가.

리뷰 실패 시 계획 수립 단계로 돌아갑니다.

## 3. 테스트 구성

### 목적

개발 전에 acceptance criteria를 검증할 수 있는 test strategy와 validation evidence 계획을 만듭니다.

### 입력

- 승인된 작업 계획.
- Acceptance criteria.
- Testing policy.
- QA requirement.
- Contract impact.

### 출력

- Test scenario.
- Validation checklist.
- 필요한 unit, integration, e2e, contract, migration, stage validation 계획.
- 테스트하지 않는 범위와 이유.
- QA handoff 조건.

### 리뷰 기준

- acceptance criteria와 test scenario가 연결되는가.
- risk가 높은 변경에 충분한 validation이 있는가.
- QA가 필요한 조건이 누락되지 않았는가.
- test gap이 명시되어 있는가.

리뷰 실패 시 테스트 구성 단계로 돌아갑니다.

## 4. 개발 진행

### 목적

승인된 요건, 계획, 테스트 구성을 기준으로 scoped implementation 또는 artifact 변경을 수행합니다.

현재 Stage 0에서는 개발 진행이 production code 생성을 의미하지 않습니다. Stage 0의 개발 진행은 workflow, policy, template, ownership artifact 변경으로 제한됩니다.

### 입력

- 승인된 요건.
- 승인된 계획.
- 승인된 테스트 구성.
- 관련 artifact template.
- domain contract.

### 출력

- 변경된 artifact 또는 구현 결과.
- PR-ready summary.
- 실행한 validation evidence.
- known gap.
- follow-up issue 후보.

### 리뷰 기준

- 구현 또는 artifact 변경이 승인된 scope 안에 있는가.
- 계획되지 않은 contract change가 없는가.
- validation evidence가 충분한가.
- reviewer와 QA에게 넘길 정보가 완전한가.

리뷰 실패 시 개발 진행 단계로 돌아갑니다.

## 5. 최종 리뷰

### 목적

전체 작업이 요건, 계획, 테스트 구성, 개발 결과와 일관되는지 최종 확인합니다.

### 입력

- 요건 산출물.
- 계획 산출물.
- 테스트 구성 산출물.
- 개발 결과.
- 단계별 리뷰 기록.
- PR 또는 artifact summary.

### 출력

- 최종 승인.
- 변경 요청.
- block decision.
- 필요한 이전 단계 복귀 지시.
- PM / Orchestrator handoff summary.

### 최종 리뷰 실패 시 복귀 규칙

- 요건 불일치: 요건 파악으로 복귀.
- 계획 오류: 계획 수립으로 복귀.
- 테스트 부족: 테스트 구성으로 복귀.
- 구현 오류: 개발 진행으로 복귀.
- ownership 또는 governance 문제: PM / Orchestrator에게 escalation.

## 완료 조건

Workstream은 다음 조건을 만족해야 완료됩니다.

- 다섯 단계가 모두 수행되었다.
- 최종 리뷰 전 각 단계별 리뷰가 통과되었다.
- 최종 리뷰가 approve 또는 approve with documented risk 상태이다.
- PM / Orchestrator에게 handoff summary가 전달되었다.
- 후속 작업이 있는 경우 issue 또는 artifact로 남았다.

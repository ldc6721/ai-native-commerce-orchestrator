# Definition of Done

## 목적

Definition of Done은 작업이 완료되었다고 선언할 수 있는 최소 조건을 정의합니다. 완료는 대화상 합의가 아니라 artifact, review, validation evidence로 판단합니다.

## 공통 Done 조건

모든 작업은 완료 전에 다음 조건을 만족해야 합니다.

- acceptance criteria가 충족되었다.
- 변경된 artifact가 명시되어 있다.
- owning team과 owning domain이 일치한다.
- required review가 완료되었다.
- validation evidence 또는 validation gap이 기록되었다.
- known risk와 deferred work가 문서화되어 있다.
- 후속 작업이 필요한 경우 issue 또는 artifact로 남았다.
- 다음 handoff 대상 또는 종료 사유가 명확하다.

## Workflow Done 조건

workflow 변경은 다음 조건을 추가로 만족해야 합니다.

- workflow entrypoint와 충돌하지 않는다.
- 어떤 request type 또는 stage에 적용되는지 명확하다.
- 되돌림 조건과 stop condition이 있다.
- 관련 template 또는 policy와 연결된다.

## Policy Done 조건

policy 변경은 다음 조건을 추가로 만족해야 합니다.

- 어떤 의사결정을 제한하거나 허용하는지 명확하다.
- 예외가 필요한 경우 escalation owner가 지정되어 있다.
- 다른 policy와 충돌하지 않는다.
- review 기준으로 사용할 수 있다.

## Template Done 조건

template 변경은 다음 조건을 추가로 만족해야 합니다.

- 필수 입력 항목이 빠져 있지 않다.
- owner, scope, acceptance criteria, validation, risk를 추적할 수 있다.
- PR 또는 review에서 사용할 수 있다.

## Architecture Planning Done 조건

architecture planning 작업은 다음 조건을 추가로 만족해야 합니다.

- decision과 non-decision이 구분되어 있다.
- trade-off가 기록되어 있다.
- 관련 domain과 platform impact가 명시되어 있다.
- ADR 작성 필요 여부가 결정되어 있다.

## Implementation Done 조건

implementation 작업은 다음 조건을 추가로 만족해야 합니다.

- PR workflow를 통과했다.
- test evidence가 있다.
- Reviewer approval이 있다.
- 필요한 경우 QA sign-off가 있다.
- contract change가 artifact에 반영되어 있다.

## Done 실패 처리

Done 조건을 만족하지 못하면 작업은 완료되지 않습니다. PM / Orchestrator는 실패 원인에 따라 다음 단계로 되돌립니다.

- 요건 불충분: 요건 파악으로 복귀.
- 계획 불충분: 계획 수립으로 복귀.
- validation 불충분: 테스트 구성으로 복귀.
- 결과 불충분: 개발 진행으로 복귀.
- ownership conflict: governance review로 escalation.

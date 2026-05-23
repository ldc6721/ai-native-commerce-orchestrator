# Definition of Ready

## 목적

Definition of Ready는 작업을 시작해도 되는 최소 조건을 정의합니다. 이 조건을 만족하지 못한 작업은 구현, scaffold, architecture planning으로 넘어가지 않습니다.

## 공통 Ready 조건

모든 작업은 시작 전에 다음 조건을 만족해야 합니다.

- 요청 유형이 분류되어 있다.
- 현재 Stage에서 허용되는 작업이다.
- owning team과 owning domain이 지정되어 있다.
- problem statement가 명확하다.
- in scope와 out of scope가 구분되어 있다.
- acceptance criteria가 검증 가능한 형태로 작성되어 있다.
- required artifact가 식별되어 있다.
- dependency와 blocker가 명시되어 있다.
- validation expectation이 정의되어 있다.
- risk level이 지정되어 있다.

## Stage 0 Ready 조건

Stage 0 작업은 다음 조건을 추가로 만족해야 합니다.

- 구현 code, scaffold, runtime manifest를 만들지 않는다.
- workflow, policy, ownership, template, registry 중 하나 이상을 개선한다.
- 변경 대상 artifact의 owner가 명확하다.
- 다음 Stage로 넘어가기 위한 의미가 있다.

## Stage 1 Ready 조건

Stage 1 architecture planning 작업은 다음 조건을 추가로 만족해야 합니다.

- 어떤 architecture decision을 다루는지 명확하다.
- 관련 ADR 필요 여부가 판단되어 있다.
- backend, frontend, infrastructure, domain 중 영향 범위가 지정되어 있다.
- scaffold 생성 여부가 아니라 scaffold 판단 기준을 다룬다.

## Stage 2 Ready 조건

Stage 2 scaffold readiness 작업은 다음 조건을 추가로 만족해야 합니다.

- scaffold 범위가 domain implementation과 분리되어 있다.
- validation plan이 존재한다.
- repository structure 영향이 명확하다.
- CI 또는 local validation 기대치가 정의되어 있다.

## Stage 3 Ready 조건

Stage 3 first implementation 작업은 다음 조건을 추가로 만족해야 합니다.

- 관련 domain contract가 active 또는 approved draft 상태이다.
- test strategy가 정의되어 있다.
- PR 단위가 작고 독립적이다.
- rollback 또는 recovery consideration이 있다.
- QA 필요 여부가 판단되어 있다.

## Ready 실패 처리

Ready 조건을 만족하지 못하면 PM / Orchestrator는 다음 중 하나를 선택합니다.

- issue를 보완하도록 되돌린다.
- workstream을 더 작은 issue로 분해한다.
- missing artifact를 먼저 만들도록 별도 issue를 생성한다.
- 현재 Stage에서 허용되지 않는 작업이면 보류한다.

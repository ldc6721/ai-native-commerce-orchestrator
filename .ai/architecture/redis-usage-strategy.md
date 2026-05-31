# Redis Usage Strategy

## Artifact Metadata

- Artifact name: Redis Usage Strategy.
- Artifact type: architecture strategy.
- Owning team: Backend Platform Team.
- Owning domain: Backend Platform.
- Status: approved draft.
- Related backlog: S1-007 Redis Usage Strategy.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 Redis의 초기 사용 범위를 session management 중심으로 제한하고, cache와 queue/event usage를 언제 허용할지 기준을 정의합니다.

## 핵심 결정

- Redis 초기 역할은 session management이다.
- Local Redis는 kind cluster 외부에 구성한다.
- Cache layer는 Stage 1 범위가 아니다.
- Queue/event usage는 future consideration이다.
- Stage 1에서는 Redis config나 runtime manifest를 생성하지 않는다.

## Session Management 원칙

- Session source of truth는 server-side Redis store이다.
- Client는 session identifier 또는 transport credential만 보유한다.
- Session transport는 cookie 기반으로 구성한다.
- Session payload는 frontend에 직접 노출하지 않는다.
- Logout은 Redis session invalidation과 연결된다.
- Expired session은 anonymous state로 처리 가능해야 한다.

## Key Naming 원칙

초기 후보:

```text
auth:session:{sessionId}
```

주의:

- 실제 key format은 Stage 2/3 implementation 전에 확정한다.
- user id, email 등 민감하거나 추적 가능한 정보는 key에 직접 노출하지 않는 방향을 우선한다.

## TTL 원칙

- 모든 session key는 TTL을 가져야 한다.
- TTL 값은 security, UX, QA scenario를 함께 고려해 결정한다.
- sliding expiration 여부는 아직 결정하지 않는다.
- TTL 변경은 Auth contract와 QA scenario에 영향을 준다.

## Failure Behavior

Redis unavailable 시 초기 기대:

- login은 실패할 수 있다.
- existing session validation은 실패하거나 anonymous 처리될 수 있다.
- failure behavior는 frontend UX와 QA scenario에 명시되어야 한다.
- silent auth bypass는 허용하지 않는다.

## Cache Layer 보류 기준

Cache 사용은 다음 조건 전까지 보류합니다.

- 명확한 read performance bottleneck이 있다.
- invalidation owner가 정의되어 있다.
- stale data 허용 범위가 정의되어 있다.
- QA scenario가 있다.

## Queue/Event 보류 기준

Queue/event usage는 다음 조건 전까지 보류합니다.

- async processing requirement가 명확하다.
- event ownership과 retry policy가 정의되어 있다.
- observability와 failure handling이 정의되어 있다.
- Redis를 queue로 사용할지 별도 broker를 사용할지 검토되어 있다.

## Stage 2 Scaffold 조건

Redis scaffold planning은 다음이 준비된 뒤 진행합니다.

- Auth domain contract가 작성되어 있다.
- Backend architecture plan이 작성되어 있다.
- Local infrastructure strategy가 작성되어 있다.
- session transport open question이 review되었다.

## Review 기준

- Redis usage가 session management를 넘어가지 않는다.
- cache/queue/event를 암묵적으로 도입하지 않는다.
- session failure behavior가 문서화되어 있다.
- Stage 1에서 Redis manifest/config를 만들지 않는다.

## Open Questions

- Session TTL.
- Sliding expiration.
- Session serialization format.
- External local Redis reset strategy.

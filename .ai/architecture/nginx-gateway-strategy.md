# NGINX Gateway Strategy

## Artifact Metadata

- Artifact name: NGINX Gateway Strategy.
- Artifact type: infrastructure strategy.
- Owning team: Infrastructure Team.
- Owning domain: Infrastructure.
- Status: approved draft.
- Related backlog: S1-008 NGINX Gateway Strategy.
- Related PR: TBD.
- Last updated: 2026-05-26.

## 목적

이 문서는 NGINX의 초기 역할을 정의합니다. Stage 1에서는 NGINX config, Kubernetes manifest, Docker image를 생성하지 않습니다.

## 핵심 결정

- NGINX는 초기에는 reverse proxy/gateway 후보로 둔다.
- Auth gateway, rate limiting, service mesh 역할은 future consideration이다.
- Frontend serving 여부는 Stage 2 scaffold readiness에서 결정한다.
- kind local environment와의 관계는 local infrastructure strategy와 함께 검토한다.
- Auth API routing prefix는 `/api/auth`로 둔다.

## 초기 역할 후보

NGINX가 Stage 2 이후 맡을 수 있는 역할:

- frontend static serving 후보.
- backend API reverse proxy 후보.
- local gateway endpoint 후보.
- path-based routing 후보.

Stage 1에서 확정하지 않는 역할:

- full API gateway policy enforcement.
- auth gateway.
- rate limiting.
- WAF.
- service mesh replacement.

## Routing Expectation 후보

초기 후보:

```text
/          -> frontend
/api/*        -> backend
/api/auth/*   -> backend auth endpoints
```

주의:

- Auth API contract는 `/api/auth/*` prefix를 따른다.
- Frontend/backend scaffold plan은 이 prefix를 기준으로 작성한다.

## Ingress 관계

- kind 환경에서 ingress controller를 사용할지 NGINX workload를 둘지는 Stage 2에서 결정한다.
- Stage 1에서는 NGINX가 ingress controller인지 app gateway인지 확정하지 않는다.
- 어떤 경우에도 routing source of truth는 infrastructure strategy와 gateway strategy에 남긴다.

## Security Considerations

- Auth session transport가 cookie라면 NGINX header/cookie forwarding 기준이 필요하다.
- TLS termination은 local Stage 2에서는 optional로 둔다.
- rate limiting과 brute-force protection은 Auth/security follow-up으로 분리한다.
- sensitive header logging은 금지 방향으로 검토한다.

## Stage 2 Scaffold 조건

NGINX scaffold planning은 다음이 준비된 뒤 진행합니다.

- Local infrastructure strategy가 작성되어 있다.
- Backend architecture plan이 작성되어 있다.
- Frontend architecture plan이 작성되어 있다.
- Auth API contract path가 review되었다.
- gateway role이 reverse proxy 수준인지 확정되어 있다.

## Review 기준

- Stage 1에서 NGINX config를 만들지 않는다.
- Auth gateway 같은 보안 기능을 암묵적으로 포함하지 않는다.
- frontend/backend routing expectation이 명시되어 있다.
- kind strategy와 충돌하지 않는다.

## Open Questions

- NGINX를 ingress controller로 사용할지.
- Local TLS 필요 여부.
- Frontend static serving 방식.
- NGINX를 ingress controller로 사용할지.
- Local TLS 필요 여부.
- Frontend static serving 방식.

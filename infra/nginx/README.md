# NGINX Gateway Boundary

## Purpose

This directory is reserved for future NGINX gateway planning and configuration.

Stage 2B PR-001 documents the boundary only. It does not create an NGINX Kubernetes workload, NGINX config, ingress rule, or gateway behavior.

## Current Direction

The expected future direction is an NGINX gateway workload inside the local kind cluster.

Future routing expectation:

- Auth API prefix: `/api/auth`.
- Frontend and backend routing must remain explicit.
- Auth implementation remains outside this scaffold.

## Forbidden In PR-001

- NGINX Kubernetes manifest.
- NGINX config file.
- Auth gateway behavior.
- Rate limiting configuration.
- TLS termination configuration.
- Service mesh configuration.

## Port Reservation

The kind cluster config reserves local host ports for future gateway work:

- `localhost:8080` -> cluster port `80`.
- `localhost:8443` -> cluster port `443`.

These mappings are reserved for future gateway validation only. No gateway workload exists in this stage.

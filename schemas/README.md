# Brother Eye Contracts

JSON Schema Draft 2020-12 é a source of truth inicial dos contratos interoperáveis.

## Layout

- `common/` — definitions compartilhadas (`$defs`, enums, Session State)
- `events/` — event envelope e Observation
- `assessment/` — SkillEvidence e EvidenceGroup
- `curriculum/` — Skill
- `rpc/` — JSON-RPC 2.0 Desktop ↔ Core
- `examples/` — fixtures válidos para validação

## Versionamento

`schema_version` versiona o payload.

`VERSION` versiona o conjunto de contracts.

Breaking change exige revisão explícita e nova versão. Não fazer drift silencioso.

## Regras

- generated types podem ser adicionados por linguagem quando necessários;
- não duplicar enums manualmente sem teste de compatibilidade;
- producers e consumers validam boundary data;
- contratos são independentes de transporte quando possível;
- RPC é JSON-RPC 2.0;
- timestamps persistidos em UTC / ISO 8601;
- IDs aceitam UUIDv7/ULID futuros sem acoplar o schema a uma library.

# ADR-007 — Burp Montoya API for Structured HTTP Telemetry

Status: ACCEPTED  
Date: 2026-09-07

## Context

O vertical slice V1 é Web + HTTP + Identity + Authorization + Evidence. Observar Burp só por screenshot é ambíguo. O produto precisa de telemetria estruturada de request/response sem transformar a extensão em executor de pentest.

## Decision

Criar **Brother Eye Burp Extension** com **Java + Montoya API**.

A extensão é **telemetry-only**. Não executa pentest autonomamente.

Captura estruturada relevante:

- request;
- response;
- tool source;
- proxy context;
- scope;
- correlation data;
- WebSocket quando necessário futuramente.

Normalizar method, URL, host, port, protocol, headers sanitizados, body como artifact ref, status, timing quando disponível e correlação de request.

Transporte V1: conexão **loopback autenticada** da extensão para o Adapter Gateway do Core (WebSocket em `127.0.0.1` com porta efêmera).

## Alternatives Considered

- **Screen-only Burp observation:** alta ambiguidade, má evidence, frágil para assessment.
- **Burp legacy API:** inferior ao Montoya para HTTP handlers, tool source e manutenção.
- **Browser extension first:** não cobre Repeater/Proxy/tool source do Burp.
- **Proxy próprio do Brother Eye:** reimplementa o que o aluno já usa operacionalmente.

## Consequences

Prós:

- verdade técnica estruturada;
- baixa ambiguidade;
- melhor evidence;
- correlação request/response e tool source.

Tradeoffs:

- extensão Java separada;
- compatibilidade da Burp API;
- pairing e reconnect;
- volume de dados a sanitizar e referenciar.

## Validation

Spike 4 deve provar:

- pairing;
- Proxy request;
- response;
- tool source;
- scope;
- reconnect;
- event serialization.

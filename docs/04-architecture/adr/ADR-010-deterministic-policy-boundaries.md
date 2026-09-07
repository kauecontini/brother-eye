# ADR-010 — Deterministic Authority Boundaries Around Generative Models

Status: ACCEPTED  
Date: 2026-09-07

## Context

Modelos generativos são úteis para linguagem, interpretação semântica e rascunhos de classificação. Eles não são auditáveis o suficiente para mandar em scope, score, evidence, promoção ou ação no OS. Sem fronteiras determinísticas, o Brother Eye vira agente autônomo com pedagogia e safety frágeis.

## Decision

Output de modelo/Hermes é **proposta**, nunca autoridade.

O Core determinístico mantém autoridade sobre:

- Scope;
- Safety STOP;
- Session Mode;
- max allowed Hint Level;
- finding state transitions;
- evidence acceptance;
- score arithmetic;
- promotion gates;
- Privacy Shutter;
- assessment integrity.

Hermes/modelo pode realizar:

- interpretação semântica;
- explanation;
- perguntas socráticas;
- wording do Tutor;
- draft classification do Assessor.

Pipeline do Tutor:

```text
Trigger
→ Policy
→ Allowed Intervention
→ Hermes
→ Output Validator
→ learner
```

A Policy Engine é deterministic-first. O modelo não escolhe o próprio poder. O Output Validator recusa type/hint/mode/action/scope inválidos. Em Exam, geração de Tutor fica desabilitada (exceto mensagens de scope/safety).

Pipeline de Assessment:

```text
Observation Window
→ Assessor
→ SkillEvidenceDraft
→ Deterministic Validator
→ Human Review when needed
→ Ledger
```

SkillEvidenceDraft não altera o Learner Model diretamente. Scoring é aritmética determinística. Sem evidence aceita, não há score oficial.

Invariantes:

- no score without evidence;
- no model OS mutation;
- no model scope override;
- no Tutor answer leakage in Exam.

## Alternatives Considered

- **Monolithic AI agent:** o modelo executa e avalia o próprio trabalho; incompatível com ensino e auditabilidade.
- **Prompt-only safety:** prompt injection e drift quebram scope/safety.
- **LLM-controlled scoring:** scores irreproduzíveis e inexplicáveis.
- **LLM-controlled computer use:** o Tutor deixa de ser tutor e passa a operar o OS.

## Consequences

Prós:

- auditability;
- reproducibility;
- safety;
- controle pedagógico;
- model replaceability.

Tradeoffs:

- mais domain engineering;
- policy precisa ser mantida;
- o modelo pode ter uma boa ideia bloqueada por regras conservadoras.

## Validation

- testes determinísticos de policy/scoring;
- prompt injection;
- tentativas de scope bypass;
- recompute de score = 100%;
- isolamento de Exam;
- negação de mutation Cua;
- validação de schema de output.

Qualquer violação das invariantes é bloqueio de release, não débito.

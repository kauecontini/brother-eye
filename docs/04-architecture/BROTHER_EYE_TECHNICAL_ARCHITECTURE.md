# Brother Eye — Technical Architecture

**Documento:** `BROTHER_EYE_TECHNICAL_ARCHITECTURE.md`  
**Status:** Draft v0.1  
**Data da pesquisa técnica:** 2026-09-06

**Dependências de produto:**
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`
- `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`
- `BROTHER_EYE_CURRICULUM_V0.1.md`
- `BROTHER_EYE_STUDENT_EXPERIENCE_AND_UX.md`
- `BROTHER_EYE_VISUAL_DESIGN_SYSTEM.md`
- `BROTHER_EYE_V1_SCOPE_AND_ROADMAP.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento transforma os requisitos de produto do Brother Eye em uma arquitetura técnica implementável.

Ele define:

- aplicação desktop;
- frontend;
- component foundation;
- processo local principal;
- Brother Eye Core;
- papel exato do Hermes Agent;
- integração com modelos;
- camada de observação;
- integração com Burp Suite;
- uso de accessibility tree e screenshots;
- Session State;
- event model;
- Tutor Engine;
- Assessment Engine;
- Learner Model;
- Evidence Vault;
- Curriculum runtime;
- lab runtime;
- persistência;
- privacy;
- segurança;
- replay;
- debugging;
- testing;
- packaging;
- extensibilidade;
- limites técnicos do V1.

---

# 2. Objetivo arquitetural

A arquitetura deve tornar possível o seguinte loop:

```text
Aluno executa
↓
Observer captura fatos
↓
Brother Eye normaliza estado
↓
Policy Engine decide silêncio/intervenção
↓
Hermes gera conteúdo pedagógico dentro dos limites
↓
Aluno responde/executa
↓
Evidence é produzida
↓
Assessor classifica evidence
↓
Scoring Engine atualiza Learner Model
↓
Tutor adapta scaffolding
```

O LLM não deve ocupar o centro desse diagrama.

---

# 3. Regra arquitetural principal

> **Hermes e os modelos geram raciocínio e linguagem; Brother Eye mantém autoridade sobre estado, pedagogia, evidence, scoring, scope e segurança.**

Brother Eye não será uma grande conversa LLM com plugins.

---

# 4. Arquitetura escolhida — resumo

V1:

```text
Desktop Shell
Tauri 2
    │
    ├── React + TypeScript + Vite
    ├── Tailwind CSS
    ├── shadcn/ui
    │
    └── Secure Native Bridge
            │
            ▼
Brother Eye Core
Python / asyncio
    │
    ├── Session Orchestrator
    ├── Observation Broker
    ├── Tutor Policy Engine
    ├── Assessment Engine
    ├── Learner Model
    ├── Curriculum Service
    ├── Evidence Service
    ├── Lab Manager
    └── Adapter Gateway
            │
            ├──────── Hermes Agent Runtime
            │         JSON-RPC / WebSocket
            │
            ├──────── Cua Driver
            │         read-only observation
            │
            ├──────── Burp Extension
            │         Montoya API
            │
            └──────── Local Labs
                      Docker
```

---

# 5. Decisão: aplicação standalone

Brother Eye será um produto desktop próprio.

NÃO será, no V1:

- uma página dentro do Hermes Desktop;
- um Hermes Desktop plugin;
- uma skin do Hermes;
- uma extensão do Burp que contém o produto inteiro;
- um web app que depende de browser para observar desktop.

---

# 6. Papel do Hermes Desktop

Hermes Desktop serve como referência técnica e ferramenta de desenvolvimento, mas não como shell principal do Brother Eye.

Motivos:

- Brother Eye precisa de identidade própria;
- UX própria;
- lifecycle próprio;
- privacy controls próprios;
- session semantics próprias;
- upgrade control próprio.

---

# 7. Por que não construir Brother Eye como Hermes Desktop Plugin

O Desktop Plugin SDK do Hermes é poderoso e seria útil para protótipos.

Mas o produto ficaria:

- acoplado ao release cycle do Hermes Desktop;
- limitado pelo shell e layout do Hermes;
- dependente de APIs de plugin;
- mais difícil de distribuir como produto independente.

Além disso, plugins carregados possuem ampla autoridade dentro do renderer do Hermes.

Decisão:

> usar Hermes como runtime, não como produto-host.

---

# 8. Desktop shell escolhido: Tauri 2

O V1 utilizará:

> **Tauri 2**

como desktop shell.

---

# 9. Por que Tauri 2

Razões:

- desktop real;
- Windows/macOS/Linux;
- frontend web moderno;
- bundle pequeno;
- system WebView;
- Rust no privileged core;
- capability system;
- permission scoping;
- sidecar support;
- multi-window;
- always-on-top window para HUD;
- IPC explícito entre renderer e native core.

---

# 10. Electron — decisão

Electron não é escolhido para o shell principal.

Ele permanece fallback técnico caso Tauri bloqueie um requisito crítico não solucionável.

---

# 11. Por que não Electron agora

Electron oferece excelente ergonomia e já é usado pelo Hermes Desktop.

Porém, no Brother Eye:

- não precisamos embutir Chromium próprio;
- o Agent Runtime é separado;
- Tauri fornece boundary de capabilities mais explícita;
- menor footprint é desejável;
- o renderer não precisa de Node.

---

# 12. Tauri security posture

Renderer não terá acesso direto a:

- shell arbitrário;
- filesystem arbitrário;
- subprocess;
- secrets;
- Hermes credentials;
- Evidence Vault raw;
- OS APIs não explicitamente necessárias.

Toda capacidade privilegiada passa pelo Rust core.

---

# 13. Tauri capabilities

Utilizar capabilities mínimas por window.

Exemplo conceitual:

```text
main window
- app state
- safe file picker
- approved commands

HUD
- session read state
- hint command
- observation pause
- no arbitrary shell
```

---

# 14. No shell API in renderer

Mesmo que Tauri suporte shell plugin:

> o frontend não recebe permissão genérica para executar processos.

Process lifecycle será controlado pelo Rust core.

---

# 15. Process Supervisor

O Tauri/Rust core será responsável por:

- iniciar Brother Eye Core;
- monitorar health;
- iniciar/parar Hermes Runtime;
- cleanup;
- restart controlado;
- receber crash status;
- bloquear processos órfãos.

---

# 16. Frontend escolhido

V1:

```text
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
```

---

# 17. React

React é escolhido pela:

- maturidade;
- ecosystem;
- compatibilidade direta com shadcn/ui;
- boa ergonomia para UI de estado denso;
- tooling amplo.

---

# 18. Vite

Tauri será usado como SPA estática.

Vite é o bundler/dev server preferencial.

Não há necessidade de SSR no app desktop.

---

# 19. Tailwind CSS

Fica formalmente adotado no Technical Architecture.

Motivos:

- compatibilidade natural com shadcn/ui;
- tokens;
- component composition;
- velocidade de implementação;
- manutenção simples de UI técnica.

---

# 20. shadcn/ui

Fica formalmente adotado como component foundation.

Implementação inicial:

> shadcn/ui com primitives atuais suportadas pelo projeto.

A arquitetura não depende de uma abstração fechada de component library.

O código dos componentes utilizados permanece sob controle do Brother Eye.

---

# 21. Base UI / Radix

Para novos componentes, seguir o default atual do shadcn/ui quando estável.

No momento da implementação, a preferência inicial é:

> **Base UI**, atual default do shadcn/ui.

Radix permanece aceitável quando houver melhor compatibilidade ou maturidade para um componente específico.

Não misturar primitives arbitrariamente sem justificativa.

---

# 22. Design tokens

Source of truth visual:

```text
CSS variables
+
semantic Tailwind tokens
```

Exemplos:

```text
--surface-canvas
--surface-panel
--text-primary
--border-subtle
--semantic-warning
--finding-candidate
--assessment-active
--privacy-paused
```

---

# 23. Frontend server state

Utilizar:

> **TanStack Query**

para dados vindos do Brother Eye Core.

---

# 24. Frontend local state

Estado puramente visual pode usar:

- React state;
- Context;
- Zustand quando o compartilhamento justificar.

Não utilizar Redux no V1.

---

# 25. Domain state não vive no frontend

Frontend NÃO é source of truth para:

- session;
- hypothesis;
- finding;
- evidence;
- mastery;
- assessment.

Esses estados pertencem ao Brother Eye Core.

---

# 26. Brother Eye Core

O domínio principal será implementado como serviço local em:

> **Python**

com arquitetura assíncrona.

---

# 27. Por que Python

- integração natural com Hermes;
- ecossistema de IA;
- schemas;
- parsing;
- async I/O;
- rapidez de desenvolvimento;
- facilidade de experimentação pedagógica;
- tests rápidos.

---

# 28. Versão Python

Usar versão compatível com a release do Hermes fixada no projeto.

Não escolher uma versão de Python incompatível apenas por ser a mais nova.

---

# 29. Brother Eye Core runtime

Core será um processo separado do renderer.

Ele NÃO será importado pelo frontend.

---

# 30. Comunicação Desktop → Core

Padrão:

> **JSON-RPC 2.0 sobre stdio controlado pelo Tauri/Rust core**

O renderer fala com Rust.

Rust fala com Brother Eye Core.

---

# 31. Por que stdio entre shell e core

- sem porta local necessária para UI;
- boundary claro;
- fácil supervisão de processo;
- cleanup simples;
- fácil capturar logs;
- renderer não vê credentials;
- menor superfície de ataque local.

---

# 32. Streaming Core → UI

Brother Eye Core envia:

- JSON-RPC notifications;
- domain events.

Rust traduz para Tauri events tipados.

---

# 33. Binary artifacts

Não trafegar screenshot/request body grande em JSON-RPC quando evitável.

Usar:

- artifact reference;
- secure file handle;
- content hash.

---

# 34. Brother Eye Core modules

```text
core/
├── session
├── observation
├── policy
├── tutor
├── assessment
├── learner
├── curriculum
├── evidence
├── labs
├── adapters
├── privacy
├── persistence
├── models
└── replay
```

---

# 35. Session Orchestrator

Responsável por:

- lifecycle;
- objective;
- mode;
- scope;
- skills;
- adapter state;
- observation state;
- Tutor state;
- current hypotheses;
- finding states.

---

# 36. Session lifecycle

```text
CREATED
READY
ACTIVE
PAUSED
DEGRADED
ENDING
COMPLETED
INVALIDATED
```

---

# 37. Session is explicit domain object

Não é uma Hermes chat session.

Uma Brother Eye Session pode usar:

- uma ou mais Hermes sessions;
- zero ou mais assessment calls;
- múltiplos adapters.

---

# 38. Hermes Agent — papel oficial

Hermes será:

> **Agent Runtime e Model Runtime do Brother Eye.**

Responsabilidades:

- provider abstraction;
- model invocation;
- streaming;
- tool protocol;
- prompt lifecycle;
- context compression;
- model switching;
- plugin/MCP integration;
- inference session management.

---

# 39. Hermes NÃO será source of truth

Hermes não mantém autoridade sobre:

- learner level;
- scoring;
- promotion;
- evidence ledger;
- scope;
- finding validity;
- intervention permission.

---

# 40. Hermes integration protocol

Utilizar interface programática pública do Hermes.

Preferência V1:

> **TUI Gateway JSON-RPC / WebSocket através de `hermes serve`**

Brother Eye não deve depender de chamadas a módulos Python internos não documentados.

---

# 41. Hermes managed runtime

Brother Eye deve administrar uma instalação própria do Hermes.

Não depender por padrão de:

`hermes` já instalado globalmente.

---

# 42. Hermes version pinning

Toda release Brother Eye fixa:

- Hermes version;
- protocol compatibility;
- expected tool behavior.

Nunca usar `latest` implicitamente em produção.

---

# 43. Hermes runtime location

Runtime fica em diretório privado do app.

Conceitualmente:

```text
BrotherEye/
└── runtimes/
    └── hermes/
```

---

# 44. Hermes first-run bootstrap

Processo:

```text
Check managed runtime
↓
Install/repair pinned version
↓
Run health check
↓
Start local serve
↓
Validate protocol
```

---

# 45. Hermes binding

Por default:

`127.0.0.1`

Nunca:

`0.0.0.0`

no desktop V1.

---

# 46. Local Hermes authentication

Mesmo em loopback:

- usar sessão/token interno quando suportado;
- manter endpoint não exposto ao renderer;
- limitar lifecycle ao app.

---

# 47. Hermes profiles/sessions

Separar semanticamente:

```text
Tutor Session
Assessor Session
```

Não compartilhar conversation history diretamente.

---

# 48. Tutor Hermes toolset

O Tutor não recebe ferramentas ofensivas.

Tool surface permitida:

```text
Brother Eye read-only context tools
Curriculum lookup
Learner state lookup
Observation lookup
Evidence summary lookup
```

---

# 49. Assessor Hermes toolset

Ainda menor:

```text
Assessment context
Observation window
Rubric lookup
Instructor Key subset
Evidence provenance lookup
```

Sem:

- computer control;
- terminal;
- browser actions;
- file mutation.

---

# 50. No model-driven OS control

O Tutor LLM NÃO recebe:

`computer_use`

como ferramenta operacional.

---

# 51. Razão

Mesmo que Hermes suporte computer control, o Brother Eye é Tutor.

Observation e action são coisas diferentes.

---

# 52. Cua Driver

Brother Eye utilizará:

> **cua-driver como backend cross-platform de accessibility/screenshot observation.**

É a mesma tecnologia subjacente ao computer-use do Hermes.

---

# 53. Cua access mode

Brother Eye Observation Service expõe somente operações de leitura.

Subset desejado:

```text
capture
list_apps
health_report
```

Nenhuma ação de:

- click;
- type;
- key;
- drag;
- scroll.

---

# 54. Enforcement

Esse boundary deve existir em código.

Não depender apenas de prompt.

---

# 55. Read-only Cua Adapter

Criar adapter Brother Eye que:

- inicia/descobre cua-driver;
- usa MCP;
- só implementa métodos permitidos;
- rejeita qualquer action mutativa.

---

# 56. Cua capture modes

Preferência:

```text
AX first
↓
SOM/vision when needed
```

---

# 57. Accessibility-first

Accessibility tree custa menos e é mais estruturada.

Screenshot entra quando:

- conteúdo visual importa;
- tree insuficiente;
- app não expõe estrutura suficiente.

---

# 58. No continuous screen recording

V1 não grava vídeo continuamente.

Capture é:

- event-driven;
- contextual;
- bounded.

---

# 59. Observation triggers

Exemplos:

- app/window change;
- Tutor requests additional context;
- stuck detector needs context;
- evidence checkpoint;
- student asks “o que você viu?”;
- structured event needs visual correlation.

---

# 60. Observation allowlist

Core mantém:

```text
AllowedApp
AllowedWindow
BlockedApp
```

Capture fora da allowlist é recusado.

---

# 61. Privacy Shutter enforcement

Privacy Shutter deve desligar captura no Observer.

Não apenas esconder UI.

---

# 62. Capture indicator

O shell recebe state do Observer e exibe:

```text
ACTIVE
PAUSED
DEGRADED
```

---

# 63. Observation Broker

Todas as fontes passam por um broker comum.

---

# 64. Observation sources V1

Prioridade:

```text
1. Burp structured events
2. Cua accessibility
3. Cua screenshot
4. student explicit reasoning
5. session metadata
```

---

# 65. Source confidence

Cada observation carrega:

```text
source
source_confidence
classification_confidence
```

---

# 66. Observation envelope

```yaml
event_id: "01..."
schema_version: 1
session_id: "..."
occurred_at: "..."
received_at: "..."

source:
  type: "burp"
  instance_id: "..."

scope:
  status: "in_scope"

payload:
  type: "http.response"
  data: {}

artifact_refs: []

privacy:
  redaction_status: "sanitized"
```

---

# 67. Append-only event ledger

Raw normalized events são append-only.

Não reescrever história de sessão.

---

# 68. Mutable projections

Para performance, manter projections:

```text
CurrentSessionState
CurrentHypotheses
CurrentFindings
CurrentEvidenceCompleteness
CurrentLearnerSnapshot
```

Podem ser reconstruídas do ledger quando necessário.

---

# 69. Event bus V1

Não usar:

- Kafka;
- NATS;
- Redis Streams.

V1 é single-device.

---

# 70. Event dispatch

Usar:

> in-process asyncio event bus

com persistência antes/depois conforme criticidade.

---

# 71. Future broker compatibility

Event envelope não deve depender do transporte.

V2 pode migrar para broker se houver necessidade real.

---

# 72. Burp Suite adapter

V1 possui extensão dedicada:

> **Brother Eye Burp Extension**

---

# 73. Tecnologia Burp Extension

Usar:

> **Java + Montoya API**

---

# 74. Por que Montoya

Permite observar programaticamente:

- HTTP;
- Proxy;
- requests;
- responses;
- WebSockets;
- tool source;
- scope;
- history.

---

# 75. Burp Extension boundary

Extensão é:

> telemetry adapter.

NÃO é executor autônomo.

---

# 76. Burp Extension V1 events

Emitir:

```text
http.request
http.response
proxy.intercept
repeater.activity where observable
websocket.message optional
scope.state
```

---

# 77. Global HTTP handler

Quando adequado, usar Montoya HTTP handlers para observar requests/responses originadas por ferramentas do Burp.

Tool source deve ser preservada.

---

# 78. Proxy handlers

Proxy-specific handlers podem adicionar contexto de intercept.

---

# 79. Burp event content

Normalizar:

- method;
- URL;
- host;
- port;
- protocol;
- headers sanitized;
- body artifact ref;
- status;
- content type;
- timing when available;
- Burp tool source;
- request correlation.

---

# 80. Burp adapter transport

Burp Extension conecta outbound ao Brother Eye Core.

V1:

> authenticated WebSocket em loopback.

---

# 81. Adapter server

Brother Eye Core abre endpoint temporário:

```text
127.0.0.1:<ephemeral-port>
```

---

# 82. Adapter authentication

Cada run possui token aleatório de alta entropia.

Burp extension faz pairing.

---

# 83. Pairing UX

Primeira conexão:

```text
Brother Eye
→ Pair Burp
→ one-time token / local handshake
```

Após pairing, secret fica em storage local apropriado.

---

# 84. Burp fail-closed scope filtering

Eventos fora de scope:

- não entram no Tutor context;
- não entram no Assessment;
- podem registrar somente metadata mínima de rejected event.

---

# 85. Browser observation V1

Não criar Browser Extension própria no primeiro milestone.

---

# 86. Browser context

V1 obtém:

- app/window context via Cua;
- HTTP structured data via Burp.

Isso é suficiente para o vertical slice inicial.

---

# 87. Chrome DevTools Protocol

CDP permanece adapter futuro opcional.

Útil para:

- DOM;
- network;
- console;
- navigation.

Mas não é launch blocker.

---

# 88. Por que não CDP obrigatório

Exigiria:

- browser launch configuration;
- debugging port;
- dedicated profile;
- additional permissions.

Burp já fornece a camada HTTP relevante no V1.

---

# 89. Terminal observation V1

Terminal é secondary source.

V1 pode usar:

- accessibility;
- screenshot;
- explicit student paste/input.

---

# 90. Structured terminal adapter

Defer para V1.1 caso evidence mostre necessidade.

---

# 91. Postman adapter

Defer inicialmente.

API Transfer pode usar:

- Burp;
- browser;
- curl.

---

# 92. Adapter architecture

Interface:

```text
Adapter
├── connect()
├── health()
├── events()
├── scope()
└── close()
```

---

# 93. Adapter capability declaration

Cada adapter declara:

```text
structured_http
screen_context
terminal_io
tool_identity
scope_awareness
```

---

# 94. Observation fusion

Observation Broker correlaciona eventos por:

- timestamp;
- request fingerprint;
- session;
- app;
- identity context;
- artifact hash.

---

# 95. No giant multimodal prompt

Não enviar tudo para modelo.

---

# 96. Observation Window

Core cria janelas semânticas.

Exemplo:

```text
Hypothesis
→ request baseline
→ modified request
→ response
→ student interpretation
```

---

# 97. Observation summarization

Structured first.

LLM summarization apenas quando necessário.

---

# 98. Session State

Source of truth estruturado.

Campos conceituais:

```text
session
mode
scope
objective
subobjective
skills
active apps
identity contexts
hypotheses
tests
findings
evidence
open questions
assistance
misconceptions
observation health
```

---

# 99. Session State não é prompt

É domain object.

---

# 100. Tutor Engine

Composto por:

```text
Trigger Detector
Policy Engine
Context Builder
Hermes Tutor Session
Output Validator
Outcome Tracker
```

---

# 101. Trigger Detector

Detecta:

- help request;
- stuck;
- misconception;
- evidence gap;
- safety/scope;
- high-value teaching moment.

---

# 102. Policy Engine

É deterministic-first.

Recebe:

```text
mode
global level
skill state
stuck severity
misconception state
assistance history
privacy state
scope state
```

Produz:

```text
intervention allowed?
intervention type
max hint level
urgency
```

---

# 103. LLM não decide seu próprio poder

Hermes recebe limites da Policy Engine.

---

# 104. Tutor output schema

```yaml
intervention:
  type: ASK
  hint_level: H1
  message: "..."
  target_skill: "..."
  rationale_public: "..."
```

---

# 105. Output Validator

Valida:

- intervention type permitido;
- hint level;
- session mode;
- no forbidden action;
- no scope violation.

---

# 106. Exam enforcement

Em Assessment Session:

```text
Tutor generation disabled
```

Exceto mensagens de:

- scope;
- technical failure;
- assessment UX.

---

# 107. SILENT implementation

SILENT é decisão real.

Não fazer chamada LLM desnecessária a cada evento.

---

# 108. Event triage

Antes de inferência:

```text
Rule/heuristic triage
↓
need model?
```

---

# 109. Stuck Detector V1

Implementação híbrida:

```text
deterministic signals
+
semantic classification when ambiguous
```

---

# 110. Deterministic stuck signals

- repeated event fingerprints;
- repeated request mutation;
- no new evidence;
- missing hypothesis;
- rapid tool switching;
- multiple simultaneous variable changes.

---

# 111. Semantic stuck classifier

Somente quando heurísticas não bastarem.

---

# 112. Stuck state

```text
S0
S1
S2
S3
```

---

# 113. Misconception Engine

Mapping curricular + semantic observation.

---

# 114. Misconception candidate

LLM pode sugerir.

Core decide status transition baseado em rules/evidence.

---

# 115. Tutor context pack

Não enviar histórico integral.

Pack:

```text
session objective
mode
relevant learner skills
current hypotheses
last meaningful observations
assistance history
known misconception candidates
evidence gaps
```

---

# 116. Context budget

Cada pack possui budget explícito.

Raw artifacts só entram sob demanda.

---

# 117. Brother Eye MCP server

Brother Eye Core expõe um MCP server local para Hermes.

---

# 118. MCP tools do Tutor

Exemplos:

```text
be_get_session_state
be_get_recent_observations
be_get_hypotheses
be_get_skill_context
be_get_evidence_summary
be_get_curriculum_skill
```

Todos read-only.

---

# 119. MCP tool filtering

Hermes Tutor recebe somente ferramentas Brother Eye permitidas.

---

# 120. No generic Hermes toolset in Tutor

Desabilitar por default:

- terminal;
- browser automation;
- computer_use;
- filesystem write;
- generic web search.

---

# 121. Web search no Tutor

Não necessário durante sessão V1.

Pode existir em authoring/research workflows separados.

---

# 122. Model strategy

Não fixar produto a um fornecedor.

Usar provider layer do Hermes.

---

# 123. Logical model roles

```text
TutorPrimary
AssessorPrimary
VisionAux
FastAux
```

---

# 124. V1 calibration model policy

Durante primeira calibração:

> priorizar qualidade e consistência sobre otimização prematura de custo.

---

# 125. TutorPrimary

Requisitos:

- forte reasoning;
- reliable structured output;
- low latency aceitável;
- tool use;
- pt-BR forte.

---

# 126. AssessorPrimary

Requisitos:

- reasoning forte;
- consistency;
- low-temperature operation;
- structured classification.

---

# 127. VisionAux

Usar somente quando screenshot realmente necessário.

---

# 128. FastAux

Pode entrar depois para:

- classification;
- summarization;
- dedupe.

Não usar antes de baseline de qualidade.

---

# 129. Model metadata

Registrar em toda inferência relevante:

```text
provider
model
model_version/id
role
prompt_version
policy_version
temperature/settings
```

---

# 130. No silent model fallback for assessment

Se Assessor muda de model por fallback:

isso deve ser registrado.

Promotion-critical evidence pode exigir re-review.

---

# 131. Model failure

Se Tutor indisponível:

- session pode continuar;
- observation continua;
- UI mostra degraded state.

---

# 132. Assessment model failure

Não inventar result.

Status:

`pending_assessment`.

---

# 133. Prompt versioning

Prompts são artefatos versionados.

---

# 134. Prompt locations

Conceitualmente:

```text
core/prompts/tutor/
core/prompts/assessor/
core/prompts/vision/
```

---

# 135. Prompt changes

Precisam de regression tests.

---

# 136. Assessment Engine

Pipeline:

```text
Observation Window
↓
Candidate Skill Mapping
↓
Assessor LLM
↓
SkillEvidenceDraft
↓
Deterministic Validator
↓
Human Review when required
↓
SkillEvidence
```

---

# 137. Assessor isolation

Assessor não vê:

- current mastery score quando não necessário;
- desired promotion outcome;
- Tutor recommendation.

Isso reduz confirmation bias.

---

# 138. SkillEvidenceDraft

Nunca altera Learner Model diretamente.

---

# 139. Evidence Validator

Verifica:

- skill exists;
- dimension;
- rubric;
- provenance;
- mode;
- assistance;
- difficulty;
- novelty;
- contamination;
- confidence.

---

# 140. Human review V1

Obrigatória para:

- R5;
- promotion-critical;
- disputed;
- low-confidence;
- unexpected contradiction.

---

# 141. Scoring Engine

Pure deterministic logic.

---

# 142. Scoring implementation

Funções versionadas e testáveis.

Entrada:

`SkillEvidence[]`

Saída:

```text
DimensionMastery
SkillMastery
Confidence
StageProgress
Gates
```

---

# 143. No LLM scoring arithmetic

LLM não calcula score oficial.

---

# 144. Learner Model service

Mantém:

- Skill Evidence Portfolio;
- dimension scores;
- skill mastery;
- confidence;
- learning state;
- misconception state;
- stage progress.

---

# 145. Learner Model persistence

Persistido independentemente do Hermes session store.

---

# 146. Curriculum Service

Curriculum é runtime data versionada.

Não hardcode de forma dispersa.

---

# 147. Curriculum representation

V1:

```text
YAML/JSON source files
↓
validation
↓
database/imported runtime model
```

---

# 148. Curriculum source control

Curriculum source fica no Git.

---

# 149. Skill schema validation

Falha na validação bloqueia build/import.

---

# 150. Instructor Key storage

Separado do student-facing curriculum.

---

# 151. Instructor Key access

Somente:

- Lab Manager;
- Assessment Engine.

Tutor em Exam não recebe.

---

# 152. Persistence engine

V1:

> **SQLite**

---

# 153. Por que SQLite

- single-user desktop;
- transacional;
- confiável;
- zero infraestrutura;
- fácil backup;
- suficiente para event ledger e projections;
- Hermes também utiliza SQLite para suas sessões, mas Brother Eye mantém banco separado.

---

# 154. Separate databases

Não escrever no banco interno do Hermes.

Brother Eye DB e Hermes DB são independentes.

---

# 155. Brother Eye database tables — conceptual

```text
users
sessions
events
observations
hypotheses
findings
evidence_records
skill_evidence
evidence_groups
learner_skills
misconceptions
assessments
assessment_tasks
tutor_decisions
model_calls
adapter_connections
lab_runs
schema_versions
```

---

# 156. SQLite mode

Usar WAL quando compatível.

---

# 157. Migrations

Usar migrations versionadas.

Preferência Python:

> Alembic.

---

# 158. ORM/query layer

Preferência:

> SQLAlchemy 2.

---

# 159. Schema layer

Preferência:

> Pydantic.

---

# 160. Evidence Vault

Raw artifacts não devem viver indiscriminadamente em rows SQLite.

---

# 161. Artifact types

```text
HTTP request
HTTP response
screenshot
terminal capture
notes attachment
assessment artifact
```

---

# 162. Artifact store

Filesystem local privado.

Estrutura content-addressed.

---

# 163. Artifact identity

Cada artifact possui:

```text
artifact_id
sha256
size
mime
created_at
encryption
source
```

---

# 164. Artifact immutability

Raw artifact não é editado in-place.

Correção cria novo artifact/reference.

---

# 165. Evidence Vault encryption

Raw Evidence Vault deve ser encrypted at rest.

---

# 166. Vault key

Master key aleatória.

Armazenada através de OS credential/keychain facility.

---

# 167. Data encryption

Preferência:

> authenticated encryption.

Algoritmo final deve usar biblioteca consolidada; não implementar crypto própria.

---

# 168. Database secret minimization

DB guarda preferencialmente:

- redacted metadata;
- hashes;
- artifact refs.

---

# 169. Redaction Pipeline

Antes de qualquer envio para LLM:

```text
Raw
↓
Secret detection
↓
Stable pseudonymization
↓
Context minimization
↓
LLM-safe payload
```

---

# 170. Headers always sensitive

Tratar especialmente:

```text
Authorization
Cookie
Set-Cookie
Proxy-Authorization
```

---

# 171. Stable pseudonyms

Exemplo:

```text
Bearer abc...
→ TOKEN_A
```

Isso preserva comparação sem revelar segredo.

---

# 172. Credentials

Password-like fields devem ser removidos/substituídos.

---

# 173. Screenshot privacy

Capturar apenas:

- allowlisted app/window;
- task-relevant context.

---

# 174. Screenshot egress

Enviar screenshot ao modelo somente quando:

- AX/structured telemetry insuficiente;
- policy permite;
- privacy active.

---

# 175. Scope Guard

Componente determinístico.

---

# 176. Scope sources

Scope vem de:

- curated lab manifest;
- explicit session configuration.

---

# 177. Scope matching

Normalized:

- host;
- port;
- protocol;
- path rules when applicable.

---

# 178. Scope enforcement points

Aplicar em:

- adapter ingestion;
- observation context;
- evidence;
- assessment;
- Tutor context.

---

# 179. STOP

Scope violation gera:

`STOP`

sem depender de LLM.

---

# 180. Lab Runtime

V1:

> **Docker**

---

# 181. Lab Manager

Responsável por:

- install/check;
- start;
- stop;
- reset;
- health;
- scope manifest;
- Instructor Key mapping.

---

# 182. Lab packaging

Cada lab possui:

```text
lab.yaml
compose.yaml
instructor-key.yaml
assets/
```

---

# 183. Lab manifest

```yaml
id:
version:
domain:
difficulty:
targets:
scope:
tasks:
reset:
healthcheck:
```

---

# 184. Docker image pinning

Images devem ser pinned.

Evitar floating `latest`.

---

# 185. Lab network

Default:

- isolated bridge;
- localhost exposure apenas quando necessário;
- sem internet externa por padrão.

---

# 186. Curated lab primary

O primeiro assessment não depende de lab externo complexo.

Criar lab próprio pequeno para:

- two identities;
- object authorization;
- controls;
- false signal;
- transfer.

---

# 187. Juice Shop

Pode ser utilizado para Practice/expansion.

Não deve ser único ground truth do V1.

---

# 188. Lab resetability

Reset deve ser determinístico.

---

# 189. Lab telemetry

Lab pode opcionalmente emitir internal ground-truth events para Assessment Engine.

Esses eventos NUNCA entram no Tutor context quando causariam spoiler.

---

# 190. Ground Truth channel

Separado logicamente do student observation channel.

---

# 191. Internal API surfaces

Brother Eye Core possui três superfícies distintas:

```text
1. Desktop RPC
2. Adapter Gateway
3. Hermes MCP
```

---

# 192. Desktop RPC

Transport:

`stdio`

Authority:

full local user product actions through Rust bridge.

---

# 193. Adapter Gateway

Transport:

`loopback WebSocket/HTTP`

Authority:

telemetry ingestion limitada.

---

# 194. Hermes MCP

Transport:

`local HTTP MCP or stdio-compatible adapter`

Authority:

read-only context.

---

# 195. Never reuse one token everywhere

Cada surface possui credential/authority própria.

---

# 196. Adapter Gateway authorization

Capability token identifica:

- adapter type;
- session;
- permissions.

---

# 197. Adapter token expiry

Tokens de session devem expirar.

---

# 198. Hermes MCP auth

Somente runtime managed recebe token.

---

# 199. Local network security

Endpoints:

- bind loopback only;
- random/ephemeral ports when possible;
- bearer tokens;
- strict CORS if browser-accessible;
- no discovery broadcast.

---

# 200. No cloud backend required for V1

Core learning loop deve funcionar localmente, exceto inferência quando provider for cloud.

---

# 201. Cloud optionality

Futuro pode adicionar:

- sync;
- account;
- instructor review;
- analytics.

Não é requisito arquitetural central do V1.

---

# 202. Model egress boundary

É a principal saída de dados do dispositivo.

---

# 203. Egress audit

Registrar:

- model role;
- provider;
- data classes sent;
- artifact refs used;
- redaction result.

Não registrar secret raw.

---

# 204. Offline model possibility

Hermes provider abstraction deve permitir modelo local no futuro.

---

# 205. No local-model requirement

V1 pode usar cloud.

---

# 206. Session replay

First-class internal capability.

---

# 207. Replay input

```text
event ledger
policy version
curriculum version
model fixtures/live mode
```

---

# 208. Replay modes

```text
Deterministic replay
Model-assisted replay
UI replay
```

---

# 209. Deterministic replay

Usa model stubs.

Testa:

- state transitions;
- policy;
- scoring;
- scope;
- evidence validator.

---

# 210. Model-assisted replay

Executa prompts novamente para calibration/regression.

Resultados não precisam ser byte-identical.

Avaliar rubrica.

---

# 211. Session debugging

Developer tooling deve conseguir mostrar:

```text
Event
↓
Observation
↓
Trigger
↓
Policy Decision
↓
Hermes call
↓
Tutor output
↓
Outcome
↓
Evidence
```

---

# 212. Tutor Decision Record

Persistir:

```text
trigger
state
policy
allowed intervention
model call
final intervention
outcome
```

---

# 213. Assessor Decision Record

Persistir:

```text
window
rubric
model
draft
validator result
human review
```

---

# 214. Observability

Logs estruturados.

---

# 215. Logging levels

```text
DEBUG
INFO
WARN
ERROR
SECURITY
PEDAGOGY
ASSESSMENT
```

---

# 216. No secrets in logs

Redactor também atua sobre logging.

---

# 217. Correlation IDs

Todo fluxo relevante possui:

```text
session_id
event_id
model_call_id
decision_id
evidence_id
```

---

# 218. Metrics locais V1

Exemplos:

- observation latency;
- Tutor decision latency;
- model latency;
- adapter health;
- event queue depth;
- inference errors;
- evidence classifications.

---

# 219. Learning metrics

Separadas de technical telemetry.

---

# 220. Error classification

```text
USER_RECOVERABLE
ADAPTER
OBSERVATION
MODEL
POLICY
ASSESSMENT
STORAGE
LAB
PRIVACY
FATAL
```

---

# 221. Degraded session

Session pode continuar quando:

- Tutor model falha;
- one observation source falha.

Mas UI mostra limitação.

---

# 222. Assessment invalidation

Se telemetry crítica falha:

assessment é invalidado.

Não produzir score falso.

---

# 223. Process crash

Rust supervisor:

- detects;
- records;
- restarts when safe;
- does not silently restart an active Assessment without invalidation.

---

# 224. Core recovery

Core rebuilds current projections from persisted state.

---

# 225. Session resume

Resume não depende do Hermes chat transcript exclusivamente.

---

# 226. Hermes session loss

Se Hermes session perde estado:

Brother Eye pode criar outra usando structured context pack.

---

# 227. Testing strategy

Cinco camadas:

```text
Unit
Contract
Replay
Integration
End-to-End
```

---

# 228. Unit tests

Principalmente:

- Policy Engine;
- scoring;
- scope;
- redaction;
- state transitions;
- evidence validator.

---

# 229. Contract tests

Validar:

- Desktop RPC schema;
- event envelope;
- Burp payloads;
- Hermes MCP;
- Instructor Key;
- Curriculum schema.

---

# 230. Replay tests

Golden sessions.

---

# 231. Integration tests

Exemplos:

```text
Burp Extension → Core
Core → Hermes
Core → Cua
Core → SQLite/Vault
Lab Manager → Docker
```

---

# 232. End-to-End tests

Primeiro golden path:

```text
Start lab
↓
Start session
↓
Burp event
↓
Tutor H1
↓
Evidence
↓
Debrief
↓
Skill update
```

---

# 233. UI tests

Frontend:

- component tests;
- accessibility;
- keyboard;
- state transitions.

---

# 234. Browser-like UI E2E

Como frontend é SPA, grande parte pode ser testada sem Tauri host.

---

# 235. Tauri integration tests

Cobrir:

- sidecar lifecycle;
- HUD windows;
- permissions;
- shutter;
- update/restart.

---

# 236. Burp Extension tests

- serialization;
- request correlation;
- redaction boundary;
- pairing;
- scope filter;
- reconnect.

---

# 237. Pedagogical regression suite

Casos:

```text
progressing
productive struggle
stuck S1
stuck S3
misconception
evidence missing
student asks hint
Challenge
Exam
```

---

# 238. Assessment gold set

Sessões rotuladas por humano.

---

# 239. CI requirement

CI futura deve:

- lint;
- unit;
- contract;
- build desktop;
- build Burp extension;
- validate curriculum;
- validate lab manifests.

---

# 240. No live LLM in mandatory unit CI

Evitar flaky/cost.

---

# 241. Model regression job

Separado, manual/scheduled.

---

# 242. Security tests

- scope bypass;
- adapter auth;
- path traversal;
- vault permission;
- redaction;
- Tauri capability boundary;
- malicious lab content;
- prompt injection from screen.

---

# 243. Prompt injection assumption

Conteúdo observado é untrusted.

---

# 244. Screen text is data

Nunca tratar instruction visível na tela como system instruction.

---

# 245. HTTP response text is data

Mesmo princípio.

---

# 246. Tool output is untrusted

Hermes prompt deve deixar boundary explícita.

---

# 247. Evidence provenance vs instruction

Evidence pode ser analisada.

Não pode modificar policy.

---

# 248. Packaging V1

Windows-first.

---

# 249. Por que Windows-first

- V1 é Web/Burp;
- principal desenvolvimento ocorre em Windows;
- Cua/Windows UIAutomation possui suporte direto;
- reduz matriz de QA inicial.

---

# 250. Cross-platform design

Nenhuma decisão central deve impedir:

- macOS;
- Linux.

---

# 251. macOS

V1.x após Windows stabilization.

Exige:

- Accessibility permission;
- Screen Recording permission;
- signing/notarization.

---

# 252. Linux

V1.x.

Complexidade:

- X11/Wayland;
- AT-SPI;
- distro packaging.

---

# 253. Windows packaging

Tauri installer.

---

# 254. Managed dependencies

Installer/first-run deve lidar com:

- Brother Eye Core;
- Hermes Runtime;
- Cua Driver;
- lab prerequisites validation.

---

# 255. Docker prerequisite

V1 pode exigir Docker instalado.

Não embutir container runtime.

---

# 256. Burp prerequisite

Usuário instala Burp.

Brother Eye instala/guia extension.

---

# 257. Burp Community vs Professional

Telemetry adapter deve funcionar sempre que Montoya capability utilizada estiver disponível.

Não depender do scanner Pro.

---

# 258. Auto-update

V1 controlled pilot pode usar manual signed builds.

Auto-update pode entrar antes de mass release.

---

# 259. Code signing

Obrigatório antes de distribuição pública.

---

# 260. Repository structure

Proposta:

```text
brother-eye/
├── apps/
│   └── desktop/
│       ├── src/
│       └── src-tauri/
│
├── core/
│   ├── brother_eye/
│   ├── tests/
│   └── pyproject.toml
│
├── adapters/
│   └── burp/
│       ├── src/
│       └── build.gradle
│
├── labs/
│   ├── authorization-basics/
│   ├── authorization-transfer/
│   └── false-signal/
│
├── schemas/
│   ├── events/
│   ├── rpc/
│   ├── curriculum/
│   └── assessment/
│
├── design/
│
└── docs/
```

---

# 261. Why monorepo

Contracts mudam juntos.

V1 possui:

- TS;
- Rust;
- Python;
- Java;
- lab definitions.

Um repo reduz drift.

---

# 262. JS package manager

Preferência:

> pnpm

para frontend tooling.

---

# 263. Python environment

Preferência:

> uv

para lock/install rápido e reprodutível.

---

# 264. Java build

Preferência:

> Gradle Wrapper

para Burp Extension.

---

# 265. Rust

Cargo gerenciado pelo Tauri.

---

# 266. Formatting/linting

Frontend:

- TypeScript strict;
- ESLint or equivalent;
- formatter.

Python:

- Ruff;
- type checking.

Rust:

- rustfmt;
- clippy.

Java:

- formatter/static analysis básico.

---

# 267. Strict types

Protocol boundaries devem ser typed.

---

# 268. Schema source of truth

Cada protocol possui schema version.

---

# 269. Generated types

Quando prático:

- JSON Schema → TypeScript;
- OpenAPI → client types.

---

# 270. No duplicated enum strings

Exemplo:

`Practice`

não deve existir divergente em quatro idiomas de código.

---

# 271. Domain enums

Versionados em shared schema.

---

# 272. Event IDs

Usar IDs ordenáveis temporalmente.

Preferência:

> ULID ou UUIDv7.

---

# 273. Time

Persistir UTC.

UI converte para timezone local.

---

# 274. Event ordering

Cada session possui sequência monotônica adicional ao timestamp.

---

# 275. HTTP artifact fingerprint

Pode considerar:

- normalized method;
- URL;
- selected headers;
- body hash.

---

# 276. Request correlation

Burp adapter deve fornecer correlation quando possível.

Core pode complementar.

---

# 277. Identity contexts

Nunca inferir identidade apenas por raw token string.

Representar:

```text
IdentityContext A
IdentityContext B
```

com artifact refs redacted.

---

# 278. Finding model

Finding é domain object separado de Burp issue.

---

# 279. Finding state machine

Core enforce transitions.

---

# 280. Evidence role enforcement

Evidence role deve ser explicitamente validada.

---

# 281. Reporting

V1 editor vive no frontend.

Draft salvo no Core.

---

# 282. Tutor report review

Tutor recebe:

- draft sanitized;
- related evidence summary.

Não precisa raw vault inteiro.

---

# 283. No auto-report

Core não cria finding final automaticamente.

---

# 284. Architecture alternatives considered

## A — Hermes Desktop Plugin

Rejected as primary shell.

## B — Electron standalone

Not chosen initially.

## C — Web-only app

Rejected.

## D — Direct LLM API without Hermes

Rejected.

## E — Microservices + cloud DB

Rejected for V1.

## F — LLM-controlled computer use

Rejected.

---

# 285. Alternative A — Hermes Desktop Plugin

Prós:

- rapid prototype;
- existing gateway;
- existing desktop UI;
- plugin SDK.

Contras:

- product-host coupling;
- branding;
- release dependency;
- broad plugin authority.

Use only for experiments/internal tools if useful.

---

# 286. Alternative B — Electron

Prós:

- mature;
- Node integration;
- Hermes Desktop precedent.

Contras:

- bundled Chromium;
- larger footprint;
- renderer hardening burden.

Fallback only if Tauri blocks V1.

---

# 287. Alternative C — Web-only

Fails:

- desktop observation;
- floating HUD;
- privacy shutter enforcement;
- process management.

---

# 288. Alternative D — Direct model APIs

Would force Brother Eye to rebuild:

- provider abstraction;
- model routing;
- agent session mechanics;
- tools;
- context handling.

Hermes already supplies these.

---

# 289. Alternative E — Microservices

Premature.

Single-user local app does not need:

- Kubernetes;
- Redis;
- Kafka;
- Postgres cluster.

---

# 290. Alternative F — LLM OS control

Contradicts pedagogy and increases risk.

---

# 291. Trust boundaries

```text
[Renderer]
    │ restricted IPC
    ▼
[Tauri Rust]
    │ process/RPC
    ▼
[Brother Eye Core]
    ├── local adapter boundary
    ├── model egress boundary
    ├── evidence vault boundary
    └── lab boundary
```

---

# 292. Renderer trust

Treat renderer compromise as plausible.

Limit capabilities.

---

# 293. Lab trust

Lab content is untrusted.

---

# 294. Burp data trust

Burp traffic is untrusted.

---

# 295. Model trust

Model output is untrusted proposal until validated.

---

# 296. Adapter trust

Adapter identity authenticated, payload still validated.

---

# 297. Curriculum trust

Version-controlled, validated content.

---

# 298. Instructor Key trust

High-trust internal source.

---

# 299. Deterministic authority map

```text
Scope                 → Core
Safety STOP           → Core
Session mode          → Core
Hint maximum          → Policy
Finding state         → Core
Evidence acceptance   → Validator
Score math            → Scoring Engine
Promotion gate        → Scoring/Gates
Tutor wording         → Hermes
Semantic interpretation → Hermes/Assessor
```

---

# 300. Data ownership map

```text
Hermes
→ inference session data

Brother Eye
→ product/session/learner/evidence state

Cua
→ ephemeral capture runtime

Burp
→ source traffic/history

Docker
→ lab state
```

---

# 301. Hermes data minimization

Não usar Hermes memory para Learner Model oficial.

---

# 302. Hermes session retention

Pode ser curta.

Brother Eye structured state permanece.

---

# 303. Cross-session pedagogical memory

Vem do Learner Model, não de chat memory.

---

# 304. Performance goals — conceptual

Priorizar:

1. UI responsiveness;
2. scope/privacy enforcement;
3. event ingestion;
4. relevant Tutor latency.

---

# 305. No inference on every event

Events podem chegar em alta frequência.

Use batching/semantic trigger.

---

# 306. Observation throttling

Screenshots especialmente.

---

# 307. Backpressure

Se model está busy:

- continue event ingestion;
- summarize backlog;
- do not queue infinite Tutor messages.

---

# 308. Tutor message dedupe

Evitar múltiplas interventions sobre mesmo trigger.

---

# 309. Event dedupe

Adapter reconnect não pode duplicar evidence.

---

# 310. Idempotency

Critical commands possuem idempotency key.

---

# 311. Session shutdown

Order:

```text
stop new captures
flush events
persist state
close adapters
close Tutor session
stop lab if configured
```

---

# 312. Privacy shutdown priority

Privacy shutter bypassa graceful pedagogical flow.

Capture para imediatamente.

---

# 313. Health model

Components:

```text
Desktop
Core
Hermes
Cua
Burp
Lab
Model Provider
Storage
```

---

# 314. Health state

```text
OK
DEGRADED
FAILED
```

---

# 315. Session readiness gate

Antes de iniciar:

- Core OK;
- storage OK;
- lab scope valid;
- privacy state known.

Tutor/Hermes pode estar degraded em modo observation-only.

---

# 316. Assessment readiness gate

Mais rígido:

- observation sources required OK;
- Instructor Key loaded;
- Assessor available or post-processing available;
- telemetry integrity OK.

---

# 317. Architecture extensibility

Novo domínio não deve exigir reescrever core.

---

# 318. Domain extensions

Adicionam:

- curriculum;
- lab;
- adapters if needed;
- misconceptions;
- evidence rules.

---

# 319. Tool adapter extensions

Novo adapter implementa interface comum.

---

# 320. Future Infrastructure

Pode adicionar:

- structured terminal;
- Nmap adapter;
- SSH session adapter.

---

# 321. Future Active Directory

Pode adicionar:

- lab runtime;
- Windows/LDAP telemetry;
- new skill graph.

Core permanece.

---

# 322. Future Cloud

Pode adicionar:

- provider-specific adapters;
- cloud lab;
- identity telemetry.

---

# 323. V1 Windows-specific adapter notes

Burp, browser e Cua são prioridade.

---

# 324. WSL

Não é requirement específico do V1.

Se terminal estiver em WSL, screen/AX fallback pode ser limitado.

Structured WSL/terminal adapter pode entrar depois.

---

# 325. VM observation

Não garantir observação interna de VM no V1.

Se Burp/browser estão dentro da VM, integração precisa rodar lá ou usar future remote adapter.

---

# 326. Documented V1 limitation

V1 ideal:

- Burp;
- browser;
- Brother Eye;

no mesmo Windows host.

---

# 327. Technical Architecture versioning

Arquitetura possui decisões versionadas por ADR.

---

# 328. ADR directory

Quando implementação começar:

```text
docs/04-architecture/adr/
```

---

# 329. Initial ADRs

```text
ADR-001 Tauri 2 desktop shell
ADR-002 React/Vite/Tailwind/shadcn frontend
ADR-003 Python Brother Eye Core
ADR-004 Hermes as managed agent runtime
ADR-005 SQLite local persistence
ADR-006 Cua read-only observation
ADR-007 Burp Montoya telemetry adapter
ADR-008 Docker curated labs
ADR-009 Local-first V1
ADR-010 Deterministic policy boundaries
```

---

# 330. No ADR needed for every library

Somente decisões arquiteturais relevantes.

---

# 331. Dependency update policy

Pinned/locked.

---

# 332. High-risk dependency policy

Hermes, Cua, Tauri, Burp API:

- explicit version;
- compatibility tests;
- controlled upgrade.

---

# 333. Hermes upgrade gate

Antes de upgrade:

- gateway contract tests;
- tool filtering tests;
- model provider tests;
- replay tests.

---

# 334. Cua upgrade gate

- AX capture;
- screenshot;
- allowlist;
- read-only enforcement;
- privacy.

---

# 335. Burp API upgrade gate

- extension builds;
- handlers fire;
- request/response correlation;
- reconnect.

---

# 336. Tauri upgrade gate

- process supervisor;
- HUD;
- capabilities;
- installer;
- window state.

---

# 337. Development environment

Windows-first developer workflow.

---

# 338. Dev mode processes

```text
Vite
Tauri
Brother Eye Core
Hermes managed/dev runtime
Cua
Burp
Docker lab
```

---

# 339. Dev launcher

Criar um único dev command futuramente para subir dependências possíveis.

---

# 340. No manual seven-terminal workflow

---

# 341. Fixture mode

UI deve rodar sem Hermes/Burp usando fixtures.

---

# 342. Why fixture mode matters

Permite:

- UX work;
- component testing;
- demos;
- fast CI.

---

# 343. Core simulation mode

Pode replay golden session events.

---

# 344. Labless test mode

Unit/replay não precisa Docker.

---

# 345. Migration path to cloud

Se futuro exigir account/sync:

```text
Local Core remains
+
optional Sync Service
```

Não mover privileged observation para cloud por padrão.

---

# 346. Cloud sync data scope

Preferir:

- learner summary;
- sanitized evidence metadata;
- settings.

Raw artifacts opt-in.

---

# 347. Enterprise future

Não otimizar agora.

---

# 348. V1 architecture implementation order

```text
A0 Contracts & repo skeleton
A1 Desktop shell + Core lifecycle
A2 Persistence + event ledger
A3 Burp adapter
A4 Cua read-only observer
A5 Session State + Scope/Privacy
A6 Hermes integration
A7 Tutor Policy Engine
A8 Evidence + Assessor
A9 Learner Model
A10 Lab Manager
A11 Integrated learning journey
A12 Assessment
A13 Hardening
```

---

# 349. A0 — Contracts

Antes de features:

- event envelope;
- RPC;
- skill IDs;
- session enums;
- evidence schema.

---

# 350. A1 — Shell/Core

Provar:

```text
Tauri starts Core
Core health visible
Core crash recoverable
```

---

# 351. A2 — Ledger

Provar event persistence/replay.

---

# 352. A3 — Burp

Provar request/response structured telemetry.

---

# 353. A4 — Cua

Provar window/AX/screenshot read-only observation.

---

# 354. A5 — Session/Safety

Provar:

- scope;
- allowlist;
- shutter;
- state.

---

# 355. A6 — Hermes

Provar:

- managed runtime;
- gateway;
- Tutor session;
- read-only MCP;
- streaming.

---

# 356. A7 — Tutor

Provar:

- SILENT;
- ASK;
- H1/H2;
- stuck.

Depois expandir estados.

---

# 357. A8 — Assessment

Provar uma SkillEvidence completa.

---

# 358. A9 — Learner

Provar score recalculável.

---

# 359. A10 — Labs

Provar reset e Instructor Key.

---

# 360. A11 — Journey

Learn → Practice → Challenge → Transfer.

---

# 361. A12 — Assessment

H0 + no Tutor help.

---

# 362. A13 — Hardening

- recovery;
- privacy;
- performance;
- installer.

---

# 363. Architecture prototype gates

Antes de construir app grande, fazer spikes.

---

# 364. Spike 1 — Tauri + HUD

Provar:

- main window;
- small always-on-top HUD;
- docking/positioning acceptable;
- keyboard focus behavior.

---

# 365. Spike 2 — Hermes managed runtime

Provar:

- install;
- start;
- JSON-RPC;
- stream;
- shutdown.

---

# 366. Spike 3 — Cua read-only

Provar:

- Burp capture;
- browser capture;
- AX;
- screenshot;
- no action methods exposed.

---

# 367. Spike 4 — Burp Montoya

Provar:

- Proxy request;
- response;
- tool source;
- pairing.

---

# 368. Spike 5 — End-to-end event

```text
Burp request
→ Core
→ Session state
→ Hermes H1
→ HUD
```

---

# 369. Stop conditions for architecture

Reconsider Tauri if:

- HUD/windowing critical requirement fails;
- process management unstable;
- WebView behavior makes technical UI impractical.

---

# 370. Stop conditions for Hermes

Reconsider Hermes integration layer if:

- public gateway insufficient;
- runtime cannot be pinned safely;
- tool surface cannot be restricted;
- latency is unacceptable.

Do not immediately abandon Hermes due one integration bug.

---

# 371. Stop conditions for Cua

Reconsider if:

- read-only boundary cannot be enforced;
- observation reliability insufficient for Burp/browser;
- privacy controls not trustworthy.

---

# 372. Stop conditions for Burp adapter

Reconsider specific handler approach if:

- Repeater/proxy context cannot be observed adequately.

Montoya remains preferred integration family.

---

# 373. Architecture open decisions after spikes

Somente estas devem permanecer abertas:

1. exact Hermes release pin;
2. exact model/provider;
3. Base UI vs Radix exceptions;
4. artifact encryption library;
5. final Windows installer/update mechanism;
6. exact local MCP transport implementation;
7. exact Docker lab app implementation.

---

# 374. Decisions that are NOT open

- standalone app;
- Tauri first choice;
- React/TypeScript/Vite;
- Tailwind;
- shadcn;
- Python Core;
- Hermes runtime;
- SQLite;
- local-first;
- Burp Montoya;
- Cua read-only;
- Docker labs;
- deterministic policy/scoring.

---

# 375. Architecture acceptance criteria

Documento aprovado se houver concordância de que:

- Brother Eye é standalone;
- Tauri 2 é shell;
- React/TS/Vite/Tailwind/shadcn são frontend;
- Python é Core;
- Hermes é Agent Runtime, não source of truth;
- models não controlam OS;
- Cua é read-only observation;
- Burp usa Montoya;
- SQLite + encrypted Evidence Vault são suficientes;
- event ledger é append-only;
- Tutor Policy é deterministic-first;
- Assessor é separado;
- Scoring não é LLM;
- curated labs usam Docker;
- Windows-first V1 é aceitável;
- arquitetura permanece extensível.

---

# 376. Próximo documento

Após aprovação:

`docs/05-evaluation/BROTHER_EYE_EVALUATION_FRAMEWORK.md`

Ele definirá como provar que esta arquitetura e o Tutor realmente funcionam:

- learning outcomes;
- Tutor correctness;
- overhelp;
- underhelp;
- stuck precision;
- Assessor agreement;
- transfer;
- fading;
- usability;
- latency;
- observation quality;
- privacy;
- pilot protocol;
- release gates.

---

# 377. Regra-mãe

> **A arquitetura do Brother Eye deve manter o aluno como executor, os fatos como estado estruturado, a evidence como fonte de verdade e o modelo generativo dentro de limites explícitos — nunca como autoridade invisível sobre o produto.**

---

# Apêndice A — Diagrama de processos

```text
┌─────────────────────────────────────────────────────┐
│                 Brother Eye Desktop                 │
│                                                     │
│  React + TS + shadcn                                │
│            │                                        │
│            ▼                                        │
│       Tauri IPC Bridge                              │
│            │                                        │
│       Rust Supervisor                               │
└────────────┼────────────────────────────────────────┘
             │ JSON-RPC / stdio
             ▼
┌─────────────────────────────────────────────────────┐
│                Brother Eye Core                     │
│                                                     │
│ Session │ Observer │ Policy │ Tutor │ Assessment    │
│ Learner │ Evidence │ Labs   │ Privacy │ Replay      │
│                                                     │
│       SQLite + Encrypted Evidence Vault             │
└───────┬───────────────┬──────────────┬──────────────┘
        │               │              │
        │               │              │
        ▼               ▼              ▼
 Hermes Runtime      Cua Driver    Adapter Gateway
 JSON-RPC/WS         MCP/read      loopback auth
        │                              │
        ▼                              ▼
 Model Providers                Burp Extension
                               Montoya API

                 Brother Eye Core
                       │
                       ▼
                  Docker Labs
```

---

# Apêndice B — Data flow de Tutor

```text
Burp / Cua
    │
    ▼
Normalized Event
    │
    ▼
Observation Broker
    │
    ▼
Session Projection
    │
    ├── no trigger ───────────────► SILENT
    │
    ▼
Trigger
    │
    ▼
Policy Engine
    │
    ▼
Allowed Intervention + Max Hint
    │
    ▼
Context Builder
    │
    ▼
Hermes Tutor
    │
    ▼
Output Validator
    │
    ▼
Student
```

---

# Apêndice C — Data flow de Assessment

```text
Events
  │
  ▼
Observation Window
  │
  ▼
Assessor Hermes Session
  │
  ▼
SkillEvidenceDraft
  │
  ▼
Deterministic Validator
  │
  ├── review required ──► Human Review
  │
  ▼
SkillEvidence Ledger
  │
  ▼
Scoring Engine
  │
  ▼
Learner Model
```

---

# Apêndice D — Pesquisa técnica que fundamentou v0.1

Fontes oficiais consultadas em 2026-09-06:

- Hermes Agent — Architecture
- Hermes Agent — Programmatic Integration
- Hermes Agent — Computer Use
- Hermes Agent — Toolsets
- Hermes Agent — MCP
- Hermes Agent — Desktop / Desktop Plugin SDK
- Tauri 2 — Architecture
- Tauri 2 — Security / Capabilities
- Tauri 2 — Sidecar / Shell
- Tauri 2 — Window APIs
- shadcn/ui — Vite installation
- shadcn/ui — Tailwind v4 / React 19
- shadcn/ui — Base UI default
- PortSwigger — Montoya API 2026.7
- PortSwigger — Proxy / HTTP handlers
- Chrome DevTools Protocol — Network domain

---

## Status

**Draft v0.1**

Esta arquitetura deve ser validada conceitualmente antes do Evaluation Framework e antes da implementação de produção.

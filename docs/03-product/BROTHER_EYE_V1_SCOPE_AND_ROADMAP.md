# Brother Eye — V1 Scope & Roadmap

**Documento:** `BROTHER_EYE_V1_SCOPE_AND_ROADMAP.md`  
**Status:** Draft v0.1  
**Dependências:**  
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`
- `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`
- `BROTHER_EYE_CURRICULUM_V0.1.md`
- `BROTHER_EYE_STUDENT_EXPERIENCE_AND_UX.md`
- `BROTHER_EYE_VISUAL_DESIGN_SYSTEM.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define o **escopo real do primeiro produto utilizável do Brother Eye**.

Ele responde:

- o que exatamente entra no V1;
- o que explicitamente NÃO entra;
- qual hipótese o V1 precisa provar;
- quais alunos o V1 atende primeiro;
- quais domínios entram primeiro;
- quais modos entram;
- quais superfícies de produto entram;
- quais tipos de observação são necessários;
- qual subset do Curriculum será operacionalizado;
- qual subset do Learner Model será utilizado;
- qual subset de Assessment será necessário;
- quais critérios precisam ser satisfeitos antes de expandir;
- qual deve ser a ordem de implementação;
- quais milestones existem;
- quais riscos ameaçam o produto;
- o que deve ir para V1.1, V1.x e V2.

Este documento não escolhe:

- linguagem de programação;
- framework frontend;
- framework backend;
- banco;
- protocolo;
- modelo de IA;
- provider;
- desktop runtime;
- infraestrutura de deploy;
- mecanismo específico de computer use.

Essas decisões pertencem ao documento de Technical Architecture.

---

# 2. Problema de escopo

A visão completa do Brother Eye inclui:

- Web;
- API;
- Infrastructure;
- Active Directory;
- Cloud;
- multiple tools;
- voice;
- screen observation;
- structured telemetry;
- Skill Graph;
- placement;
- assessment;
- reporting;
- evidence;
- progression;
- Specialist Tracks.

Implementar tudo simultaneamente seria um erro.

O V1 deve provar primeiro:

> **Brother Eye consegue observar uma sessão real de prática, compreender suficientemente o contexto, intervir pedagogicamente de forma útil e produzir evidence de aprendizagem confiável sem assumir o trabalho do aluno?**

Se essa hipótese não funcionar, expandir currículo ou adicionar features não resolve o produto.

---

# 3. North Star do V1

O primeiro fluxo que precisa funcionar bem é:

```text
Aluno abre um lab autorizado
↓
Brother Eye sabe o objetivo da sessão
↓
Aluno trabalha com suas próprias ferramentas
↓
Brother Eye observa
↓
Brother Eye permanece em silêncio enquanto há progresso
↓
Aluno fica stuck ou pede ajuda
↓
Brother Eye fornece o menor hint necessário
↓
Aluno continua executando
↓
Brother Eye identifica momentos relevantes
↓
Evidence é preservada
↓
Sessão termina
↓
Brother Eye produz debrief
↓
Learner Model é atualizado
↓
O próximo exercício exige menos ajuda ou mais transfer
```

Esse fluxo é o produto.

---

# 4. Hipóteses que o V1 precisa validar

## H-V1-001 — Observabilidade útil

Brother Eye consegue observar ações suficientes para ensinar sem depender apenas de chat.

## H-V1-002 — Pedagogia útil

Hints e intervenções melhoram aprendizagem sem virar command dispensing.

## H-V1-003 — Silêncio útil

Brother Eye consegue não interromper quando o aluno está progredindo.

## H-V1-004 — Stuck Detection

O sistema consegue distinguir razoavelmente:

- productive struggle;
- repetição improdutiva;
- perda de hipótese.

## H-V1-005 — Evidence

O sistema consegue transformar comportamento em Skill Evidence explicável.

## H-V1-006 — Fading

Com repetição e melhora, o aluno precisa de menos suporte.

## H-V1-007 — Transfer

O aluno consegue aplicar princípio aprendido em contexto diferente.

## H-V1-008 — Trust

O aluno entende:

- o que está sendo observado;
- por que o Tutor interveio;
- por que uma evidence contou;
- por que um score mudou.

---

# 5. V1 não é versão reduzida de tudo

V1 não significa:

> “cada feature da visão completa, mas menor.”

V1 significa:

> **um vertical slice profundo da experiência central.**

---

# 6. Público inicial

V1 é dirigido principalmente a:

```text
Intern
Junior
```

e parcialmente:

```text
Mid-Level
```

para testar comportamento de menor assistência.

---

# 7. Senior e Specialist no V1

O modelo conceitual permanece presente.

Mas V1 NÃO precisa:

- formar Senior global;
- formar Specialist;
- oferecer Specialist Tracks completas;
- realizar promoção completa até Specialist.

---

# 8. Progressão suportada no V1

Objetivo mínimo:

```text
Intern
→ Junior
```

com capacidade parcial de observar progresso:

```text
Junior
→ Mid-Level
```

---

# 9. Por que limitar progressão

Porque provar:

- evidence;
- autonomy;
- transfer;
- fading;

em um pequeno conjunto de skills é mais importante que criar cinco níveis cosmeticamente completos.

---

# 10. Domínio técnico primário do V1

O V1 deve começar com:

> **Web + fundamentos HTTP + autorização + evidence**

---

# 11. API no V1

API entra como **extensão natural do mesmo modelo mental**, não como currículo completo.

Objetivo:

testar Transfer de:

- HTTP;
- identity;
- authorization;
- baseline;
- controlled comparison;
- evidence.

---

# 12. Infrastructure no V1

Infrastructure não entra como trilha completa.

Pode aparecer em exercícios introdutórios de:

- host;
- port;
- service;
- exposure vs vulnerability.

Mas não é foco do primeiro vertical slice.

---

# 13. Por que Web/HTTP/Authorization

Esse subset oferece:

- ações observáveis;
- requests/responses estruturadas;
- identidade;
- hipótese;
- controle;
- false positives;
- evidence;
- transfer Web → API;
- uso real de ferramentas.

Ele exercita quase todos os mecanismos centrais do produto.

---

# 14. Vulnerability classes no V1

Não precisamos de catálogo amplo.

Core inicial:

```text
Authorization
Authentication context
Session context
Basic input handling as secondary
```

---

# 15. Principal skill técnica do piloto

A primeira skill profunda deve ser:

`Authorization.ObjectLevel`

ou equivalentes Web/API.

---

# 16. Skills metodológicas do V1

Obrigatórias:

```text
Methodology.Scope.Awareness
Methodology.Observation.SignalRecognition
Methodology.Observation.Baseline
Methodology.Hypothesis.Formation
Methodology.Hypothesis.Prediction
Methodology.ExperimentDesign.SingleVariable
Methodology.ExperimentDesign.ControlVariables
Methodology.Validation.Reproduction
Methodology.Validation.Control
Methodology.Validation.FalsePositiveHandling
Methodology.Uncertainty.InconclusiveOutcome
```

---

# 17. Foundations do V1

Subset:

```text
Foundations.Security.AuthenticationAuthorization
Foundations.Security.VulnerabilityVsExposure
Foundations.HTTP.RequestResponse
Foundations.HTTP.Methods
Foundations.HTTP.Headers
Foundations.HTTP.Cookies
Foundations.HTTP.StatusCodes
Foundations.HTTP.Parameters
Foundations.HTTP.ProxyConcept
Foundations.Identity.Context
Foundations.Identity.Session
Foundations.Identity.Token
Foundations.Data.JSON
Foundations.Data.IdentifierTypes
Foundations.ApplicationArchitecture.FrontendBackend
Foundations.ApplicationArchitecture.APIConcept
```

---

# 18. Web skills do V1

Subset:

```text
Web.Mapping.ApplicationMapping
Web.Authentication.FlowMapping
Web.Authorization.ObjectLevel
Web.Authorization.FunctionLevel
Web.Authorization.RoleBoundary
Web.Authorization.HorizontalVertical
Web.Session.CookieAttributes
Web.Session.Lifecycle
Web.BusinessLogic.WorkflowUnderstanding
```

---

# 19. API skills do V1

Subset:

```text
API.Mapping.EndpointInventory
API.Mapping.ParameterInventory
API.Mapping.IdentityContext
API.REST.ResourceModel
API.REST.MethodSemantics
API.Authentication.TokenFlow
API.Authentication.BearerTokenConcept
API.Authorization.ObjectLevel
API.Authorization.FunctionLevel
API.Authorization.RoleContext
API.BusinessLogic.Workflow
API.Evidence.RequestResponsePreservation
```

---

# 20. Evidence skills do V1

```text
Evidence.Baseline.Capture
Evidence.Trigger.Capture
Evidence.Control.Construction
Evidence.Reproduction.Repeatability
Evidence.Impact.Demonstration
Evidence.Preservation.RawArtifact
Evidence.Sufficiency.ClaimEvidenceAlignment
```

---

# 21. Reporting no V1

Reporting entra de maneira limitada.

Core:

```text
Reporting.Finding.Structure
Reporting.Reproduction.Clarity
Reporting.Evidence.Selection
Reporting.Impact.TechnicalImpact
```

---

# 22. Tool Proficiency do V1

Primeiro suporte explícito deve privilegiar:

```text
Browser
Burp Suite
Terminal
```

Postman pode entrar como extensão de API.

---

# 23. Tool support policy

V1 pode possuir ferramentas preferencialmente suportadas.

Isso NÃO altera a filosofia tool-agnostic do produto.

Arquitetura futura deve evitar acoplamento irreversível.

---

# 24. Burp no V1

Burp é candidato natural para primeira experiência porque permite:

- interceptação;
- replay;
- comparação;
- requests/responses;
- workflow manual.

V1 deve conseguir acompanhar ao menos atividades relevantes desse tipo de ferramenta.

---

# 25. Browser no V1

Browser é necessário para:

- workflow;
- identity;
- UI context;
- navigation;
- application behavior.

---

# 26. Terminal no V1

Terminal entra para:

- curl;
- supporting commands;
- environment interaction;
- observação complementar.

---

# 27. Voice no V1

Voice NÃO é requisito de lançamento do V1.

---

# 28. Por que Voice fica depois

A hipótese principal pode ser validada com:

- HUD;
- chat;
- structured observation.

Voice adiciona:

- latency concerns;
- interruption design;
- speech recognition;
- additional privacy surface.

---

# 29. Voice roadmap

Mover para:

`V1.1`

caso o core pedagógico esteja funcionando.

---

# 30. Modos do V1

Obrigatórios:

```text
Learn
Practice
Challenge
Review
```

---

# 31. Exam no V1

V1 deve possuir **assessment controlado mínimo**, mas não precisa do Assessment Center completo.

Pode existir:

`Assessment Session`

com:

- Tutor assistance OFF;
- ground truth;
- debrief posterior.

---

# 32. Teach-Back no V1

Não é requisito principal.

Pode aparecer experimentalmente no fim do V1.

Formalização completa:

`V1.1`.

---

# 33. Placement no V1

Placement completo multi-domain NÃO é obrigatório.

---

# 34. V1 onboarding choice

V1 pode perguntar experiência prévia e permitir:

```text
Começar do início
Fazer diagnóstico rápido
```

---

# 35. Diagnóstico rápido

Pode avaliar apenas skills do vertical slice.

Não tentar estimar nível global completo.

---

# 36. Home no V1

Obrigatório:

- Current Level;
- próxima ação;
- blockers simples;
- continue session;
- domain/skill focus.

---

# 37. Home não precisa no V1

- analytics avançadas;
- activity feed;
- social;
- achievements;
- rich history visualization.

---

# 38. Session Setup no V1

Obrigatório:

- lab;
- scope;
- mode;
- objective;
- skills;
- observation state.

---

# 39. Session HUD no V1

Obrigatório.

Mostrar:

```text
Mode
Objective
Tutor State
Hint
Observation
Critical Evidence Gap
```

---

# 40. Tutor Panel no V1

Obrigatório.

Suportar:

```text
Me dê uma dica
Explique
Revise meu raciocínio
O que você viu?
Por quê?
Só observa
```

---

# 41. Hypothesis no V1

Obrigatório.

Aluno deve conseguir:

- criar;
- editar;
- marcar status;
- associar evidence.

---

# 42. Automatic hypothesis generation

NÃO deve substituir o aluno.

Brother Eye pode sugerir que o aluno formule.

---

# 43. Evidence Drawer no V1

Obrigatório.

Tipos mínimos:

```text
Baseline
Trigger
Control
Reproduction
Impact
```

---

# 44. Finding lifecycle no V1

Subset:

```text
Observation
Hypothesis
Candidate
Reproduced
Validated
False Positive
Inconclusive
```

`Reported` pode entrar se reporting for usado.

---

# 45. Session Timeline no V1

Versão simples.

Registrar apenas:

- hypothesis;
- Tutor intervention;
- evidence;
- finding state;
- session events.

---

# 46. Debrief no V1

Obrigatório.

---

# 47. Debrief mínimo

```text
Skills practiced
What you demonstrated
Where you needed help
Misconceptions
Evidence changes
Next step
```

---

# 48. Learner Model no V1

Precisa existir.

Mas pode utilizar subset do modelo completo.

---

# 49. Dimensões do V1

Manter todas as seis:

```text
Knowledge
Reasoning
Execution
Autonomy
Transfer
Evidence & Communication
```

Não simplificar o modelo conceitual.

---

# 50. SkillEvidence no V1

Obrigatório.

---

# 51. EvidenceGroup no V1

Obrigatório.

Evita inflação desde o início.

---

# 52. Evidence Quality no V1

Obrigatório:

```text
strong
moderate
weak
```

---

# 53. Assessor Confidence no V1

Obrigatório.

---

# 54. R0–R5 no V1

Obrigatório.

---

# 55. H0–H5 no V1

Obrigatório.

---

# 56. D1–D5 no V1

Metadata necessário.

Não precisa UX detalhada.

---

# 57. C0–C3 no V1

Necessário para testar Transfer.

---

# 58. Confidence no V1

Separada de Mastery.

Obrigatório.

---

# 59. Stage Progress no V1

Pode existir para:

```text
Intern → Junior
Junior → Mid-Level
```

dentro do subset curricular suportado.

---

# 60. Important limitation

O V1 deve deixar claro quando:

> o perfil é parcial porque o currículo operacionalizado ainda é limitado.

---

# 61. No fake global expertise

Não mostrar:

`Senior`

com base apenas no vertical slice Web/API.

---

# 62. V1 level semantics

Durante pilotos:

Global Level pode ser:

- provisional;
- scoped;
- ou limitado até Junior/Mid-Level.

---

# 63. Why This Score no V1

Obrigatório.

---

# 64. Why This Score mínimo

```text
Current score
Dimensions
Evidence groups
Assistance
Recent evidence
Blockers
```

---

# 65. Full Skill Graph no V1

Não é obrigatório.

---

# 66. V1 Progress View

Pode usar lista hierárquica simples.

Mostrar:

- skill;
- state;
- mastery;
- confidence;
- blocker.

---

# 67. Rich graph

Mover para:

`V1.1`.

---

# 68. Privacy no V1

Obrigatório desde primeira versão.

---

# 69. Privacy controls mínimos

```text
Observation indicator
Pause observation
Allowed sources
Blocked sources
Capture summary
```

---

# 70. Privacy Shutter

Obrigatório.

Não pode ficar para depois.

---

# 71. App allowlist

Obrigatória em conceito.

---

# 72. Scope safety

Obrigatório.

---

# 73. Scope behavior

Se target não está autorizado:

`STOP`

---

# 74. Safety is not milestone polish

Faz parte do core.

---

# 75. Raw evidence storage

V1 precisa preservar artifacts técnicos relevantes.

Detalhes de storage ficam para arquitetura.

---

# 76. Redaction

V1 deve suportar ao menos estratégia básica de secret redaction.

---

# 77. Automatic report writing

NÃO entra no V1 como comportamento padrão.

---

# 78. Reporting assistance

Pode:

- revisar;
- apontar gaps;
- explicar.

Aluno escreve.

---

# 79. Autonomous pentesting

Explicitamente fora de escopo.

---

# 80. Autonomous tool execution

Brother Eye NÃO deve:

- explorar;
- executar payloads;
- rodar scans ofensivos por conta própria;
- escolher target;
- validar finding sem aluno.

---

# 81. Computer-use boundary

Observation existe para entender a sessão.

Não para substituir aluno.

---

# 82. Lab scope do V1

Primeiro conjunto deve ser:

- local;
- curated;
- intentionally vulnerable;
- deterministic enough for ground truth.

---

# 83. Public targets

NÃO são necessários para V1.

---

# 84. Bug bounty

Fora de escopo do V1.

---

# 85. Real client pentest

Não necessário para V1.

---

# 86. First curated lab pack

O V1 deve possuir pequeno conjunto de tasks.

Não dezenas.

---

# 87. Lab Pack A — Foundations

Objetivos:

- HTTP;
- identity;
- baseline;
- signal vs vulnerability.

---

# 88. Lab Pack B — Authorization Practice

Objetivos:

- object authorization;
- two identities;
- control;
- reproduction.

---

# 89. Lab Pack C — Transfer

Mesmo princípio em representação diferente.

Exemplo conceitual:

```text
Web workflow
→ API request
```

---

# 90. Lab Pack D — False Signal

Comportamento suspeito sem vulnerabilidade.

Objetivo:

- control;
- false positive handling;
- uncertainty.

---

# 91. Lab Pack E — Assessment

Task desconhecida com ground truth.

---

# 92. Lab count philosophy

É melhor ter:

`5–10 tasks excelentes`

do que:

`100 labs superficiais`.

---

# 93. Instructor Key no V1

Obrigatório para curated assessment tasks.

---

# 94. Instructor Key mínimo

```text
objectives
skills
ground truth
expected evidence
common misconceptions
valid paths
assessment notes
```

---

# 95. Assessment lifecycle no V1

Simplificado:

```text
DRAFT
PILOT
ACTIVE
```

---

# 96. Human review no V1

Obrigatório durante pilots.

---

# 97. Promotion automation no V1

Não é prioridade.

---

# 98. Promotion confirmation

Pode exigir review humana em pilots.

---

# 99. Assessment disputes no V1

Pode ser simples.

Ao menos:

`Reportar classificação incorreta`

---

# 100. Full dispute workflow

V1.1.

---

# 101. Tutor Engine capability V1

Deve conseguir:

1. identificar session mode;
2. saber objetivo;
3. ler learner state;
4. observar;
5. detectar trigger;
6. decidir silêncio/intervenção;
7. selecionar H-level;
8. gerar intervention;
9. observar outcome;
10. registrar decisão.

---

# 102. Intervention states V1

Todos:

```text
SILENT
NUDGE
ASK
TEACH
WARN
EVIDENCE_CHECKPOINT
STOP
```

---

# 103. Stuck Detector V1

Precisa existir, mesmo que heurístico.

---

# 104. Stuck signals V1

Subset:

- repeated action;
- no new information;
- missing hypothesis;
- random variable changes;
- long loop.

---

# 105. Advanced frustration detection

Não é necessário.

---

# 106. Emotion detection

Fora de escopo.

---

# 107. Camera

Fora de escopo.

---

# 108. Biometrics

Fora de escopo.

---

# 109. Tutor Decision Record

Obrigatório.

---

# 110. Tutor Outcome Record

Obrigatório.

---

# 111. Tutor self-evaluation

V1 precisa registrar dados para revisar:

- overhelp;
- underhelp;
- wrong observation;
- unnecessary intervention.

---

# 112. Real-time technical correctness

É risco central.

---

# 113. Observation architecture requirement

A futura arquitetura precisa suportar múltiplas fontes.

Mas V1 pode implementar somente fontes necessárias ao vertical slice.

---

# 114. Required observation capability

Conceitualmente:

```text
structured technical events
+
screen/application context
+
student explicit reasoning
```

---

# 115. Structured technical event priority

Quando disponível, preferir.

---

# 116. Vision fallback

Usar para contexto não representado estruturalmente.

---

# 117. Accessibility / UI tree

Pode complementar.

---

# 118. Continuous video

Não é requisito.

---

# 119. Event-driven observation

Preferível.

---

# 120. V1 product surfaces

Obrigatórias:

```text
Onboarding
Home
Session Setup
Session HUD
Tutor Panel
Evidence Drawer
Debrief
Progress
Skill Detail
Privacy
Assessment Session
Assessment Result
Settings basics
```

---

# 121. Product surfaces deferred

```text
Rich Skill Graph
Full Assessment Center
Evidence Library advanced
Advanced Curriculum explorer
Public profile
Mobile companion
Classroom
Admin analytics
```

---

# 122. Visual scope V1

Usar Design System já definido.

---

# 123. Visual components required

```text
TutorHUD
TutorStateIndicator
HypothesisCard
EvidenceCard
EvidenceCompleteness
FindingCard
FindingLifecycle
SkillCard
StageProgress
WhyThisScorePanel
AssessmentCard/Result
PrivacyIndicator
PrivacyShutter
```

---

# 124. Visual components deferred

- advanced Skill Graph;
- complex data viz;
- custom illustration;
- rich animations.

---

# 125. shadcn/ui

Foundation preferencial se arquitetura compatível.

---

# 126. Dark-first

Obrigatório.

---

# 127. Light mode

Pode ser pós-V1.

---

# 128. Desktop-first

Obrigatório.

---

# 129. Mobile

Fora de V1.

---

# 130. Authentication/account

V1 precisa apenas do necessário para identificar learner/profile.

Detalhes ficam para architecture.

---

# 131. Multi-user classroom

Fora de V1.

---

# 132. Instructor dashboard

Não obrigatório.

Human review pode usar interface interna simples.

---

# 133. Multi-tenant SaaS

Não é hipótese central do V1.

Não otimizar arquitetura prematuramente para enterprise.

---

# 134. Local-first possibility

Arquitetura futura deve avaliar seriamente devido a:

- privacy;
- raw evidence;
- computer observation.

Mas não é decidido aqui.

---

# 135. Cloud sync

Não requisito central.

---

# 136. Session persistence

Obrigatório.

---

# 137. Crash recovery

Importante no V1.

---

# 138. Resume session

Obrigatório.

---

# 139. Offline full capability

Não obrigatório.

---

# 140. Search

Pode ser básico.

---

# 141. Command Palette

Nice-to-have.

---

# 142. Keyboard shortcuts

Essenciais:

- hint;
- pause observation;
- open Tutor;
- capture evidence.

---

# 143. Notification system

Somente in-app.

Push/email não necessários.

---

# 144. Gamification

Fora de V1.

---

# 145. Achievements

Fora de V1.

---

# 146. Streaks

Fora de V1.

---

# 147. Leaderboards

Fora de escopo.

---

# 148. Social

Fora de escopo.

---

# 149. V1 feature tiers

Cada item deve ser classificado:

```text
P0 — launch blocker
P1 — important
P2 — defer if needed
```

---

# 150. P0 — Pedagogical core

```text
Session objective
Learner state
Observation
SILENT
Hints H1–H5
Stuck detection
Tutor Decision Record
Debrief
Fading
```

---

# 151. P0 — Learning evidence

```text
SkillEvidence
EvidenceGroup
R0–R5
Quality
Assistance metadata
Confidence
Why This Score
```

---

# 152. P0 — Session

```text
Setup
HUD
Tutor Panel
Hypothesis
Evidence
Pause/resume
Timeline basic
```

---

# 153. P0 — Safety/privacy

```text
Scope
STOP
Observation indicator
Privacy Shutter
Allowlist
Redaction baseline
```

---

# 154. P0 — Curriculum/lab

```text
Web/HTTP/Authorization slice
Curated tasks
Ground truth
Transfer task
False signal task
```

---

# 155. P0 — Assessment

```text
Assessment Session
Tutor OFF
Instructor Key
Result
Human review
```

---

# 156. P1

```text
Basic onboarding
Home
Progress view
Finding lifecycle
Reporting review
Quick diagnostic
Crash recovery polish
```

---

# 157. P2

```text
Postman integration
Command palette
Advanced search
Teach-Back experiment
Rich evidence browsing
Additional labs
```

---

# 158. Not V1

```text
Voice
Full Skill Graph
AD
Cloud
Mobile
Wireless
Specialist Tracks full
Collaboration
Classroom
Social
Gamification
Autonomous pentest
Bug bounty
```

---

# 159. V1 success definition

V1 é bem-sucedido se um aluno consegue completar o vertical slice e o sistema demonstra:

1. observação útil;
2. intervenção correta;
3. silêncio apropriado;
4. hints graduados;
5. evidence explicável;
6. fading;
7. transfer;
8. debrief útil;
9. privacy compreensível.

---

# 160. V1 não é sucesso se

- UI está bonita mas Tutor ensina mal;
- Tutor responde bem no chat mas não entende sessão;
- score existe sem evidence;
- labs funcionam mas não há fading;
- aluno passa porque Tutor entrega;
- sistema depende de operador humano escondido para tudo.

---

# 161. Pilot target

Primeiro piloto deve ser pequeno.

Exemplo:

```text
5–15 learners
```

Não é KPI final.

---

# 162. Pilot learner mix

Ideal:

- iniciantes;
- estudantes com alguma prática;
- poucos intermediários.

---

# 163. Pilot sessions

Precisamos observar múltiplas sessões por aluno.

Um único uso não testa fading.

---

# 164. Pilot length

Deve permitir:

```text
learn
→ practice
→ challenge
→ transfer
```

---

# 165. Evaluation Framework dependency

Métricas quantitativas finais ficam no futuro:

`BROTHER_EYE_EVALUATION_FRAMEWORK.md`

---

# 166. V1 exit criteria — pedagogical

Antes de considerar V1 pronto:

- hints seguem menor ajuda suficiente na maioria dos casos revisados;
- Tutor não entrega solução indevidamente de forma recorrente;
- productive struggle é preservado;
- fading é observável;
- transfer task é possível.

---

# 167. V1 exit criteria — technical understanding

- Brother Eye distingue ações técnicas fundamentais do fluxo suportado;
- não hallucina consistentemente ações inexistentes;
- admite uncertainty quando observação é insuficiente.

---

# 168. V1 exit criteria — evidence

- toda mudança de score é rastreável;
- Skill Evidence possui provenance;
- correlated evidence não infla Confidence;
- assistance aparece na classificação;
- human reviewer consegue auditar.

---

# 169. V1 exit criteria — privacy

- observation é sempre visível;
- shutter funciona imediatamente;
- blocked source não é capturada;
- secrets críticos são tratados.

---

# 170. V1 exit criteria — UX

- aluno sabe iniciar sessão;
- sabe pedir hint;
- sabe pausar observation;
- entende hypothesis vs finding;
- entende evidence gap;
- consegue abrir Why This Score.

---

# 171. V1 exit criteria — assessment

- assessment desconhecido pode rodar;
- Tutor permanece sem ajuda;
- evidence é avaliada;
- resultado é revisável;
- assessment pode ser invalidado por telemetry failure.

---

# 172. No arbitrary perfection threshold here

Percentuais e thresholds de qualidade devem ser definidos no Evaluation Framework.

---

# 173. Architecture prerequisite

Antes de implementação de produção:

`BROTHER_EYE_TECHNICAL_ARCHITECTURE.md`

deve ser aprovado.

---

# 174. Evaluation prerequisite

Antes de pilot amplo:

`BROTHER_EYE_EVALUATION_FRAMEWORK.md`

deve ser aprovado.

---

# 175. Roadmap overview

```text
M0 — Specification Freeze
M1 — UX Prototype
M2 — Session & Observation Foundation
M3 — Tutor Core
M4 — Evidence & Learner Model
M5 — Curated Learning Slice
M6 — Assessment Slice
M7 — Integrated Alpha
M8 — Controlled Pilot
M9 — V1 Release Candidate
```

---

# 176. M0 — Specification Freeze

Objetivo:

garantir que implementação não comece em cima de decisões fundamentais instáveis.

---

# 177. M0 deliverables

- Vision approved;
- Learning Model approved;
- Tutor Pedagogy approved;
- Assessment approved;
- Curriculum v0.1 approved;
- Student UX approved;
- Visual Design System approved;
- V1 Scope approved;
- Technical Architecture approved;
- Evaluation Framework approved.

---

# 178. M0 exit

Nenhuma decisão P0 conceitual sem owner/documento.

---

# 179. M1 — UX Prototype

Objetivo:

testar fluxo antes do backend real.

---

# 180. M1 screens

```text
Home
Session Setup
Tutor HUD
Tutor Panel
Hypothesis
Evidence Drawer
Debrief
Progress
Assessment
Privacy
```

---

# 181. M1 data

Mock.

---

# 182. M1 validation

Testar:

- density;
- Tutor peripheral presence;
- hint discoverability;
- evidence comprehension;
- privacy discoverability.

---

# 183. M1 exit

Fluxo principal compreensível sem backend.

---

# 184. M2 — Session & Observation Foundation

Objetivo:

criar sessão real com contexto técnico.

---

# 185. M2 capabilities

- session create/start/pause/resume/end;
- scope;
- objective;
- event timeline;
- supported observation sources;
- observation indicator;
- privacy shutter.

---

# 186. M2 observation proof

Brother Eye deve conseguir reconstruir eventos relevantes de uma task controlada.

---

# 187. M2 no Tutor intelligence yet

É aceitável testar observability antes do Tutor completo.

---

# 188. M2 exit

Dados da sessão são suficientes para um humano entender:

- o que aluno tentou;
- resultado;
- ferramenta/contexto.

---

# 189. M3 — Tutor Core

Objetivo:

implementar política pedagógica.

---

# 190. M3 capabilities

```text
SILENT
ASK
NUDGE
TEACH
WARN
EVIDENCE_CHECKPOINT
STOP

H0–H5
```

---

# 191. M3 Stuck Detector

Primeira versão heurística.

---

# 192. M3 Learner State input

Tutor precisa consumir skill state básico.

---

# 193. M3 Decision Record

Obrigatório desde início.

---

# 194. M3 test harness

Criar cenários sintéticos:

- progressing;
- stuck;
- misconception;
- evidence gap;
- scope violation.

---

# 195. M3 exit

Human review considera comportamento pedagógico coerente em cenários controlados.

---

# 196. M4 — Evidence & Learner Model

Objetivo:

parar de depender de impressões subjetivas.

---

# 197. M4 capabilities

```text
SkillEvidence
EvidenceGroup
R0–R5
quality
assistance
difficulty
novelty
confidence
provenance
```

---

# 198. M4 score explainability

Why This Score deve funcionar.

---

# 199. M4 recalculation

Scores devem poder ser recalculados a partir do ledger.

---

# 200. M4 contradiction

Suportar evidence positiva e negativa.

---

# 201. M4 exit

Toda alteração de learner state tem causa auditável.

---

# 202. M5 — Curated Learning Slice

Objetivo:

primeiro fluxo pedagógico real.

---

# 203. M5 content

- foundations;
- HTTP;
- identity;
- authorization;
- evidence.

---

# 204. M5 tasks

Pelo menos:

```text
Learn task
Practice task
Challenge task
Transfer task
False Signal task
```

---

# 205. M5 Instructor content

Cada task deve possuir:

- objectives;
- prerequisites;
- hints;
- misconceptions;
- expected evidence.

---

# 206. M5 fading

Mesmo aluno deve receber menos suporte ao longo das tasks.

---

# 207. M5 exit

Um aluno consegue atravessar:

```text
Learn
→ Practice
→ Challenge
→ Transfer
```

com session/debrief/evidence.

---

# 208. M6 — Assessment Slice

Objetivo:

provar competência sem Tutor.

---

# 209. M6 assessment

Task desconhecida.

---

# 210. M6 rules

- assistance OFF;
- ground truth;
- opportunity model;
- Instructor Key;
- human review.

---

# 211. M6 result

Skills demonstrated / insufficient evidence.

---

# 212. M6 exit

Assessment gera evidence confiável sem contamination.

---

# 213. M7 — Integrated Alpha

Objetivo:

unir todos os blocos.

---

# 214. M7 flow

```text
Onboarding
↓
Home
↓
Session
↓
Tutor
↓
Evidence
↓
Debrief
↓
Progress
↓
Challenge
↓
Assessment
```

---

# 215. M7 hardening

- crash recovery;
- privacy;
- telemetry failures;
- incorrect observation corrections;
- assessment invalidation.

---

# 216. M7 dogfood

Equipe/testers internos usam.

---

# 217. M7 exit

Fluxo end-to-end funciona sem intervenção manual constante.

---

# 218. M8 — Controlled Pilot

Objetivo:

validar com learners reais.

---

# 219. M8 activities

- recruit;
- baseline;
- sessions;
- transfer;
- assessment;
- interviews;
- human review of Tutor/Assessor logs.

---

# 220. M8 critical questions

1. Tutor entrega demais?
2. Tutor fala demais?
3. Tutor deixa aluno preso demais?
4. Evidence faz sentido?
5. Learner entende score?
6. Ajuda realmente diminui?
7. Transfer aparece?
8. Observation incomoda?

---

# 221. M8 outcome

Lista priorizada de:

- pedagogical fixes;
- observation gaps;
- UX gaps;
- assessment errors.

---

# 222. M9 — V1 Release Candidate

Objetivo:

corrigir problemas críticos do pilot.

---

# 223. M9 scope freeze

Nenhuma feature grande nova.

---

# 224. M9 focus

- correctness;
- reliability;
- privacy;
- explainability;
- performance;
- onboarding.

---

# 225. M9 exit

V1 atende critérios definidos pelo Evaluation Framework.

---

# 226. Implementation order rationale

Ordem proposital:

```text
UX
before
complex backend

Observation
before
Tutor intelligence

Tutor
before
large curriculum

Evidence
before
scores

Vertical slice
before
breadth

Pilot
before
scale
```

---

# 227. Do not build Curriculum catalog first

Sem Tutor funcional, catálogo não valida produto.

---

# 228. Do not build Skill Graph first

Sem evidence real, graph é decoração.

---

# 229. Do not build voice first

Sem pedagogia funcional, voice apenas acelera resposta ruim.

---

# 230. Do not build multi-domain first

Sem vertical slice correto, breadth multiplica bugs.

---

# 231. Do not optimize scale first

V1 precisa provar learning outcome.

---

# 232. V1.1 candidate scope

Após V1:

```text
Voice
Teach-Back
Rich Skill Graph
Full Assessment Center
Expanded API
Postman support
More labs
Better disputes
Better revalidation
Light mode
```

---

# 233. V1.x candidate scope

```text
Infrastructure expansion
Reporting deeper
Placement multi-domain
Additional tool adapters
Curriculum explorer richer
Instructor tooling
```

---

# 234. V2 candidate scope

Possíveis:

```text
Active Directory
Cloud
Mobile
Specialist Tracks
Classroom
Instructor Dashboard
Mobile Companion
Team learning
```

---

# 235. V2 is conditional

Só expandir após core pedagógico ser validado.

---

# 236. Domain expansion gate

Novo domínio só entra quando:

- observation model é extensível;
- Tutor policy funciona;
- SkillEvidence funciona;
- domain content possui assessment;
- no regressão grave do core.

---

# 237. Tool expansion gate

Nova ferramenta só entra se:

- adiciona coverage real;
- não duplica ferramenta existente sem valor;
- structured telemetry é possível ou context suficiente;
- manutenção é aceitável.

---

# 238. Feature admission test

Antes de adicionar feature:

> **Isso melhora aprendizagem independente ou apenas aumenta sensação de produto completo?**

---

# 239. Feature rejection examples

Rejeitar inicialmente:

- avatars;
- achievements;
- social feed;
- complex analytics;
- AI auto-report;
- auto-exploit.

---

# 240. Scope creep protection

Qualquer nova P0 deve substituir ou deslocar outra.

---

# 241. V1 product owner rule

O roadmap deve proteger o vertical slice.

---

# 242. Known risks

Principais:

```text
R1 Observation quality
R2 Tutor overhelp
R3 Tutor underhelp
R4 Technical hallucination
R5 Stuck detection
R6 Evidence misclassification
R7 Score trust
R8 Privacy
R9 Latency
R10 Context explosion
R11 Lab overfitting
R12 Scope creep
```

---

# 243. R1 — Observation quality

Risco:

Tutor entende tela incorretamente.

Mitigação:

- structured telemetry;
- multisource;
- confidence;
- admit uncertainty.

---

# 244. R2 — Overhelp

Risco:

aluno completa mais, aprende menos.

Mitigação:

- H0–H5;
- minimal hint;
- decision logs;
- overhelp review.

---

# 245. R3 — Underhelp

Risco:

sessão vira frustração.

Mitigação:

- stuck detector;
- escalation;
- learner feedback.

---

# 246. R4 — Technical hallucination

Mitigação:

- evidence references;
- “não consigo confirmar”;
- structured state;
- review logs.

---

# 247. R5 — Stuck detection

Mitigação:

- behavior signals;
- not time-only;
- human calibration.

---

# 248. R6 — Evidence misclassification

Mitigação:

- Assessor confidence;
- human review;
- gold set;
- dispute.

---

# 249. R7 — Score trust

Mitigação:

- Why This Score;
- evidence drill-down;
- no black-box scoring.

---

# 250. R8 — Privacy

Mitigação:

- allowlist;
- shutter;
- redaction;
- visible observation.

---

# 251. R9 — Latency

Risco:

Tutor responde tarde demais.

Mitigação futura na arquitetura:

- event-driven processing;
- local/fast paths;
- intervention prioritization.

---

# 252. R10 — Context explosion

Risco:

sessões longas degradam raciocínio.

Mitigação:

- structured session state;
- event summaries;
- explicit hypotheses/findings.

---

# 253. R11 — Lab overfitting

Mitigação:

- transfer tasks;
- variants;
- different representations.

---

# 254. R12 — Scope creep

Mitigação:

este documento.

---

# 255. Kill criteria

Se após controlled pilot:

- Tutor continua entregando soluções;
- observation continua frequentemente errada;
- evidence não é confiável;
- aluno não mostra fading;
- users preferem desligar Tutor;

não expandir domínio.

Voltar ao core.

---

# 256. Pivot criteria

Pode ser necessário pivotar partes como:

- observation source;
- intervention timing;
- scope of supported tools;
- scoring UX.

Sem abandonar princípios educacionais.

---

# 257. Non-negotiable principles

Não pivotar para:

- autonomous pentest;
- engagement-first;
- XP-first;
- answer machine.

---

# 258. V1 data needed for future

Registrar desde início:

```text
session
intervention
hint
student response
stuck
evidence
assessor classification
human review
transfer
```

---

# 259. Do not collect data “just in case”

Privacy applies.

---

# 260. Analytics event philosophy

Eventos precisam responder pergunta real de produto/aprendizagem.

---

# 261. Learning outcome telemetry

Mais importante que click analytics.

---

# 262. Pilot review cadence

Revisar sessões amostradas frequentemente.

---

# 263. Human annotation

Primeiras versões dependem dela para calibration.

---

# 264. Gold dataset

Construir a partir de pilot.

---

# 265. Model/vendor neutrality

V1 Scope não depende de LLM específico.

---

# 266. Architecture should preserve replaceability

Tutor/Assessor podem mudar de model/provider.

---

# 267. Cost not primary V1 metric

Mas arquitetura precisa controlar uso.

---

# 268. Latency vs intelligence tradeoff

Será definido tecnicamente.

---

# 269. Local vs cloud

Também.

---

# 270. V1 technical architecture requirements derived from product

O futuro Technical Architecture precisa suportar:

1. desktop observation;
2. structured tool events;
3. session state;
4. Tutor policy;
5. Learner Model;
6. Assessment;
7. evidence artifacts;
8. privacy;
9. extensibility;
10. observability/debug.

---

# 271. Separation required

Arquitetura deve preservar conceitualmente:

```text
Observer
Tutor
Assessor
Learner Model
Curriculum
Evidence
UI
```

---

# 272. No monolithic “AI agent” requirement

O produto não deve depender de uma única conversa LLM fazendo tudo.

---

# 273. Deterministic policy boundaries

Safety, scope, gates e score math precisam ser controláveis.

---

# 274. Generative boundaries

LLM pode ajudar em:

- explanation;
- semantic interpretation;
- feedback;
- Socratic questions.

---

# 275. V1 lab runtime requirements

Labs precisam ser:

- reproducible;
- resettable;
- instrumentable;
- isolated;
- authorized.

---

# 276. Lab reset

Importante para repeat/transfer.

---

# 277. Lab state

Assessment precisa saber ground truth e task state.

---

# 278. Lab variants

Podem chegar em V1.1.

---

# 279. First user journey V1

```text
Install/Open
↓
Onboarding
↓
Choose beginner
↓
Learn HTTP/Identity
↓
Practice Authorization
↓
Need H2
↓
Debrief
↓
Practice variation
↓
Need H1
↓
Challenge
↓
H0
↓
Transfer API
↓
Assessment
↓
Progress explanation
```

---

# 280. First experienced user journey

```text
Open
↓
Quick diagnostic
↓
Skip foundations
↓
Challenge Authorization
↓
Weak Evidence handling detected
↓
Practice Evidence
↓
Assessment
```

---

# 281. First failure journey

```text
Observation loses tool context
↓
UI signals degraded state
↓
Session continues
↓
Assessment disabled / evidence reduced
↓
No fake score
```

---

# 282. First privacy journey

```text
User opens blocked app
↓
No capture
↓
Indicator remains clear
↓
Session resumes
```

---

# 283. First false-positive journey

```text
Suspicious response
↓
Hypothesis
↓
Control
↓
Rejected
↓
False Positive
↓
Positive evidence for Validation
```

---

# 284. First fading journey

```text
Task 1 H3
Task 2 H2
Task 3 H1
Task 4 H0
```

Essa sequência é um dos maiores sinais de valor do produto.

---

# 285. First transfer journey

```text
Web object authorization
↓
API resource authorization
```

---

# 286. V1 quality bar

Brother Eye não pode parecer:

- demo de LLM;
- chatbot acoplado;
- scanner narrado;
- dashboard acadêmico.

---

# 287. It must feel like

> um Tutor técnico observando prática real.

---

# 288. Definition of “usable V1”

Um learner consegue usar sem desenvolvedor ao lado.

---

# 289. Definition of “pilot-ready”

Equipe consegue:

- instalar/preparar;
- iniciar lab;
- observar session;
- revisar logs;
- corrigir evidence;
- resetar lab.

---

# 290. Definition of “release-ready”

Além de pilot-ready:

- reliability aceitável;
- privacy clara;
- onboarding funcional;
- no critical pedagogical failure known;
- Evaluation Framework gates satisfied.

---

# 291. Roadmap dependency graph

```text
Product Specs
↓
Technical Architecture
↓
UX Prototype
↓
Observation Foundation
↓
Tutor
↓
Evidence
↓
Curriculum Slice
↓
Assessment
↓
Integrated Alpha
↓
Pilot
↓
V1
```

---

# 292. UX prototype can partially overlap architecture

Porque usa mock data.

---

# 293. Architecture cannot wait until after implementation

Obrigatório antes de production code.

---

# 294. Evaluation Framework before pilot

Obrigatório.

---

# 295. Documentation after this file

Próximo:

```text
BROTHER_EYE_TECHNICAL_ARCHITECTURE.md
```

Depois:

```text
BROTHER_EYE_EVALUATION_FRAMEWORK.md
```

---

# 296. Why architecture next

Agora já sabemos:

- o que o produto é;
- o que ensina;
- como ensina;
- como mede;
- como parece;
- o que entra no V1.

Logo arquitetura pode ser escolhida contra requisitos reais.

---

# 297. Why not architecture earlier

Evita escolher stack para features que depois seriam cortadas.

---

# 298. V1 Scope matrix

## Core pedagogy

| Capability | V1 |
|---|---|
| H0–H5 | Yes |
| SILENT | Yes |
| Stuck Detector | Yes |
| Fading | Yes |
| Misconception hooks | Yes |
| Teach-Back full | No |
| Voice | No |

---

# 299. V1 Scope matrix — Learning

| Capability | V1 |
|---|---|
| Foundations subset | Yes |
| Web Authorization | Yes |
| API Authorization transfer | Yes |
| Infrastructure full | No |
| AD | No |
| Cloud | No |
| Specialist Track | No |

---

# 300. V1 Scope matrix — Product

| Capability | V1 |
|---|---|
| Home | Yes |
| Session HUD | Yes |
| Tutor Panel | Yes |
| Hypothesis | Yes |
| Evidence Drawer | Yes |
| Debrief | Yes |
| Basic Progress | Yes |
| Rich Skill Graph | No |
| Mobile | No |

---

# 301. V1 Scope matrix — Assessment

| Capability | V1 |
|---|---|
| SkillEvidence | Yes |
| EvidenceGroup | Yes |
| R0–R5 | Yes |
| Instructor Key | Yes |
| Assessment Session | Yes |
| Human Review | Yes |
| Full Assessment Center | No |
| Auto-promotion full | No |

---

# 302. V1 Scope matrix — Privacy

| Capability | V1 |
|---|---|
| Observation Indicator | Yes |
| Privacy Shutter | Yes |
| App Allowlist | Yes |
| Secret Redaction baseline | Yes |
| Advanced retention control | Later |

---

# 303. V1 Scope matrix — Visual

| Capability | V1 |
|---|---|
| Dark-first | Yes |
| shadcn foundation if compatible | Yes |
| Product components | Yes |
| Light mode polished | Later |
| Complex animation | No |
| Illustrations | No |

---

# 304. Decision log — scope

## DEC-V1-001

Vertical slice first.

## DEC-V1-002

Web/HTTP/Authorization is primary.

## DEC-V1-003

API is transfer extension.

## DEC-V1-004

Infrastructure full deferred.

## DEC-V1-005

Voice deferred.

## DEC-V1-006

Rich Skill Graph deferred.

## DEC-V1-007

Assessment minimal but real.

## DEC-V1-008

Privacy is P0.

## DEC-V1-009

Evidence is P0.

## DEC-V1-010

No autonomous pentest.

---

# 305. Decision log — progression

## DEC-V1-011

V1 must support Intern → Junior meaningfully.

## DEC-V1-012

Junior → Mid-Level may be partial/provisional.

## DEC-V1-013

Senior/Specialist are not release requirements.

---

# 306. Decision log — labs

## DEC-V1-014

Curated labs first.

## DEC-V1-015

False signal task mandatory.

## DEC-V1-016

Transfer task mandatory.

## DEC-V1-017

Assessment task with ground truth mandatory.

---

# 307. Decision log — Tutor

## DEC-V1-018

All intervention states remain.

## DEC-V1-019

Stuck Detector required.

## DEC-V1-020

Tutor Decision Record required.

---

# 308. Decision log — data

## DEC-V1-021

SkillEvidence ledger is source of truth.

## DEC-V1-022

No score without evidence.

## DEC-V1-023

Human review remains in pilots.

---

# 309. Decision log — UX

## DEC-V1-024

Session is primary surface.

## DEC-V1-025

Tutor remains peripheral.

## DEC-V1-026

Why This Score required.

## DEC-V1-027

Privacy Shutter required.

---

# 310. V1 anti-scope

Se alguém propõe:

> “Já que estamos fazendo X, podemos adicionar Y.”

Perguntar:

1. ajuda a provar H-V1-001 a H-V1-008?
2. é necessário para vertical slice?
3. bloqueia pilot se ausente?

Se não:

defer.

---

# 311. Example defer decision

Feature:

`Voice wake word`

Resultado:

não bloqueia core pedagógico.

→ V1.1.

---

# 312. Example accept decision

Feature:

`Privacy Shutter`

Sem isso observation cria trust/privacy risk.

→ P0.

---

# 313. Example accept decision

Feature:

`False Signal Lab`

Sem isso não testamos validation contra expectation bias.

→ P0.

---

# 314. Example defer decision

Feature:

`AD Specialist Track`

Não valida core V1.

→ V2 candidate.

---

# 315. Example reject decision

Feature:

`Auto-exploit target`

Contraria student-in-loop.

→ Reject.

---

# 316. Roadmap governance

Cada milestone deve possuir:

- owner;
- entry criteria;
- deliverables;
- exit criteria;
- risks.

Owner técnico será definido depois.

---

# 317. Milestone gates

Não avançar apenas porque “feature foi codada”.

Precisa satisfazer exit criteria.

---

# 318. Bug priority philosophy

Mais críticos:

1. safety/privacy;
2. wrong teaching;
3. wrong assessment;
4. session loss;
5. UX polish.

---

# 319. Pedagogical bug severity

Exemplo Critical:

Tutor entrega solução em Challenge repetidamente.

---

# 320. Assessment bug severity

Critical:

score altera sem evidence.

---

# 321. Observation bug severity

Critical:

Brother Eye afirma que aluno fez algo que não fez e usa isso para assessment.

---

# 322. UX bug severity

High:

Privacy Shutter não é encontrável.

---

# 323. Visual polish severity

Lower:

spacing inconsistency sem impacto funcional.

---

# 324. Performance priority

Session interaction deve parecer responsiva.

---

# 325. Tutor latency

Evaluation Framework deve definir tolerâncias.

---

# 326. Long-running assessment analysis

Pode ocorrer após sessão, mas UX deve ser transparente.

---

# 327. Data migration

Mesmo V1 deve versionar:

- curriculum;
- tutor policy;
- assessment;
- scoring.

---

# 328. V1 policy versions

Registrar:

```text
curriculum_version
tutor_policy_version
assessment_model_version
scoring_model_version
```

---

# 329. Why this matters early

Pilot data só é comparável se versões forem conhecidas.

---

# 330. Developer tooling

Technical Architecture deve prever:

- replay de session;
- synthetic events;
- Tutor decision inspection;
- Assessor inspection.

---

# 331. Session replay

É importante para debugging pedagógico.

---

# 332. Replay is not learner feature P0

Pode ser internal tooling.

---

# 333. Internal human review console

Pode ser simples.

Precisa mostrar:

- events;
- Tutor interventions;
- SkillEvidence;
- assessor rationale.

---

# 334. Product telemetry separation

Não misturar raw technical telemetry com analytics.

---

# 335. V1 launch audience

Inicialmente:

- controlled users;
- not mass consumer launch.

---

# 336. Why controlled

Precisamos calibrar:

- pedagogy;
- assessment;
- privacy;
- observation.

---

# 337. Mass launch gate

Somente após controlled pilot.

---

# 338. Documentation gate

Antes de pilot:

- user privacy explanation;
- lab scope;
- assessment rules;
- known limitations.

---

# 339. Known limitations disclosure

V1 deve dizer claramente:

- supported domains;
- supported tools;
- partial progression;
- assessment scope.

---

# 340. No marketing overclaim

Não anunciar:

> “aprenda todo pentest do zero ao Specialist”

enquanto V1 só cobre slice inicial.

---

# 341. V1 positioning

Melhor:

> **AI Pentest Tutor para prática guiada de fundamentos, Web/API e metodologia, com evidence de aprendizagem.**

Copy final fica para marketing futuro.

---

# 342. Core product promise

> Brother Eye observa sua prática e reduz sua ajuda conforme você aprende.

---

# 343. V1 must prove that promise

Nada é mais importante.

---

# 344. Pre-architecture checklist

Antes do Technical Architecture:

- [x] learning principles;
- [x] competency model;
- [x] Tutor pedagogy;
- [x] assessment model;
- [x] curriculum;
- [x] student UX;
- [x] visual system;
- [ ] V1 scope approval.

---

# 345. Post-scope sequence

Após aprovação deste documento:

```text
1. Technical Architecture
2. Evaluation Framework
3. Implementation
```

---

# 346. Implementation should not start from whole curriculum

Começar do vertical slice.

---

# 347. First engineering epic

Conceitualmente:

> **Session Observation Vertical Slice**

---

# 348. Second engineering epic

> **Adaptive Tutor Vertical Slice**

---

# 349. Third engineering epic

> **Skill Evidence Vertical Slice**

---

# 350. Fourth engineering epic

> **Curated Authorization Learning Journey**

---

# 351. Fifth engineering epic

> **Assessment & Transfer**

---

# 352. Sixth engineering epic

> **Pilot Hardening**

---

# 353. No engineering estimate in this document

Estimativas dependem da arquitetura.

---

# 354. No calendar dates yet

Datas reais devem ser definidas após arquitetura e capacidade da equipe.

---

# 355. Roadmap is dependency-based

Não deadline theater.

---

# 356. Definition of Done — feature

Uma feature não está pronta quando apenas renderiza.

Precisa:

- function;
- error state;
- privacy;
- telemetry;
- accessibility where applicable;
- testability.

---

# 357. Definition of Done — Tutor behavior

Precisa:

- correct trigger;
- appropriate H-level;
- rationale;
- outcome log;
- replay.

---

# 358. Definition of Done — Skill Evidence

Precisa:

- provenance;
- rubric;
- assistance;
- quality;
- confidence;
- audit.

---

# 359. Definition of Done — Lab

Precisa:

- reset;
- objective;
- ground truth if assessment;
- observability;
- known valid path;
- no accidental spoiler.

---

# 360. Definition of Done — Assessment

Precisa:

- integrity;
- ground truth;
- no Tutor help;
- reviewability;
- invalidation handling.

---

# 361. Definition of Done — Privacy

Precisa:

- visible;
- controllable;
- verifiable.

---

# 362. V1 exclusions summary

Não construir agora:

- full infrastructure curriculum;
- AD;
- Cloud;
- Mobile;
- Wireless;
- voice;
- full Skill Graph;
- Specialist Tracks;
- multi-user;
- social;
- gamification;
- auto pentest;
- bug bounty integrations;
- public targets;
- enterprise admin;
- mobile app.

---

# 363. V1 inclusions summary

Construir:

- desktop-first experience;
- Web/HTTP/Authorization vertical slice;
- API transfer;
- curated labs;
- Learn/Practice/Challenge/Review;
- basic assessment;
- observation;
- Tutor policy;
- hints;
- stuck;
- evidence;
- learner model;
- debrief;
- basic progress;
- score explainability;
- privacy;
- safety.

---

# 364. Ultimate V1 question

Quando um usuário termina o pilot, devemos conseguir responder:

> **Ele consegue fazer algo sozinho agora que antes só conseguia fazer com ajuda?**

Se não conseguirmos responder isso com evidence:

V1 falhou.

---

# 365. Critérios de aprovação

Este documento está aprovado se houver concordância de que:

- V1 é vertical slice, não miniatura da visão completa;
- Web/HTTP/Authorization é o foco inicial;
- API entra como transfer;
- Infrastructure full fica depois;
- V1 foca Intern → Junior;
- Voice fica V1.1;
- Rich Skill Graph fica depois;
- Privacy e Evidence são P0;
- Assessment mínimo real entra;
- curated labs entram;
- false signal e transfer são obrigatórios;
- roadmap começa por observação e pedagogia;
- arquitetura vem depois deste scope;
- piloto é controlado antes de escala.

---

# 366. Próximo documento

Após aprovação:

`docs/04-architecture/BROTHER_EYE_TECHNICAL_ARCHITECTURE.md`

Ele deverá transformar os requisitos deste V1 em decisões técnicas sobre:

- application architecture;
- desktop shell;
- frontend;
- shadcn compatibility;
- observation layer;
- telemetry;
- session state;
- Tutor Engine;
- Assessor;
- Learner Model;
- evidence storage;
- privacy;
- LLM/model strategy;
- local vs cloud;
- plugin/tool adapters;
- lab runtime;
- security;
- testing;
- observability;
- extensibility.

---

# 367. Regra-mãe

> **O V1 do Brother Eye não precisa provar que consegue ensinar todo pentest. Precisa provar que consegue ensinar uma competência real de forma observável, adaptativa, transferível e progressivamente independente.**

---

## Status

**Draft v0.1**

Este documento deve ser validado conceitualmente antes da Technical Architecture.

# Brother Eye — Visual Design System

**Documento:** `BROTHER_EYE_VISUAL_DESIGN_SYSTEM.md`  
**Status:** Draft v0.1  
**Dependências:**  
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`
- `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`
- `BROTHER_EYE_CURRICULUM_V0.1.md`
- `BROTHER_EYE_STUDENT_EXPERIENCE_AND_UX.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define a identidade visual e o sistema de interface do Brother Eye.

Ele especifica:

- direção visual;
- princípios de composição;
- shadcn/ui como component foundation preferencial;
- tokens visuais;
- tipografia;
- densidade;
- espaçamento;
- radius;
- borders;
- elevation;
- ícones;
- cores;
- estados semânticos;
- motion;
- feedback visual;
- HUD;
- Tutor Panel;
- Skill Graph;
- Evidence;
- Hypothesis;
- Finding Lifecycle;
- Assessment;
- Privacy;
- Progress;
- responsive behavior;
- padrões de acessibilidade;
- componentes específicos do Brother Eye;
- anti-patterns visuais.

Este documento não fixa ainda:

- framework frontend;
- runtime;
- bundler;
- renderer desktop;
- biblioteca de gráficos;
- implementação técnica do design system;
- stack completa;
- arquitetura do produto.

---

# 2. Decisão de foundation

Fica estabelecido:

> **shadcn/ui é a foundation preferencial de componentes do Brother Eye, desde que a futura arquitetura frontend seja compatível.**

Se a arquitetura escolhida posteriormente não for compatível com shadcn/ui, os princípios e componentes definidos neste documento continuam válidos e devem ser reproduzidos em tecnologia equivalente.

---

# 3. O que shadcn/ui representa neste projeto

shadcn/ui deve ser tratado como:

- base de componentes;
- referência de ergonomia;
- primitive foundation;
- ponto de partida para acessibilidade;
- accelerator de implementação.

Não deve ser tratado como:

- identidade visual pronta;
- tema final;
- produto visual completo.

---

# 4. Brother Eye deve ter Design System próprio

A hierarquia é:

```text
Brother Eye Design System
├── Visual Language
├── Design Tokens
├── Semantic States
├── Interaction Patterns
├── Product-specific Components
└── Component Foundation
    └── shadcn/ui
```

---

# 5. Filosofia visual

Brother Eye deve parecer:

- técnico;
- profissional;
- preciso;
- moderno;
- silencioso;
- confiável;
- denso quando necessário;
- simples por padrão.

---

# 6. O que Brother Eye NÃO deve parecer

Evitar estética:

- hacker movie;
- neon verde;
- Matrix;
- cyberpunk exagerado;
- terminal fake;
- HUD militar;
- caveiras;
- hexágonos decorativos;
- glitch;
- scanlines;
- grids futuristas;
- excesso de glow;
- excesso de glassmorphism.

---

# 7. Referências de linguagem visual

Direção conceitual aproximada:

```text
Linear
Raycast
Cursor
GitHub
modern Burp-like technical utility
professional developer tools
```

Isso não significa copiar nenhum produto.

O objetivo é compartilhar qualidades:

- clareza;
- densidade controlada;
- foco;
- velocidade;
- profissionalismo.

---

# 8. Dark-first

Brother Eye deve ser desenhado **dark-first**.

Motivos:

- uso prolongado em ambiente desktop;
- coexistência com IDEs, terminais, Burp e browsers em dark mode;
- melhor integração visual em contexto técnico.

---

# 9. Light mode

Light mode deve existir futuramente ou quando a plataforma exigir.

Mas não deve comprometer:

- contraste;
- hierarquia;
- estados semânticos;
- consistência.

---

# 10. Dark-first não significa preto absoluto

Evitar grandes áreas em:

`#000000`

Preferir superfícies com diferença sutil de luminância.

---

# 11. Hierarquia de superfícies

Modelo:

```text
Canvas
↓
Panel
↓
Card
↓
Elevated / Overlay
↓
Selected / Interactive
```

---

# 12. Surface tokens conceituais

Sem fixar valores finais:

```text
surface.canvas
surface.panel
surface.card
surface.raised
surface.overlay
surface.hover
surface.selected
```

---

# 13. Text tokens

```text
text.primary
text.secondary
text.muted
text.disabled
text.inverse
text.code
```

---

# 14. Border tokens

```text
border.subtle
border.default
border.strong
border.focus
border.semantic
```

---

# 15. Accent

O produto deve possuir **um accent principal controlado**.

Não utilizar accent em tudo.

Accent serve para:

- foco;
- seleção;
- CTA;
- elemento interativo atual;
- status ativo relevante.

---

# 16. Semantic colors

Estados semânticos devem possuir tokens próprios.

```text
semantic.success
semantic.warning
semantic.danger
semantic.info
semantic.neutral
semantic.assessment
semantic.observation
```

---

# 17. Cor não pode ser única portadora de significado

Sempre combinar cor com:

- label;
- ícone;
- texto;
- shape;
- pattern.

---

# 18. Finding status colors

Estados:

```text
Observation
Hypothesis
Candidate
Reproduced
Impact Confirmed
Validated
False Positive
Inconclusive
Reported
```

Não usar gradiente “quanto mais vermelho, mais vulnerável” de forma simplista.

---

# 19. Validation semantics

`Validated` pode usar destaque forte.

`Candidate` deve permanecer visualmente cauteloso.

`Inconclusive` deve parecer neutro/ambíguo.

`False Positive` não deve parecer “erro grave”.

---

# 20. Assessment semantics

Assessment Mode precisa de identidade visual distinta do Practice.

Pode usar:

- badge próprio;
- border contextual;
- iconografia;
- redução de elementos de ajuda.

Evitar transformar tela em ambiente “de prova escolar”.

---

# 21. Privacy semantics

Observation active deve ser inequívoco.

Privacy Shutter também.

Exemplo conceitual:

```text
● Observação ativa
■ Observação pausada
```

Sem depender somente da cor.

---

# 22. Tutor state semantics

Estados user-facing:

```text
Observando
Analisando
Perguntando
Ensinando
Checkpoint
Pausado
```

---

# 23. Typography

A tipografia deve privilegiar:

- legibilidade;
- neutralidade;
- boa renderização em desktop;
- clareza em tamanhos pequenos;
- números tabulares quando apropriado.

---

# 24. Font family

A escolha final fica para implementação.

Preferências:

- sans-serif moderna para UI;
- monospace para:
  - comandos;
  - requests;
  - responses;
  - identifiers;
  - code;
  - raw evidence.

---

# 25. Typographic hierarchy

Exemplo:

```text
Display / rare
Page Title
Section Title
Card Title
Body
Secondary
Caption
Code
```

---

# 26. Avoid oversized typography

Brother Eye é ferramenta de trabalho.

Não usar headlines gigantes típicas de landing pages dentro do app.

---

# 27. Text density

Interfaces técnicas exigem densidade maior que produto consumidor comum.

Mas:

- informação secundária deve ser colapsável;
- detalhes avançados sob demanda;
- linha visual deve permanecer limpa.

---

# 28. Spacing system

Utilizar escala consistente.

Preferência conceitual:

```text
4
8
12
16
24
32
48
```

Não significa pixels definitivos, mas uma escala reduzida e previsível.

---

# 29. Density modes

Brother Eye pode futuramente suportar:

```text
Comfortable
Compact
```

Default:

`Compact / balanced`

para desktop técnico.

---

# 30. Radius

Preferir radius moderado.

Evitar:

- cards excessivamente arredondados;
- estética “mobile banking”;
- pill para tudo.

---

# 31. Radius hierarchy

Conceitualmente:

```text
xs — tags / micro controls
sm — buttons / inputs
md — cards
lg — dialogs / large surfaces
```

---

# 32. Borders

Brother Eye deve depender mais de:

- hierarchy;
- spacing;
- subtle borders;

e menos de shadows pesadas.

---

# 33. Shadows

Usar apenas para:

- popovers;
- modals;
- floating HUD;
- detached overlays.

---

# 34. No decorative shadows

Evitar “premium SaaS glow”.

---

# 35. Iconography

Ícones devem ser:

- line-based;
- simples;
- consistentes;
- semanticamente claros.

---

# 36. Icon foundation

Preferência futura:

> **Lucide ou conjunto visual equivalente compatível com shadcn/ui.**

Não é obrigação arquitetural neste estágio.

---

# 37. Icons do produto

Brother Eye-specific icons podem representar:

- Tutor;
- Observation;
- Hypothesis;
- Evidence;
- Finding;
- Assessment;
- Skill;
- Transfer;
- Privacy.

Devem permanecer simples.

---

# 38. Motion

Motion deve ser funcional.

Usar para:

- state transition;
- panel opening;
- evidence association;
- status update;
- focus.

---

# 39. Avoid decorative motion

Não usar:

- ambient particles;
- continuous pulsing;
- animated backgrounds;
- fake scanning effects.

---

# 40. Motion duration

Curta.

Brother Eye deve parecer rápido.

---

# 41. Reduced motion

Respeitar preferência do sistema.

---

# 42. Component foundation — shadcn/ui

Componentes base preferenciais:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Tabs
Tooltip
Popover
Dropdown Menu
Context Menu
Command
Dialog
Alert Dialog
Sheet
Drawer
Card
Badge
Table
Accordion
Collapsible
Progress
Separator
Scroll Area
Toast / Sonner
Skeleton
Sidebar
Breadcrumb
Form primitives
```

---

# 43. Component customization rule

Nenhum componente shadcn deve ser usado sem considerar:

- density;
- Brother Eye tokens;
- semantic states;
- technical content;
- accessibility.

---

# 44. No default-demo look

Se alguém olhar o produto, ele não deve parecer:

> “um projeto shadcn com tema escuro.”

---

# 45. Product-specific component taxonomy

Brother Eye precisa de componentes próprios.

Categorias:

```text
Tutor
Session
Learning
Evidence
Finding
Assessment
Progress
Privacy
```

---

# 46. TutorStateIndicator

Mostra estado atual do Tutor.

Props conceituais:

```text
state
label
confidence?
reason?
```

---

# 47. TutorStateIndicator — visual

Deve ser discreto.

Exemplo:

```text
● Observando
```

ou:

```text
◇ Perguntando
```

---

# 48. TutorHUD

Componente central.

Conteúdo máximo:

- mode;
- objective;
- hypothesis;
- tutor state;
- critical evidence gap;
- hint action.

---

# 49. TutorHUD — compact mode

```text
PRACTICE
Authorization

● Observando

[Hint]
```

---

# 50. TutorHUD — expanded mode

Inclui:

- current objective;
- hypothesis;
- evidence gap;
- open questions.

---

# 51. TutorHUD — design rule

Nunca dominar a tela.

---

# 52. SessionObjective

Estrutura:

```text
Primary objective
Current sub-objective
```

---

# 53. HypothesisCard

Campos:

```text
Hypothesis
Status
Confidence optional
Evidence count
Next test optional
```

---

# 54. HypothesisCard states

```text
Open
Testing
Supported
Weakened
Rejected
Inconclusive
```

---

# 55. HypothesisCard rule

Visualmente nunca deve parecer Finding validado.

---

# 56. HypothesisBoard

Deve funcionar bem com poucas hipóteses.

Evitar kanban grande por padrão.

---

# 57. EvidenceCard

Campos:

```text
Role
Source
Timestamp
Summary
Association
```

---

# 58. Evidence role badge

```text
BASELINE
TRIGGER
CONTROL
REPRODUCTION
IMPACT
REMEDIATION TEST
```

---

# 59. EvidenceCompleteness

Componente compacto.

Exemplo:

```text
Baseline       ✓
Trigger        ✓
Control        —
Reproduction   ✓
Impact         —
```

---

# 60. Missing evidence

Usar `—` ou label de pendência.

Não usar vermelho automaticamente.

Ausência pode ser normal durante investigação.

---

# 61. EvidenceDrawer

Side surface para:

- evidence;
- artifacts;
- associations;
- completeness.

---

# 62. FindingCard

Campos:

```text
Title
State
Affected asset
Evidence completeness
Confidence
Severity only when justified
```

---

# 63. FindingLifecycle

Componente visual importante.

```text
Observation
→ Hypothesis
→ Candidate
→ Reproduced
→ Impact
→ Validated
→ Reported
```

---

# 64. FindingLifecycle — states

Cada etapa deve mostrar:

- completed;
- current;
- pending;
- invalidated where applicable.

---

# 65. False Positive branch

FindingLifecycle precisa suportar:

```text
Candidate
→ Rejected
→ False Positive
```

---

# 66. Inconclusive branch

Também:

```text
Candidate
→ Inconclusive
```

---

# 67. No vulnerability celebration UI

Evitar:

- confetti;
- flashing red;
- “VULNERABILITY FOUND!”;
- gamified exploit popups.

---

# 68. SkillCard

Campos:

```text
Human-readable skill
Mastery
Confidence
Learning state
Promotion relevance
```

---

# 69. SkillCard compact

```text
Autorização em nível de objeto
75 · Confiança alta
Independent
```

---

# 70. SkillCard expanded

Dimensões:

```text
Knowledge
Reasoning
Execution
Autonomy
Transfer
Evidence
```

---

# 71. SkillGraph

Visualização de relações entre skills.

Requisitos:

- zoom/pan;
- filters;
- state;
- prerequisites;
- domain;
- blocker.

---

# 72. SkillGraph visual hierarchy

Core skills mais proeminentes.

Specialized menos proeminentes até relevantes.

---

# 73. SkillGraph state encoding

Não depender só de cor.

Pode usar:

- fill;
- border;
- icon;
- text;
- badge.

---

# 74. SkillGraph anti-pattern

Não criar árvore gigantesca aberta inteira.

Usar progressive disclosure.

---

# 75. PromotionGate

Componente:

```text
Gate
Status
Current value
Requirement
Evidence summary
Action
```

---

# 76. PromotionGate status

```text
PASS
IN PROGRESS
BLOCKED
UNKNOWN
```

---

# 77. PromotionGate blocked

Deve explicar motivo de forma direta.

---

# 78. StageProgress

Exemplo:

```text
Junior — 68/100
```

Visual discreto.

Não parecer XP bar.

---

# 79. StageProgress rule

Progress bar pode existir, mas acompanhada de:

- gates;
- blockers;
- meaning.

---

# 80. ConfidenceIndicator

Exemplo:

```text
Confiança alta
```

Tooltip:

> Baseado em múltiplas evidências independentes e recentes.

---

# 81. WhyThisScorePanel

Componente obrigatório.

Estrutura:

```text
Summary
Satisfied gates
In-progress gates
Blockers
Recent evidence
Calculation
```

---

# 82. Calculation disclosure

Detalhes matemáticos ficam em nível avançado.

---

# 83. AssessmentCard

Campos:

```text
Title
Target level
Domains
Difficulty
Estimated duration
Tutor assistance
Status
```

---

# 84. AssessmentModeHeader

Deve deixar evidente:

```text
EXAM
Tutor assistance: OFF
Observation: ON
```

---

# 85. Assessment state colors

Não usar danger color só porque é prova.

---

# 86. AssessmentResult

Estrutura visual:

```text
Demonstrated
Insufficient Evidence
Missed Opportunities
Promotion Impact
Next Steps
```

---

# 87. MisconceptionCard

Campos:

```text
Concept
Status
Why detected
Evidence
How to resolve
```

---

# 88. Misconception visual rule

Evitar estética de erro disciplinar.

É learning state.

---

# 89. PrivacyIndicator

Sempre presente quando observação ativa.

---

# 90. PrivacyShutter

Controle de alta prioridade.

Deve ser:

- fácil de encontrar;
- rápido;
- inequívoco.

---

# 91. PrivacyShutter visual

Estado ON/OFF deve ser muito claro.

---

# 92. ObservationSources

Exemplo:

```text
Observando:
Burp
Browser — Lab
Terminal
```

---

# 93. Blocked source

Exemplo:

```text
Password Manager
Blocked
```

---

# 94. SessionTimeline

Mostrar eventos pedagógicos relevantes.

---

# 95. Timeline density

Compacta.

Não exibir raw event stream.

---

# 96. Timeline event categories

```text
Hypothesis
Tutor intervention
Evidence
Finding
Assessment
Reflection
```

---

# 97. Chat/Tutor Panel

Baseado em componentes de conversa, mas não deve parecer chatbot genérico.

---

# 98. Tutor message hierarchy

Mensagens podem possuir tipo visual:

```text
Question
Hint
Explanation
Warning
Evidence Checkpoint
Review
```

---

# 99. Question message

Visual leve.

---

# 100. Warning message

Maior contraste.

---

# 101. Evidence Checkpoint message

Estruturada, operacional.

---

# 102. Code/request blocks

Precisam de:

- monospace;
- copy affordance;
- wrap/scroll apropriado;
- syntax distinction quando possível.

---

# 103. Request/response comparison

Brother Eye precisa de componente específico para diff técnico.

---

# 104. TechnicalDiff

Pode comparar:

- request A vs B;
- response A vs B;
- headers;
- body;
- status.

---

# 105. Diff semantics

Destaque apenas diferenças relevantes.

---

# 106. Baseline comparison

Visualmente primeiro-class.

---

# 107. Table design

Tabelas devem ser:

- compactas;
- legíveis;
- sort/filter quando necessário;
- sem decoração excessiva.

---

# 108. Empty states

Professionais e acionáveis.

---

# 109. Skeletons

Usar quando carregamento real.

Não usar skeleton para esconder incerteza de assessment.

---

# 110. Loading states

Exemplo:

```text
Consolidando evidence...
```

---

# 111. Unknown states

Não usar skeleton eterno.

Mostrar:

`Ainda não avaliado`

---

# 112. Toasts

Somente para eventos curtos:

- saved;
- paused;
- reconnected.

Não usar toast para conteúdo pedagógico importante.

---

# 113. Dialogs

Reservar para:

- destructive;
- privacy;
- assessment start;
- scope confirmation.

---

# 114. Sheets/Drawers

Preferíveis para:

- evidence;
- skill details;
- Tutor;
- session context.

---

# 115. Command Palette

Pode ser muito útil em desktop.

Ações:

```text
Start Practice
Ask Hint
Pause Observation
Open Skill
Capture Evidence
Open Review
```

---

# 116. Keyboard-first

Produto desktop técnico deve suportar navegação eficiente por teclado.

---

# 117. Focus states

Sempre visíveis.

---

# 118. Selected states

Não depender apenas de background color.

---

# 119. Accessibility

WCAG-equivalent good practices devem ser baseline.

---

# 120. Contrast

Texto principal e controles precisam de contraste forte.

---

# 121. Muted text

Não deixar muted tão apagado que se torne ilegível.

---

# 122. Code contrast

Monospace precisa manter contraste alto.

---

# 123. Touch targets

Mesmo desktop, controles pequenos não devem ser difíceis de clicar.

---

# 124. Responsive strategy

Desktop-first.

Prioridades:

```text
Large desktop
Laptop
Small laptop
Tablet secondary
Mobile companion future
```

---

# 125. Desktop layouts

Principalmente:

- 1366x768;
- 1440p;
- multi-monitor.

---

# 126. Small laptop

HUD e Tutor Panel precisam colapsar corretamente.

---

# 127. Multi-monitor

Floating Tutor HUD pode ser movido.

---

# 128. Window resizing

Componentes devem reflow, não truncar informação crítica.

---

# 129. Sidebar

Pode usar sidebar compacta no app principal.

---

# 130. Sidebar sections

Sugestão:

```text
Home
Aprender
Sessões
Progresso
Assessments

Secondary
Evidence
Settings
Privacy
```

---

# 131. Sidebar density

Ícone + label.

Collapsible.

---

# 132. Topbar

Mínima.

Pode conter:

- current context;
- observation state;
- user controls.

---

# 133. Page shell

Evitar headers gigantes.

---

# 134. Home visual hierarchy

Primeiro:

`Next Best Learning Action`

Depois:

`Global Level`

Depois:

`Blockers`

Depois:

`Domains`

---

# 135. Home primary card

Não precisa ser visualmente enorme.

Deve ser claramente dominante.

---

# 136. Domain cards

Compactos.

---

# 137. Dashboard charts

Usar apenas quando ajudam decisão.

---

# 138. Avoid donut chart spam

Especialmente para skills.

---

# 139. Better than donut

Texto + progress + blockers.

---

# 140. Data visualization philosophy

Mostrar relações e tendência, não decorar.

---

# 141. Mastery trend

Pode ser sparkline discreta.

---

# 142. Confidence trend

Pode ser label / state change.

---

# 143. Skill dimensions

Horizontal bars podem funcionar.

---

# 144. Score precision

Mostrar inteiro:

`75`

Não:

`74.75`

na UI principal.

---

# 145. Technical detail panel

Pode mostrar cálculo completo.

---

# 146. Status badges

Usar com parcimônia.

---

# 147. No badge soup

Não colocar cinco badges em cada card.

---

# 148. Priority badges

Apenas estados realmente relevantes.

---

# 149. Labels

User-facing em português-BR.

---

# 150. Technical identifiers

Advanced mode pode mostrar Skill IDs em inglês/técnicos.

---

# 151. Code casing

Technical IDs:

`API.Authorization.ObjectLevel`

UI:

`Autorização em nível de objeto`

---

# 152. Progression titles

Sempre:

```text
Intern
Junior
Mid-Level
Senior
Specialist
```

---

# 153. Visual differentiation by level

Não criar tema totalmente diferente por nível.

---

# 154. Intern visual behavior

Mais:

- explanatory labels;
- helper text;
- checklists;
- visible guidance.

---

# 155. Junior visual behavior

Menos helper text.

---

# 156. Mid-Level visual behavior

Mais compactação.

---

# 157. Senior visual behavior

Minimal assistance by default.

---

# 158. Specialist visual behavior

Peer-tool feel.

---

# 159. Same design system across levels

A diferença é densidade e conteúdo, não skin.

---

# 160. Learn Mode visual profile

Pode usar:

- larger explanation cards;
- concept panels;
- examples.

---

# 161. Practice Mode profile

Balanced.

---

# 162. Challenge Mode profile

Reduced Tutor visibility.

---

# 163. Exam Mode profile

Minimal support UI.

---

# 164. Review Mode profile

Timeline + evidence + reasoning.

---

# 165. Teach-Back profile

Prompt + response + review.

---

# 166. Semantic typography in Tutor

Question:

regular.

Warning:

medium emphasis.

STOP:

strong emphasis.

---

# 167. STOP surface

Deve ser claramente distinta.

Não precisa ser visualmente agressiva demais.

---

# 168. Error surfaces

Diferenciar:

- product error;
- student error;
- assessment invalidation;
- safety stop.

---

# 169. Product error

Neutral technical style.

---

# 170. Assessment invalidation

Informativo e sério.

---

# 171. Student mistake

Não usar error-red automaticamente.

---

# 172. Learning state is not system error

Importante.

---

# 173. Terminal-inspired visual elements

Permitidos somente quando conteúdo é realmente técnico.

---

# 174. Fake terminal aesthetic

Proibida como decoração.

---

# 175. Monospace usage

Apenas:

- code;
- technical values;
- hashes;
- endpoints;
- commands.

---

# 176. Card design

Cards são agrupamento funcional.

Não devem existir só por estética.

---

# 177. Nested cards

Evitar excesso.

---

# 178. Dividers

Subtle.

---

# 179. Panels

Usar quando há boundary funcional.

---

# 180. Drawer vs modal

Preferir drawer para contexto persistente.

Modal para decisões.

---

# 181. HUD visual anchoring

HUD deve parecer parte do sistema, não overlay gamer.

---

# 182. HUD opacity

Alta legibilidade.

Evitar transparência pesada.

---

# 183. HUD compactness

Uma ou duas linhas no estado mínimo.

---

# 184. Tutor avatar

Não é requisito.

---

# 185. Brother Eye logo/avatar

Pode existir identidade gráfica simples.

Não antropomorfizar demais o Tutor.

---

# 186. Tutor personality through copy, not mascot

Prioridade.

---

# 187. Brand identity

A marca Brother Eye pode explorar conceito de:

- observação;
- inteligência;
- foco;
- visão;
- orientação.

Sem cair em ícone literal de olho obrigatório.

---

# 188. Logo direction

Fica para branding futuro.

---

# 189. Product color direction

Preferência:

- base neutra escura;
- accent frio ou neutro;
- semantic colors controladas.

---

# 190. Avoid brand-heavy surfaces

Accent da marca não deve dominar sessão.

---

# 191. Long-form educational content

Largura de leitura limitada.

---

# 192. Technical raw content

Pode utilizar largura maior.

---

# 193. Split view

Útil para:

- request/response;
- finding/review;
- evidence/source.

---

# 194. Split view responsive

Em largura pequena vira tabs/stack.

---

# 195. Diff visual

Não usar vermelho/verde sem labels.

---

# 196. Evidence source preview

Pode usar:

- code;
- structured table;
- screenshot preview;
- metadata.

---

# 197. Screenshot evidence

Thumbnail + open full.

---

# 198. Screenshot annotation

Futuro.

---

# 199. Skill Graph interactions

Click:

select.

Hover:

supplementary only.

---

# 200. Graph accessibility

Precisa de lista alternativa.

---

# 201. Curriculum view

Pode ser lista hierárquica, não necessariamente graph.

---

# 202. Curriculum cards

Mostram:

- status;
- core skills;
- recommended mode.

---

# 203. Search

Command-like search visual.

---

# 204. Search results

Agrupados por type.

---

# 205. Filters

Compact.

---

# 206. Filter chips

Usar apenas quando úteis.

---

# 207. Forms

Label sempre claro.

---

# 208. Placeholder

Não substituir label.

---

# 209. Validation

Inline.

---

# 210. Destructive actions

Require confirmation where appropriate.

---

# 211. Privacy destructive action

Deleting evidence needs clear consequence.

---

# 212. Settings

Separar:

```text
Tutor
Interface
Privacy
Assessment
Advanced
```

---

# 213. Advanced settings

Pode incluir:

- raw IDs;
- debug;
- telemetry details.

---

# 214. No overwhelming settings page

Progressive disclosure.

---

# 215. Dark theme tokens — conceptual

```text
bg.canvas
bg.panel
bg.card
bg.hover
bg.selected

fg.primary
fg.secondary
fg.muted

border.subtle
border.default

accent.primary

semantic.success
semantic.warning
semantic.danger
semantic.info
```

---

# 216. Light theme tokens

Mesmo modelo semântico.

---

# 217. Token naming

Semantic, not color-based.

Preferir:

`semantic.warning`

não:

`yellow.500`

em componentes de produto.

---

# 218. Raw palette

Pode existir internamente.

---

# 219. Component tokens

Exemplo:

```text
tutor.observing
finding.candidate
finding.validated
assessment.active
privacy.paused
```

---

# 220. State token mapping

Facilita futura mudança de tema.

---

# 221. Theme extensibility

Design System deve suportar:

- dark;
- light;
- high contrast.

---

# 222. High contrast

Futuro, mas tokens devem permitir.

---

# 223. Density tokens

```text
density.compact
density.comfortable
```

---

# 224. Typography tokens

```text
font.ui
font.mono
text.xs
text.sm
text.base
text.lg
text.xl
```

---

# 225. Spacing tokens

Escala curta.

---

# 226. Radius tokens

Escala curta.

---

# 227. Motion tokens

```text
motion.fast
motion.normal
motion.slow
```

Poucos valores.

---

# 228. Z-index policy

Definir por layers:

```text
base
sticky
dropdown
drawer
modal
critical
```

---

# 229. No arbitrary z-index arms race

---

# 230. shadcn component policy

Sempre criar wrappers Brother Eye quando houver semântica específica.

Exemplo:

Não espalhar:

```text
<Card>
```

diretamente por toda aplicação para findings.

Criar:

`FindingCard`

---

# 231. Primitive vs product component

Primitive:

`Button`

Product component:

`HintButton`

---

# 232. Product component ownership

Design System deve documentar:

- anatomy;
- states;
- behavior;
- accessibility;
- usage.

---

# 233. HintButton

Estados:

```text
available
requested
disabled-in-exam
```

---

# 234. HintButton copy

Default:

`Dica`

Advanced:

dropdown de nível.

---

# 235. Hint escalation visual

Não mostrar “H5” como progress bar de falha.

---

# 236. TutorQuestion

Mensagem clara com espaço para resposta.

---

# 237. TutorWarning

Não bloquear salvo necessidade.

---

# 238. EvidenceCheckpoint

Ação clara:

```text
Capturar
Revisar
Continuar
```

---

# 239. PrivacyPauseButton

High discoverability.

---

# 240. ObservationIndicator

Persistente e discreto.

---

# 241. ScopeIndicator

Sessão deve mostrar alvo autorizado de forma acessível.

---

# 242. Scope detail

Pode abrir:

- target;
- environment;
- boundaries.

---

# 243. SessionModeBadge

Sempre visível.

---

# 244. SessionModeBadge labels

```text
LEARN
PRACTICE
CHALLENGE
EXAM
REVIEW
TEACH-BACK
```

---

# 245. Mode color

Pode variar semanticamente, mas label é obrigatório.

---

# 246. SessionStatus

```text
Active
Paused
Completed
Interrupted
Invalidated
```

---

# 247. Debrief component

Estrutura modular:

```text
Demonstrated
Developing
Assistance
Misconceptions
Evidence changes
Next step
```

---

# 248. Debrief visual priority

Primeiro aprendizagem.

Score depois.

---

# 249. Promotion view

Séria e clara.

---

# 250. Promotion celebration

Pode usar micro-animation discreta.

Sem gamificação excessiva.

---

# 251. Promotion visual

```text
Junior → Mid-Level

Requirements satisfied
...
```

---

# 252. No trophy requirement

---

# 253. Specialist visual treatment

Não precisa “gold theme”.

---

# 254. Specialist track

Pode ter label própria.

---

# 255. Tool Proficiency visual

Deve ficar claramente separado de domain competence.

---

# 256. Example

```text
Tool
Burp Repeater
92

Skill
Authorization Reasoning
68
```

Não misturar.

---

# 257. Visualization of assistance

Preferir tendência:

```text
Assistência ↓
```

em vez de score punitivo.

---

# 258. Misconception history

Timeline simples.

---

# 259. Evidence history

Chronological, filterable.

---

# 260. Assessment history

Status + result + curriculum version.

---

# 261. Technical metadata

Collapsed by default.

---

# 262. Audit data

Advanced detail.

---

# 263. Component naming language

Código pode usar inglês.

UI em português-BR.

---

# 264. Design documentation language

Português-BR, exceto nomes técnicos.

---

# 265. shadcn installation

NÃO faz parte deste documento.

---

# 266. shadcn theme generation

Também não.

---

# 267. Tailwind

Não fica obrigatório neste documento.

Embora shadcn frequentemente o utilize, a decisão de stack fica para Technical Architecture.

---

# 268. React

Também não fica obrigatório aqui.

---

# 269. Framework neutrality

Esta spec define intenção visual independente de implementação.

---

# 270. Preferred implementation compatibility

Quando a arquitetura for definida, dar preferência a abordagem que permita:

- shadcn/ui;
- tokens;
- component ownership;
- accessibility;
- desktop performance.

---

# 271. Design tokens should be source of truth

Evitar hardcoded visual values em componentes.

---

# 272. Component variants

Devem ser limitadas.

---

# 273. No variant explosion

Exemplo ruim:

`Button` com 19 variants.

---

# 274. Semantic variants

Exemplo:

```text
default
secondary
ghost
danger
```

---

# 275. Product states separate from primitive variants

Finding state não vira variant genérica de Button.

---

# 276. Copy and visual alignment

Warning visual deve corresponder a warning textual.

---

# 277. No false urgency

Não usar danger styling para coisas normais de aprendizagem.

---

# 278. Error budget visual

Interface precisa reservar destaque forte apenas para eventos realmente importantes.

---

# 279. Visual attention hierarchy

Ordem geral:

1. safety/scope;
2. current task;
3. Tutor intervention;
4. evidence gap;
5. progress;
6. metadata.

---

# 280. Session visual attention hierarchy

```text
Work tool
↓
Objective
↓
Tutor intervention
↓
Evidence
↓
Progress
```

---

# 281. Brother Eye should not compete with Burp/terminal

Essencial.

---

# 282. Floating HUD placement

Deve evitar cobrir conteúdo crítico.

---

# 283. Docking

Preferível permitir.

---

# 284. Opacity control

Pode existir futuramente.

---

# 285. Keyboard shortcut hints

Mostrar em menus/tooltips, não poluir sempre.

---

# 286. Tooltips

Para labels não óbvios.

---

# 287. No tooltip-only critical info

---

# 288. Context menu

Útil em:

- evidence;
- hypothesis;
- finding.

---

# 289. Command menu

Útil para power users.

---

# 290. Visual auditability

Evidence/score components precisam permitir drill-down.

---

# 291. Drill-down hierarchy

```text
Level
→ Gate
→ Skill
→ Dimension
→ Evidence
→ Source
```

---

# 292. Breadcrumbs

Podem ajudar em drill-down profundo.

---

# 293. Source detail

Raw technical content em panel dedicado.

---

# 294. Request viewer

Precisa suportar:

- headers;
- body;
- method;
- URL;
- status for response.

---

# 295. Response viewer

Mesmo padrão.

---

# 296. Raw vs formatted

Toggle:

```text
Formatted
Raw
```

---

# 297. Secret redaction visual

Mostrar placeholder claro:

`[REDACTED]`

---

# 298. Never silently mutate evidence text

---

# 299. Student-authored indicator

Pequeno label.

---

# 300. Tutor-assisted indicator

Pequeno label.

---

# 301. System-generated indicator

Pequeno label.

---

# 302. Authorship semantics

Importante para assessment.

---

# 303. Assessment integrity indicator

Exemplo:

```text
Integridade: alta
```

Advanced detail explica.

---

# 304. No scary integrity meter

---

# 305. Offline/degraded visual

Discreto.

---

# 306. Connection state

Somente mostrar quando relevante.

---

# 307. Tutor unavailable

Não bloquear app.

---

# 308. Empty evidence state

> Nenhuma evidence associada ainda.

---

# 309. Empty hypothesis state

> Crie uma hipótese quando houver algo que valha testar.

---

# 310. Empty finding state

Não precisa CTA agressivo.

---

# 311. Empty Skill Graph state

Orientar placement/practice.

---

# 312. First-run visual simplicity

Não mostrar tudo no onboarding.

---

# 313. Progressive product reveal

Features aparecem conforme relevância.

---

# 314. Intern sees less complexity

Mesmo que receba mais explicação.

---

# 315. Specialist sees more raw control

---

# 316. Visual complexity vs pedagogical complexity

Não confundir.

Intern não precisa dashboard complexo.

---

# 317. Design review checklist

Todo componente novo deve responder:

- qual problema resolve?
- é primitive ou product?
- quais states?
- qual hierarchy?
- acessível?
- funciona dark/light?
- compact?
- responsive?
- precisa existir?

---

# 318. Visual QA checklist

- contrast;
- focus;
- overflow;
- long technical strings;
- empty state;
- loading;
- error;
- disabled;
- narrow window;
- zoom 200%;
- keyboard.

---

# 319. Long strings

Endpoints, hashes e tokens podem ser enormes.

UI deve:

- wrap quando apropriado;
- truncate com acesso ao valor;
- não quebrar layout.

---

# 320. Code scroll

Horizontal local permitido.

---

# 321. Tables narrow viewport

Podem usar local horizontal scroll.

---

# 322. No whole-page horizontal overflow

---

# 323. Responsive panels

Drawer em largura baixa.

---

# 324. Session minimal footprint

Meta visual:

Brother Eye deve ocupar menos espaço que a ferramenta primária na maior parte da sessão.

---

# 325. Branding visibility

Logo discreto durante sessão.

---

# 326. Marketing vs product

Landing page pode ser mais expressiva.

App deve ser utilitário.

---

# 327. Design System scope

Este documento cobre produto, não marketing site.

---

# 328. Illustration

Não é prioridade no app.

---

# 329. Empty-state illustration

Se usada, muito discreta.

---

# 330. Photography

Não necessária no produto.

---

# 331. 3D

Não necessária.

---

# 332. Gradients

Uso mínimo.

---

# 333. Glassmorphism

Não como linguagem principal.

---

# 334. Blur

Somente overlays se necessário.

---

# 335. Neon

Evitar.

---

# 336. Green hacker palette

Evitar.

---

# 337. Red vulnerability palette

Usar semanticamente, não como identidade.

---

# 338. Success green

Não significa necessariamente “vuln”.

Pode significar:

- gate pass;
- capture successful;
- validated state.

Contexto importa.

---

# 339. Warning amber

Para:

- incomplete evidence;
- degraded telemetry;
- risk.

---

# 340. Danger red

Reservar:

- STOP;
- out of scope;
- destructive;
- critical product error.

---

# 341. Info blue-like semantic

Pode ser usado para:

- Tutor;
- info;
- assessment context.

Cor final não fixada.

---

# 342. Visual differentiation of student vs Tutor

Chat precisa distinguir claramente.

---

# 343. Tutor message icon

Pode ser marca simples.

---

# 344. Student message

Neutral.

---

# 345. System message

Mais muted.

---

# 346. Raw technical event

Não deve parecer mensagem de chat.

---

# 347. Session timeline and chat separate

Mesmo que relacionados.

---

# 348. Evidence and chat separate

Evidence é artefato persistente.

---

# 349. Design system file future

Quando implementação começar, criar fonte de tokens própria.

---

# 350. Component Storybook-equivalent

Futuro pode ter catálogo de componentes.

Não obrigatório stack-specific.

---

# 351. Component acceptance

Antes de usar em produto:

- documented;
- states;
- keyboard;
- responsive;
- dark;
- accessibility.

---

# 352. shadcn/ui update policy

Como componentes são copiados/controlados no projeto, Brother Eye pode adaptar.

Evitar updates cegos.

---

# 353. Component ownership

Código dos componentes pertence ao produto após adoção.

---

# 354. shadcn/ui philosophy fit

É apropriado porque favorece:

- controle;
- composição;
- customização;
- acessibilidade;
- baixo lock-in visual.

---

# 355. Why not a heavy opinionated UI kit

Brother Eye exige:

- componentes específicos;
- alta densidade;
- HUD;
- evidence;
- Skill Graph;
- technical diff.

Um kit visual muito fechado poderia limitar.

---

# 356. Why not build primitives from zero

Baixo valor.

Preferir investir em:

- pedagogy;
- evidence;
- session UX;
- product-specific components.

---

# 357. shadcn as accelerator

Essa é a função correta.

---

# 358. Visual design implementation phases

## Phase A

Tokens + primitives.

## Phase B

Session components.

## Phase C

Progress/Assessment.

## Phase D

Polish.

---

# 359. Phase A components

```text
Button
Input
Textarea
Select
Tabs
Dialog
Sheet
Tooltip
Badge
Card
Table
Command
Toast
```

---

# 360. Phase B components

```text
TutorHUD
TutorStateIndicator
HypothesisCard
EvidenceCard
EvidenceDrawer
FindingCard
FindingLifecycle
SessionTimeline
HintControl
PrivacyIndicator
```

---

# 361. Phase C components

```text
SkillCard
SkillGraph
PromotionGate
StageProgress
WhyThisScorePanel
AssessmentCard
AssessmentResult
MisconceptionCard
```

---

# 362. Phase D

- motion refinement;
- theme refinement;
- density;
- accessibility;
- edge cases.

---

# 363. Prototype priority

Primeiro prototipar:

```text
Session HUD
Tutor Panel
Evidence Drawer
Finding Lifecycle
Debrief
Home
```

---

# 364. Visual prototype should precede full app

Usar dados mock.

---

# 365. Prototype success criteria

- Tutor não domina;
- technical content legível;
- evidence clara;
- state explícito;
- dark UI confortável;
- shadcn base não parece genérica.

---

# 366. Home prototype

Precisa mostrar:

```text
Next action
Level
Blocker
Domains
```

---

# 367. Session prototype

Precisa mostrar:

```text
Mode
Objective
Tutor state
Hint
Hypothesis
Evidence gap
```

---

# 368. Assessment prototype

Precisa mostrar claramente ausência de ajuda.

---

# 369. Privacy prototype

Precisa tornar observation óbvia.

---

# 370. Visual design testing

Testar com:

- Intern;
- Junior;
- advanced user.

---

# 371. Intern test

Pergunta:

> “Você sabe onde pedir ajuda?”

---

# 372. Advanced test

Pergunta:

> “A interface está atrapalhando seu trabalho?”

---

# 373. Privacy test

Pergunta:

> “Você sabe exatamente se está sendo observado?”

---

# 374. Evidence test

Pergunta:

> “Você sabe o que ainda falta provar?”

---

# 375. Assessment test

Pergunta:

> “Você sabe que o Tutor não pode ajudar agora?”

---

# 376. Design metrics

Possíveis:

- time to locate hint;
- time to pause observation;
- panel interruption frequency;
- evidence comprehension;
- score explanation discoverability.

---

# 377. Avoid aesthetic metrics as primary

“Ficou bonito” não basta.

---

# 378. Product aesthetics still matter

Mas servem:

- comprehension;
- trust;
- focus;
- usability.

---

# 379. Visual quality bar

Brother Eye deve parecer pronto para uso profissional, não projeto acadêmico.

---

# 380. Internal consistency

Todos os estados devem seguir mesma linguagem.

---

# 381. No one-off styles

Evitar CSS ad hoc para cada feature.

---

# 382. Semantic token enforcement

Recomendado em implementação.

---

# 383. Component composition

Preferir composição de primitives.

---

# 384. Shared patterns

Exemplo:

`StatusRow`

pode ser usado em:

- evidence;
- assessment;
- privacy.

---

# 385. Avoid generic abstraction too early

Não transformar tudo em super-componentes.

---

# 386. Product-specific semantics first

---

# 387. V1 Visual Design Scope

V1 precisa de:

- dark theme;
- core tokens;
- shadcn foundation;
- navigation;
- session shell;
- Tutor HUD;
- Tutor Panel;
- Evidence Drawer;
- Finding states;
- Debrief;
- Home;
- Progress basics;
- Assessment;
- Privacy.

---

# 388. V1 does not need

- elaborate animations;
- custom illustration system;
- public profile;
- achievement art;
- light mode perfection before core flow;
- extensive branding surfaces.

---

# 389. V1 light mode

Pode ser V1.x se tempo exigir.

Dark-first deve ser completo.

---

# 390. V1 responsive target

Desktop + laptop.

---

# 391. V1 mobile

Não requisito para sessão.

---

# 392. V1 design system package

Decisão técnica fica para Architecture.

---

# 393. V1 shadcn decision

Fica estabelecido como preferência forte.

---

# 394. Constraint

Não escolher arquitetura pior apenas para usar shadcn.

---

# 395. Architecture compatibility test

No documento técnico futuro, avaliar:

- desktop shell;
- framework;
- shadcn compatibility;
- accessibility;
- performance.

---

# 396. If incompatible

Adotar biblioteca/primitives equivalente mantendo:

- visual language;
- tokens;
- product components;
- interaction patterns.

---

# 397. No vendor identity dependency

Brother Eye é visualmente independente de shadcn.

---

# 398. Decisões normativas v0.1

Ficam estabelecidas:

1. Design System próprio;
2. shadcn/ui como component foundation preferencial;
3. dark-first;
4. linguagem visual técnica, limpa e profissional;
5. evitar cyberpunk/hacker aesthetic;
6. UI compacta e desktop-first;
7. Tutor visualmente periférico;
8. semantic tokens;
9. cores não são único indicador;
10. shadows e motion mínimos;
11. product-specific components próprios;
12. Skill Graph usa progressive disclosure;
13. Finding Lifecycle é first-class;
14. Evidence tem linguagem visual própria;
15. Privacy state sempre explícito;
16. Exam visualmente distinto de Practice;
17. Tool Proficiency separado de pentest competence;
18. acessibilidade baseline;
19. UI em português-BR;
20. level titles permanecem em inglês;
21. framework não é definido aqui;
22. Tailwind não é obrigatório aqui;
23. React não é obrigatório aqui;
24. shadcn não define identidade;
25. design system deve sobreviver à troca de framework.

---

# 399. Critérios de aprovação

Este documento está aprovado se houver concordância de que:

- shadcn/ui é a foundation preferencial correta;
- Brother Eye terá identidade própria;
- dark-first é adequado;
- visual profissional/minimalista é adequado;
- o produto não deve parecer hacker/cyberpunk;
- HUD é compacto;
- Evidence/Finding/Skill/Assessment possuem componentes próprios;
- semantic states estão claros;
- framework continua deliberadamente em aberto;
- visual design serve aprendizagem e foco.

---

# 400. Próximo documento

Após aprovação:

`docs/03-product/BROTHER_EYE_V1_SCOPE_AND_ROADMAP.md`

Ele definirá:

- escopo real do V1;
- V1.1/V2;
- milestones;
- dependências;
- ordem de implementação;
- critérios de saída;
- principais riscos;
- o primeiro fluxo end-to-end que deve funcionar;
- o que deliberadamente NÃO será construído inicialmente.

---

# 401. Regra-mãe

> **Brother Eye deve parecer uma ferramenta profissional de aprendizagem técnica: silenciosa quando possível, precisa quando necessária e visualmente subordinada ao trabalho que o aluno está realizando.**

---

## Status

**Draft v0.1**

Este documento deve ser validado conceitualmente antes da definição do V1 Scope & Roadmap.

# Brother Eye — Student Experience & UX

**Documento:** `BROTHER_EYE_STUDENT_EXPERIENCE_AND_UX.md`  
**Status:** Draft v0.1  
**Dependências:**  
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`
- `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`
- `BROTHER_EYE_CURRICULUM_V0.1.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define a experiência do aluno no Brother Eye.

Ele especifica:

- onboarding;
- placement;
- Home;
- sessão ativa;
- modos de aprendizagem;
- HUD;
- chat;
- voz;
- hints;
- objetivos;
- hipóteses;
- findings;
- evidence;
- debrief;
- progresso;
- Skill Graph;
- `Why this score?`;
- assessments;
- privacy controls;
- estado de observação;
- alertas;
- notificações;
- erros;
- recuperação;
- acessibilidade;
- princípios de simplicidade visual.

Este documento NÃO define:

- stack;
- banco;
- modelos de IA;
- arquitetura de eventos;
- implementação Hermes;
- protocolos técnicos;
- design visual pixel-perfect;
- componentes específicos de framework.

---

# 2. North Star de UX

A UX do Brother Eye deve fazer o aluno sentir:

> **“Eu estou conduzindo o pentest; o Brother Eye está me ensinando, observando e corrigindo quando necessário.”**

Nunca:

> **“O Brother Eye está fazendo o pentest e eu estou acompanhando.”**

---

# 3. Princípio de controle

O aluno sempre deve saber:

- o que está sendo observado;
- por que o Tutor está intervindo;
- qual modo está ativo;
- qual objetivo está em foco;
- quando algo está sendo avaliado;
- como pedir ajuda;
- como pedir silêncio;
- como pausar observação.

---

# 4. Estrutura macro da experiência

```text
Onboarding
↓
Placement / Perfil Inicial
↓
Home
↓
Escolha de Sessão
↓
Preparação
↓
Sessão Ativa
↓
Checkpoint / Finding / Evidence
↓
Debrief
↓
Atualização de Progresso
↓
Próxima Recomendação
```

---

# 5. Estados principais do produto

```text
ONBOARDING
HOME
SESSION_SETUP
SESSION_ACTIVE
SESSION_PAUSED
ASSESSMENT_ACTIVE
DEBRIEF
REVIEW
PROFILE
CURRICULUM
SETTINGS
PRIVACY_SHUTTER
ERROR_RECOVERY
```

---

# 6. Onboarding — objetivo

O onboarding deve explicar o modelo mental do produto antes de configurar qualquer coisa.

O aluno precisa entender quatro pontos:

1. Brother Eye é Tutor, não executor.
2. O aluno trabalha; o Tutor observa e orienta.
3. Ajuda não gera punição.
4. Progresso é baseado em evidence, não em XP.

---

# 7. Onboarding — tela 1

Mensagem central:

> **Aprenda pentest praticando.**

Subtexto:

> Brother Eye acompanha seu trabalho, ensina quando necessário e reduz sua ajuda conforme você ganha autonomia.

CTA:

`Começar`

---

# 8. Onboarding — tela 2

Título:

> **Você continua no controle**

Explicar:

- você usa suas ferramentas;
- você decide;
- você executa;
- Brother Eye observa e ensina.

---

# 9. Onboarding — tela 3

Título:

> **Ajuda não tira pontos**

Explicar Hints de forma simples:

```text
Pergunta
Pista
Explicação
Orientação
Demonstração
```

Não expor H0–H5 como taxonomia técnica logo no primeiro contato, salvo modo avançado.

---

# 10. Onboarding — tela 4

Título:

> **Seu progresso vem do que você demonstra**

Exemplo:

```text
Authorization

Knowledge     Forte
Execution     Forte
Autonomy      Em desenvolvimento
Transfer      Ainda pouco observado
```

---

# 11. Onboarding — tela 5

Título:

> **Privacidade é explícita**

Mostrar:

- observação ligada/desligada;
- apps permitidos;
- áreas bloqueadas;
- pausa instantânea;
- dados capturados.

---

# 12. Onboarding — escolha de experiência

Pergunta:

> **Qual é sua experiência atual com pentest?**

Opções:

```text
Estou começando
Já estudo e pratico
Já faço pentests
Quero fazer uma avaliação de entrada
```

A resposta apenas orienta o próximo passo.

Não define nível automaticamente.

---

# 13. Placement

Placement deve ser oferecido para alunos com experiência prévia.

Objetivo:

- evitar obrigar alguém experiente a começar em Intern;
- criar perfil inicial baseado em evidence.

---

# 14. Placement não é formulário

Evitar:

> “De 0 a 10, quanto você sabe de Web?”

Self-report pode existir, mas não define mastery.

---

# 15. Placement — estrutura

Pode incluir:

```text
1. Diagnóstico conceitual curto
2. Task Web
3. Task API
4. Task Infrastructure
5. Evidence / Reporting task
6. Debrief
```

---

# 16. Placement — resultado

Exemplo:

```text
Perfil inicial

Global
Junior — 26/100

Web
Junior — 52/100

API
Junior — 31/100

Infrastructure
Intern — 74/100

Evidence
Junior — 18/100

Confidence
Medium
```

---

# 17. Placement — Unknown

Skills não observadas devem aparecer como:

`Ainda não avaliado`

e não como zero.

---

# 18. Home — objetivo

A Home responde em poucos segundos:

1. Onde estou?
2. O que devo fazer agora?
3. Por quê?
4. Existe algo bloqueando minha progressão?
5. Posso continuar minha última sessão?

---

# 19. Home — hierarquia

Ordem recomendada:

```text
1. Continuar / Próxima sessão
2. Nível global
3. Prioridades de aprendizado
4. Promotion blockers
5. Domínios
6. Sessões recentes
```

---

# 20. Home — bloco principal

Exemplo:

```text
Junior — 68/100
Confidence: High

Próximo objetivo
Transfer de Authorization

Por quê?
Você já demonstra boa execução em contextos conhecidos,
mas ainda existe pouca evidence em contextos novos.

[Começar prática]
```

---

# 21. Home não deve virar dashboard corporativo

Evitar:

- 20 cards;
- gráficos decorativos;
- números sem ação;
- excesso de rankings;
- XP;
- streaks como foco principal.

---

# 22. Primary CTA

Home deve possuir uma ação dominante:

`Continuar aprendendo`

ou:

`Continuar sessão`

---

# 23. Next Best Learning Action

A recomendação principal deve explicar:

```text
O que
Por que
Qual skill
Qual tipo de sessão
```

---

# 24. Exemplo de recomendação

```text
Próximo: Authorization em contexto novo

Objetivo
Aumentar Transfer.

Motivo
Sua execução está forte, mas ainda há pouca evidence C2/C3.

Modo recomendado
Challenge
```

---

# 25. Session Setup

Antes de iniciar, mostrar:

- ambiente;
- escopo;
- objetivo pedagógico;
- skills em foco;
- modo;
- nível de proatividade;
- privacidade/observação.

---

# 26. Session Setup — exemplo

```text
Sessão
API Authorization

Modo
Practice

Objetivo principal
Investigar autorização em nível de objeto.

Skills em foco
- Identity Context
- Hypothesis Formation
- Object Authorization
- Evidence

Tutor
Proatividade: média
Spoilers: somente quando travado

Observação
Burp ✓
Browser ✓
Terminal ✓
```

---

# 27. Scope confirmation

Mesmo em ambiente educacional, escopo deve ser explícito.

Exemplo:

```text
Alvo autorizado
http://localhost:3000

Tipo
Lab local

[Iniciar sessão]
```

---

# 28. Session Active — princípio

A sessão ativa deve ocupar o mínimo possível da atenção visual.

O trabalho acontece nas ferramentas do aluno.

Brother Eye deve ficar periférico.

---

# 29. Layout conceitual da sessão

Possíveis superfícies:

```text
Compact HUD
Chat / Tutor Panel
Voice
Session Timeline
Evidence Drawer
```

Não precisam estar todas abertas.

---

# 30. Compact HUD

HUD deve exibir no máximo:

```text
Modo
Objetivo atual
Hipótese atual
Estado do Tutor
Evidence gap crítico
```

---

# 31. HUD — exemplo

```text
PRACTICE

Objetivo
Validar autorização do recurso.

Hipótese
User B pode acessar objeto de A.

Tutor
Observando

Evidence
Control missing
```

---

# 32. HUD não deve mostrar

Evitar:

- dezenas de skill scores;
- log completo;
- cadeia de eventos;
- tokens;
- raciocínio interno;
- prompts;
- métricas de sistema.

---

# 33. Tutor state visible

O aluno deve conseguir identificar:

```text
Observando
Pensando
Perguntando
Ensinando
Checkpoint
Pausado
```

Não precisa expor termos internos SILENT/ASK etc. como linguagem principal.

---

# 34. “Observando”

Importante mostrar quando Brother Eye está deliberadamente em silêncio.

Isso evita percepção de que o Tutor travou.

---

# 35. Chat

Chat é superfície de profundidade.

Serve para:

- perguntas;
- explicações;
- microaulas;
- review;
- findings;
- debrief;
- `Why?`.

---

# 36. Chat — comandos conceituais

A UI pode oferecer ações rápidas:

```text
Me dê uma dica
Explique
Revise meu raciocínio
O que você viu?
Por quê?
Só observa
Como um Specialist pensaria?
```

---

# 37. “Me dê uma dica”

Brother Eye oferece a menor ajuda apropriada.

O botão não deve indicar:

> “-5 pontos”

ou qualquer penalidade.

---

# 38. “Explique”

Pode abrir escolha:

```text
Rápido
Padrão
Profundo
```

---

# 39. “Revise meu raciocínio”

Resposta estruturada:

```text
Pontos fortes
Premissas
Lacunas
Alternativas
Próxima pergunta
```

---

# 40. “O que você viu?”

Resposta:

```text
Observado
Inferido
Confidence
Falta confirmar
```

---

# 41. “Por quê?”

Explica:

- objetivo;
- observação;
- raciocínio;
- por que a técnica é relevante.

---

# 42. “Só observa”

Tutor fica silencioso até:

- aluno chamar;
- safety/STOP;
- evento crítico permitido pela política.

---

# 43. “Como um Specialist pensaria?”

Disponível principalmente em Learn/Review.

Deve mostrar expert modeling, não apenas solução.

---

# 44. Voice

Voz é complemento.

Boa para:

- pergunta curta;
- hint;
- warning;
- reflexão;
- interação enquanto mãos estão na ferramenta.

---

# 45. Voice — princípio

Respostas por voz devem ser curtas.

Detalhes vão para painel/chat.

---

# 46. Voice commands

Exemplos:

```text
Brother Eye, só observa.
Brother Eye, uma dica.
Brother Eye, o que você viu?
Brother Eye, explica isso.
Brother Eye, revisa minha hipótese.
```

---

# 47. Voice interruptions

Evitar interromper quando:

- aluno está digitando;
- resultado acabou de aparecer;
- há foco intenso detectável.

Warnings críticos podem interromper.

---

# 48. Session Timeline

Timeline registra momentos pedagógicos, não todos os cliques.

Exemplo:

```text
20:14 — Hypothesis created
20:18 — H1 requested
20:22 — Control established
20:27 — Candidate finding
20:31 — Reproduced
```

---

# 49. Timeline vs raw log

Raw event log é técnico.

Timeline é human-readable.

---

# 50. Hypothesis Board

A sessão deve permitir manter hipóteses.

Exemplo:

```text
H1
User B consegue acessar objeto de A
Status: testing

H2
Diferença de response é apenas caching
Status: open
```

---

# 51. Hypothesis states

```text
open
testing
supported
weakened
rejected
inconclusive
```

---

# 52. Hypothesis não é finding

A UI deve deixar isso visualmente claro.

---

# 53. Finding lifecycle visível

```text
Observation
→ Hypothesis
→ Candidate
→ Reproduced
→ Impact confirmed
→ Validated
→ Reported
```

---

# 54. Candidate Finding

Quando aparece comportamento promissor:

Brother Eye pode criar card:

```text
Candidate

Possible object authorization issue

What we know
• User B received resource

Missing
• Control
• Reproduction
• Impact
```

---

# 55. Finding não deve ser criado automaticamente como validado

Nunca:

`Vulnerability found!`

com base apenas em sinal.

---

# 56. Evidence Drawer

Cada finding/hypothesis pode possuir evidências relacionadas.

Tipos:

```text
Baseline
Trigger
Control
Reproduction
Impact
Remediation test
```

---

# 57. Evidence card

Exemplo:

```text
CONTROL
Request #188

Identity
User B

Result
403

Captured
20:31
```

---

# 58. Evidence completeness

Mostrar de forma compacta:

```text
Baseline      ✓
Trigger       ✓
Control       ✗
Reproduction  ✓
Impact        ✗
```

---

# 59. Evidence checkpoint UX

Quando necessário:

```text
Antes de continuar

Falta preservar:
• control
• impact evidence

[Capturar agora]
[Continuar mesmo assim]
```

Em níveis avançados pode ser menos intrusivo.

---

# 60. Evidence provenance

Aluno deve saber se evidence veio de:

- ferramenta;
- screenshot;
- terminal;
- nota;
- Tutor.

---

# 61. System-generated vs student-authored

Diferenciar claramente.

Exemplo:

```text
Nota
Student-authored

Resumo técnico
System-generated
```

---

# 62. Mode indicator

Modo atual sempre visível:

```text
LEARN
PRACTICE
CHALLENGE
EXAM
REVIEW
TEACH-BACK
```

---

# 63. Learn Mode UX

Deve enfatizar:

- explicações;
- conceitos;
- exemplos;
- microaulas;
- modelagem.

---

# 64. Practice Mode UX

Default principal.

Mostra:

- objetivo;
- hint;
- hypothesis;
- evidence;
- Tutor state.

---

# 65. Challenge Mode UX

UI fica mais silenciosa.

Esconder:

- recomendações proativas;
- excesso de prompts.

Manter:

- pedir hint;
- scope;
- objective.

---

# 66. Exam Mode UX

Deve mudar claramente o estado visual.

Mostrar:

```text
Exam

Tutor assistance
OFF

Observation
ON

Hints
Unavailable

Debrief
After completion
```

---

# 67. Exam não deve parecer Practice

O aluno precisa saber que está sendo avaliado.

---

# 68. Review Mode UX

Foco em timeline e decisões.

Exemplo:

```text
Momento 1
Você assumiu X.

Evidence disponível
...

Alternativa
...
```

---

# 69. Teach-Back UX

Brother Eye apresenta audiência/contexto.

Exemplo:

```text
Explique para um aluno Junior:

Por que uma resposta diferente não é suficiente
para validar uma vulnerabilidade?
```

---

# 70. Mode switching

Mudança de modo deve ser explícita.

Exemplo:

> “Essa skill já está consistente. Quer tentar a próxima etapa em Challenge?”

---

# 71. No hidden exam

Nunca entrar em Exam automaticamente sem informar.

---

# 72. Hint UX

O aluno pode pedir:

`Dica`

Sem mostrar inicialmente H1/H2/H3.

---

# 73. Advanced Hint Controls

Modo avançado pode permitir:

```text
Só pergunta
Pista
Explique conceito
Mostre procedimento
Demonstre
```

---

# 74. Hint history

No debrief, mostrar:

```text
Hints
H1 × 2
H2 × 1
```

Sem linguagem punitiva.

---

# 75. Hint dependency trend

Perfil pode mostrar:

```text
Assistência
↓ diminuindo
```

Melhor do que “score de dependência”.

---

# 76. Stuck UX

Quando stuck provável:

Brother Eye não exibe:

> “Você está travado.”

Preferir:

> “As últimas tentativas não produziram nova informação. Quer revisar a hipótese atual?”

---

# 77. Frustration UX

Se aluno pede ajuda repetidamente:

Brother Eye pode oferecer:

```text
[Uma pista]
[Explicar o conceito]
[Mostrar o procedimento]
```

---

# 78. Microaula UX

Deve ser pequena e contextual.

Exemplo:

```text
Microaula — Authorization

Por que apareceu agora
Você está comparando duas identidades.

Conceito
...

Erro comum
...

[Voltar à sessão]
```

---

# 79. Microaula não deve ocupar contexto inteiro

Possibilidade de abrir side panel.

---

# 80. Session Notes

Aluno pode manter notas livres.

Brother Eye pode sugerir estrutura, mas não substituir escrita.

---

# 81. Notes structure

Exemplo:

```text
Observações
Hipóteses
Resultados
Credenciais de lab
Open questions
```

---

# 82. Sensitive notes

Credenciais devem ser tratadas com proteção apropriada.

Não precisam entrar no Learner Model.

---

# 83. Session objective

Sempre presente.

---

# 84. Sub-objectives

Podem mudar conforme investigação.

Exemplo:

```text
Objetivo principal
Mapear authorization.

Agora
Confirmar identidade atual.
```

---

# 85. Next Action

Brother Eye não deve mostrar sempre “próximo passo”.

Isso criaria dependência.

Pode aparecer apenas quando:

- solicitado;
- Intern;
- stuck;
- Learn.

---

# 86. Next Action no Intern

Pode ser explícito.

---

# 87. Next Action no Senior

Normalmente escondido.

---

# 88. Progress during session

Evitar progress bar do tipo:

`72% complete`

se não existe base real.

---

# 89. Task completion

Pode mostrar objetivos concluídos, não “pentest 78%”.

---

# 90. Session ending

Pode ocorrer quando:

- aluno encerra;
- objetivo atingido;
- tempo acabou;
- Exam finaliza;
- erro técnico impede continuidade.

---

# 91. Debrief — princípio

Debrief é obrigatório para sessões significativas.

---

# 92. Debrief — primeira tela

Responder:

```text
O que você praticou
O que demonstrou
Onde precisou de ajuda
O que mudou no seu perfil
Próximo passo
```

---

# 93. Debrief — exemplo

```text
API Authorization

Demonstrado
✓ hipótese apropriada
✓ baseline
✓ comparação entre identidades
✓ reprodução

Em desenvolvimento
• impacto
• transfer

Hints
2 perguntas
1 pista

Misconceptions
Nenhuma nova
```

---

# 94. Debrief — Score changes

Mostrar mudanças apenas quando relevantes.

Exemplo:

```text
Authorization.ObjectLevel
72 → 75

Por quê?
Nova evidence independente em contexto C2.
```

---

# 95. No confetti for score

Evitar gamificação infantilizada.

Promoção pode ter celebração discreta.

---

# 96. Promotion UX

Exemplo:

```text
Junior → Mid-Level

Você satisfez os gates:

✓ Core Skills
✓ Autonomy
✓ Transfer
✓ Assessment
✓ Evidence
✓ Misconceptions
```

---

# 97. Promotion meaning

Mostrar:

> “Seu benchmark mudou. Suas skills não zeraram.”

---

# 98. Stage Progress

Home/Profile pode mostrar:

```text
Junior — 68/100
```

Com ação:

`Por que 68?`

---

# 99. Why this score?

É requisito central.

---

# 100. Why this score? — estrutura

```text
Stage Progress
68/100

Satisfied
✓ Core skills
✓ Evidence

In progress
Autonomy 73%
Transfer 61%

Blockers
Transfer minimum

Recent evidence
...
```

---

# 101. Skill detail

Exemplo:

```text
Authorization.ObjectLevel

Mastery
75

Confidence
High

State
Independent

Knowledge        88
Reasoning        74
Execution        91
Autonomy         62
Transfer         51
Evidence         79
```

---

# 102. Skill detail — Why?

Ao abrir:

```text
Why 75?

Strengths
...

Gaps
...

Evidence
12 groups

Next best evidence
...
```

---

# 103. Confidence UX

Não mostrar apenas “High”.

Adicionar explicação curta:

> “Baseado em múltiplas evidências independentes e recentes.”

---

# 104. Unknown UX

Mostrar:

`Ainda não avaliado`

Não:

`0`

---

# 105. Revalidation UX

Exemplo:

```text
HTTP Fundamentals

Mastery 88
Confidence Medium

Última evidence forte
9 meses

[Revalidar]
```

---

# 106. Skill Graph

Skill Graph deve ser explorável.

Objetivo:

- visualizar estrutura;
- prerequisites;
- progresso;
- blockers;
- conexões.

---

# 107. Skill Graph states

```text
Unknown
Introduced
Guided
Practicing
Independent
Transfer Ready
Consolidated
Revalidation Due
Stalled
```

---

# 108. Skill Graph visual

Não depender apenas de cor.

Usar:

- ícone;
- label;
- tooltip;
- estado textual.

---

# 109. Skill Graph filters

```text
Domain
Level
State
Core
Promotion blocker
```

---

# 110. Skill Graph detail

Ao clicar:

- definição;
- por que importa;
- prerequisites;
- evidence;
- mastery;
- next task;
- related skills.

---

# 111. Curriculum view

Separada do Skill Graph.

Curriculum responde:

> “O que existe para aprender?”

Skill Graph responde:

> “Qual é meu estado?”

---

# 112. Curriculum structure

Exemplo:

```text
Foundations
Methodology
Web
API
Infrastructure
Evidence
Reporting
Tool Proficiency
```

---

# 113. Curriculum unit card

```text
API Authorization

Skills
4

Status
Practicing

Recommended mode
Challenge

[Continuar]
```

---

# 114. Promotion blockers

Devem ser visíveis e acionáveis.

Exemplo:

```text
Transfer

Falta
1 evidence C3 independente.

Recomendação
Challenge em API desconhecida.
```

---

# 115. No opaque blocker

Nunca:

> “Você ainda não está pronto.”

Sem explicar por quê.

---

# 116. Assessment Center

Área dedicada a:

- placement;
- exams;
- revalidation;
- promotion assessment;
- assessment history.

---

# 117. Assessment card

```text
Mid-Level Readiness

Status
Ready

Duration estimate
45–60 min

Tutor assistance
Off

Domains
Web + API + Evidence

[Começar]
```

---

# 118. Assessment prep

Mostrar:

- regras;
- recursos permitidos;
- scope;
- telemetry;
- duração;
- abort option.

Não mostrar solução.

---

# 119. Assessment integrity

Aluno deve saber o que é permitido.

Exemplo:

```text
Permitido
✓ documentação oficial
✓ suas ferramentas

Não permitido
✗ solução do lab
✗ Tutor hints
```

---

# 120. Exam status

Durante:

```text
Exam active
42 min

Tutor
Observing only
```

---

# 121. Assessment result

Não resumir em `83/100`.

Preferir:

```text
Demonstrated
...

Insufficient evidence
...

Missed opportunities
...

Promotion impact
...
```

---

# 122. Assessment dispute

Action:

`Contestar evidence`

---

# 123. Dispute flow UX

Aluno seleciona:

- evidence;
- motivo;
- comentário.

Status:

```text
Under review
Confirmed
Corrected
Invalidated
```

---

# 124. Evidence Library

Pode existir área de evidence do aluno.

Organizada por:

- session;
- domain;
- finding;
- skill;
- assessment.

---

# 125. Evidence Library não é raw artifact dump

Mostrar abstração primeiro.

Raw artifacts sob demanda.

---

# 126. Evidence detail

```text
Skill
Reasoning.Authorization

Rubric
R4

Context
API / Challenge / C2

Why counted
...

Sources
Request #...
Student explanation #...
```

---

# 127. Raw Event access

Modo avançado/debug.

Não default para aluno comum.

---

# 128. Misconceptions UX

Não criar “lista de erros” humilhante.

Mostrar como modelos a revisar.

---

# 129. Misconception card

```text
Em revisão

Scanner result = validated finding

Por que apareceu
Esse padrão foi observado em 2 sessões.

Para resolver
Demonstrar validação independente em contexto diferente.
```

---

# 130. Resolved misconception

Pode ir para histórico.

---

# 131. Profile

Perfil deve mostrar:

- Global Level;
- Domains;
- strengths;
- development areas;
- Confidence;
- progress;
- specialist track.

---

# 132. Profile não precisa de avatar gamificado

Foco profissional.

---

# 133. Domain card

```text
Web
Mid-Level — 34/100

Strong
Authorization
HTTP

Developing
Business Logic
Transfer
```

---

# 134. Specialist Track UX

Exemplo:

```text
Primary Track
Web

Senior domain readiness
Complete

Specialist progress
31/100
```

---

# 135. Specialist UX

Não usar “100% expert”.

Sempre contextualizar versão curricular.

---

# 136. Search

Produto deve permitir buscar:

- skill;
- conceito;
- session;
- finding;
- evidence;
- curriculum unit.

---

# 137. Search result context

Exemplo:

```text
Authorization.ObjectLevel

Skill
Mastery 75

Curriculum
API Authorization

Sessions
3
```

---

# 138. Notifications

Notificações devem ser raras.

Tipos úteis:

- assessment ready;
- revalidation due;
- review completed;
- interrupted session recoverable.

---

# 139. No streak pressure

Não usar:

> “Você vai perder sua sequência!”

como mecanismo principal.

---

# 140. Learning reminder

Pode existir opcionalmente.

---

# 141. Privacy Center

Área dedicada.

Mostrar:

- apps permitidos;
- sensors;
- retention;
- exclusions;
- recent captures;
- pause control.

---

# 142. Privacy status indicator

Sempre visível durante observação.

---

# 143. Observation indicator

Exemplo:

```text
Observação ativa

Browser
Burp
Terminal
```

---

# 144. Privacy Shutter

Ação imediata:

`Pausar observação`

Deve:

- parar captura;
- sinalizar estado;
- não exigir confirmação longa.

---

# 145. Resume observation

Aluno decide quando voltar.

---

# 146. App allowlist

Exemplo:

```text
Allowed
Burp Suite
Browser — Lab
Terminal
Postman

Blocked
Email
Password Manager
Messaging
```

---

# 147. Window-specific permission

Quando possível, permitir:

`Browser — janela do lab`

em vez de browser inteiro.

---

# 148. Sensitive field protection

Credenciais/tokens podem ser redigidos antes de processamento.

---

# 149. Capture transparency

Aluno deve conseguir ver:

> “O que Brother Eye capturou nesta sessão?”

---

# 150. Delete session data

Deve existir política clara.

Mudanças em Skill Evidence decorrentes de exclusão devem ser explicadas.

---

# 151. Privacy vs assessment integrity

Se aluno desliga observação durante Exam:

assessment pode ficar:

`integrity incomplete`

Sem linguagem acusatória.

---

# 152. Error states

Principais:

```text
Observation unavailable
Tool disconnected
Lab unavailable
Telemetry incomplete
Tutor unavailable
Assessment invalidated
Evidence sync failed
```

---

# 153. Observation unavailable

UX:

```text
Não consigo observar o Burp agora.

A sessão pode continuar,
mas algumas skills não poderão ser avaliadas.

[Corrigir]
[Continuar sem avaliação completa]
```

---

# 154. Tool disconnected

Não assumir incompetência do aluno.

---

# 155. Lab unavailable

Oferecer:

- retry;
- alternate task;
- save session.

---

# 156. Tutor unavailable

Aluno pode continuar trabalhando.

Registrar sessão sem coaching.

---

# 157. Assessment invalidated

Explicar motivo.

Exemplo:

```text
Este Exam não será usado para promoção.

Motivo
A telemetria falhou durante parte crítica da tarefa.

Sua sessão foi preservada para Review.
```

---

# 158. Recovery

Sessão deve poder ser retomada.

---

# 159. Session restore

Restaurar:

- objective;
- hypotheses;
- evidence;
- notes;
- mode;
- timeline.

---

# 160. Crash recovery

Não perder evidence já capturada.

---

# 161. Offline / degraded mode

Se arquitetura permitir no futuro:

- continuar notes;
- local session state;
- sincronizar depois.

Não é requisito UX v0.1.

---

# 162. Accessibility

Produto deve suportar:

- teclado;
- screen reader;
- zoom;
- contrast;
- legendas para voz;
- não depender apenas de cor.

---

# 163. Keyboard shortcuts

Possíveis:

```text
Hint
Pause Tutor
Pause Observation
Open Chat
Capture Evidence
```

---

# 164. Accessibility and assessment

Uso de recurso de acessibilidade não deve reduzir score.

---

# 165. Visual density

Default:

baixa a média.

Usuário avançado pode ativar mais informação.

---

# 166. Progressive disclosure

Mostrar primeiro:

- necessário.

Expandir:

- detalhes.

---

# 167. Example progressive disclosure

Default:

```text
Authorization
75 — High
```

Expandido:

- dimensions;
- evidence;
- calculations.

---

# 168. Beginner UX

Intern recebe:

- mais labels;
- mais contexto;
- mais explanation affordances;
- checklists.

---

# 169. Advanced UX

Senior/Specialist recebe:

- menos prompts;
- mais compactação;
- faster access to raw data;
- review tools.

---

# 170. UX adaptativa por skill

Mesmo Senior em skill nova pode receber interface explicativa.

---

# 171. Tutor presence

Brother Eye deve parecer disponível, não invasivo.

---

# 172. Notification hierarchy

```text
STOP
Critical warning
Evidence checkpoint
Tutor question
Hint response
Informational
```

---

# 173. STOP UX

Claramente distinto.

Exemplo:

```text
Ação bloqueada

O alvo não pertence ao escopo autorizado.
```

---

# 174. Warning UX

Sem modal quando possível.

---

# 175. Evidence checkpoint UX

Pode ser side card.

---

# 176. Tutor question UX

Não bloquear interface.

---

# 177. Learning history

Aluno deve poder revisar evolução.

---

# 178. History view

Exemplo:

```text
Authorization

Jun 12
Guided

Jul 03
Independent

Aug 14
C2 transfer

Sep 01
Exam validated
```

---

# 179. Score history

Mostrar junto com evidence, não gráfico isolado.

---

# 180. Why score changed?

Exemplo:

```text
74 → 79

+ New C3 evidence
+ Exam anchor
Confidence: Medium → High
```

---

# 181. Why score dropped?

Exemplo:

```text
82 → 76

Recent independent assessment showed
difficulty in hypothesis alternatives.

Confidence remains High.
```

Sem punição dramatizada.

---

# 182. Recalculation UX

Se scoring model mudou:

```text
Seu perfil foi recalculado.

Scoring Model
v0.1 → v0.2

[Ver mudanças]
```

---

# 183. Curriculum version UX

Mostrar em detalhes avançados.

---

# 184. Session modes in Home

Quick actions:

```text
Learn
Practice
Challenge
Assessment
Review
```

Teach-Back aparece quando apropriado.

---

# 185. Recommended mode

Brother Eye pode marcar:

`Recomendado`

---

# 186. Manual mode choice

Aluno pode escolher outro.

---

# 187. Mode warning

Se aluno quer Exam sem readiness:

pode permitir, mas explicar:

> “Seu perfil ainda possui gaps importantes. Este Exam pode não representar sua melhor oportunidade.”

---

# 188. No locked learning

Não bloquear Practice só porque prerequisite não está perfeito.

---

# 189. Prerequisite warning

Mostrar:

```text
Esta unidade depende de HTTP Request/Response.

Seu estado atual
Guided

[Continuar]
[Revisar primeiro]
```

---

# 190. Curriculum completion

Evitar “100% complete” como objetivo global.

Pode existir coverage.

---

# 191. Learning goals

Aluno pode declarar:

```text
Quero melhorar Web
Quero praticar API
Quero me preparar para promotion
Quero revisar Infrastructure
```

---

# 192. Goal influences recommendations

Sem alterar critérios de competência.

---

# 193. Session intent

Antes da sessão:

```text
Aprender
Praticar
Me desafiar
Ser avaliado
Revisar
```

Mapeia aos modos.

---

# 194. Lab selection

Pode ser:

- Brother Eye recommendation;
- aluno escolhe;
- imported lab.

---

# 195. Imported / open lab

UI deve deixar claro:

```text
Open Lab

Ground truth
Unavailable

Assessment limitations
Coverage cannot be verified.
```

---

# 196. Curated lab

Mostrar:

```text
Curated Lab
Instrumented
```

Sem revelar vulnerabilidade em Challenge/Exam.

---

# 197. Lab metadata

Aluno pode ver:

- difficulty;
- domain;
- expected duration;
- required tools;
- mode suitability.

---

# 198. Difficulty labels

UX amigável:

```text
Fundamental
Standard
Complex
Advanced
Expert
```

Detalhe pode mostrar D1–D5.

---

# 199. Novelty não precisa ser exibida sempre

C0–C3 é principalmente assessment metadata.

---

# 200. Learning objective disclosure

Learn/Practice:
mostrar.

Exam:
mostrar competências gerais sem spoiler de falha específica.

---

# 201. Session summary panel

Disponível a qualquer momento:

```text
Objective
Current hypothesis
Open questions
Evidence gaps
Time
Mode
```

---

# 202. Open questions

Aluno/Tutor podem registrar:

```text
Does token bind to role?
Is object ownership enforced?
```

---

# 203. Deferred tests

Permitir:

`Test later`

para reduzir perda de contexto.

---

# 204. Rabbit hole support

Brother Eye pode mostrar discretamente:

```text
No new information
3 attempts
```

E oferecer:

`Revisar hipótese`

---

# 205. No “efficiency score” during practice

Não criar pressão.

---

# 206. Reflection prompt

No final:

> “Qual foi a decisão mais importante da sessão?”

---

# 207. Reflection optionality

Em sessões curtas, pode ser uma pergunta.

Em assessment/debrief, obrigatório.

---

# 208. Teach-Back prompt library

Exemplos por nível.

---

# 209. Student-authored finding editor

Brother Eye pode oferecer editor.

Estrutura:

```text
Título
Resumo
Pré-condições
Passos
Evidence
Impacto
Severidade
Remediação
```

---

# 210. Finding editor assistance

Brother Eye revisa, não escreve por padrão.

---

# 211. Assisted draft indicator

Se Tutor contribui:

```text
Tutor-assisted
```

---

# 212. Rewrite mode

Aluno pode pedir:

> “Revise sem reescrever.”

ou:

> “Me mostre um exemplo melhor.”

---

# 213. Reporting comparison

Modo Review pode mostrar:

```text
Seu texto
Tutor critique
Sua revisão
```

---

# 214. Severity UI

Não apresentar só dropdown.

Pedir rationale.

---

# 215. Remediation UI

Conectar à root cause.

---

# 216. Finding validation status

```text
Candidate
Reproduced
Validated
Inconclusive
False Positive
```

---

# 217. False Positive UX

Não tratar como falha.

Exemplo:

```text
False Positive

Boa validação:
você estabeleceu controle e refutou a hipótese.
```

---

# 218. Inconclusive UX

Aceitar:

```text
Inconclusive

Ainda falta evidence suficiente.
```

---

# 219. Student confidence input

Opcional em momentos-chave:

```text
Quão confiante está?
0–100
```

---

# 220. Confidence input não é score

Serve à metacognição.

---

# 221. Compare confidence later

Debrief:

```text
Sua confiança
85

Evidence final
Hipótese rejeitada

Reflection
O que elevou sua confiança cedo demais?
```

---

# 222. Help transparency

Debrief mostra assistência.

Não “penalty”.

---

# 223. Tutor transparency

Aluno pode abrir:

`Por que o Tutor interveio?`

---

# 224. Intervention explanation

Exemplo:

```text
Intervim porque:
• 4 tentativas sem nova informação
• nenhuma hipótese explícita
• skill em Practice

Escolhi uma pergunta em vez de fornecer procedimento.
```

---

# 225. Tutor feedback controls

Aluno pode marcar:

```text
Entregou demais
Ajudou
Ajudou pouco
Interrompeu meu fluxo
```

---

# 226. Feedback não altera Mastery

Serve para calibrar Tutor.

---

# 227. Student preference controls

Configurações:

```text
Explicação
Baixa / Média / Alta

Proatividade
Baixa / Média / Alta

Spoilers
Nunca / Quando travado / Livre
```

---

# 228. Preference override by mode

Exam ignora spoilers/hints.

STOP ignora preferência.

---

# 229. Preference override by safety

Sempre.

---

# 230. Default by level

Intern:
- mais explicação.

Junior:
- média.

Mid-Level:
- moderada/baixa.

Senior:
- baixa.

Specialist:
- mínima.

---

# 231. No personality gimmicks

Não criar personagens caricatos como requisito de UX.

---

# 232. Professional tone

Produto deve parecer ferramenta séria de aprendizagem.

---

# 233. Empty states

Exemplo Skill Graph:

> “Ainda não temos evidence suficiente para mapear este domínio.”

CTA:

`Fazer diagnóstico`

---

# 234. First session empty state

> “Seu perfil ainda está quase vazio. A primeira sessão vai começar a construí-lo.”

---

# 235. No shame empty states

Nunca:

> “Você ainda sabe muito pouco.”

---

# 236. Loading state

Mostrar ação real:

```text
Analisando eventos da sessão...
Atualizando evidence...
```

Não fingir precisão.

---

# 237. Long analysis

Se demorar:

permitir continuar sessão.

---

# 238. Assessment processing

Pode terminar depois da sessão, mas não prometer background sem sistema real de job.

UX futura pode suportar.

---

# 239. Sync state

Mostrar quando evidence ainda não foi consolidada.

---

# 240. Promotion pending review

Exemplo:

```text
Ready for review

Todos os gates automáticos passaram.
Uma revisão final ainda está pendente.
```

---

# 241. Human review UX

Mostrar:

- status;
- reviewer role;
- rationale quando concluído.

---

# 242. Appeals history

Auditável.

---

# 243. Privacy-first defaults

Preferir:

- menor escopo de observação;
- app allowlist;
- pausa fácil.

---

# 244. Security of learner data

Nunca mostrar secrets em dashboard desnecessariamente.

---

# 245. Session export

Futuro:

- debrief;
- evidence summary;
- finding.

---

# 246. Profile export

Futuro:

- competency snapshot;
- curriculum version;
- evidence summary.

---

# 247. Shareable profile

Não é requisito V1.

---

# 248. Competitive leaderboards

Não recomendado.

Pode distorcer aprendizagem.

---

# 249. Achievements

Se existirem, devem refletir comportamento pedagógico.

Exemplo:

> “Primeira refutação independente”

melhor que:

> “100 payloads enviados.”

Mas não são requisito.

---

# 250. V1 navigation

Sugestão:

```text
Home
Aprender
Sessões
Progresso
Assessments
```

Secondary:

```text
Evidence
Settings
Privacy
```

---

# 251. Home

Próxima ação.

---

# 252. Aprender

Curriculum + Skill Graph.

---

# 253. Sessões

Histórico + continuar.

---

# 254. Progresso

Global, domain, skills, blockers.

---

# 255. Assessments

Placement, promotion, revalidation.

---

# 256. Evidence

Detalhes avançados.

---

# 257. Settings

Preferências.

---

# 258. Privacy

Observation control.

---

# 259. V1 session surface

Mínimo necessário:

- compact HUD;
- chat;
- objective;
- hypothesis;
- hint;
- observation status;
- evidence checkpoint;
- debrief.

---

# 260. V1 Home

Mínimo:

- level;
- next action;
- blockers;
- domains;
- continue session.

---

# 261. V1 Progress

Mínimo:

- global;
- domain;
- skill detail;
- Why this score?;
- Confidence.

---

# 262. V1 Assessment

Mínimo:

- placement;
- Exam mode;
- result;
- promotion impact.

---

# 263. V1 Privacy

Mínimo:

- observation status;
- pause;
- app allowlist;
- capture transparency.

---

# 264. V1 defer

Pode esperar:

- leaderboards;
- social;
- public profile;
- advanced achievements;
- collaborative classroom;
- mobile full experience;
- complex customization.

---

# 265. Desktop-first

A experiência principal tende a ser desktop porque o aluno usa ferramentas de pentest.

Isso é requisito de produto, não decisão de stack.

---

# 266. Mobile companion

Futuro pode servir para:

- review;
- progress;
- curriculum;
- reminders.

Não para sessão principal complexa.

---

# 267. Multi-monitor

Brother Eye deve funcionar bem com ferramentas distribuídas.

---

# 268. Side panel ergonomics

Painel pode:

- dock;
- collapse;
- float.

---

# 269. Minimal mode

Exemplo:

```text
Objective
Tutor: observing
[Hint]
```

---

# 270. Expanded mode

Mostra:

- hypotheses;
- evidence;
- timeline;
- chat.

---

# 271. Focus mode

Aluno pode esconder tudo exceto observation indicator.

---

# 272. Focus mode safety

STOP ainda aparece.

---

# 273. Session state persistence

UI deve preservar contexto ao minimizar/reabrir.

---

# 274. Cross-tool context

Mesmo ao mudar de Burp para terminal, sessão continua.

---

# 275. Context switching

Tutor deve evitar repetir contexto toda vez.

---

# 276. Student ownership of session

Aluno pode alterar objetivo manualmente.

Brother Eye pode questionar, não bloquear.

---

# 277. Session fork

Futuro:

criar investigação paralela a partir de hipótese.

Não requisito V1.

---

# 278. Evidence association

Aluno pode associar artifact a hypothesis/finding.

---

# 279. Auto-association

Sistema pode sugerir.

Aluno pode corrigir.

---

# 280. Correction UX

Toda automação deve ser corrigível.

---

# 281. Misclassification UX

`Isso foi classificado errado`

abre dispute/review.

---

# 282. Tutor wrong observation

Aluno pode dizer:

> “Você não viu isso corretamente.”

Sistema registra feedback.

---

# 283. No authority theater

Brother Eye pode estar errado.

UX deve permitir contestação.

---

# 284. Status language

Evitar:

- “certeza absoluta”;
- “vulnerabilidade confirmada” sem evidence.

---

# 285. Confidence language

Usar:

```text
Baixa
Média
Alta
Muito alta
```

quando user-facing.

Internals podem manter inglês se necessário, mas produto é pt-BR.

---

# 286. Technical labels

Skill IDs podem permanecer técnicos em detalhes avançados.

Label principal em linguagem humana.

---

# 287. Example

User-facing:

`Autorização em nível de objeto`

Advanced:

`API.Authorization.ObjectLevel`

---

# 288. Content hierarchy

Interface deve priorizar linguagem humana.

---

# 289. User-facing level titles

Manter exatamente:

`Intern → Junior → Mid-Level → Senior → Specialist`

---

# 290. No translated level titles

Não usar:

- Estagiário;
- Júnior;
- Pleno;
- Sênior;
- Especialista

como nomes oficiais do Brother Eye.

---

# 291. Session copy examples

Boa:

> “O que esse resultado realmente prova?”

Ruim:

> “Excelente! Você encontrou uma possível vulnerabilidade incrível!”

---

# 292. Promotion copy

Boa:

> “Você satisfez os requisitos para Mid-Level.”

---

# 293. Failure copy

Boa:

> “Ainda falta evidence independente de Transfer.”

---

# 294. Assessment failure copy

Boa:

> “Este assessment mostrou gaps em priorização e validação. Seu nível atual permanece o mesmo.”

---

# 295. No demotion shock

Uma sessão ruim não deve gerar tela dramática de queda.

---

# 296. Demotion policy

Se futuramente houver reclassification, deve ser explicada por evidence e model version.

---

# 297. Learning continuity

Sempre terminar com:

`Próximo passo`

---

# 298. Next step can be “rest”

Nem toda sessão precisa gerar outra imediatamente.

---

# 299. Session duration

Não definir como principal measure.

Pode mostrar tempo gasto.

---

# 300. Learning efficiency

Review pode dizer:

> “Você gastou 18 minutos em uma hipótese sem nova information.”

Sem pontuação.

---

# 301. UX metrics

Avaliar:

- session completion;
- hint use;
- overhelp feedback;
- intervention interruption;
- time to recover from stuck;
- Why this score usage;
- privacy pause usage;
- assessment comprehension.

---

# 302. Learning metrics > engagement metrics

Não otimizar apenas:

- daily active use;
- session length.

---

# 303. Product success metric

Mais importante:

> redução de dependência com manutenção ou aumento de performance independente.

---

# 304. UX testing questions

- aluno sabe quem está no controle?
- sabe se está sendo avaliado?
- entende por que recebeu score?
- sabe pedir ajuda?
- sabe pausar observação?
- percebe diferença entre hypothesis e finding?
- entende missing evidence?
- consegue trabalhar sem painel dominar atenção?

---

# 305. Beginner usability test

Intern deve conseguir:

- iniciar primeira sessão;
- entender objetivo;
- pedir hint;
- registrar hypothesis;
- completar debrief.

Sem manual externo.

---

# 306. Advanced usability test

Senior deve conseguir:

- esconder quase toda assistência;
- acessar raw evidence rapidamente;
- conduzir sessão;
- usar Review;
- receber crítica sem interrupções constantes.

---

# 307. Privacy usability test

Aluno deve conseguir pausar observação em uma ação.

---

# 308. Assessment usability test

Aluno deve saber:

- regras;
- o que está permitido;
- que Tutor está silencioso;
- quando terminou;
- por que resultado contou.

---

# 309. Explainability usability test

Aluno deve chegar de:

```text
Junior 68
```

até:

```text
Raw supporting evidence
```

sem precisar perguntar ao suporte.

---

# 310. V1 UX acceptance criteria

A V1 está aceitável quando:

1. onboarding explica modelo mental;
2. Home dá próxima ação clara;
3. sessão ativa não atrapalha ferramentas;
4. Tutor state é visível;
5. hint é fácil;
6. observation pode ser pausada;
7. hypothesis e finding são distintos;
8. evidence gap é visível;
9. debrief é útil;
10. score é explicável;
11. assessment é explicitamente diferente de practice;
12. privacy é compreensível.

---

# 311. Anti-pattern — dashboard first

Não construir toda a Home antes de validar sessão.

A sessão é o produto principal.

---

# 312. Anti-pattern — chat first

Brother Eye não pode ser apenas ChatGPT ao lado do Burp.

---

# 313. Anti-pattern — overlay overload

Não cobrir ferramentas com sugestões.

---

# 314. Anti-pattern — gamification first

XP/streaks não são prioridade.

---

# 315. Anti-pattern — AI magic

Não esconder funcionamento essencial atrás de:

> “A IA sabe.”

---

# 316. Anti-pattern — automation disguised as tutoring

Não criar botão:

`Explorar automaticamente`

dentro de fluxo educacional principal.

---

# 317. Anti-pattern — silent surveillance

Observação nunca invisível.

---

# 318. Anti-pattern — punishment for hints

Proibido.

---

# 319. Anti-pattern — assessment surprise

Proibido.

---

# 320. Anti-pattern — fake precision

Não mostrar:

`Knowledge 87.342%`

---

# 321. Anti-pattern — score obsession

Skill graph e evidence existem para orientar aprendizado, não colecionar pontos.

---

# 322. UX principle — one dominant action

Cada tela deve possuir uma ação dominante.

---

# 323. UX principle — progressive disclosure

Detalhes sob demanda.

---

# 324. UX principle — peripheral Tutor

Durante trabalho, Brother Eye fica periférico.

---

# 325. UX principle — explicit state

Sempre mostrar modo/observation quando relevante.

---

# 326. UX principle — explainability

Toda avaliação pode ser aberta.

---

# 327. UX principle — reversibility

Aluno pode:

- pausar;
- desfazer associação;
- contestar;
- corrigir.

---

# 328. UX principle — user agency

Tutor recomenda.

Aluno decide, salvo safety/scope.

---

# 329. UX principle — privacy by default

Menor escopo necessário.

---

# 330. UX principle — learning over engagement

Produto não precisa maximizar tempo de uso.

---

# 331. Example end-to-end — iniciante

```text
Onboarding
↓
Escolhe “Estou começando”
↓
Home recomenda Unit 001
↓
Session Setup explica scope
↓
Learn Mode
↓
Tutor ensina baseline
↓
Aluno pratica
↓
H3 → H2
↓
Debrief
↓
Skill Graph ganha primeiras evidence
↓
Home recomenda HTTP
```

---

# 332. Example end-to-end — Junior

```text
Home
Junior 68/100

Blocker
Transfer

↓
Challenge recomendado
↓
API desconhecida
↓
Tutor observa
↓
Aluno pede H1
↓
Conduz teste
↓
Evidence C2
↓
Debrief
↓
Transfer sobe
```

---

# 333. Example end-to-end — Senior

```text
Home
Senior 54/100

Goal
Web Specialist

↓
Ambiguous Challenge
↓
Minimal HUD
↓
Tutor silent
↓
Review after session
↓
Tutor attacks assumptions
↓
Teach-Back
↓
Specialist evidence
```

---

# 334. Example end-to-end — Exam

```text
Assessment Center
↓
Rules
↓
Scope
↓
Exam Mode
↓
Tutor assistance OFF
↓
Task
↓
Complete
↓
Assessor processes evidence
↓
Result
↓
Promotion impact
↓
Debrief
```

---

# 335. Example — privacy interruption

```text
Aluno abre password manager
↓
Blocked app
↓
No capture
↓
Session continues
```

---

# 336. Example — manual shutter

```text
Pause observation
↓
Indicator changes
↓
No capture
↓
Resume
```

---

# 337. Example — wrong Tutor observation

```text
Tutor:
“Você alterou duas variáveis.”

Aluno:
“Não, apenas o ID.”

↓
[Corrigir observação]
↓
Feedback recorded
↓
No automatic negative evidence
```

---

# 338. Example — false positive

```text
Candidate
↓
Control
↓
Hypothesis rejected
↓
False Positive
↓
Debrief:
Strong validation behavior
```

---

# 339. Example — score explainability

```text
Junior 68
↓
Why?
↓
Transfer blocker
↓
Authorization Transfer 51
↓
Evidence Groups
↓
Challenge #18
↓
Observed behavior
```

---

# 340. V1 screens

Primeira lista funcional:

```text
1. Onboarding
2. Placement
3. Home
4. Session Setup
5. Session HUD
6. Tutor Panel / Chat
7. Evidence Drawer
8. Debrief
9. Progress
10. Skill Detail
11. Curriculum
12. Assessment Center
13. Assessment Result
14. Privacy Center
15. Settings
```

---

# 341. Screen priority

Implementação futura deve priorizar:

```text
Session
Home
Debrief
Progress
Privacy
Assessment
Curriculum
```

---

# 342. Session is core

Se a sessão não for boa, dashboards não salvam o produto.

---

# 343. Prototype first

Antes de arquitetura final, vale prototipar:

- Session HUD;
- Tutor Panel;
- Evidence Drawer;
- Debrief;
- Home.

---

# 344. Usability prototype

Pode usar dados falsos.

Objetivo:

testar fluxo, não backend.

---

# 345. Product/UX versioning

Mudanças relevantes devem ser versionadas junto à spec.

---

# 346. V0.1 open questions

Ainda precisam ser resolvidas posteriormente:

- formato visual exato;
- desktop shell;
- posição do HUD;
- push-to-talk vs wake word;
- volume máximo de proatividade;
- retention defaults;
- detailed accessibility behavior;
- mobile companion.

---

# 347. Decisões normativas v0.1

Ficam estabelecidas:

1. desktop-first;
2. sessão ativa é o núcleo do produto;
3. Tutor fica periférico;
4. observation sempre visível;
5. Privacy Shutter obrigatório;
6. app allowlist;
7. Home prioriza próxima ação;
8. score é explainable;
9. Skill Graph separado de Curriculum;
10. hypothesis separado de finding;
11. finding lifecycle explícito;
12. evidence gaps visíveis;
13. hints não são punitivos;
14. Exam é explicitamente diferente de Practice;
15. Debrief é obrigatório em sessões significativas;
16. progressive disclosure;
17. UI adapta densidade ao nível;
18. aluno controla proatividade;
19. no hidden surveillance;
20. no gamification-first.

---

# 348. Critérios de aprovação

Este documento está aprovado se houver concordância de que:

- o aluno permanece no controle;
- a sessão é a principal superfície;
- a Home é simples;
- Tutor não domina a tela;
- hints são acessíveis;
- progress é explicável;
- evidence é visível sem poluir;
- privacy é explícita;
- assessment é transparente;
- Skill Graph é útil para desenvolvimento;
- a UX não incentiva XP/grind;
- a experiência muda naturalmente entre Intern e Specialist.

---

# 349. Próximo documento

Após aprovação:

`docs/03-product/BROTHER_EYE_V1_SCOPE_AND_ROADMAP.md`

Ele definirá:

- o que realmente entra no V1;
- o que fica para V1.1/V2;
- milestones;
- dependências;
- critérios de saída;
- ordem de implementação;
- principais riscos;
- definição de MVP utilizável.

---

# 350. Regra-mãe

> **A melhor UX do Brother Eye é aquela em que o aluno consegue aprender profundamente sem sentir que está operando a interface do Tutor em vez de realizar o pentest.**

---

## Status

**Draft v0.1**

Este documento deve ser validado conceitualmente antes da definição formal do escopo e roadmap do V1.

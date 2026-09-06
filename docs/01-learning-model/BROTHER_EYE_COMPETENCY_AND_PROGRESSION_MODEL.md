# Brother Eye — Modelo de Competências e Progressão

**Documento:** `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`  
**Status:** Draft v0.1  
**Dependência:** `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`  
**Idioma do produto:** Português-BR  
**Títulos oficiais:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define como o Brother Eye representa, observa, mede e comunica a evolução do aluno.

Ele especifica:

- a progressão `Intern → Junior → Mid-Level → Senior → Specialist`;
- a diferença qualitativa entre os níveis;
- o Competency Graph;
- as dimensões de cada competência;
- como observações viram Skill Evidence;
- como Skill Evidence afeta Mastery;
- como Confidence é calculada separadamente;
- como hints, dificuldade, novidade e transferência são interpretados;
- como misconceptions são registradas;
- como funciona o score `0–100` dentro de cada nível;
- Promotion Gates;
- avaliações;
- nível global e nível por domínio;
- Specialist Tracks;
- explicabilidade e auditabilidade do score.

Este documento não define ainda o currículo completo, thresholds finais, labs, arquitetura técnica ou UI final.

---

# 2. Princípio central

Brother Eye não mede atividade. Mede **competência evidenciada**.

Portanto:

- executar um comando não prova domínio;
- completar um lab não prova domínio;
- repetir uma técnica não prova transferência;
- acertar depois de receber a solução não prova autonomia;
- saber uma definição não prova aplicação;
- operar uma ferramenta não prova metodologia;
- uma nota dada livremente pelo LLM não constitui evidência.

A pergunta central é:

> **O que o aluno consegue demonstrar, em quais condições, com quanto auxílio, em quais contextos e com quanta consistência?**

---

# 3. Progressão oficial

`Intern → Junior → Mid-Level → Senior → Specialist`

Os níveis não são simples faixas de pontos. Representam mudanças qualitativas na forma de observar, raciocinar, executar, validar e trabalhar com autonomia.

---

# 4. Significado dos níveis

## 4.1 Intern — aprender a enxergar

O aluno constrói modelos mentais fundamentais.

Comportamentos típicos:

- compreende conceitos quando explicados;
- executa procedimentos conhecidos com orientação;
- começa a relacionar ações a objetivos;
- reconhece padrões quando direcionado;
- reproduz técnicas demonstradas;
- aprende baseline, controle, evidência e documentação;
- depende bastante de scaffolding;
- ainda pensa frequentemente em ferramentas e passos antes de hipóteses.

Pergunta característica:

> “O que estou observando e por que isso importa?”

---

## 4.2 Junior — aprender a investigar

O aluno começa a operar com modelos próprios em situações familiares.

Comportamentos típicos:

- reconhece padrões recorrentes;
- formula hipóteses simples;
- escolhe técnicas conhecidas;
- utiliza ferramentas com intenção;
- interpreta resultados comuns;
- conduz testes simples com ajuda moderada;
- começa a separar observação, hipótese e validação;
- coleta evidências com mais consistência.

Pergunta característica:

> “Qual hipótese faz sentido e como posso testá-la?”

---

## 4.3 Mid-Level — aprender a conduzir

O aluno consegue conduzir partes relevantes da investigação com independência.

Comportamentos típicos:

- estrutura objetivos;
- prioriza hipóteses;
- controla variáveis;
- escolhe técnicas sem depender de uma ferramenta;
- interpreta resultados ambíguos;
- abandona rabbit holes;
- considera explicações alternativas;
- valida findings;
- coleta evidência suficiente;
- articula impacto;
- transfere princípios para contextos moderadamente diferentes.

Pergunta característica:

> “Qual linha de investigação tem maior valor e qual evidência mudaria minha decisão?”

---

## 4.4 Senior — aprender a julgar

O aluno demonstra julgamento consistente e visão contextual.

Comportamentos típicos:

- prioriza por risco e valor da informação;
- trabalha bem sob ambiguidade;
- reconhece padrões complexos;
- combina informações de múltiplas fontes;
- questiona as próprias conclusões;
- reduz falsos positivos;
- adapta metodologia;
- transfere conhecimento entre cenários;
- revisa findings e o trabalho de outros;
- comunica raciocínio com clareza.

Pergunta característica:

> “Qual interpretação é mais defensável, quais alternativas existem e onde posso estar errado?”

---

## 4.5 Specialist — dominar adaptação e profundidade

O aluno demonstra proficiência elevada em situações novas, complexas e ambíguas dentro de uma ou mais especializações.

Comportamentos típicos:

- resolve problemas sem playbook óbvio;
- reconhece estruturas comuns entre domínios;
- adapta ou cria abordagens;
- raciocina sobre causa raiz;
- trabalha com informação incompleta;
- justifica trade-offs;
- revisa metodologia;
- ensina conceitos avançados;
- orienta outros sem simplesmente entregar respostas;
- reconhece limites da própria expertise;
- demonstra profundidade em pelo menos uma Specialist Track.

Pergunta característica:

> “Qual modelo explica melhor este problema e como adaptar a abordagem a algo que ainda não vi?”

---

# 5. Nível Brother Eye não é cargo profissional

Os níveis representam proficiência evidenciada dentro do currículo Brother Eye.

Exemplo correto:

`Brother Eye Proficiency: Senior`

Não assumir automaticamente que isso equivale a senioridade profissional no mercado.

---

# 6. Dois eixos de nível

Brother Eye deve manter:

1. **Nível Global**
2. **Nível por Domínio**

Exemplo:

```text
Global
Junior — 68/100

Web
Mid-Level — 34/100

API
Junior — 77/100

Infrastructure
Junior — 51/100
```

Isso evita tratar todo o perfil do aluno como homogêneo.

---

# 7. Nível Global

O Nível Global é o estágio mais alto cujos Promotion Gates obrigatórios foram satisfeitos.

Ele considera, entre outros:

- fundamentos;
- metodologia;
- raciocínio;
- autonomia;
- transferência;
- evidência;
- reporting;
- cobertura mínima de domínios;
- avaliações formais;
- misconceptions críticas.

Não é uma média simples.

---

# 8. Nível por Domínio

Domínios possuem progressão própria.

Exemplos:

- Web;
- API;
- Infrastructure;
- Identity / Active Directory;
- Cloud;
- Methodology;
- Evidence;
- Reporting;
- Tool Proficiency.

Um aluno pode estar avançado em Web e ainda iniciante em AD.

---

# 9. Competency Graph

As competências devem formar um grafo.

Exemplo conceitual:

```text
Pentest
│
├── Foundations
│   ├── Networking
│   ├── HTTP
│   ├── Operating Systems
│   └── Security Concepts
│
├── Methodology
│   ├── Observation
│   ├── Hypothesis Formation
│   ├── Prioritization
│   ├── Validation
│   └── Reflection
│
├── Web
│   ├── Authentication
│   ├── Authorization
│   │   ├── Object Level
│   │   └── Function Level
│   ├── Sessions
│   ├── Input Handling
│   └── Business Logic
│
├── API
│   ├── REST
│   ├── GraphQL
│   ├── Authentication
│   └── Authorization
│
├── Infrastructure
│   ├── Discovery
│   ├── Service Enumeration
│   ├── Linux
│   ├── Windows
│   └── Network Services
│
├── Evidence
│   ├── Baseline
│   ├── Control
│   ├── Reproduction
│   └── Impact Evidence
│
├── Reporting
│   ├── Reproduction Steps
│   ├── Impact
│   ├── Severity
│   └── Remediation
│
└── Tool Proficiency
    ├── Burp Suite
    ├── Nmap
    ├── Postman
    └── ...
```

O currículo detalhará esse grafo.

---

# 10. Tipos de skills

## Concept Skill
Conhecimento conceitual.

## Reasoning Skill
Formulação de hipóteses, priorização, interpretação, validação e reflexão.

## Operational Skill
Capacidade de executar uma atividade.

## Domain Skill
Competência de Web, API, Infra etc.

## Communication Skill
Explicar, escrever, justificar, revisar e ensinar.

## Tool Skill
Proficiência operacional em ferramenta específica.

Tool Skills devem permanecer separadas das competências metodológicas.

---

# 11. Relações do grafo

O grafo deve permitir:

- `requires`
- `supports`
- `part_of`
- `transfers_to`
- `demonstrated_by`
- `assessed_by`

Exemplo:

```text
Web.Authorization.ObjectLevel
    requires → HTTP.RequestUnderstanding
    requires → Identity.Context
    supports → API.BOLA
    transfers_to → GraphQL.ObjectAuthorization
```

---

# 12. Seis dimensões de competência

Cada skill relevante pode ser avaliada em seis dimensões.

## Knowledge

> O aluno entende o conceito?

## Reasoning

> O aluno sabe quando, por que e como raciocinar sobre essa competência?

## Execution

> O aluno consegue executar corretamente?

## Autonomy

> O aluno reconhece e conduz a atividade sem o Tutor indicar o caminho?

## Transfer

> O aluno aplica o princípio em um contexto diferente?

## Evidence & Communication

> O aluno consegue provar, documentar e explicar corretamente?

---

# 13. Perfil padrão de pesos v0.1

Quando uma skill não definir pesos próprios:

```text
Knowledge                 15%
Reasoning                 25%
Execution                 20%
Autonomy                  15%
Transfer                  15%
Evidence & Communication  10%
```

Esses pesos são defaults operacionais versionados, não uma verdade universal.

O Curriculum poderá sobrescrevê-los por skill.

---

# 14. Rubrica observacional

O Assessor não pergunta ao LLM:

> “Dê uma nota de 0 a 100.”

Ele classifica evidências usando uma rubrica discreta.

## R0 — Sem evidência válida

Não é possível inferir competência.

R0 não significa incapacidade.

## R1 — Incorreto / dependência extrema

Valor operacional: `20`

## R2 — Parcial / suporte alto

Valor operacional: `40`

## R3 — Correto com suporte significativo

Valor operacional: `60`

## R4 — Correto e independente em contexto familiar

Valor operacional: `80`

## R5 — Independente em contexto novo, complexo ou transferido

Valor operacional: `100`

A classificação deve possuir justificativa e evidência associada.

---

# 15. Por que rubrica discreta

Ela:

- reduz falsa precisão;
- facilita auditoria;
- torna evidências comparáveis;
- permite recalcular scores;
- evita notas inventadas;
- separa observação de agregação.

---

# 16. Skill Evidence

Toda alteração relevante no Learner Model deve surgir de um objeto `SkillEvidence`.

Exemplo:

```yaml
evidence_id: BE-SE-008291
timestamp: 2026-09-06T19:40:00-03:00

skill: Web.Authorization.ObjectLevel
dimension: Reasoning

environment:
  type: curated_lab
  lab_id: api-auth-07
  domain: API

task:
  difficulty: D2
  novelty: C2

observation:
  rubric: R4
  description: >
    O aluno identificou espontaneamente uma possível
    fronteira de autorização e propôs comparação
    controlada entre duas identidades.

assistance:
  highest_hint: H1

evidence_quality: strong
assessment_mode: practice

source:
  type: observed_behavior
  references:
    - EVT-18821
    - EVT-18827

assessor:
  classification_confidence: high
```

---

# 17. Imutabilidade da evidência

Skill Evidence deve ser imutável.

Se houver erro:

- invalidar ou disputar a evidência;
- criar correção;
- registrar motivo;
- recalcular.

Nunca apagar silenciosamente o histórico.

---

# 18. Evidence Quality

## Strong — 1.00

- comportamento diretamente observado;
- evento estruturado;
- ground truth;
- assessment formal;
- resultado verificável.

## Moderate — 0.75

- contexto razoável;
- observação válida porém incompleta.

## Weak — 0.50

- inferência indireta;
- contexto parcial;
- observação visual ambígua.

Autoavaliação do aluno não atualiza Mastery diretamente.

---

# 19. Mastery

Mastery é a estimativa atual da competência demonstrada.

Não depende diretamente de:

- tempo de uso;
- XP;
- labs concluídos;
- findings;
- comandos;
- opinião livre do Tutor.

---

# 20. Dimension Mastery

```text
DimensionMastery =
Σ(RubricValue × EvidenceQualityWeight)
────────────────────────────────────────
Σ(EvidenceQualityWeight)
```

Valores:

```text
R1 = 20
R2 = 40
R3 = 60
R4 = 80
R5 = 100
```

R0 não entra no cálculo.

---

# 21. Evidence Portfolio

O histórico completo permanece imutável, mas Mastery atual utiliza um `Evidence Portfolio`.

O portfolio deve privilegiar:

- evidências recentes válidas;
- assessments;
- contextos diversos;
- independência;
- maior dificuldade;
- transferência.

Isso impede que erros antigos continuem pesando para sempre.

---

# 22. Default Evidence Portfolio v0.1

Por dimensão:

- até 8 evidências recentes válidas;
- mais até 4 evidence anchors de assessment;
- preservar diversidade quando possível.

O ledger histórico continua completo.

Essa política será calibrada futuramente.

---

# 23. Skill Mastery

```text
SkillMastery =
Σ(DimensionMastery × DimensionWeight)
────────────────────────────────────────
Σ(DimensionWeight)
```

Se uma dimensão obrigatória não possuir evidência suficiente:

- marcar `insufficient_evidence`;
- não assumir zero;
- reduzir Confidence;
- bloquear gates quando necessário.

---

# 24. Confidence

Confidence mede a força da evidência que sustenta Mastery.

Exemplo:

```text
SQL Injection
Mastery: 91
Confidence: Low
```

Poucas evidências fortes.

Outro:

```text
HTTP Fundamentals
Mastery: 88
Confidence: Very High
```

Muitas evidências consistentes e diversas.

---

# 25. Confidence Tiers

- Low
- Medium
- High
- Very High

### Low
Poucas evidências, contexto único, muita assistência ou dados antigos.

### Medium
Default v0.1:
- ≥ 3 evidências úteis;
- ≥ 1 independente;
- ≥ 2 contextos.

### High
Default v0.1:
- ≥ 5 evidências úteis;
- ≥ 2 independentes;
- ≥ 3 contextos;
- ≥ 1 Challenge ou assessment formal.

### Very High
Default v0.1:
- ≥ 7 evidências úteis;
- múltiplas H0/H1;
- múltiplos contextos novos;
- avaliação formal recente;
- transferência demonstrada.

Os thresholds serão calibrados.

---

# 26. Recência e revalidação

Tempo não reduz Mastery automaticamente.

Ele reduz a confiança na estimativa.

Estados possíveis:

```text
fresh
aging
revalidation_due
revalidated
```

Cada skill poderá possuir `revalidation_policy` própria.

---

# 27. Hint Ladder

```text
H0 — nenhuma ajuda
H1 — pergunta
H2 — pista
H3 — explicação conceitual
H4 — orientação procedural
H5 — demonstração
```

Pedir ajuda não gera penalidade.

O nível de ajuda define o que aquela tentativa pode provar.

---

# 28. Inferência por nível de ajuda

## H0

Pode sustentar todas as dimensões.

## H1

Pode sustentar todas as dimensões, mas R5 de Autonomy normalmente exige H0.

## H2

Pode sustentar Knowledge, Reasoning, Execution e Evidence.

Autonomy é limitada.

Transfer deve ser interpretada com cautela.

## H3

Pode sustentar principalmente Knowledge, Execution e Evidence.

Reasoning só quando reconstruído posteriormente de forma independente.

Não sustenta fortemente Autonomy ou Transfer.

## H4

Pode sustentar Knowledge e Execution.

Não sustenta Reasoning, Autonomy ou Transfer como evidência forte.

## H5

É principalmente experiência de aprendizagem.

Uma nova tentativa posterior é necessária para inferir independência.

---

# 29. Ajuda não tira pontos

Exemplo:

O aluno recebe H4 e executa corretamente.

Pode gerar:

```text
Knowledge: R3
Execution: R3
Autonomy: sem nova evidência
Transfer: sem nova evidência
```

Não ocorre:

```text
-10 por pedir ajuda
```

---

# 30. Task Difficulty

Escala inicial:

## D1 — Fundamental
Direto, contexto claro, poucas variáveis.

## D2 — Standard
Escolha de técnica e alguma interpretação.

## D3 — Complex
Múltiplas etapas, ambiguidade, priorização.

## D4 — Advanced
Contexto pouco familiar, múltiplas competências, adaptação.

## D5 — Expert
Problema aberto, cross-domain, sem playbook óbvio.

Dificuldade não é multiplicador de XP.

Ela determina o nível de proficiência que a evidência pode sustentar.

---

# 31. Context Novelty

## C0 — Repetição
Mesmo lab ou fluxo conhecido.

## C1 — Variação
Pequena variação do mesmo princípio.

## C2 — Contexto novo
Nova aplicação, serviço, tecnologia ou estrutura.

## C3 — Transferência
Mesmo princípio em representação ou domínio significativamente diferente.

Transfer depende principalmente de C2/C3.

---

# 32. Diminishing returns

Repetir a mesma tarefa fornece cada vez menos informação.

Brother Eye pode registrar atividade sem adicionar nova Skill Evidence ao portfolio quando a repetição não muda o que sabemos sobre a competência.

---

# 33. Evidence Information Value

Uma observação pode ser:

- Low;
- Medium;
- High.

Considerar:

- novidade;
- dificuldade;
- independência;
- qualidade;
- poder de distinguir competência real de assistência.

---

# 34. Misconceptions

Exemplos:

```text
"porta aberta = vulnerabilidade"
"scanner encontrou = finding validado"
"authentication = authorization"
"resposta diferente = vulnerabilidade"
"payload vem antes da hipótese"
```

Estados:

```text
suspected
confirmed
improving
resolved
recurred
```

Uma explicação do Tutor não resolve misconception.

Default v0.1 para `resolved`:

- pelo menos 2 demonstrações corretas;
- pelo menos 1 independente;
- preferencialmente em contexto diferente.

Misconceptions críticas podem bloquear promoção.

---

# 35. Assessment Modes

## Learn
Ensino predominante.

## Practice
Scaffolding adaptativo.

## Challenge
Aluno lidera; intervenção reduzida.

## Exam
Sem ajuda durante execução.

## Review
Reflexão e reconstrução da sessão.

## Teach-Back
Aluno explica, revisa ou ensina.

---

# 36. Assessment Integrity

Avaliações formais devem registrar:

- lab conhecido ou desconhecido;
- ground truth;
- hints;
- acesso a solução;
- prática prévia;
- duração;
- interrupções;
- integridade da observação.

---

# 37. Placement Assessment

Alunos experientes podem iniciar acima de `Intern 0/100`.

O placement atribui apenas competências observadas.

Skills sem evidência permanecem `Unknown`.

---

# 38. Score 0–100 dentro do nível

`Junior — 68/100` não é XP.

Significa:

> aproximadamente 68% da prontidão exigida para a promoção a Mid-Level, segundo os gates da versão atual do currículo.

---

# 39. Stage Progress

Para Intern, Junior, Mid-Level e Senior:

```text
StageProgress =
Σ(GateCompletion × GateWeight)
────────────────────────────────
Σ(GateWeight)
× 100
```

Cada gate possui:

- peso;
- condição;
- progresso 0–1;
- tipo soft ou hard.

---

# 40. Hard Gates

Hard Gates são obrigatórios.

Exemplos:

- Core Skill minimum;
- Autonomy minimum;
- Transfer minimum;
- assessment independente;
- Evidence minimum;
- ausência de misconception crítica;
- Confidence suficiente.

Média alta não compensa Hard Gate.

---

# 41. Cap de 99

Se o cálculo chegaria a 100, mas ainda existe Hard Gate pendente:

```text
StageProgress: 99/100
PromotionEligible: false
```

A interface mostra o blocker.

---

# 42. Significado de cada score de estágio

```text
Intern 0–100
→ prontidão para Junior

Junior 0–100
→ prontidão para Mid-Level

Mid-Level 0–100
→ prontidão para Senior

Senior 0–100
→ prontidão para Specialist
```

---

# 43. Specialist 0–100

Como Specialist é o último nível, seu score não representa promoção.

Representa profundidade e cobertura dentro do benchmark Specialist vigente.

Pode considerar:

- breadth;
- depth;
- D4/D5;
- cross-domain reasoning;
- Teach-Back;
- review;
- transferência;
- especialização.

`Specialist 100/100` significa máximo benchmark evidenciado no currículo daquela versão, não conhecimento universal.

---

# 44. Promotion Gates

Estrutura conceitual:

```yaml
promotion:
  from: Junior
  to: Mid-Level

  hard_gates:
    - core_skill_minimums
    - autonomy_minimum
    - transfer_minimum
    - formal_assessment
    - no_critical_misconceptions

  soft_gates:
    - breadth
    - evidence_quality
    - reporting
    - context_diversity
```

Thresholds numéricos ficam no Curriculum.

---

# 45. Tipos de gates

- Core Skill Gate
- Breadth Gate
- Autonomy Gate
- Transfer Gate
- Assessment Gate
- Evidence Gate
- Misconception Gate
- Recency Gate

---

# 46. Promoção não é média

Exemplo:

```text
Web                 98
API                 96
Infrastructure      42
Reasoning           94
Autonomy            90
```

Se Infrastructure for um core gate obrigatório, promoção pode continuar bloqueada.

---

# 47. Specialist Tracks

Exemplos futuros:

- Web Specialist;
- API Specialist;
- Infrastructure Specialist;
- Active Directory Specialist;
- Cloud Specialist.

O currículo definirá as trilhas oficiais.

---

# 48. Global Specialist

Para Specialist global, o aluno deve:

1. satisfazer gates globais de Senior;
2. atingir pelo menos uma Specialist Track;
3. demonstrar raciocínio cross-domain;
4. demonstrar revisão;
5. demonstrar Teach-Back;
6. performar em D4/D5;
7. possuir Confidence suficiente.

---

# 49. Teach-Back como evidência avançada

Em Senior e Specialist, avaliar:

- explicação;
- revisão;
- identificação de misconception;
- orientação sem entregar a solução;
- defesa de decisão;
- análise de trade-offs.

---

# 50. Skill Criticality

Cada skill pode ser:

- `core`
- `important`
- `specialized`

Core Skills podem bloquear promoção.

---

# 51. Difficulty ceiling por nível

Modelo conceitual:

```text
Intern      D1
Junior      D1–D2
Mid-Level   D2–D3
Senior      D3–D4
Specialist  D4–D5
```

Não precisa ser rígido para todas as skills.

---

# 52. R5 não promove automaticamente

Uma observação excelente não basta.

Nível exige:

- consistência;
- breadth;
- dificuldade compatível;
- autonomia;
- transfer;
- assessments;
- gates.

---

# 53. Domain Mastery

```text
DomainMastery =
Σ(SkillMastery × SkillWeight)
──────────────────────────────
Σ(SkillWeight)
```

Domain Level continua gate-based.

---

# 54. Skill example completo

Skill:

`Web.Authorization.ObjectLevel`

```text
Knowledge                 88
Reasoning                 74
Execution                 91
Autonomy                  62
Transfer                  51
Evidence & Communication  79
```

Pesos default:

```text
Knowledge                 15%
Reasoning                 25%
Execution                 20%
Autonomy                  15%
Transfer                  15%
Evidence & Communication  10%
```

Cálculo:

```text
(88 × 0.15) +
(74 × 0.25) +
(91 × 0.20) +
(62 × 0.15) +
(51 × 0.15) +
(79 × 0.10)

= 74.75
```

Resultado:

```text
Mastery: 75
Confidence: High
```

---

# 55. Explicação do 75

A interface deve conseguir mostrar:

```text
Authorization.ObjectLevel — 75
Confidence: High

Strengths
✓ execução consistente
✓ conhecimento forte
✓ evidência bem documentada

Weaknesses
• autonomia moderada
• transferência limitada

Evidence
12 observações válidas
7 independentes
3 contextos
1 Exam
2 C2
0 C3

Recent assistance
H0: 4
H1: 3
H2: 2
H3+: 3
```

---

# 56. Falso domínio

Exemplo:

```text
Nmap Tool Proficiency
Mastery: 92

Service Enumeration
Mastery: 56
```

Interpretação:

> O aluno opera Nmap muito bem, mas ainda tem dificuldade para transformar enumeração em processo metodológico.

---

# 57. Dependência do Tutor

Exemplo:

```text
SQL Injection

Knowledge      90
Execution      88
Reasoning      71
Autonomy       43
Transfer       38
```

Interpretação:

> Sabe executar quando a situação é indicada, mas ainda não reconhece e investiga de forma independente em contextos novos.

---

# 58. Transfer example

```text
Lab A
GET /users/123
H3

Lab B
GET /orders/51
H1

Lab C
POST /invoice
{"invoice_uuid":"..."}
H0
```

Lab C fornece evidência mais forte de Transfer.

---

# 59. Evidência contraditória

Exemplo:

```text
Exam A: Autonomy R5
Exam B: Autonomy R2
```

Brother Eye deve:

- preservar ambas;
- reduzir Confidence;
- procurar explicação contextual;
- recomendar reavaliação.

Não escolher apenas a melhor.

---

# 60. Outliers

Uma falha isolada não deve destruir Mastery.

Uma performance excelente isolada não deve inflá-lo excessivamente.

O portfolio existe para isso.

---

# 61. Assessor uncertainty

Cada evidência deve poder registrar:

```text
classification_confidence:
  high
  medium
  low
```

Isso é diferente da Confidence da skill.

---

# 62. Ground Truth e Instructor Key

Assessment Labs devem possuir Instructor Key com:

- learning objectives;
- skills;
- possíveis caminhos;
- ground truth;
- misconceptions;
- evidence expected;
- difficulty;
- rubrics.

---

# 63. Open Lab vs Assessment Lab

## Open Lab

Pode avaliar:

- reasoning;
- execution;
- methodology;
- evidence;
- autonomy.

Sem ground truth, não afirmar que o aluno “encontrou tudo”.

## Assessment Lab

Pode avaliar também:

- missed observations;
- coverage;
- priorização;
- comparação com ground truth.

---

# 64. Promotion Assessment

Promoções relevantes devem exigir avaliação apropriada sem assistência.

A quantidade e composição ficam no Curriculum.

---

# 65. Transfer Assessment

Promoções avançadas devem incluir problema desconhecido em que o aluno não saiba previamente:

- o que existe;
- qual técnica será necessária;
- qual caminho é esperado.

---

# 66. Reasoning explícito

Brother Eye deve perguntar, quando necessário:

- Qual é sua hipótese?
- O que você espera observar?
- Por que escolheu esse teste?
- O que faria abandonar essa linha?
- Que explicação alternativa existe?

Isso transforma raciocínio em evidência observável.

---

# 67. Reporting Evidence

Avaliar separadamente:

- clareza;
- reprodução;
- precisão;
- impacto;
- severidade;
- evidência;
- remediação.

Texto produzido predominantemente pelo Tutor não é forte evidência da competência de Reporting do aluno.

---

# 68. Coautoria

Se Brother Eye reescrever grande parte do finding:

```text
assisted_reporting: true
```

O aluno pode posteriormente produzir nova versão independente para demonstrar competência.

---

# 69. Evidence Completeness

Brother Eye pode acompanhar:

```text
Baseline        ✓
Trigger         ✓
Control         ✗
Reproduction    ✓
Impact          ✗
```

Isso serve ao ensino e à avaliação.

---

# 70. Learning recommendations

Priorizar prática com base em:

- promotion blockers;
- misconceptions;
- Confidence baixa;
- skills core;
- falta de Transfer;
- baixa Autonomy;
- skills próximas de consolidação.

Não simplesmente pela menor nota.

---

# 71. Learning State por skill

Estados pedagógicos:

```text
unseen
introduced
guided
practicing
independent
transfer_ready
consolidated
revalidation_due
stalled
```

Learning State é diferente de Mastery.

---

# 72. Mapping conceitual do Learning State

```text
unseen
→ sem evidência

introduced
→ exposição inicial

guided
→ sucesso principalmente H3–H5

practicing
→ sucesso H1–H3

independent
→ múltiplos H0/H1

transfer_ready
→ independente em contexto familiar

consolidated
→ transfer + Confidence suficiente

revalidation_due
→ evidência envelhecida

stalled
→ prática sem evolução relevante
```

---

# 73. Stalled

Quando uma skill está `stalled`, o Tutor deve mudar estratégia.

Possíveis ações:

- voltar a Modeling;
- usar analogia;
- dividir a skill;
- trocar contexto;
- criar microaula;
- Teach-Back;
- reduzir complexidade.

Não apenas repetir mais do mesmo.

---

# 74. Score Explainability Contract

Todo score deve permitir navegar:

```text
Level
↓
Promotion Gates
↓
Domains
↓
Skills
↓
Dimensions
↓
Skill Evidence
↓
Supporting Events
```

Isso é requisito de produto.

---

# 75. O LLM não é autoridade final

LLMs podem:

- classificar observações;
- sugerir skills;
- propor rubrics;
- explicar evidências.

Mas:

- cálculos são determinísticos;
- gates são determinísticos;
- scores são reproduzíveis;
- mudanças são auditáveis.

---

# 76. Recalculation e versionamento

Cada score deve estar ligado a:

```text
curriculum_version
assessment_model_version
scoring_model_version
```

Se pesos, rubricas ou thresholds mudarem:

- preservar versão anterior;
- recalcular;
- registrar migração.

---

# 77. Anti-Gaming

Evitar incentivos para:

- repetir tarefas fáceis;
- evitar hints;
- escolher apenas skills dominadas;
- caçar findings;
- decorar labs;
- priorizar velocidade.

Mecanismos:

- diminishing returns em C0;
- hints sem punição;
- transfer obrigatório;
- hard gates;
- assessment desconhecido.

---

# 78. Dashboards conceituais

## Global

```text
Junior — 68/100
Confidence: High

Promotion to Mid-Level
█████████████░░░░░░░ 68%

Main blockers
1. Transfer
2. Infrastructure breadth
3. Independent validation
```

## Skill

```text
Authorization.ObjectLevel

Mastery      75
Confidence   High
State        independent

Knowledge                 88
Reasoning                 74
Execution                 91
Autonomy                  62
Transfer                  51
Evidence & Communication  79

Next best evidence:
Novel API assessment without hints.
```

---

# 79. Promotion Dashboard

```text
Junior → Mid-Level

Core Skills           PASS
Reasoning             PASS
Execution             PASS
Autonomy              PASS
Transfer              FAIL ← BLOCKER
Evidence              PASS
Assessment            PASS
Misconceptions        PASS

Stage Progress: 84/100
Promotion Eligible: No
```

---

# 80. Why this score?

O aluno deve poder perguntar:

> “Por que estou com esta nota?”

Brother Eye responde com:

- critérios;
- evidence;
- gaps;
- blockers;
- Confidence;
- mudanças recentes.

---

# 81. Failure pode ser evidência positiva

Uma hipótese pode estar errada e ainda demonstrar excelente Reasoning se o aluno:

- a formulou corretamente;
- executou teste discriminativo;
- interpretou o resultado;
- refutou a hipótese;
- seguiu adiante.

Encontrar vulnerabilidade não é requisito para demonstrar competência.

---

# 82. Resultado negativo correto

Validar corretamente que algo NÃO é vulnerável demonstra:

- controle;
- refutação;
- maturidade;
- redução de falso positivo.

Brother Eye deve valorizar isso.

---

# 83. Rabbit Hole Recovery

Níveis avançados devem demonstrar capacidade de:

- perceber baixa informação;
- reavaliar custo;
- mudar prioridade;
- abandonar caminho.

Isso pode ser skill própria.

---

# 84. Eficiência

Velocidade bruta não é métrica principal.

Em níveis avançados, eficiência significa:

- priorização;
- escolha de testes discriminativos;
- redução de rabbit holes;
- melhor uso da informação.

---

# 85. Uncertainty Handling

Senior e Specialist devem demonstrar capacidade de dizer:

- “não sei”;
- “a evidência é insuficiente”;
- “existem duas hipóteses plausíveis”;
- “precisamos de outro teste”.

Confiança excessiva não é expertise.

---

# 86. Multiple Valid Paths

Assessment deve reconhecer abordagens tecnicamente válidas diferentes do caminho esperado.

Instructor Key deve permitir:

- caminho esperado;
- caminhos alternativos;
- critérios independentes de caminho.

---

# 87. Tool fairness

Escolher ferramenta diferente não reduz competência se:

- a técnica é válida;
- objetivo é atingido;
- reasoning é sólido;
- evidence é suficiente.

Exceção: quando a skill avaliada é explicitamente proficiência naquela ferramenta.

---

# 88. Correlated Evidence

Várias dimensões observadas na mesma experiência devem compartilhar:

`evidence_group_id`

Exemplo:

```text
EG-440

Reasoning R4
Execution R4
Autonomy R4
Evidence R3
```

Confidence deve considerar grupos, não apenas contagem bruta de registros.

---

# 89. Assessment saturation

Quando uma skill já possui forte evidência:

não continuar repetindo assessment idêntico.

Preferir:

- maior dificuldade;
- contexto diferente;
- integração com outra skill;
- Teach-Back;
- revalidação futura.

---

# 90. Domain Specialist vs Global Specialist

Exemplo válido:

```text
Global
Senior — 57/100

Web
Specialist — 31/100
```

O aluno pode ser Specialist em um domínio antes de satisfazer todos os gates globais de Specialist.

---

# 91. Metacognitive Calibration

Brother Eye pode comparar:

```text
Self-assessed confidence: 90
Observed Mastery: 58
```

ou:

```text
Self-assessed confidence: 45
Observed Mastery: 83
```

Autoavaliação não altera Mastery diretamente.

---

# 92. Human Review

Nas primeiras versões, avaliações críticas e promoções devem ser revisáveis por humano.

Objetivo:

calibrar o Assessor antes de confiar em progressão completamente automática.

---

# 93. Manual override

Override humano deve:

- ser autorizado;
- possuir justificativa;
- não apagar dados;
- ficar auditável.

---

# 94. Minimum Viable Learner Model

A primeira versão funcional precisa no mínimo de:

- Skill Graph básico;
- seis dimensões;
- Skill Evidence;
- H0–H5;
- Mastery;
- Confidence;
- misconceptions;
- Learning State;
- Stage Progress;
- hard gates;
- nível global;
- nível por domínio;
- explicabilidade.

Modelos estatísticos avançados podem esperar.

---

# 95. Escopo recomendado para Curriculum v0.1

Priorizar:

- Foundations;
- Methodology;
- Web;
- API;
- Infrastructure;
- Evidence;
- Reporting.

AD, Cloud e outras trilhas entram posteriormente.

---

# 96. Perfil completo de exemplo

```text
BROTHER EYE PROFILE

Global
Junior — 68/100
Confidence: High

Domains
Methodology       Mid-Level — 12/100
Web               Mid-Level — 34/100
API               Junior — 77/100
Infrastructure    Junior — 51/100
Evidence          Mid-Level — 08/100
Reporting         Junior — 83/100

Reasoning
Hypothesis Formation       81
Prioritization             67
Alternative Explanations   58
Validation                 79

Learning Behavior
Autonomy                   63
Transfer                   55
Hint dependency            decreasing

Critical Misconceptions
0 open

Promotion blockers
1. Transfer threshold
2. Infrastructure breadth

Next recommended assessment
Unknown API authorization lab
```

---

# 97. Trajetória de aprendizagem de exemplo

## Sessão 1

```text
Skill: API.Authorization
H4
Execution correct
Autonomy not demonstrated
```

## Sessão 2

```text
H2
Reasoning correct
Execution correct
```

## Sessão 3

```text
H1
Recognized issue
Execution correct
```

## Sessão 4

```text
Web.Authorization
H0
C2
Correct
```

## Exam

```text
Unknown API
H0
C3
D3
Correct reasoning
Correct validation
Good evidence
```

A skill pode então atingir `consolidated`.

---

# 98. Aluno que executa mas não entende

```text
Knowledge 74
Reasoning 48
Execution 92
Autonomy 39
Transfer 31
```

Brother Eye não promove apenas porque labs foram concluídos.

---

# 99. Aluno conceitualmente forte, operacionalmente fraco

```text
Knowledge 91
Reasoning 86
Execution 47
Autonomy 52
Transfer 72
```

Recomendação:

mais prática operacional, menos teoria.

---

# 100. Evidência envelhecida

```text
Mastery: 89
Confidence: Medium
State: revalidation_due
```

Não reduzir Mastery arbitrariamente.

Solicitar Challenge/Exam curto.

---

# 101. Promoção bloqueada por misconception

```text
Stage Progress: 96/100

Hard Gate
Critical Misconceptions: FAIL

Open:
"Scanner finding = validated finding"

Promotion Eligible: No
```

---

# 102. Exemplo de promoção

```text
Junior — 100/100

Core Skills            PASS
Autonomy               PASS
Transfer               PASS
Assessment             PASS
Evidence               PASS
Misconceptions         PASS
Recency                PASS

Promotion Eligible: Yes
```

Promoção:

```text
Mid-Level
```

As skills e evidências permanecem.

---

# 103. O que significa Mid-Level 0/100

Não significa falta de competência.

Significa que o aluno acabou de satisfazer o benchmark de entrada Mid-Level e ainda não demonstrou progresso relevante em direção ao benchmark Senior.

Se já houver evidence válida do próximo estágio, o progresso inicial pode ser maior que zero.

---

# 104. Specialist 100/100

Significa:

> Todos os benchmarks Specialist da versão atual do currículo foram satisfeitos com evidência suficiente.

Não significa:

- saber tudo;
- nunca errar;
- dominar todos os domínios;
- não precisar continuar aprendendo.

---

# 105. Competency Snapshot por sessão

Exemplo:

```text
Before
Junior 62/100

After
Junior 65/100

Changed skills
Authorization +4
Evidence +2
Reasoning +1

Confidence changes
API.Authorization: Medium → High
```

A UI deve evitar transformar crescimento de score no objetivo principal da sessão.

---

# 106. Unknown é estado válido

Exemplo:

```text
Kerberos
Mastery: Unknown
Confidence: None
```

Ausência de dados não é zero.

---

# 107. Data provenance

Toda Skill Evidence deve registrar origem:

- tool adapter;
- terminal;
- screen;
- accessibility;
- student answer;
- ground truth;
- human review.

A origem influencia Evidence Quality.

---

# 108. No hidden score mutation

Scores só mudam por:

- nova evidence;
- invalidação/correção;
- mudança versionada do modelo.

Nunca por ajuste silencioso do Tutor.

---

# 109. Explainable Promotion

Ao promover:

```text
Promoted
Junior → Mid-Level

Why
• core competencies satisfied
• independent assessment passed
• transfer demonstrated
• no critical misconceptions
• Confidence sufficient

Remaining development areas
...
```

---

# 110. Explainable Non-Promotion

```text
Junior — 94/100

Not eligible because
• Transfer Gate pending
• one critical misconception unresolved

Recommended evidence
• unknown-context assessment
• independent validation exercise
```

---

# 111. Tutor Engine usa o Learner Model

Exemplo:

```text
HTTP Fundamentals
Mastery 94
Confidence Very High
```

Brother Eye reduz explicações básicas.

```text
Kerberos
Mastery 34
Confidence High
```

Brother Eye aumenta Modeling e Scaffolding.

O Learner Model deve alterar comportamento pedagógico, não ser apenas dashboard.

---

# 112. Fluxo de atualização

```text
Student Action
      ↓
Observation
      ↓
Assessment Engine
      ↓
Skill Evidence
      ↓
Learner Model
      ↓
Tutor Adaptation
```

Tutor Engine não deve editar Mastery diretamente.

---

# 113. Relação com outros documentos

```text
Competency Model
= como medir

Curriculum
= o que medir

Tutor Pedagogy
= como ensinar

Assessment Spec
= como produzir evidência confiável
```

Essas responsabilidades devem permanecer separadas.

---

# 114. Calibração futura

A v0.1 utiliza regras transparentes.

Com dados reais suficientes, poderemos avaliar:

- Item Response Theory;
- Elo-style ratings;
- Bayesian Knowledge Tracing;
- Performance Factors Analysis.

Nenhum modelo estatístico complexo é requisito do V1.

---

# 115. Regra de dados antes de sofisticação

Não introduzir modelo complexo sem:

- volume;
- ground truth;
- labels confiáveis;
- avaliação de calibration;
- comparação com baseline determinístico.

Explicabilidade deve permanecer mesmo após evolução estatística.

---

# 116. Decisões normativas v0.1

Ficam estabelecidas:

1. progressão oficial:
   `Intern → Junior → Mid-Level → Senior → Specialist`;

2. os níveis representam mudanças qualitativas;

3. existe nível global e nível por domínio;

4. skills podem possuir seis dimensões:
   - Knowledge;
   - Reasoning;
   - Execution;
   - Autonomy;
   - Transfer;
   - Evidence & Communication;

5. Skill Evidence é a unidade básica de atualização;

6. LLM não atribui score livremente;

7. Mastery e Confidence são separados;

8. tempo reduz Confidence, não Mastery automaticamente;

9. hints não geram penalidade;

10. ajuda limita o tipo de inferência possível;

11. repetição possui diminishing returns;

12. transferência vale mais que repetição;

13. Promotion Gates são obrigatórios;

14. score do estágio representa progresso para o próximo benchmark;

15. Hard Gates podem bloquear promoção com score alto;

16. Specialist possui tracks;

17. promoções avançadas exigem avaliação independente;

18. misconceptions críticas podem bloquear promoção;

19. todos os scores devem ser explicáveis;

20. evidence histórico deve permitir recálculo futuro.

---

# 117. Questões deixadas para documentos posteriores

Ainda serão definidos:

- Skill Graph completo;
- thresholds de promoção;
- pesos específicos por skill;
- quantidade exata de assessments;
- dificuldade obrigatória por nível;
- revalidation windows;
- Specialist Tracks definitivas;
- labs;
- política final do Evidence Portfolio;
- calibration estatística;
- UI final.

---

# 118. Critérios de aprovação

Este modelo está conceitualmente aprovado quando houver concordância de que:

- score não é XP;
- score deriva de evidência;
- nível global e domínio são separados;
- os cinco estágios representam evolução de autonomia e julgamento;
- hints ajudam sem punir;
- Mastery e Confidence são distintos;
- Transfer é obrigatória para maturidade;
- promoção depende de gates;
- Specialist representa domínio adaptativo e especialização;
- qualquer nota é explicável;
- LLM não possui autoridade arbitrária sobre progressão.

---

# 119. Próximo documento

Após aprovação:

`BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`

Ele definirá:

- comportamento pedagógico do Tutor;
- política H0–H5;
- silêncio;
- perguntas;
- explicação;
- productive struggle;
- stuck detection;
- fading;
- microaulas;
- misconceptions;
- modos Learn / Practice / Challenge / Exam / Review / Teach-Back;
- adaptação por Intern / Junior / Mid-Level / Senior / Specialist.

---

# 120. Regra-mãe

> **Brother Eye não promove o aluno pelo que ele completou. Promove pelo que ele conseguiu demonstrar de forma consistente, explicável, transferível e progressivamente independente.**

---

## Status

**Draft v0.1**

Este documento deve ser revisado e aprovado antes da especificação pedagógica detalhada do Tutor.

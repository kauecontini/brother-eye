# Brother Eye — Assessment e Skill Evidence

**Documento:** `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`  
**Status:** Draft v0.1  
**Dependências:**  
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define como o Brother Eye transforma comportamento observado em evidência confiável de aprendizagem.

Ele especifica:

- o papel do Assessment Engine;
- a unidade `SkillEvidence`;
- como observações são classificadas;
- como evidências são agrupadas;
- como o sistema utiliza ground truth;
- como funcionam Instructor Keys;
- como Practice, Challenge, Exam, Review e Teach-Back produzem tipos diferentes de evidência;
- como lidar com ajuda do Tutor;
- como lidar com contexto conhecido ou desconhecido;
- como medir novidade e transferência;
- como registrar dificuldade;
- como distinguir erro técnico de erro pedagógico;
- como lidar com evidências conflitantes;
- como corrigir avaliações incorretas;
- como revisar evidence por humano;
- como preservar auditabilidade;
- como construir Promotion Evidence;
- como evitar contaminação de assessment;
- como avaliar o próprio Assessor;
- como calibrar o sistema no futuro.

Este documento não define o currículo completo, thresholds finais de promoção, implementação técnica ou UI final.

---

# 2. Princípio central

Assessment no Brother Eye existe para responder:

> **Que competência o aluno realmente demonstrou, com que força de evidência, em que contexto e com quanto auxílio?**

Assessment não existe para transformar toda ação em nota.

---

# 3. O que Assessment não deve fazer

O Assessment Engine não deve:

- pontuar cada clique;
- atribuir XP;
- premiar quantidade de comandos;
- tratar finding como sinônimo de competência;
- tratar lab concluído como prova de domínio;
- transformar toda fala em evidence;
- inferir intenção quando não existe base;
- inventar score direto;
- punir o aluno por pedir ajuda;
- confundir erro de ferramenta com incompetência;
- confundir ausência de evidence com incapacidade.

---

# 4. Separação entre observação, interpretação e evidence

Fluxo obrigatório:

```text
RAW EVENT
↓
OBSERVATION
↓
ASSESSOR INTERPRETATION
↓
SKILL EVIDENCE
↓
LEARNER MODEL
```

Cada etapa possui função diferente.

---

# 5. Raw Event

`RawEvent` é dado bruto.

Exemplos:

- comando executado;
- stdout;
- request HTTP;
- response HTTP;
- clique;
- screenshot;
- fala do aluno;
- resposta textual;
- evento do Burp;
- evento do Postman;
- output Nmap;
- arquivo salvo;
- alteração em finding;
- timestamp.

Raw Event não é evidence por si só.

---

# 6. Observation

`Observation` é uma interpretação factual mínima do que ocorreu.

Exemplo:

```text
Aluno executou um scan TCP no host autorizado.
```

ou:

```text
Aluno comparou duas responses alterando apenas o identificador do objeto.
```

Observation deve evitar julgamento de competência.

---

# 7. Assessor Interpretation

O Assessor determina:

- qual skill foi observada;
- qual dimensão;
- qual rubrica;
- qual nível de ajuda;
- qual dificuldade;
- qual novidade;
- qual qualidade da evidence;
- qual confiança na classificação.

---

# 8. Skill Evidence

`SkillEvidence` é a unidade oficial que pode atualizar o Learner Model.

Nenhum score relevante deve mudar sem Skill Evidence ou correção versionada do modelo.

---

# 9. Schema conceitual de SkillEvidence

```yaml
evidence_id: BE-SE-000001
evidence_group_id: BE-EG-000001

timestamp: 2026-09-06T20:00:00-03:00

student_id: local-user

skill:
  id: Web.Authorization.ObjectLevel
  curriculum_version: 0.1

dimension: Reasoning

context:
  domain: API
  environment_type: assessment_lab
  lab_id: api-auth-07
  task_id: task-03
  known_to_student: false

task:
  difficulty: D3
  novelty: C2

assistance:
  mode: Exam
  highest_hint: H0
  tutor_intervention_count: 0

observation:
  rubric: R4
  description: >
    O aluno identificou espontaneamente uma fronteira
    de autorização em nível de objeto e formulou teste
    controlado entre duas identidades.

evidence_quality: strong

source:
  provenance:
    - type: tool_event
      ref: EVT-8812
    - type: student_explanation
      ref: EVT-8817

ground_truth:
  available: true
  key_ref: IK-api-auth-07

assessor:
  model_version: assessor-v0.1
  classification_confidence: high
  rationale: >
    A hipótese foi formulada antes de qualquer hint e
    corresponde ao objetivo esperado da tarefa.

status: valid
```

---

# 10. Evidence Group

Uma experiência pode demonstrar várias dimensões.

Exemplo:

```text
Uma única investigação de autorização
→ Reasoning
→ Execution
→ Autonomy
→ Evidence & Communication
```

Essas evidências devem compartilhar o mesmo `evidence_group_id`.

Isso impede Confidence artificialmente inflada por contagem de registros correlacionados.

---

# 11. Regra de independência de evidence

Duas evidências são independentes quando resultam de experiências suficientemente diferentes.

Fatores:

- tarefa diferente;
- contexto diferente;
- momento diferente;
- objetivo diferente;
- lab diferente;
- representação diferente;
- sem reutilizar solução.

---

# 12. Evidence Quality

Valores oficiais:

- `strong`
- `moderate`
- `weak`

Self-report permanece separado.

---

# 13. Strong Evidence

Normalmente possui:

- comportamento diretamente observável;
- contexto conhecido;
- origem confiável;
- resultado verificável;
- baixa ambiguidade;
- ground truth quando aplicável.

Peso operacional inicial: `1.00`.

---

# 14. Moderate Evidence

Normalmente:

- comportamento observável;
- algum contexto ausente;
- inferência razoável;
- sem ground truth completo.

Peso inicial: `0.75`.

---

# 15. Weak Evidence

Normalmente:

- observação indireta;
- visão ambígua;
- informação incompleta;
- inferência significativa.

Peso inicial: `0.50`.

---

# 16. Self-Report

Exemplo:

> “Eu entendo SMB.”

Não atualiza Mastery diretamente.

Pode atualizar dados metacognitivos.

---

# 17. Assessor Classification Confidence

Valores:

- `low`
- `medium`
- `high`

Isso representa confiança naquela classificação específica.

É diferente da Confidence geral da skill.

---

# 18. Evidência com confidence low

Deve:

- receber peso reduzido;
- ou ficar pendente de confirmação;
- não satisfazer hard gate isoladamente.

---

# 19. Rubrica oficial

A rubrica base permanece:

```text
R0 — sem evidência válida
R1 — incorreto / dependência extrema
R2 — parcial / suporte alto
R3 — correto com suporte significativo
R4 — correto e independente em contexto familiar
R5 — independente em contexto novo, complexo ou transferido
```

---

# 20. Rubrica é aplicada por dimensão

Não atribuir um único R4 para “a tarefa”.

Exemplo:

```text
Reasoning  R4
Execution  R4
Autonomy   R3
Evidence   R2
```

A mesma experiência pode mostrar níveis diferentes por dimensão.

---

# 21. R0 não é falha

R0 significa:

> evidence insuficiente.

Não:

> aluno não sabe.

---

# 22. R1

Use quando existe evidence clara de:

- compreensão incorreta;
- execução incorreta;
- misconception;
- incapacidade mesmo com suporte alto.

---

# 23. R2

Use quando:

- parte relevante está correta;
- existe progresso;
- mas suporte ainda é alto;
- ou execução é incompleta.

---

# 24. R3

Use quando:

- comportamento correto;
- mas depende de direção relevante;
- ou não demonstra independência.

---

# 25. R4

Use quando:

- comportamento correto;
- independente;
- contexto familiar ou moderadamente novo;
- reasoning consistente.

---

# 26. R5

Use quando há:

- independência;
- adaptação;
- contexto novo ou complexo;
- transfer;
- ou profundidade excepcional.

R5 deve ser raro.

---

# 27. Evidence deve possuir claim explícito

Toda Skill Evidence deve responder:

> **Qual afirmação sobre a competência do aluno esta evidence sustenta?**

Exemplo:

> “O aluno consegue formular teste de autorização em nível de objeto sem ajuda em APIs REST familiares.”

Isso é melhor que:

> “Aluno foi bem.”

---

# 28. Evidence-Centered Assessment

O design deve seguir três perguntas:

1. Qual competência queremos afirmar?
2. Que comportamento demonstraria essa competência?
3. Que tarefa pode produzir esse comportamento?

---

# 29. Competency Claim

Exemplo:

```text
Claim
O aluno consegue distinguir autenticação de autorização
durante análise de uma API.
```

---

# 30. Observable Evidence

Exemplo:

- identifica identidade atual;
- identifica recurso;
- descreve policy esperada;
- propõe comparação;
- interpreta resultado corretamente.

---

# 31. Task

Exemplo:

API com duas identidades e objetos separados, sem indicação explícita de que authorization é a skill-alvo.

---

# 32. Instructor Key

Assessment Labs devem possuir `InstructorKey`.

Ele representa o conhecimento reservado do sistema sobre:

- objetivos;
- skills;
- ground truth;
- caminhos;
- erros;
- rubricas;
- evidências esperadas.

---

# 33. Schema conceitual de InstructorKey

```yaml
instructor_key_id: IK-api-auth-07
version: 1

lab:
  id: api-auth-07
  domain: API

learning_objectives:
  - authorization.object_level
  - controlled_comparison
  - evidence.baseline

skills:
  primary:
    - API.Authorization.ObjectLevel
  secondary:
    - Methodology.HypothesisFormation
    - Evidence.Baseline

difficulty:
  overall: D3

ground_truth:
  findings:
    - id: GT-01
      exists: true
      class: object_authorization
      affected_resource: invoice

valid_paths:
  - two_identity_comparison
  - token_context_comparison

invalid_shortcuts:
  - solution_lookup

common_misconceptions:
  - response_difference_equals_vulnerability
  - authentication_equals_authorization

expected_evidence:
  - baseline
  - controlled_test
  - reproduction
  - impact

rubric_notes:
  autonomy:
    R4: >
      Identifica sozinho a necessidade de comparar identidades.
```

---

# 34. Instructor Key não é solução textual

Ele deve ser estruturado para avaliação.

Pode conter solução técnica, mas deve distinguir:

- ground truth;
- assessment objectives;
- alternative valid paths;
- spoilers;
- rubric.

---

# 35. Proteção de Instructor Key

O aluno não deve acessar Instructor Key durante Exam.

O Tutor também deve respeitar modo de sessão para não vazar conteúdo.

---

# 36. Ground Truth

Ground truth é informação conhecida sobre o lab.

Pode incluir:

- vulnerabilidades existentes;
- vulnerabilidades inexistentes;
- assets;
- caminhos válidos;
- expected evidence;
- estados;
- flags internas.

---

# 37. Ground Truth não é obrigatório em Open Lab

Open Lab pode produzir Skill Evidence mesmo sem ground truth.

Mas certas claims não podem ser feitas.

---

# 38. Limites do Open Lab

Sem ground truth, Brother Eye pode avaliar:

- reasoning;
- execução;
- autonomia;
- evidence handling;
- reporting.

Mas não deve afirmar com segurança:

- cobertura completa;
- número de vulnerabilidades perdidas;
- recall total;
- path ideal.

---

# 39. Assessment Lab

Assessment Lab instrumentado permite:

- missed opportunities;
- coverage;
- false positives;
- adequação de priorização;
- completeness.

---

# 40. Curated Lab

Curated Lab é um lab desenhado com objetivo pedagógico explícito.

Pode ser usado em:

- Learn;
- Practice;
- Challenge;
- Exam.

---

# 41. Assessment Lab desconhecido

Para promotion/transfer, preferir:

- lab não visto;
- solução não acessada;
- estrutura suficientemente diferente;
- ground truth conhecido pelo sistema.

---

# 42. Known Lab

Se já foi resolvido:

- reduzir novelty;
- reduzir força de Transfer;
- não usar como única evidence de promoção.

---

# 43. Novelty

Escala:

- C0 — repetição;
- C1 — variação;
- C2 — contexto novo;
- C3 — transferência.

---

# 44. Como determinar C0

- mesmo lab;
- mesmo endpoint;
- mesmo fluxo;
- solução conhecida.

---

# 45. C1

- mesma classe;
- pequena variação;
- nova instância parecida.

---

# 46. C2

- aplicação diferente;
- representação diferente;
- tecnologia diferente;
- solução não conhecida.

---

# 47. C3

- princípio aparece em outro domínio;
- representação distante;
- exige abstração.

---

# 48. Difficulty

Escala:

- D1 Fundamental
- D2 Standard
- D3 Complex
- D4 Advanced
- D5 Expert

---

# 49. Difficulty deve ser definida por task

Não apenas pelo lab inteiro.

Um mesmo lab pode conter D1 e D4.

---

# 50. Difficulty dimensions

Pode considerar:

- número de etapas;
- ambiguidade;
- conhecimento necessário;
- tamanho do espaço de decisão;
- necessidade de adaptação;
- integração de skills;
- quantidade de sinais irrelevantes.

---

# 51. Difficulty não depende do aluno

Dificuldade é propriedade da tarefa.

A percepção subjetiva do aluno é separada.

---

# 52. Assistance Record

Toda evidence deve registrar o suporte recebido.

Campos mínimos:

```yaml
assistance:
  mode: Practice
  highest_hint: H2
  hint_count: 2
  tutor_proactive_interventions: 1
  student_requested_help: true
```

---

# 53. Highest Hint

É o maior H-level relevante para a skill naquela experiência.

---

# 54. Hint contamination

Se H4 descreveu exatamente como executar o teste:

não usar aquela tentativa como forte evidence de Autonomy.

---

# 55. Prior exposure contamination

Se Brother Eye mostrou solução minutos antes:

a tentativa seguinte não é evidence forte de Transfer.

Registrar `recent_modeling: true`.

---

# 56. Assessment contamination

Fatores:

- solução previamente vista;
- lab conhecido;
- Instructor Key vazada;
- ajuda externa;
- Tutor deu spoiler;
- tarefa repetida.

---

# 57. Contamination Severity

```text
none
low
moderate
high
invalid
```

---

# 58. Invalid Assessment

Marcar quando:

- resposta foi revelada;
- ground truth vazou;
- erro técnico tornou prova injusta;
- observabilidade falhou;
- escopo do teste mudou.

Evidence pode continuar útil pedagogicamente, mas não para promotion gate.

---

# 59. Assessment Modes e força de evidence

## Learn

Forte para:
- Knowledge inicial;
- compreensão pós-explicação.

Fraco para:
- Autonomy;
- Transfer.

## Practice

Bom para:
- Execution;
- Reasoning;
- Evidence.

Variável para:
- Autonomy.

## Challenge

Forte para:
- Autonomy;
- Reasoning.

## Exam

Forte para:
- gates;
- Autonomy;
- Transfer;
- consistency.

## Review

Forte para:
- Reflection;
- Reasoning;
- Communication.

## Teach-Back

Forte para:
- Knowledge;
- Reasoning;
- Communication.

---

# 60. Exam Mode

Durante Exam:

- H0 obrigatório;
- Tutor sem ensino;
- apenas STOP/safety;
- observação completa;
- debrief após final.

---

# 61. Exam Metadata

Registrar:

```yaml
exam:
  exam_id:
  level_target:
  curriculum_version:
  started_at:
  ended_at:
  aborted:
  technical_incidents:
  integrity_status:
```

---

# 62. Exam Abort

Se aluno aborta:

- assessment não gera gate pass;
- evidence observada pode permanecer;
- depois pode virar Review/Practice.

---

# 63. Promotion Assessment

Promoção deve exigir evidence específica.

Não basta Stage Progress.

---

# 64. Promotion Evidence Package

Antes da promoção, sistema deve compor:

```text
PromotionCandidate
↓
Hard Gates
↓
Assessment Evidence
↓
Transfer Evidence
↓
Autonomy Evidence
↓
Misconceptions
↓
Confidence
↓
Human Review if required
```

---

# 65. Promotion Evidence Package schema

```yaml
promotion_package_id: BE-PP-001
from: Junior
to: Mid-Level

curriculum_version: 0.1

gates:
  core_skills: pass
  autonomy: pass
  transfer: pass
  assessment: pass
  misconceptions: pass
  recency: pass

supporting_evidence:
  assessments:
    - EX-004
    - EX-009
  transfer_groups:
    - EG-882
    - EG-901

status: eligible
```

---

# 66. Promotion package é auditável

Usuário deve poder ver:

- gates;
- evidence;
- blockers;
- rationale.

---

# 67. Human Review nas primeiras versões

Promoções importantes devem permitir revisão humana enquanto o sistema é calibrado.

---

# 68. Human Review não substitui evidence

Humano pode:

- validar;
- contestar;
- corrigir;
- invalidar.

Mas não deve promover sem registro de justificativa.

---

# 69. Human Review schema

```yaml
review_id: HR-001
target: BE-SE-000001
reviewer:
  role: instructor
decision: confirm
rationale: >
  A classificação R4 é compatível com o comportamento observado.
timestamp:
```

---

# 70. Disputed Evidence

Aluno pode contestar evidence.

Estado:

```text
valid
disputed
invalidated
corrected
```

---

# 71. Dispute flow

```text
Student disputes
↓
Evidence frozen
↓
Review
↓
Confirm / Correct / Invalidate
↓
Recalculate
```

---

# 72. Correção nunca sobrescreve

Criar nova revisão.

Preservar audit trail.

---

# 73. False Positive Assessment

O sistema deve distinguir:

- aluno formulou hipótese plausível;
- aluno declarou finding cedo demais;
- aluno validou corretamente;
- aluno rejeitou falso positivo.

---

# 74. Finding não encontrado

Não é automaticamente evidence negativa.

Depende de:

- ground truth;
- objetivo da tarefa;
- oportunidade observável.

---

# 75. Missed Opportunity

Somente registrar quando:

- ground truth confirma;
- task exigia aquela competência;
- havia oportunidade real;
- condições de observação eram válidas.

---

# 76. Example missed opportunity

```yaml
skill: API.Authorization.ObjectLevel
dimension: Autonomy
rubric: R2
reason: >
  Em assessment desconhecido, o aluno manipulou o recurso
  por 20 minutos, mas não considerou comparação entre duas
  identidades apesar de possuir credenciais para ambas.
```

---

# 77. Absence is not always evidence

Não fazer:

> “Aluno não testou X, então X = 0.”

Sem task design apropriado, não sabemos se X deveria ter aparecido.

---

# 78. Task Opportunity Model

Assessment Lab deve declarar quais skills tiveram oportunidade de manifestação.

---

# 79. Opportunity schema

```yaml
opportunity:
  skill: Methodology.HypothesisFormation
  available: true
  critical: true
  window:
    start_event: EVT-100
    end_event: EVT-140
```

---

# 80. Evidence Negative

Evidence negativa deve ser específica.

Exemplo:

> “Aluno concluiu que a alteração provava vulnerabilidade sem controle.”

Melhor que:

> “Reasoning ruim.”

---

# 81. Evidence Positive

Também específica.

> “Aluno explicitou uma hipótese alternativa antes de concluir.”

---

# 82. Observation provenance

Sources possíveis:

- `tool_event`
- `terminal_event`
- `screen`
- `accessibility`
- `student_text`
- `student_voice`
- `document`
- `ground_truth`
- `human_review`

---

# 83. Source trust

Default conceitual:

```text
tool_event      high
terminal_event  high
student_text    high for explicit reasoning
ground_truth    highest
screen          moderate
accessibility   moderate/high
voice transcript depends on quality
```

---

# 84. Multisource corroboration

Evidence ganha força quando:

- ação técnica;
- resultado;
- explicação do aluno

convergem.

---

# 85. Contradiction between action and explanation

Exemplo:

Aluno executa corretamente, mas explica motivo errado.

Resultado possível:

```text
Execution R4
Reasoning R2
```

Muito importante.

---

# 86. Accidental success

Aluno acerta por acaso.

Não atribuir Reasoning alto.

---

# 87. Lucky path

Se aluno encontra vuln sem hipótese:

pode gerar Execution evidence, mas Autonomy/Reasoning devem ser avaliadas separadamente.

---

# 88. Correct reasoning, failed execution

Pode ocorrer:

```text
Reasoning R4
Execution R2
```

Isso orienta prática operacional.

---

# 89. Tool failure

Se execução falha por bug da ferramenta:

não penalizar Execution sem evidência de erro do aluno.

---

# 90. Environment failure

Mesma regra.

---

# 91. Technical Incident

Schema:

```yaml
incident:
  type: lab_failure
  affected_events:
  assessment_impact: moderate
  resolution:
```

---

# 92. Assessment validity

Uma assessment válida deve medir a skill pretendida.

Evitar task em que dificuldade vem de requisito não relacionado.

---

# 93. Example de confound

Queremos medir Authorization.

Mas lab exige conhecimento avançado de Docker não ensinado.

Isso confunde avaliação.

---

# 94. Assessment reliability

Mesma skill deve ser observada em múltiplas tarefas.

Uma prova não deve dominar Mastery.

---

# 95. Assessment coverage

Cada promotion gate deve possuir múltiplas evidências quando viável.

---

# 96. Assessment diversity

Preferir:

- labs diferentes;
- tecnologias diferentes;
- formas diferentes da mesma skill.

---

# 97. Transfer assessment

Transfer só é forte quando:

- representação muda;
- solução não está memorizada;
- princípio permanece.

---

# 98. Near transfer

Exemplo:

REST `/users/1` → REST `/orders/2`.

Pode ser C2.

---

# 99. Far transfer

Exemplo:

Object authorization em REST → autorização sobre node em GraphQL.

Pode ser C3.

---

# 100. Specialist transfer

Specialist deve incluir:

- multi-domain;
- estrutura incompleta;
- sinais conflitantes;
- necessidade de adaptar método.

---

# 101. Assessment Task Template

```yaml
task:
  id:
  title:
  domain:
  objectives:
  prerequisites:
  target_skills:
  difficulty:
  novelty_requirements:
  ground_truth_ref:
  expected_observables:
  disallowed_help:
  completion_conditions:
  invalidation_conditions:
```

---

# 102. Completion condition não precisa ser “achar a vuln”

Pode ser:

- formular plano;
- validar ou refutar;
- produzir evidência;
- explicar impacto;
- revisar finding.

---

# 103. Assessment of negative result

Uma tarefa pode ser desenhada para não ter vulnerabilidade.

Isso testa:

- falsos positivos;
- validação;
- uncertainty handling.

---

# 104. Clean Target Assessment

Alguns labs devem intencionalmente não conter a falha esperada.

Isso combate expectativa de que “todo lab tem vuln”.

---

# 105. Decoy signal

Labs avançados podem ter sinais falsos.

Objetivo:

- validação;
- hipótese alternativa;
- priorização.

---

# 106. Assessment anti-pattern

Não fazer labs em que:

> nome da aula = nome da vulnerabilidade

para assessment avançado.

---

# 107. Learn vs Assessment naming

Learn pode dizer:

> “Lab de BOLA.”

Exam deve ocultar classe da falha quando possível.

---

# 108. Assessor Decision Record

Toda classificação relevante pode registrar:

```yaml
decision_id:
observation_refs:
candidate_skills:
selected_skill:
dimension:
rubric:
rationale:
classification_confidence:
policy_version:
```

---

# 109. Policy Versioning

Registrar:

- assessor_policy_version;
- rubric_version;
- curriculum_version.

---

# 110. Reproducibility

Dado o mesmo conjunto de evidence e mesma versão de policy, o sistema deve tentar produzir classificação semelhante.

---

# 111. Deterministic boundaries

Cálculos e gates são determinísticos.

Classificação semântica pode usar LLM, mas fica auditável.

---

# 112. Assessor prompt não deve conhecer score atual

Quando possível, o Assessor que classifica uma nova observation não deve ser enviesado pelo score corrente.

---

# 113. Blind classification

Preferível:

```text
Observation + rubric + task context
→ classification
```

Depois o Learner Model agrega.

---

# 114. Avoid confirmation bias

Se skill está em 90:

não interpretar automaticamente comportamento ambíguo como R5.

---

# 115. Avoid regression bias

Se skill está em 30:

não subestimar excelente performance nova.

---

# 116. Evidence sampling

Não transformar toda ação em Skill Evidence.

Criar evidence quando existe:

- decisão relevante;
- demonstração de skill;
- erro informativo;
- assessment opportunity;
- misconception;
- transfer.

---

# 117. Evidence density

Muitas evidências redundantes reduzem qualidade do sistema.

Preferir poucas evidências informativas.

---

# 118. Evidence Information Value

Classificação:

- low;
- medium;
- high.

High quando:

- contexto novo;
- independente;
- dificuldade relevante;
- resultado discriminativo.

---

# 119. Evidence admission

Evidence de baixo valor pode ficar no histórico sem entrar no active portfolio.

---

# 120. Evidence anchoring

Assessments formais podem ser `anchor`.

Essas evidence permanecem no portfolio por mais tempo.

---

# 121. Revalidation Evidence

Revalidation não precisa ser assessment longo.

Pode ser task curta e informativa.

---

# 122. Revalidation pass

Aumenta Confidence.

---

# 123. Revalidation fail

Gera evidence nova.

Mastery pode cair apenas pela nova evidence, não por passagem de tempo.

---

# 124. Misconception Evidence

Schema:

```yaml
misconception_event:
  misconception_id:
  skill_refs:
  status_transition:
    from: suspected
    to: confirmed
  evidence_refs:
  rationale:
```

---

# 125. Misconception suspected

Um erro isolado pode gerar `suspected`.

---

# 126. Misconception confirmed

Requer repetição ou explicação explícita claramente incorreta.

---

# 127. Misconception resolved

Requer evidence comportamental posterior.

---

# 128. Misconception recurrence

Se volta:

`resolved → recurred`

sem apagar histórico anterior.

---

# 129. Misconception in Promotion

Misconception crítica pode criar hard gate.

---

# 130. Reporting Assessment

Pode usar documento produzido pelo aluno.

Rubrica:

- clareza;
- precisão;
- reprodução;
- evidence;
- impacto;
- severidade;
- remediação.

---

# 131. Assisted Reporting

Se Tutor escreveu parte importante:

registrar assistência.

---

# 132. Authorship provenance

Cada seção pode possuir:

```text
student-authored
tutor-assisted
system-generated
```

---

# 133. Evidence Collection Assessment

Avaliar:

- baseline;
- control;
- reproduction;
- impact;
- preservation;
- traceability.

---

# 134. Evidence completeness não é automaticamente quality

Muitos prints podem ser ruins.

Qualidade importa.

---

# 135. Reasoning Assessment

Pode combinar:

- ação;
- pergunta do Tutor;
- resposta do aluno;
- resultado.

---

# 136. Reasoning trace

Não precisa registrar chain-of-thought privado.

Registrar justificativas explícitas fornecidas pelo aluno.

---

# 137. Student rationale

Exemplo:

> “Vou comparar duas identidades porque preciso separar falha de autenticação de falha de autorização.”

Isso é evidence observável.

---

# 138. No hidden mind inference

Não assumir que aluno sabia por que fez se não existe evidence.

---

# 139. Exam scoring

Exam gera Skill Evidence.

Não necessariamente uma nota única.

---

# 140. Exam report

Preferir:

```text
Skills demonstrated
Skills insufficient
Missed opportunities
False positives
Reasoning quality
Autonomy
Transfer
Evidence quality
```

---

# 141. Session result vs Proficiency

Não confundir:

`Exam score`

com:

`Brother Eye proficiency`.

---

# 142. Promotion requires portfolio

Promotion depende de portfolio, não de uma única prova.

---

# 143. Promotion Review Packet

Deve incluir:

- Stage Progress;
- hard gates;
- assessments;
- transfer evidence;
- misconceptions;
- Confidence;
- contradictory evidence;
- disputed evidence.

---

# 144. Promotion decision

Estados:

```text
not_ready
ready_for_review
eligible
promoted
blocked
```

---

# 145. Auto-promotion policy

V0.1 pode exigir confirmação humana em transições importantes.

Futuro pode permitir promoção automática após calibração.

---

# 146. Placement Assessment

Placement deve cobrir:

- fundamentos;
- reasoning;
- execução;
- autonomia;
- domínios.

---

# 147. Placement não precisa testar tudo

Skills não observadas ficam `Unknown`.

---

# 148. Placement confidence

Inicialmente tende a ser menor que perfil construído ao longo de meses.

---

# 149. Assessment Blueprint

Cada nível pode possuir blueprint.

Exemplo conceitual:

```text
Junior → Mid-Level

2 tasks Web/API
1 task Infrastructure
1 evidence/report task
1 transfer task
```

O Curriculum definirá.

---

# 150. Blueprint balance

Evitar assessment dominar apenas por um domínio favorito.

---

# 151. Specialist Assessment

Deve incluir:

- problema aberto;
- D4/D5;
- multi-skill;
- review;
- Teach-Back;
- adaptação.

---

# 152. Specialist não deve ser só CTF difícil

CTF difícil pode testar técnica.

Specialist exige julgamento, abstração e comunicação.

---

# 153. Specialist Peer Review Task

Exemplo:

- receber finding incompleto;
- detectar erros;
- melhorar evidence;
- ajustar severity;
- explicar ao autor.

---

# 154. Specialist Method Adaptation Task

Exemplo:

- ferramenta principal indisponível;
- aluno precisa adaptar técnica mantendo objetivo.

---

# 155. Specialist Ambiguity Task

Exemplo:

- múltiplas hipóteses plausíveis;
- dados conflitantes;
- recursos limitados.

---

# 156. Assessment feedback timing

Em Exam:

feedback após conclusão.

Em Practice:

pode ocorrer durante.

---

# 157. Assessment feedback separation

Ao final, separar:

```text
What you demonstrated
What you learned
What remains uncertain
```

---

# 158. Evidence freshness

Toda Skill Evidence possui timestamp.

Confidence considera recência.

---

# 159. Expired evidence

Não apagar.

Pode sair do active portfolio.

---

# 160. Revalidation scheduling

Baseado em:

- skill volatility;
- importância;
- tempo;
- próximo gate.

---

# 161. Stable Skill

Exemplo:

conceito TCP básico.

Pode ter janela longa.

---

# 162. Volatile Skill

Exemplo:

procedimento dependente de ferramenta em rápida mudança.

Janela menor.

---

# 163. Assessment calibration

Precisamos medir qualidade do Assessor.

---

# 164. Assessor metrics

- agreement with human reviewer;
- false positive classification;
- false negative classification;
- over-rating;
- under-rating;
- confidence calibration;
- consistency;
- skill mapping accuracy.

---

# 165. Inter-rater agreement

Durante desenvolvimento:

mesmas observations podem ser avaliadas por:

- Assessor;
- humano.

Comparar.

---

# 166. Gold set

Criar conjunto de sessions rotuladas manualmente.

Usar para regressão.

---

# 167. Assessor regression tests

Mudança de prompt/model/policy não pode degradar classificações sem ser detectada.

---

# 168. Confidence calibration

Quando Assessor diz `high`, deveria estar correto com frequência maior que `medium`.

---

# 169. Disagreement cases

Casos de alta discordância viram dataset de revisão.

---

# 170. Assessment fairness

Não favorecer:

- ferramenta específica;
- caminho específico;
- estilo verbal;
- velocidade.

---

# 171. Language fairness

Aluno pode explicar conceito em linguagem simples.

Avaliar correção, não floreio.

---

# 172. Tool fairness

Ferramenta alternativa válida deve ser aceita.

---

# 173. Path fairness

Caminho alternativo tecnicamente válido deve ser aceito.

---

# 174. Accessibility

Limitações de input/interface não devem reduzir competência técnica.

---

# 175. Time pressure

Só avaliar velocidade quando explicitamente parte da skill.

---

# 176. Assessment accommodations

Futuro pode permitir:

- mais tempo;
- interface adaptada;
- texto em vez de voz.

Sem alterar claim central quando possível.

---

# 177. Security & Scope Assessment

Em labs, respeitar escopo continua obrigatório.

Comportamento de sair do escopo pode gerar evidence para:

`Methodology.ScopeAwareness`.

---

# 178. Scope mistake

Pode ser skill evidence negativa, além de STOP.

---

# 179. Safety-critical rules

Não devem ser ignoradas por Exam.

---

# 180. Evidence privacy

Skill Evidence deve guardar apenas o necessário.

Dados técnicos sensíveis podem usar referências.

---

# 181. Raw evidence vs learner evidence

Separar:

- raw technical artifact;
- assessment record.

---

# 182. Secret redaction

Tokens, credenciais e PII podem ser redigidos antes de entrar no Learner Model.

---

# 183. Evidence retention

Política futura deve definir:

- raw event retention;
- Skill Evidence retention;
- assessment retention.

Skill Evidence de progressão tende a ser de longo prazo.

---

# 184. Audit trail

Registrar:

- criação;
- revisão;
- dispute;
- correção;
- invalidação;
- recálculo.

---

# 185. Evidence immutable identifier

IDs nunca reutilizados.

---

# 186. Evidence deletion

Se necessário por privacidade:

- remoção deve ser auditável;
- score deve ser recalculado;
- não fingir que evidence ainda existe.

---

# 187. Data loss

Se raw artifact foi perdido:

Skill Evidence pode permanecer se já foi validada, mas provenance deve indicar artifact unavailable.

---

# 188. Evidence export

Futuro:

aluno pode exportar perfil de competências.

Não precisa exportar dados sensíveis.

---

# 189. Evidence portability

Scores só fazem sentido com:

- curriculum version;
- scoring version;
- assessment model version.

---

# 190. Assessment versioning

Cada assessment possui versão.

Mudança de ground truth ou task cria nova versão.

---

# 191. Instructor Key versioning

Mesmo princípio.

---

# 192. Curriculum mapping

Assessment deve referenciar skills válidas da versão corrente.

---

# 193. Deprecated skill

Evidence histórica permanece, mas pode ser migrada.

---

# 194. Evidence migration

Quando Skill Graph muda:

- mapear;
- preservar provenance;
- marcar incerteza.

---

# 195. Assessment lifecycle

```text
DRAFT
↓
REVIEW
↓
PILOT
↓
ACTIVE
↓
RETIRED
```

---

# 196. DRAFT

Ainda não usado para promotion.

---

# 197. REVIEW

Validação por autor/revisor.

---

# 198. PILOT

Usado em treinamento, mas resultados não bloqueiam promoção.

---

# 199. ACTIVE

Pode gerar Promotion Evidence.

---

# 200. RETIRED

Não usado em novas avaliações.

---

# 201. Assessment authoring

Autor precisa definir:

- claim;
- skills;
- observables;
- ground truth;
- difficulty;
- expected paths;
- invalid shortcuts;
- rubric.

---

# 202. Assessment review

Revisor verifica:

- clareza;
- validade;
- fairness;
- difficulty;
- spoilers;
- observability.

---

# 203. Pilot data

Usar para ajustar:

- dificuldade;
- ambiguity;
- rubric;
- tempo.

---

# 204. Difficulty calibration

Com dados futuros, D1–D5 pode ser calibrado empiricamente.

---

# 205. First-pass difficulty

No início, expert judgment.

---

# 206. Assessment success não é achar tudo

Depende do claim.

---

# 207. Partial evidence

Assessment pode gerar evidence útil mesmo sem completion total.

---

# 208. Task abandonment

Registrar.

Pode indicar:

- estratégia ruim;
- tempo;
- decisão correta de parar.

Contexto importa.

---

# 209. Good abandonment

Abandonar rabbit hole pode ser evidence positiva.

---

# 210. Bad abandonment

Abandonar sem explorar sinal relevante pode ser evidence negativa em assessment com ground truth.

---

# 211. No simplistic completion rate

Não usar completion rate sozinho como proficiência.

---

# 212. False positives in assessment

Registrar:

- candidate;
- validation attempt;
- final disposition.

Aluno que suspeitou e depois rejeitou corretamente demonstrou maturidade.

---

# 213. False positive conviction

Se insiste sem evidence:

Reasoning/Validation podem receber evidence negativa.

---

# 214. False negatives

Se ground truth tinha finding e aluno conclui que não existe:

avaliar por skill e oportunidade.

---

# 215. Blind spot

Pode ser:

- observation;
- hypothesis;
- knowledge;
- prioritization.

Não assumir uma causa única.

---

# 216. Root cause of student error

Assessor pode classificar erro pedagógico:

```text
knowledge_gap
reasoning_gap
execution_gap
attention_gap
misconception
tool_issue
environment_issue
unknown
```

---

# 217. Error classification não atualiza score sozinho

Serve ao Tutor e recomendações.

---

# 218. Student uncertainty

Se aluno diz:

> “Não tenho evidence suficiente.”

isso pode ser evidence positiva de Reasoning.

---

# 219. Confidence overclaim

Se afirma certeza indevida:

pode ser evidence negativa de Uncertainty Handling.

---

# 220. Assessment of communication

Não penalizar estilo.

Avaliar:

- clareza;
- precisão;
- justificativa.

---

# 221. Assessment of Teach-Back

Rubrica específica pode avaliar:

- correção;
- causalidade;
- estrutura;
- identificação de misconception;
- capacidade de adaptar explicação.

---

# 222. Teach-Back não substitui prática

Mesmo R5 em Teach-Back não prova Execution.

---

# 223. Review task evidence

Pode demonstrar:

- Reasoning;
- Evidence & Communication;
- Specialist review skills.

---

# 224. Student-created plan

Plano pode ser evidence de Reasoning mesmo antes da execução.

---

# 225. Execution can invalidate plan quality

Se plano parecia bom mas falha por premissa ignorada, review posterior pode ajustar evidence.

---

# 226. Evidence supersession

Nova evidence não apaga antiga.

Mas pode mudar Mastery.

---

# 227. Strong contradiction

Quando evidence recente forte contradiz portfolio:

- reduzir Confidence;
- recomendar revalidation.

---

# 228. Repeated contradiction

Pode reduzir Mastery.

---

# 229. Assessment Confidence

Assessment inteiro pode possuir:

- high;
- medium;
- low.

Baseado em integridade e observabilidade.

---

# 230. Low-confidence exam

Não deve satisfazer hard gate isoladamente.

---

# 231. Missing telemetry

Se sensor falhou:

não inferir.

---

# 232. Student explanation fallback

Se ação não pôde ser observada:

perguntar ao aluno pode ajudar, mas gera evidence mais fraca.

---

# 233. No retroactive fabrication

Não criar detailed evidence depois do fato sem fonte.

---

# 234. Manual note

Instrutor pode registrar nota, claramente marcada como manual.

---

# 235. Assessment Engine pipeline

```text
Receive events
↓
Build observation window
↓
Detect assessment opportunity
↓
Map candidate skills
↓
Collect context
↓
Check assistance
↓
Check novelty/difficulty
↓
Check ground truth
↓
Apply rubric
↓
Estimate classification confidence
↓
Create Skill Evidence
↓
Validate
↓
Update Learner Model
```

---

# 236. Observation Window

Nem toda evidence corresponde a um evento único.

Pode usar sequência.

---

# 237. Window boundaries

Definidos por:

- objetivo;
- hipótese;
- task;
- action-result cycle.

---

# 238. Avoid huge windows

Evidence deve ser específica.

---

# 239. Evidence candidate detection

Triggers:

- decisão;
- explicação;
- execução;
- validação;
- misconception;
- finding disposition;
- review.

---

# 240. Skill candidate mapping

Pode sugerir várias skills.

Assessor escolhe apenas as justificadas.

---

# 241. No point spraying

Não atribuir evidence a dez skills por uma ação simples.

---

# 242. Multi-skill evidence

Permitido quando cada dimensão foi observada.

---

# 243. Assessment Event Types

```text
SKILL_DEMONSTRATION
MISCONCEPTION
MISSED_OPPORTUNITY
TRANSFER
REVALIDATION
ASSESSMENT_RESULT
DISPUTE
CORRECTION
```

---

# 244. Revalidation event

Marcado explicitamente.

---

# 245. Transfer event

Exige justification de C2/C3.

---

# 246. Assessment result event

Resume task, não substitui Skill Evidence.

---

# 247. Evidence ledger

Histórico append-only.

---

# 248. Learner Model update

Somente após evidence válida.

---

# 249. Pending evidence

Pode ficar:

`pending_review`

quando:

- confidence low;
- promotion-critical;
- ambiguity.

---

# 250. Pending evidence não altera hard gate

Até validação.

---

# 251. Assessment dashboard

Deve conseguir mostrar:

```text
Assessment
API Authorization — D3

Skills observed
Authorization.ObjectLevel
HypothesisFormation
Evidence.Baseline

Strong evidence
5

Moderate
2

Weak
0

Hints
0

Integrity
High
```

---

# 252. Evidence detail

Usuário pode abrir:

```text
Claim
Observation
Rubric
Context
Assistance
Sources
Why it counted
```

---

# 253. Why didn't this count?

Sistema também deve explicar quando ação não atualizou score.

Exemplo:

> “Essa repetição ocorreu no mesmo lab e não adicionou evidence nova de Transfer.”

---

# 254. Why did this count negatively?

Explicar.

> “Você classificou como vulnerabilidade antes de estabelecer controle, apesar de o assessment exigir validação.”

---

# 255. No punitive language

Foco em evidence.

---

# 256. Student appeal

Aluno pode solicitar review.

---

# 257. Appeal limits

Não permitir spam de review automatizado sem nova information.

---

# 258. Human-in-the-loop calibration

Primeiras versões:

amostrar Skill Evidence e comparar com instrutor.

---

# 259. Assessment QA

Antes de liberar assessment:

- path test;
- ground truth test;
- telemetry test;
- rubric test;
- spoiler test;
- alternative path test.

---

# 260. Assessment contamination QA

Verificar se UI ou nome revela solução.

---

# 261. Telemetry QA

Garantir que comportamentos necessários são observáveis.

---

# 262. Ground truth QA

Garantir que Instructor Key está correta.

---

# 263. Alternative path QA

Testar pelo menos um caminho não ideal.

---

# 264. Assessment retirement

Retirar quando:

- vazado;
- desatualizado;
- bug;
- baixa validade.

---

# 265. Retired assessment evidence

Evidence histórica permanece.

Mas Confidence pode ser revisada se assessment foi invalidado.

---

# 266. Global invalidation

Se descobrimos bug no assessment:

invalidar evidence relacionada e recalcular.

---

# 267. Assessment metadata mínimo

```text
id
version
domain
target level
skills
difficulty
novelty
ground truth ref
status
```

---

# 268. Evidence metadata mínimo

```text
id
group
skill
dimension
rubric
quality
assistance
difficulty
novelty
source
assessor confidence
status
```

---

# 269. V1 simplification

V1 não precisa de todos os campos avançados em runtime, mas schema deve ser extensível.

---

# 270. V1 mínimo

Necessário:

- SkillEvidence;
- EvidenceGroup;
- R0–R5;
- quality;
- H0–H5;
- D1–D5;
- C0–C3;
- provenance;
- assessor confidence;
- valid/disputed/invalidated;
- InstructorKey básico;
- Exam metadata;
- Promotion Evidence Package.

---

# 271. V1 human review

Recomendado para:

- R5;
- promotion-critical evidence;
- disputed evidence;
- low-confidence classification;
- Specialist evidence.

---

# 272. Future automation

Pode reduzir revisão humana após calibration.

---

# 273. Assessment model evaluation

Antes de confiar em promoção automática, exigir métricas mínimas definidas futuramente.

---

# 274. Calibration dataset

Deve conter variedade:

- níveis;
- domínios;
- acertos;
- erros;
- ferramentas;
- estilos de explicação.

---

# 275. Bias review

Verificar se Assessor favorece:

- respostas mais verbosas;
- terminologia sofisticada;
- ferramenta esperada;
- caminho esperado.

---

# 276. Student communication style

Resposta curta e correta deve valer.

---

# 277. Assessment score transparency

Se existir score de assessment:

deve decompor.

---

# 278. No secret rubric for normal learning

Aluno pode conhecer critérios gerais.

---

# 279. Secret task details

Exam pode esconder ground truth e solução.

---

# 280. Promotion rubric transparency

Aluno deve saber quais competências precisa desenvolver.

Não precisa saber resposta das tasks.

---

# 281. Assessment anti-gaming

Evitar:

- repetir mesmo lab;
- memorizar answers;
- explorar scoring bug;
- escolher apenas tasks fáceis.

---

# 282. Randomized variants

Futuro:

variar dados, endpoints, topologia.

---

# 283. Variant equivalence

Variantes devem manter dificuldade aproximadamente comparável.

---

# 284. Exposure log

Registrar quais assessments/labs o aluno viu.

---

# 285. Solution exposure log

Registrar quando solução foi revelada.

---

# 286. Novelty calculation usa exposure

Não apenas nome do lab.

---

# 287. Instructor Key leak

Se ocorrer:

assessment fica invalidado para aquele aluno.

---

# 288. External help

Em assessment formal, política deve declarar se docs são permitidas.

---

# 289. Realistic assessment

Pentesters reais usam documentação.

Então nem todo Exam precisa ser “closed book”.

---

# 290. Knowledge vs resource use

Assessment pode permitir docs e ainda testar:

- reasoning;
- execution;
- transfer.

---

# 291. Tool documentation allowed

Pode ser permitido por padrão em avaliações avançadas, dependendo do claim.

---

# 292. Solution search disallowed

Pesquisar solução específica do lab invalida novelty.

---

# 293. Assistance taxonomy futura

Além de Tutor hints, pode registrar:

- docs;
- external reference;
- peer;
- instructor.

---

# 294. V1 foco em Tutor assistance

Suficiente inicialmente.

---

# 295. Assessment of scope awareness

Task pode conter asset fora de escopo.

Aluno deve evitar.

---

# 296. Assessment of evidence preservation

Task pode criar oportunidade em que perder evidence é possível.

---

# 297. Assessment of prioritization

Task pode oferecer múltiplos caminhos com valor diferente.

---

# 298. Assessment of stopping rule

Task pode observar se aluno continua testando sem ganho.

---

# 299. Assessment of uncertainty

Task pode ser deliberadamente inconclusiva.

---

# 300. Inconclusive is valid outcome

Aluno pode concluir:

> “Evidence insuficiente.”

Isso pode ser resposta correta.

---

# 301. Assessment of remediation

Finding pode pedir fix alinhado a root cause.

---

# 302. Assessment of severity

Pode pedir justificativa, não apenas número.

---

# 303. Assessment of reporting

Pode pedir finding sem ajuda.

---

# 304. Domain-specific Instructor Key extensions

Web/API/Infra podem adicionar campos.

---

# 305. Core Instructor Key permanece comum

Permite engine genérico.

---

# 306. Assessment Engine não é vuln scanner

Ele avalia comportamento do aluno.

---

# 307. Assessment Engine não é Tutor

Ele não ensina durante classificação.

---

# 308. Tutor pode consumir assessment result

Depois da sessão, para adaptar ensino.

---

# 309. Assessment feedback privacy

O Tutor pode receber summary, não necessariamente raw sensitive data.

---

# 310. Promotion blockers

Devem apontar exatamente evidence faltante.

---

# 311. Example blocker

```text
Transfer Gate

Status: FAIL

Why
Nenhuma evidence C3 independente em Authorization.

What would satisfy
Assessment desconhecido em representação diferente com H0/H1.
```

---

# 312. Example evidence package

```text
Junior → Mid-Level

Autonomy
PASS
4 groups H0/H1

Transfer
PASS
2 groups C2
1 group C3

Assessment
PASS
2 active exams

Misconceptions
PASS
0 critical open

Confidence
PASS
High
```

---

# 313. Specialist evidence package

Além dos anteriores:

- D4/D5;
- Teach-Back;
- peer review;
- cross-domain;
- adaptation.

---

# 314. Assessment failure does not reset learner

Uma prova ruim é nova evidence.

Não “zera” nível.

---

# 315. Recovery after failed promotion exam

Tutor recomenda prática específica.

---

# 316. Retake

Retake deve usar task diferente quando possível.

---

# 317. Retake novelty

Mesmo assessment repetido perde valor.

---

# 318. Promotion readiness review

Antes do Exam:

sistema pode dizer que faltam skills.

Mas não deve ensinar solução.

---

# 319. Exam readiness is not guarantee

Passar depende de performance.

---

# 320. Assessment fatigue

Evitar excesso de provas.

Muitas observations low-stakes + poucas assessments high-stakes.

---

# 321. Continuous assessment

Practice produz evidence continuamente.

Promotion utiliza portfolio acumulado.

---

# 322. Programmatic assessment principle

Decisões importantes devem usar múltiplas observations ao longo do tempo.

---

# 323. Low-stakes evidence

Practice.

---

# 324. High-stakes evidence

Promotion Exam / Specialist Assessment.

---

# 325. No single-point failure

Uma assessment ruim isolada não deve bloquear indefinidamente.

---

# 326. Contradictory portfolio

Requer revalidation.

---

# 327. Evidence recency and gates

Gate pode exigir evidence recente.

---

# 328. Recency threshold fica no Curriculum

Não neste documento.

---

# 329. Assessment difficulty threshold fica no Curriculum

Mesmo princípio.

---

# 330. Skill-specific rubric extensions

Curriculum pode detalhar R-levels por skill.

---

# 331. Generic rubric remains fallback

---

# 332. Example specific rubric

```yaml
skill: Evidence.Baseline

R1:
  "Não preserva baseline mesmo após orientação."

R3:
  "Preserva baseline após prompt."

R4:
  "Preserva espontaneamente em contexto familiar."

R5:
  "Constrói baseline e controles adequados em cenário novo/ambíguo."
```

---

# 333. Rubric examples improve Assessor consistency

Devem existir no Curriculum.

---

# 334. Assessor rationale must be concise

Não precisa chain-of-thought.

Precisa justificativa observável.

---

# 335. Example rationale

> “Classificado R4 porque o aluno formulou a comparação entre identidades sem hints e executou corretamente em contexto conhecido.”

---

# 336. Bad rationale

> “Pareceu Senior.”

Proibido.

---

# 337. Evidence label leakage

Não mostrar `R5` ao aluno necessariamente em tempo real.

Pode distrair.

---

# 338. Post-session display

Pode traduzir para linguagem compreensível.

---

# 339. Assessment UX principle

Mostrar:

- evidence;
- progresso;
- blockers.

Evitar transformar sessão em caça a pontos.

---

# 340. Silent assessment

Practice pode produzir evidence sem interromper fluxo.

---

# 341. Explicit assessment

Exam é explícito.

---

# 342. Review evidence after session

Usuário pode abrir detalhes.

---

# 343. Evidence correction by student

Aluno não edita rubric diretamente.

Pode contestar.

---

# 344. Instructor authority

Instrutor pode corrigir.

Audit trail obrigatório.

---

# 345. Assessment engine failure

Se engine falha:

sessão continua.

Não bloquear aprendizagem.

Evidence pode ser reconstruída somente quando há dados suficientes.

---

# 346. No fabricated retroactive evidence

Se não há dado, marcar Unknown.

---

# 347. Raw event preservation for review

Quando privacy permite, manter raw refs.

---

# 348. Evidence hash

Artifacts técnicos podem possuir hash para integridade.

---

# 349. Assessment provenance and reproducibility

Importante para debugging do produto.

---

# 350. Explainability invariant

Toda evidence deve permitir responder:

- o que ocorreu;
- qual skill;
- qual dimensão;
- qual rubrica;
- qual contexto;
- qual ajuda;
- por que contou.

---

# 351. Assessment Engine quality invariant

Nenhuma promoção deve depender de evidence que não possua provenance adequada.

---

# 352. Ground truth invariant

Não usar “missed opportunity” sem ground truth ou opportunity model.

---

# 353. Hint invariant

Ajuda reduz força de Autonomy, não gera punição.

---

# 354. Novelty invariant

Repetição não prova Transfer.

---

# 355. Difficulty invariant

Tarefa fácil não sustenta expertise avançada sozinha.

---

# 356. Human review invariant

Correções humanas são auditáveis.

---

# 357. Version invariant

Evidence sempre vinculada a versões.

---

# 358. Assessment lifecycle invariant

Somente assessments ACTIVE podem satisfazer promotion gates, salvo regra explícita.

---

# 359. V1 recommended implementation order

1. SkillEvidence schema;
2. EvidenceGroup;
3. basic Assessor Decision Record;
4. R0–R5;
5. H-level capture;
6. D/C metadata;
7. InstructorKey;
8. Exam metadata;
9. dispute/correction;
10. Promotion Evidence Package;
11. calibration tooling.

---

# 360. V1 data model concept

```text
Session
├── RawEvent
├── Observation
├── AssessmentTask
├── EvidenceGroup
│   └── SkillEvidence
├── MisconceptionEvent
└── AssessmentResult
```

---

# 361. Relationship with Learner Model

```text
SkillEvidence
↓
Evidence Portfolio
↓
Dimension Mastery
↓
Skill Mastery
↓
Domain
↓
Promotion Gates
```

---

# 362. Relationship with Tutor

```text
Assessment result
↓
Learner Model
↓
Tutor adapts scaffolding
```

Tutor não muda score diretamente.

---

# 363. Relationship with Curriculum

Curriculum fornece:

- skill IDs;
- prerequisites;
- rubrics;
- task requirements;
- gates;
- difficulty expectations.

---

# 364. Relationship with Evaluation Framework

Evaluation Framework medirá:

- se Assessor classifica bem;
- se scores predizem performance;
- se transfer realmente ocorre;
- se promotion faz sentido.

---

# 365. Exemplo completo — Practice

Aluno pratica API authorization.

```text
Mode: Practice
Difficulty: D2
Novelty: C1
Hints: H2
```

Evidence:

```text
Reasoning R3
Execution R4
Autonomy R2
Evidence R3
```

Interpretação:

aprendeu e executou bem, mas ainda recebeu direção relevante.

---

# 366. Exemplo completo — Challenge

```text
Mode: Challenge
Difficulty: D2
Novelty: C2
Hints: H0
```

Aluno reconhece sozinho.

```text
Reasoning R4
Execution R4
Autonomy R4
Transfer R3
```

Evidence forte.

---

# 367. Exemplo completo — Exam

```text
Mode: Exam
Difficulty: D3
Novelty: C3
Hints: H0
Known lab: false
Ground truth: yes
```

Aluno:

- identifica;
- testa;
- valida;
- documenta.

```text
Reasoning R5
Execution R4
Autonomy R5
Transfer R5
Evidence R4
```

Essa evidence pode sustentar promotion gate.

---

# 368. Exemplo — solução revelada

Mesmo aluno repete após Tutor mostrar H5.

```text
Recent modeling: true
Novelty: C0
```

Pode gerar Execution evidence.

Não forte evidence de Autonomy/Transfer.

---

# 369. Exemplo — scanner signal

Aluno vê scanner alert.

Imediatamente chama de vulnerability.

Evidence possível:

```text
Validation R2
Misconception:
scanner_result_equals_validated_finding
```

---

# 370. Exemplo — scanner signal bem tratado

Aluno:

> “Isso é um sinal, preciso reproduzir manualmente.”

Pode gerar:

```text
Reasoning R4
Validation R4
```

Mesmo antes de saber se vuln existe.

---

# 371. Exemplo — finding inexistente

Assessment possui falso sinal.

Aluno testa, cria controle e rejeita.

```text
Validation R5
FalsePositiveHandling R5
```

Excelente evidence.

---

# 372. Exemplo — Infra

Aluno encontra 445.

Diz:

> “Porta aberta não é vuln. Quero identificar serviço, versão e configuração.”

Evidence:

```text
ServiceEnumeration Reasoning R4
Misconception absent
```

---

# 373. Exemplo — Reporting

Aluno escreve finding completo sem Tutor.

Evidence:

```text
Reporting.Reproduction R4
Reporting.Impact R3
Reporting.Remediation R4
```

---

# 374. Exemplo — Teach-Back

Specialist candidate explica para Junior:

- conceito;
- erro comum;
- como validar;
- como evitar entregar solução.

Evidence:

```text
Knowledge R5
Reasoning R5
Communication R5
TeachingSkill R4
```

---

# 375. Assessment acceptance criteria

Uma assessment formal só deve ser ACTIVE quando:

- claim claro;
- skills mapeadas;
- ground truth validado;
- telemetry suficiente;
- rubrica definida;
- alternative paths revisados;
- spoilers removidos;
- difficulty estimada;
- invalidation conditions definidas.

---

# 376. SkillEvidence acceptance criteria

Antes de virar `valid`, precisa:

- skill existente;
- dimension válida;
- observation;
- rubric;
- provenance;
- assistance;
- context;
- assessor confidence.

---

# 377. Promotion Evidence acceptance

Precisa:

- gates determinísticos;
- evidence válida;
- assessments ACTIVE;
- sem contamination inválida;
- Confidence suficiente;
- misconceptions consideradas.

---

# 378. Assessor behavior rule

Quando não souber:

> `insufficient_evidence`

em vez de inventar.

---

# 379. Assessment rule for ambiguity

Ambiguidade deve reduzir classification confidence.

---

# 380. Assessment rule for novelty

C2/C3 deve ser justificado, não inferido automaticamente.

---

# 381. Assessment rule for difficulty

D-level deve ser definido no task design, não decidido depois para aumentar score.

---

# 382. Assessment rule for hints

Hint level vem do Tutor Event Log, não da memória do LLM.

---

# 383. Assessment rule for mode

Mode é session metadata.

---

# 384. Assessment rule for ground truth

Ground truth é versão específica do Instructor Key.

---

# 385. Assessment rule for disputes

Evidence disputed não satisfaz promotion gate até resolução.

---

# 386. Assessment rule for invalidated evidence

Não entra em Mastery atual.

---

# 387. Assessment rule for corrected evidence

Nova classificação referencia original.

---

# 388. Assessment rule for human override

Motivo obrigatório.

---

# 389. Assessment rule for self-report

Nunca atualiza Mastery diretamente.

---

# 390. Assessment rule for completion

Completion pode gerar event, não score automático.

---

# 391. Assessment rule for finding count

Finding count não atualiza proficiency automaticamente.

---

# 392. Assessment rule for speed

Speed só conta se skill explicitamente exigir.

---

# 393. Assessment rule for tool choice

Ferramenta diferente válida não reduz score.

---

# 394. Assessment rule for assistance

Ajuda não penaliza; limita inference.

---

# 395. Assessment rule for errors

Erro pode gerar positive Reasoning evidence se corretamente interpretado.

---

# 396. Assessment rule for uncertainty

Reconhecer evidence insuficiente pode ser comportamento avançado.

---

# 397. Assessment rule for Specialist

Specialist exige evidence além de execução técnica.

---

# 398. V1 unresolved details

Ainda ficam para Curriculum/Architecture:

- thresholds exatos;
- número de exams;
- revalidation intervals;
- Skill Graph completo;
- Instructor Key storage;
- engine implementation;
- human review UI.

---

# 399. Decisões normativas v0.1

Ficam estabelecidas:

1. SkillEvidence é unidade básica de assessment;
2. Raw Event não atualiza score diretamente;
3. rubrica R0–R5 é aplicada por dimensão;
4. evidence possui quality e assessor confidence;
5. Evidence Groups evitam contagem artificial;
6. Instructor Keys sustentam assessments instrumentados;
7. Open Labs possuem limites de inferência;
8. ground truth é obrigatório para missed opportunities confiáveis;
9. H-level limita inferência de Autonomy/Transfer;
10. D1–D5 e C0–C3 são metadados obrigatórios quando relevantes;
11. assessments podem ser invalidated por contamination;
12. Promotion depende de portfolio, não uma única prova;
13. evidence disputed não satisfaz gate;
14. correções são append-only e auditáveis;
15. assessments possuem lifecycle;
16. human review é recomendado no V1;
17. Assessor deve ser calibrado contra gold set;
18. ausência de evidence não equivale a zero;
19. encontrar vuln não é requisito para evidence positiva;
20. todas as classifications devem ser explicáveis.

---

# 400. Critérios de aprovação

Este documento está conceitualmente aprovado quando houver concordância de que:

- assessment mede competência, não atividade;
- SkillEvidence é a unidade de evidence;
- evidence precisa de provenance;
- ground truth tem papel limitado e explícito;
- Practice/Challenge/Exam produzem evidence diferente;
- ajuda não pune;
- novelty e difficulty importam;
- assessments podem ser invalidados;
- promotion usa portfolio;
- human review e dispute são auditáveis;
- Assessor também precisa ser avaliado;
- false positives e resultados negativos fazem parte do aprendizado;
- score não pode surgir diretamente do LLM.

---

# 401. Próximo documento

Após aprovação deste documento, o bloco `01-learning-model` estará conceitualmente completo.

O próximo documento será:

`docs/02-curriculum/BROTHER_EYE_CURRICULUM_V0.1.md`

Ele definirá **o que o Brother Eye ensina e mede**, incluindo:

- Foundations;
- Methodology;
- Web;
- API;
- Infrastructure;
- Evidence;
- Reporting;
- Tool Proficiency;
- Skill Graph;
- prerequisites;
- core/important/specialized;
- distribuição por nível;
- primeiros Promotion Gates curriculares.

---

# 402. Regra-mãe

> **Brother Eye só deve afirmar que o aluno aprendeu algo quando existir evidência observável, contextualizada e suficientemente forte para sustentar essa afirmação.**

---

## Status

**Draft v0.1**

Este documento deve ser validado conceitualmente antes da construção do Curriculum v0.1.

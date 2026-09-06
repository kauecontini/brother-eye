# Brother Eye — Curriculum v0.1

**Documento:** `BROTHER_EYE_CURRICULUM_V0.1.md`  
**Status:** Draft v0.1  
**Dependências:**  
- `BROTHER_EYE_VISION_AND_LEARNING_PRINCIPLES.md`
- `BROTHER_EYE_COMPETENCY_AND_PROGRESSION_MODEL.md`
- `BROTHER_EYE_TUTOR_PEDAGOGY_SPEC.md`
- `BROTHER_EYE_ASSESSMENT_AND_SKILL_EVIDENCE.md`

**Idioma do produto:** Português-BR  
**Títulos oficiais de progressão:** Intern → Junior → Mid-Level → Senior → Specialist

---

# 1. Propósito

Este documento define **o que o Brother Eye ensina e mede na versão curricular v0.1**.

Ele especifica:

- os domínios curriculares;
- a primeira árvore de skills;
- prerequisites;
- skills `core`, `important` e `specialized`;
- distribuição de expectativa por nível;
- competências mínimas para progressão;
- relação entre teoria, raciocínio, execução, autonomia, transferência e evidência;
- relação entre skills metodológicas e técnicas;
- Tool Proficiency;
- primeira definição curricular de Specialist Tracks;
- primeiras regras de breadth;
- primeiros Promotion Gates curriculares.

Este documento não define:

- conteúdo didático completo de cada aula;
- labs específicos;
- implementação técnica;
- UI;
- modelos de IA;
- quantidade exata de horas;
- certificação externa;
- currículo completo de Active Directory, Cloud, Mobile, Wireless ou Reverse Engineering.

---

# 2. Filosofia curricular

O currículo Brother Eye não deve ser organizado como:

```text
Ferramenta A
Ferramenta B
Ferramenta C
Payload X
Payload Y
```

Ele deve ser organizado como:

```text
Princípio
↓
Objetivo
↓
Raciocínio
↓
Técnica
↓
Ferramenta
↓
Evidência
↓
Interpretação
```

---

# 3. Ordem pedagógica fundamental

A ordem padrão é:

```text
Entender
↓
Observar
↓
Formular hipótese
↓
Escolher técnica
↓
Executar
↓
Interpretar
↓
Validar
↓
Documentar
↓
Refletir
```

---

# 4. Domínios do Curriculum v0.1

O currículo inicial possui oito domínios:

```text
1. Foundations
2. Methodology
3. Web
4. API
5. Infrastructure
6. Evidence
7. Reporting
8. Tool Proficiency
```

---

# 5. Domínios fora do core v0.1

Não entram como trilhas completas ainda:

- Active Directory;
- Cloud;
- Mobile;
- Wireless;
- Thick Client;
- Reverse Engineering;
- Exploit Development;
- Hardware;
- OT/ICS;
- Source Code Review avançado.

Podem aparecer como conceitos ou contextos, mas não como requisitos globais da v0.1.

---

# 6. Tipos de importância curricular

Cada skill possui uma classificação.

## CORE

Obrigatória para progressão global.

## IMPORTANT

Importante para maturidade, mas pode não bloquear todas as promoções.

## SPECIALIZED

Aprofundamento por domínio ou track.

---

# 7. Tipos funcionais de skill

Cada skill pode ser:

- Concept;
- Reasoning;
- Operational;
- Domain;
- Communication;
- Tool.

---

# 8. Níveis de expectativa curricular

Cada skill pode possuir expectativa:

```text
A0 — Awareness
A1 — Guided
A2 — Independent
A3 — Transfer
A4 — Advanced Judgment
A5 — Specialist Depth
```

---

# 9. Relação entre A-level e progressão

Modelo conceitual:

```text
Intern      → A0–A1
Junior      → A1–A2
Mid-Level   → A2–A3
Senior      → A3–A4
Specialist  → A4–A5
```

Esses níveis não substituem Mastery.

Eles definem **qual tipo de comportamento curricular é esperado**.

---

# 10. Competência global esperada por nível

## Intern

Aprende:

- fundamentos;
- vocabulário;
- observação;
- execução guiada;
- baseline;
- evidência básica.

## Junior

Aprende:

- reconhecer padrões;
- investigar situações familiares;
- formular hipóteses simples;
- executar com independência parcial;
- validar.

## Mid-Level

Aprende:

- conduzir investigação;
- priorizar;
- transferir;
- combinar técnicas;
- produzir evidência e relatório sólidos.

## Senior

Aprende:

- julgar;
- adaptar;
- revisar;
- lidar com ambiguidade;
- reduzir falsos positivos;
- conectar domínios.

## Specialist

Aprende:

- profundidade;
- adaptação;
- cross-domain reasoning;
- review;
- Teach-Back;
- problemas sem playbook.

---

# 11. Estrutura de Skill ID

Padrão:

```text
Domain.Area.Skill
```

Exemplos:

```text
Foundations.HTTP.RequestResponse
Methodology.Hypothesis.Formation
Web.Authorization.ObjectLevel
API.GraphQL.Mapping
Infrastructure.Services.Enumeration
Evidence.Validation.Control
Reporting.Finding.Impact
Tool.Burp.Repeater
```

---

# 12. Foundations — visão geral

Foundations fornece modelos mentais que sustentam todos os domínios.

Áreas:

```text
Foundations
├── Security
├── Networking
├── HTTP
├── OperatingSystems
├── Identity
├── Data
├── Cryptography
└── ApplicationArchitecture
```

---

# 13. Foundations.Security

## Foundations.Security.ConfidentialityIntegrityAvailability

**Tipo:** Concept  
**Criticidade:** CORE

O aluno deve compreender:

- confidentiality;
- integrity;
- availability;
- relação com impacto.

Expectativa:

```text
Intern      A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A4
```

---

# 14. Foundations.Security.AuthenticationAuthorization

**Tipo:** Concept  
**Criticidade:** CORE

Deve distinguir:

- authentication;
- authorization;
- identity;
- session;
- permission.

Essa é uma skill crítica devido à frequência de misconception.

---

# 15. Foundations.Security.AttackSurface

**Tipo:** Concept  
**Criticidade:** CORE

Compreender:

- exposição;
- entrada;
- serviço;
- endpoint;
- interface;
- trust boundary.

---

# 16. Foundations.Security.VulnerabilityVsExposure

**Tipo:** Reasoning  
**Criticidade:** CORE

O aluno deve distinguir:

```text
exposição
≠ vulnerabilidade
≠ exploit
≠ impacto
```

---

# 17. Foundations.Security.LeastPrivilege

**Tipo:** Concept  
**Criticidade:** IMPORTANT

---

# 18. Foundations.Security.TrustBoundary

**Tipo:** Concept / Reasoning  
**Criticidade:** CORE

Fundamental para Web, API e Infrastructure.

---

# 19. Foundations.Security.ThreatModelBasics

**Tipo:** Reasoning  
**Criticidade:** IMPORTANT

---

# 20. Foundations.Networking

Árvore:

```text
Networking
├── IP
├── TCPUDP
├── Ports
├── DNS
├── Routing
├── NAT
├── TLS
└── CommonProtocols
```

---

# 21. Foundations.Networking.IPAddress

**CORE**

Compreender:

- IPv4 básico;
- endereço;
- rede;
- host;
- private/public;
- loopback.

---

# 22. Foundations.Networking.SubnetBasics

**CORE**

Intern:
- conceito.

Junior:
- aplicação simples.

Mid-Level:
- contexto prático.

---

# 23. Foundations.Networking.TCPUDP

**CORE**

Compreender:

- connection-oriented vs connectionless;
- handshake em alto nível;
- impacto em discovery.

---

# 24. Foundations.Networking.PortsServices

**CORE**

Misconception crítica:

> porta aberta = vulnerabilidade

Curriculum deve explicitamente tratar.

---

# 25. Foundations.Networking.DNSBasics

**CORE**

Compreender:

- name resolution;
- A/AAAA;
- CNAME;
- MX;
- TXT;
- NS em nível introdutório.

---

# 26. Foundations.Networking.TLSBasics

**IMPORTANT**

Compreender:

- encryption;
- certificate;
- hostname;
- trust;
- handshake em alto nível.

---

# 27. Foundations.Networking.CommonProtocols

**CORE**

Awareness de:

- HTTP/HTTPS;
- SSH;
- FTP;
- SMTP;
- SMB;
- DNS;
- RDP;
- database services.

---

# 28. Foundations.HTTP

Árvore:

```text
HTTP
├── RequestResponse
├── Methods
├── Headers
├── Cookies
├── StatusCodes
├── Parameters
├── ContentTypes
├── Caching
├── Redirects
└── Proxies
```

---

# 29. Foundations.HTTP.RequestResponse

**CORE**

Deve ser forte antes de Web/API avançado.

---

# 30. Foundations.HTTP.Methods

**CORE**

Compreender intenção de:

- GET;
- POST;
- PUT;
- PATCH;
- DELETE;
- OPTIONS;
- HEAD.

---

# 31. Foundations.HTTP.Headers

**CORE**

Não precisa decorar todos.

Deve saber interpretar contexto.

---

# 32. Foundations.HTTP.Cookies

**CORE**

Pré-requisito para sessions e authentication.

---

# 33. Foundations.HTTP.StatusCodes

**CORE**

Interpretar sem assumir que status sozinho define comportamento.

---

# 34. Foundations.HTTP.Parameters

**CORE**

Tipos:

- path;
- query;
- body;
- header;
- cookie.

---

# 35. Foundations.HTTP.ContentTypes

**IMPORTANT**

JSON, form, multipart, XML em nível apropriado.

---

# 36. Foundations.HTTP.ProxyConcept

**CORE**

Entender interceptação e repetição de tráfego.

---

# 37. Foundations.OperatingSystems

Árvore:

```text
OperatingSystems
├── LinuxBasics
├── WindowsBasics
├── Processes
├── FilesPermissions
├── Services
└── Environment
```

---

# 38. Foundations.OperatingSystems.LinuxBasics

**CORE**

Navegação, arquivos, processos e permissões em nível necessário para pentest.

---

# 39. Foundations.OperatingSystems.WindowsBasics

**CORE**

Mesmo objetivo.

---

# 40. Foundations.OperatingSystems.ProcessesServices

**IMPORTANT**

---

# 41. Foundations.OperatingSystems.FilesPermissions

**CORE**

---

# 42. Foundations.Identity

Árvore:

```text
Identity
├── User
├── Role
├── Session
├── Token
├── Credential
└── Privilege
```

---

# 43. Foundations.Identity.Context

**CORE**

Aluno deve sempre conseguir responder:

> “Quem sou eu neste contexto?”

---

# 44. Foundations.Identity.Session

**CORE**

---

# 45. Foundations.Identity.Token

**CORE**

Especialmente para API.

---

# 46. Foundations.Identity.RolePrivilege

**CORE**

---

# 47. Foundations.Data

Árvore:

```text
Data
├── Encoding
├── Serialization
├── StructuredData
├── Identifiers
└── Sensitivity
```

---

# 48. Foundations.Data.Encoding

**IMPORTANT**

Base64 não é encryption.

Misconception comum.

---

# 49. Foundations.Data.JSON

**CORE**

---

# 50. Foundations.Data.XMLBasics

**IMPORTANT**

---

# 51. Foundations.Data.IdentifierTypes

**CORE**

Exemplos:

- numeric ID;
- UUID;
- slug;
- opaque identifier.

Importante para authorization.

---

# 52. Foundations.Data.Sensitivity

**CORE**

Distinguir:

- público;
- interno;
- pessoal;
- credencial;
- secreto.

---

# 53. Foundations.Cryptography

Escopo introdutório.

Árvore:

```text
Cryptography
├── Hashing
├── Encryption
├── Signing
├── Randomness
└── KeyConcepts
```

---

# 54. Foundations.Cryptography.HashVsEncryption

**CORE**

---

# 55. Foundations.Cryptography.SignatureConcept

**IMPORTANT**

---

# 56. Foundations.Cryptography.RandomnessConcept

**IMPORTANT**

---

# 57. Foundations.ApplicationArchitecture

Árvore:

```text
ApplicationArchitecture
├── ClientServer
├── FrontendBackend
├── Database
├── API
├── ReverseProxy
├── AuthenticationService
└── TrustBoundaries
```

---

# 58. Foundations.ApplicationArchitecture.ClientServer

**CORE**

---

# 59. Foundations.ApplicationArchitecture.FrontendBackend

**CORE**

Misconception a combater:

> “Se o frontend escondeu, então está protegido.”

---

# 60. Foundations.ApplicationArchitecture.APIConcept

**CORE**

---

# 61. Foundations.ApplicationArchitecture.TrustBoundaryMapping

**CORE**

Mid-Level+ deve conseguir mapear.

---

# 62. Methodology — visão geral

Methodology é o coração transversal do Brother Eye.

Árvore:

```text
Methodology
├── Scope
├── Observation
├── Hypothesis
├── Planning
├── Prioritization
├── ExperimentDesign
├── Validation
├── Uncertainty
├── NoteTaking
├── Reflection
└── TimeManagement
```

---

# 63. Methodology.Scope.Awareness

**CORE**

Compreender:

- target;
- in scope;
- out of scope;
- authorization.

---

# 64. Methodology.Scope.FailClosed

**CORE**

Na dúvida:

não prosseguir sem confirmação.

---

# 65. Methodology.Observation.SignalRecognition

**CORE**

Separar:

```text
observado
inferido
hipótese
```

---

# 66. Methodology.Observation.Baseline

**CORE**

---

# 67. Methodology.Hypothesis.Formation

**CORE**

Uma das skills mais importantes do currículo.

---

# 68. Methodology.Hypothesis.Prediction

**CORE**

> “Se minha hipótese estiver correta, o que espero observar?”

---

# 69. Methodology.Hypothesis.Refutation

**CORE**

> “O que provaria que estou errado?”

---

# 70. Methodology.Hypothesis.Alternatives

**CORE**

Junior:
awareness.

Mid-Level:
uso consistente.

Senior:
forte.

---

# 71. Methodology.Planning.NextBestAction

**CORE**

---

# 72. Methodology.Prioritization.InformationValue

**CORE**

Especialmente Mid-Level+.

---

# 73. Methodology.Prioritization.RiskValue

**IMPORTANT**

---

# 74. Methodology.ExperimentDesign.ControlVariables

**CORE**

---

# 75. Methodology.ExperimentDesign.SingleVariable

**CORE**

---

# 76. Methodology.Validation.Reproduction

**CORE**

---

# 77. Methodology.Validation.Control

**CORE**

---

# 78. Methodology.Validation.ImpactConfirmation

**CORE**

---

# 79. Methodology.Validation.FalsePositiveHandling

**CORE**

---

# 80. Methodology.Uncertainty.Calibration

**CORE**

Aluno deve saber dizer:

> “não sei.”

---

# 81. Methodology.Uncertainty.InconclusiveOutcome

**CORE**

---

# 82. Methodology.NoteTaking.StructuredNotes

**IMPORTANT**

---

# 83. Methodology.Reflection.Review

**IMPORTANT**

---

# 84. Methodology.TimeManagement.RabbitHole

**IMPORTANT**

Mid-Level+.

---

# 85. Methodology.TimeManagement.StoppingRule

**IMPORTANT**

---

# 86. Web — visão geral

Árvore v0.1:

```text
Web
├── Mapping
├── Authentication
├── Authorization
├── Session
├── InputHandling
├── BrowserSecurity
├── BusinessLogic
├── FileHandling
├── ServerInteraction
└── ClientSide
```

---

# 87. Web.Mapping.ApplicationMapping

**CORE**

Identificar:

- páginas;
- endpoints;
- parâmetros;
- roles;
- workflows;
- trust boundaries.

---

# 88. Web.Mapping.ContentDiscoveryConcept

**IMPORTANT**

Ensinar conceito, não ferramenta específica.

---

# 89. Web.Mapping.TechnologyIdentification

**IMPORTANT**

---

# 90. Web.Authentication.FlowMapping

**CORE**

---

# 91. Web.Authentication.PasswordControls

**IMPORTANT**

---

# 92. Web.Authentication.RecoveryFlows

**IMPORTANT**

---

# 93. Web.Authentication.MultiFactorConcept

**IMPORTANT**

---

# 94. Web.Authorization.ObjectLevel

**CORE**

---

# 95. Web.Authorization.FunctionLevel

**CORE**

---

# 96. Web.Authorization.RoleBoundary

**CORE**

---

# 97. Web.Authorization.HorizontalVertical

**CORE**

---

# 98. Web.Session.CookieAttributes

**CORE**

---

# 99. Web.Session.Lifecycle

**CORE**

---

# 100. Web.Session.Invalidation

**IMPORTANT**

---

# 101. Web.InputHandling.Reflection

**CORE**

Aluno deve compreender dados que entram e retornam.

---

# 102. Web.InputHandling.Context

**CORE**

---

# 103. Web.InputHandling.InjectionConcept

**CORE**

Abrange modelo mental de injection sem depender de payload.

---

# 104. Web.InputHandling.SQLInjectionConcept

**CORE**

Intern/Junior:
conceito e identificação guiada.

Mid-Level:
investigação independente em casos comuns.

Senior:
edge cases e false positive handling.

---

# 105. Web.InputHandling.CommandInjectionConcept

**IMPORTANT**

---

# 106. Web.InputHandling.XSSConcept

**CORE**

Compreender:

- source;
- sink;
- context;
- execution;
- impact.

---

# 107. Web.InputHandling.TemplateInjectionAwareness

**SPECIALIZED**

---

# 108. Web.BrowserSecurity.SameOriginConcept

**CORE**

---

# 109. Web.BrowserSecurity.CORSConcept

**IMPORTANT**

---

# 110. Web.BrowserSecurity.CSRFConcept

**CORE**

---

# 111. Web.BrowserSecurity.ContentSecurityPolicyAwareness

**IMPORTANT**

---

# 112. Web.BusinessLogic.WorkflowUnderstanding

**CORE**

---

# 113. Web.BusinessLogic.StateTransition

**CORE**

Mid-Level+.

---

# 114. Web.BusinessLogic.TrustAssumption

**CORE**

---

# 115. Web.BusinessLogic.AbuseCaseReasoning

**IMPORTANT**

---

# 116. Web.FileHandling.UploadConcept

**IMPORTANT**

---

# 117. Web.FileHandling.DownloadAuthorization

**CORE**

---

# 118. Web.ServerInteraction.SSRFConcept

**IMPORTANT**

---

# 119. Web.ServerInteraction.PathTraversalConcept

**IMPORTANT**

---

# 120. Web.ServerInteraction.XMLExternalEntityAwareness

**SPECIALIZED**

---

# 121. Web.ClientSide.DOMReasoning

**IMPORTANT**

---

# 122. Web.ClientSide.StorageConcept

**IMPORTANT**

---

# 123. API — visão geral

Árvore:

```text
API
├── Mapping
├── REST
├── Authentication
├── Authorization
├── InputValidation
├── RateResource
├── BusinessLogic
├── GraphQL
└── Evidence
```

---

# 124. API.Mapping.EndpointInventory

**CORE**

---

# 125. API.Mapping.ParameterInventory

**CORE**

---

# 126. API.Mapping.IdentityContext

**CORE**

---

# 127. API.REST.ResourceModel

**CORE**

---

# 128. API.REST.MethodSemantics

**CORE**

---

# 129. API.REST.StatusBehavior

**CORE**

---

# 130. API.Authentication.TokenFlow

**CORE**

---

# 131. API.Authentication.BearerTokenConcept

**CORE**

---

# 132. API.Authentication.JWTStructure

**IMPORTANT**

---

# 133. API.Authentication.JWTValidationConcept

**IMPORTANT**

---

# 134. API.Authorization.ObjectLevel

**CORE**

---

# 135. API.Authorization.FunctionLevel

**CORE**

---

# 136. API.Authorization.PropertyLevel

**IMPORTANT**

---

# 137. API.Authorization.RoleContext

**CORE**

---

# 138. API.InputValidation.TypeAssumption

**IMPORTANT**

---

# 139. API.InputValidation.MassAssignmentConcept

**IMPORTANT**

---

# 140. API.InputValidation.InjectionConcept

**CORE**

---

# 141. API.RateResource.RateLimitConcept

**IMPORTANT**

---

# 142. API.RateResource.ResourceConsumptionConcept

**IMPORTANT**

---

# 143. API.BusinessLogic.Workflow

**CORE**

---

# 144. API.BusinessLogic.StateAssumption

**CORE**

---

# 145. API.GraphQL.SchemaConcept

**IMPORTANT**

---

# 146. API.GraphQL.QueryMutation

**IMPORTANT**

---

# 147. API.GraphQL.AuthorizationMapping

**SPECIALIZED**

---

# 148. API.GraphQL.IntrospectionAwareness

**IMPORTANT**

---

# 149. API.Evidence.RequestResponsePreservation

**CORE**

---

# 150. Infrastructure — visão geral

Árvore:

```text
Infrastructure
├── Discovery
├── Enumeration
├── Services
├── Linux
├── Windows
├── Network
├── Credentials
├── Misconfiguration
└── Exposure
```

---

# 151. Infrastructure.Discovery.HostDiscovery

**CORE**

---

# 152. Infrastructure.Discovery.PortDiscovery

**CORE**

---

# 153. Infrastructure.Discovery.ServiceIdentification

**CORE**

---

# 154. Infrastructure.Enumeration.ServiceEnumeration

**CORE**

---

# 155. Infrastructure.Enumeration.VersionContext

**CORE**

Misconception:

> versão antiga = automaticamente vulnerável.

---

# 156. Infrastructure.Services.HTTP

**CORE**

---

# 157. Infrastructure.Services.SSH

**IMPORTANT**

---

# 158. Infrastructure.Services.FTP

**IMPORTANT**

---

# 159. Infrastructure.Services.SMB

**CORE**

---

# 160. Infrastructure.Services.DNS

**CORE**

---

# 161. Infrastructure.Services.RDP

**IMPORTANT**

---

# 162. Infrastructure.Services.DatabaseAwareness

**IMPORTANT**

---

# 163. Infrastructure.Linux.FilePermissions

**CORE**

---

# 164. Infrastructure.Linux.ServiceContext

**IMPORTANT**

---

# 165. Infrastructure.Linux.PrivilegeConcept

**IMPORTANT**

---

# 166. Infrastructure.Windows.FilePermissions

**CORE**

---

# 167. Infrastructure.Windows.ServicesConcept

**IMPORTANT**

---

# 168. Infrastructure.Windows.PrivilegeConcept

**IMPORTANT**

---

# 169. Infrastructure.Network.SegmentationConcept

**IMPORTANT**

---

# 170. Infrastructure.Network.RoutingContext

**IMPORTANT**

---

# 171. Infrastructure.Credentials.ExposureRecognition

**CORE**

---

# 172. Infrastructure.Credentials.ReuseConcept

**IMPORTANT**

---

# 173. Infrastructure.Credentials.SecretHandling

**CORE**

---

# 174. Infrastructure.Misconfiguration.DefaultAccess

**IMPORTANT**

---

# 175. Infrastructure.Misconfiguration.AnonymousAccess

**IMPORTANT**

---

# 176. Infrastructure.Misconfiguration.ExcessiveExposure

**CORE**

---

# 177. Infrastructure.Exposure.VulnerabilityDistinction

**CORE**

---

# 178. Evidence — visão geral

Evidence é domínio transversal e obrigatório.

Árvore:

```text
Evidence
├── Baseline
├── Trigger
├── Control
├── Reproduction
├── Impact
├── Preservation
├── Traceability
└── Sufficiency
```

---

# 179. Evidence.Baseline.Capture

**CORE**

---

# 180. Evidence.Trigger.Capture

**CORE**

---

# 181. Evidence.Control.Construction

**CORE**

---

# 182. Evidence.Reproduction.Repeatability

**CORE**

---

# 183. Evidence.Impact.Demonstration

**CORE**

---

# 184. Evidence.Preservation.RawArtifact

**CORE**

---

# 185. Evidence.Traceability.SourceLinking

**IMPORTANT**

---

# 186. Evidence.Sufficiency.Judgment

**CORE**

Mid-Level+ especialmente.

---

# 187. Evidence.Sufficiency.ClaimEvidenceAlignment

**CORE**

---

# 188. Reporting — visão geral

Árvore:

```text
Reporting
├── Finding
├── Reproduction
├── Evidence
├── Impact
├── Severity
├── Remediation
└── Communication
```

---

# 189. Reporting.Finding.Structure

**CORE**

---

# 190. Reporting.Finding.Title

**IMPORTANT**

---

# 191. Reporting.Reproduction.Clarity

**CORE**

---

# 192. Reporting.Reproduction.Reproducibility

**CORE**

---

# 193. Reporting.Evidence.Selection

**CORE**

---

# 194. Reporting.Impact.TechnicalImpact

**CORE**

---

# 195. Reporting.Impact.BusinessContext

**IMPORTANT**

Senior+.

---

# 196. Reporting.Severity.Justification

**CORE**

---

# 197. Reporting.Severity.Uncertainty

**IMPORTANT**

---

# 198. Reporting.Remediation.RootCauseAlignment

**CORE**

---

# 199. Reporting.Remediation.Actionability

**IMPORTANT**

---

# 200. Reporting.Communication.Precision

**CORE**

---

# 201. Reporting.Communication.AudienceAdaptation

**IMPORTANT**

Senior+.

---

# 202. Tool Proficiency — filosofia

Ferramentas não definem competência.

Tool Proficiency existe para medir capacidade operacional separadamente.

---

# 203. Tool Proficiency v0.1

Ferramentas iniciais:

```text
Burp Suite
Browser DevTools
Postman
Nmap
Terminal
Wireshark
```

---

# 204. Tool.Burp.Proxy

**IMPORTANT**

---

# 205. Tool.Burp.Repeater

**CORE para trilha Web/API**

---

# 206. Tool.Burp.Decoder

**IMPORTANT**

---

# 207. Tool.Burp.IntruderAwareness

**IMPORTANT**

Sem tratar automação como metodologia.

---

# 208. Tool.Browser.DevToolsNetwork

**CORE para Web**

---

# 209. Tool.Postman.RequestConstruction

**CORE para API**

---

# 210. Tool.Postman.Environments

**IMPORTANT**

---

# 211. Tool.Nmap.BasicDiscovery

**CORE para Infrastructure**

---

# 212. Tool.Nmap.ServiceDetection

**CORE para Infrastructure**

---

# 213. Tool.Terminal.Navigation

**CORE**

---

# 214. Tool.Terminal.PipesRedirection

**IMPORTANT**

---

# 215. Tool.Wireshark.FilteringBasics

**IMPORTANT**

---

# 216. Tool skill não substitui domain skill

Exemplo:

```text
Tool.Nmap.ServiceDetection = 90
Infrastructure.Enumeration.ServiceEnumeration = 55
```

É válido.

---

# 217. Prerequisite Graph — exemplos

```text
Web.Authorization.ObjectLevel
requires:
- Foundations.Security.AuthenticationAuthorization
- Foundations.Identity.Context
- Foundations.HTTP.RequestResponse
- Methodology.ExperimentDesign.ControlVariables
```

---

# 218. API.Authorization.ObjectLevel prerequisites

```text
requires:
- Foundations.HTTP.RequestResponse
- Foundations.Data.JSON
- Foundations.Identity.Token
- Foundations.Security.AuthenticationAuthorization
- Methodology.Hypothesis.Formation
```

---

# 219. SQL Injection prerequisites

```text
requires:
- Foundations.HTTP.Parameters
- Foundations.Data.StructuredData
- Methodology.Hypothesis.Formation
- Methodology.Validation.Control
```

---

# 220. Service Enumeration prerequisites

```text
requires:
- Foundations.Networking.PortsServices
- Foundations.Networking.CommonProtocols
- Methodology.Observation.SignalRecognition
```

---

# 221. Reporting prerequisites

```text
Reporting.Finding.Structure
requires:
- Evidence.Reproduction.Repeatability
- Evidence.Impact.Demonstration
```

---

# 222. Curriculum breadth

Global progression exige amplitude mínima.

Um aluno não deve atingir Senior global dominando apenas Web.

---

# 223. Breadth v0.1

Domínios obrigatórios globais:

```text
Foundations
Methodology
Web
API
Infrastructure
Evidence
Reporting
```

Tool Proficiency é contextual.

---

# 224. Intern curriculum outcome

Ao sair de Intern, o aluno deve conseguir:

- explicar fundamentos;
- operar ambiente básico;
- observar request/response;
- executar discovery simples;
- diferenciar signal de vulnerability;
- seguir metodologia guiada;
- manter baseline;
- registrar evidence básica;
- escrever reprodução simples.

---

# 225. Junior curriculum outcome

Ao sair de Junior, deve conseguir:

- mapear aplicação simples;
- investigar Web/API comuns;
- enumerar serviços;
- formular hipóteses;
- controlar variáveis;
- validar findings comuns;
- produzir evidence;
- escrever finding reproduzível;
- trabalhar com H0–H2 em skills familiares.

---

# 226. Mid-Level curriculum outcome

Ao sair de Mid-Level, deve conseguir:

- conduzir investigação significativa;
- priorizar;
- trabalhar em contextos novos;
- transferir princípios;
- combinar técnicas;
- reduzir falsos positivos;
- avaliar sufficiency;
- produzir relatório sólido;
- trabalhar majoritariamente H0/H1.

---

# 227. Senior curriculum outcome

Ao sair de Senior, deve:

- adaptar metodologia;
- trabalhar sob ambiguidade;
- questionar próprias conclusões;
- revisar findings;
- justificar severity;
- conectar Web/API/Infra;
- demonstrar forte autonomy;
- ensinar fundamentos e revisar trabalho.

---

# 228. Specialist curriculum outcome

Specialist deve demonstrar:

- profundidade em track;
- D4/D5;
- C3;
- cross-domain reasoning;
- Teach-Back;
- peer review;
- adaptação;
- root cause;
- julgamento.

---

# 229. Curriculum matrix — Foundations

Expectativa resumida:

```text
Intern      A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A4
```

Foundations não “some” depois.

A exigência muda de recall para aplicação.

---

# 230. Curriculum matrix — Methodology

```text
Intern      A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A5
```

Methodology cresce em todos os níveis.

---

# 231. Curriculum matrix — Web

```text
Intern      A0–A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A5 apenas Web Track
```

---

# 232. Curriculum matrix — API

Mesmo padrão.

---

# 233. Curriculum matrix — Infrastructure

Mesmo padrão.

---

# 234. Curriculum matrix — Evidence

```text
Intern      A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A5
```

---

# 235. Curriculum matrix — Reporting

```text
Intern      A1
Junior      A2
Mid-Level   A3
Senior      A4
Specialist  A5
```

---

# 236. Core skills para Intern → Junior

Primeiro conjunto v0.1:

```text
Foundations.Security.AuthenticationAuthorization
Foundations.Security.VulnerabilityVsExposure
Foundations.Networking.PortsServices
Foundations.HTTP.RequestResponse
Foundations.HTTP.Parameters
Foundations.Identity.Context
Foundations.Data.JSON

Methodology.Scope.Awareness
Methodology.Observation.SignalRecognition
Methodology.Observation.Baseline
Methodology.Hypothesis.Formation
Methodology.ExperimentDesign.SingleVariable
Methodology.Validation.Reproduction

Evidence.Baseline.Capture
Evidence.Reproduction.Repeatability

Reporting.Reproduction.Clarity
```

---

# 237. Intern → Junior domain exposure gate

Aluno deve ter exposure real a:

- Web;
- API;
- Infrastructure.

Não precisa domínio amplo.

---

# 238. Intern → Junior autonomy gate

Espera-se independência inicial em tarefas D1.

---

# 239. Intern → Junior assessment gate

Assessment simples, sem H4/H5.

Pode permitir H1/H2 dependendo do design.

---

# 240. Junior → Mid-Level core skills

Além das anteriores:

```text
Methodology.Hypothesis.Prediction
Methodology.Hypothesis.Refutation
Methodology.Hypothesis.Alternatives
Methodology.Prioritization.InformationValue
Methodology.ExperimentDesign.ControlVariables
Methodology.Validation.Control
Methodology.Validation.ImpactConfirmation
Methodology.Validation.FalsePositiveHandling
Methodology.Uncertainty.InconclusiveOutcome

Web.Mapping.ApplicationMapping
Web.Authorization.ObjectLevel
Web.Authorization.FunctionLevel
Web.Session.Lifecycle
Web.InputHandling.InjectionConcept
Web.InputHandling.XSSConcept
Web.BusinessLogic.WorkflowUnderstanding

API.Mapping.EndpointInventory
API.Mapping.IdentityContext
API.Authentication.TokenFlow
API.Authorization.ObjectLevel
API.Authorization.FunctionLevel
API.BusinessLogic.Workflow

Infrastructure.Discovery.PortDiscovery
Infrastructure.Discovery.ServiceIdentification
Infrastructure.Enumeration.ServiceEnumeration
Infrastructure.Services.SMB
Infrastructure.Services.DNS
Infrastructure.Credentials.ExposureRecognition

Evidence.Control.Construction
Evidence.Impact.Demonstration
Evidence.Sufficiency.ClaimEvidenceAlignment

Reporting.Finding.Structure
Reporting.Reproduction.Reproducibility
Reporting.Impact.TechnicalImpact
Reporting.Severity.Justification
```

---

# 241. Junior → Mid-Level transfer gate

Exigir C2 em múltiplos domínios.

Ao menos um caso deve ser independente.

---

# 242. Junior → Mid-Level autonomy gate

Maioria das core skills familiares em H0/H1.

---

# 243. Junior → Mid-Level breadth gate

Mínimo funcional em:

- Web;
- API;
- Infrastructure.

---

# 244. Junior → Mid-Level assessment gate

Assessment desconhecido D2/D3.

---

# 245. Mid-Level → Senior core expectations

Passa a exigir:

```text
Methodology.Hypothesis.Alternatives
Methodology.Prioritization.InformationValue
Methodology.Uncertainty.Calibration
Methodology.TimeManagement.RabbitHole
Methodology.TimeManagement.StoppingRule

Web.BusinessLogic.StateTransition
Web.BusinessLogic.TrustAssumption

API.BusinessLogic.StateAssumption

Infrastructure.Network.SegmentationConcept
Infrastructure.Exposure.VulnerabilityDistinction

Evidence.Sufficiency.Judgment

Reporting.Impact.BusinessContext
Reporting.Communication.Precision
Reporting.Remediation.RootCauseAlignment
```

---

# 246. Mid-Level → Senior transfer

Exigir:

- C2 consistente;
- pelo menos C3 relevante;
- mais de um domínio.

---

# 247. Mid-Level → Senior autonomy

Core investigation predominantemente H0.

---

# 248. Mid-Level → Senior ambiguity

Assessment deve possuir:

- sinais incompletos;
- false positive opportunity;
- múltiplas hipóteses.

---

# 249. Mid-Level → Senior review gate

Aluno deve revisar finding ou plano de outra pessoa.

---

# 250. Senior → Specialist

Não deve ser somente “mais skills”.

Exigir:

- Specialist Track;
- D4/D5;
- C3;
- Teach-Back;
- review;
- adaptation;
- cross-domain.

---

# 251. Specialist Tracks v0.1

Primeiras tracks conceituais:

```text
Web Specialist
API Specialist
Infrastructure Specialist
```

---

# 252. Web Specialist — foco

Aprofundar:

- authorization;
- business logic;
- browser security;
- advanced input handling;
- server interaction;
- complex workflows;
- review.

---

# 253. API Specialist — foco

Aprofundar:

- authorization;
- identity/token;
- REST;
- GraphQL;
- resource abuse;
- business logic;
- complex workflows.

---

# 254. Infrastructure Specialist — foco

Aprofundar:

- enumeration;
- service reasoning;
- network context;
- Linux/Windows;
- credential exposure;
- misconfiguration;
- segmentation;
- complex service relationships.

---

# 255. Specialist shared core

Todas as tracks exigem:

```text
Methodology.Hypothesis.Alternatives
Methodology.Prioritization.InformationValue
Methodology.Uncertainty.Calibration
Methodology.Reflection.Review
Evidence.Sufficiency.Judgment
Reporting.Remediation.RootCauseAlignment
Reporting.Communication.AudienceAdaptation
```

---

# 256. Tool Proficiency requirements by track

Web:
- Burp;
- Browser DevTools.

API:
- Burp ou Postman;
- terminal.

Infrastructure:
- Nmap;
- terminal;
- Wireshark awareness.

Ferramenta específica não deve bloquear quando técnica equivalente é demonstrada, salvo Tool Skill explícita.

---

# 257. Cross-domain transfer examples

## Web → API

Authorization concept.

## API → GraphQL

Resource ownership.

## Infra → Web

Service discovery encontra application surface.

## HTTP → API

Request/response reasoning.

## Evidence → Reporting

Claim/evidence alignment.

---

# 258. Curriculum anti-pattern: checklist completion

Não tratar:

```text
[x] SQLi
[x] XSS
[x] IDOR
```

como domínio.

Skill precisa de:

- reasoning;
- execution;
- autonomy;
- transfer.

---

# 259. Curriculum anti-pattern: vulnerability encyclopedia

Brother Eye não deve virar catálogo de vulnerabilidades.

Princípios transversais são mais importantes.

---

# 260. Curriculum anti-pattern: tool-first

Não ensinar:

> “Nmap lesson”

antes de:

> “discovery e service identification.”

Tool lesson existe depois.

---

# 261. Curriculum anti-pattern: memorized payloads

Payload não é objetivo curricular central.

---

# 262. Curriculum anti-pattern: finding count

Quantidade de findings não define nível.

---

# 263. Curriculum anti-pattern: CTF-only

CTF pode ser contexto.

Não substitui:

- scope;
- evidence;
- reporting;
- ambiguity;
- false positives.

---

# 264. Curriculum anti-pattern: linear mastery

Nem todo aluno precisa aprender todas as skills na mesma ordem exata.

Prerequisite graph deve permitir caminhos.

---

# 265. Curriculum sequencing

Sequência deve ser guiada por:

- prerequisites;
- current level;
- gaps;
- learner goals;
- evidence needs.

---

# 266. Recommended entry sequence

Para aluno do zero:

```text
Foundations.Security
↓
Networking
↓
HTTP
↓
Identity
↓
Methodology basics
↓
Web/API basics
↓
Infrastructure basics
↓
Evidence
↓
Reporting
```

Mas haverá interleaving.

---

# 267. First 10 learning blocks

Exemplo v0.1:

```text
1. O que é um pentest
2. Escopo e autorização
3. Rede, portas e serviços
4. HTTP
5. Identidade, autenticação e autorização
6. Observação e baseline
7. Hipóteses e testes
8. Primeira aplicação Web
9. Primeira API
10. Primeira enumeração de infraestrutura
```

---

# 268. First integrated block

Depois:

```text
Web/API authorization + evidence + reporting
```

---

# 269. Interleaving strategy

Não concluir Foundations inteiro antes da prática.

Exemplo:

```text
HTTP concept
→ prática Web
→ identity concept
→ prática API
→ baseline
→ practice
```

---

# 270. Just-in-time prerequisites

Se aluno encontra conceito novo:

Tutor ensina prerequisite mínimo.

---

# 271. Curriculum unit schema

Cada unidade futura deve possuir:

```yaml
unit:
  id:
  title:
  target_level:
  skills:
  prerequisites:
  objectives:
  common_misconceptions:
  learning_mode:
  suggested_tasks:
  assessment_opportunities:
  transfer_targets:
```

---

# 272. Skill schema

```yaml
skill:
  id:
  domain:
  type:
  criticality:
  prerequisites:
  expected_level:
  dimensions:
  common_misconceptions:
  transfer_targets:
  tool_dependencies:
  assessment_requirements:
```

---

# 273. Skill dimensions

Nem toda skill precisa pesos iguais.

Exemplo:

Concept skill:
- Knowledge maior.

Reasoning skill:
- Reasoning/Transfer maiores.

Tool skill:
- Execution maior.

---

# 274. Default dimension profile permanece do Competency Model

Quando não houver override.

---

# 275. Core misconception map v0.1

Misconceptions curriculares críticas:

```text
1. porta aberta = vulnerabilidade
2. versão antiga = vulnerável
3. scanner result = finding validado
4. authentication = authorization
5. resposta diferente = vulnerabilidade
6. frontend validation = security control
7. Base64 = encryption
8. finding sem impacto suficiente
9. payload antes da hipótese
10. muitas requests = boa investigação
```

---

# 276. Misconception ownership

Cada misconception deve mapear para skills.

---

# 277. Misconception: porta aberta = vulnerability

Skills:

```text
Foundations.Networking.PortsServices
Infrastructure.Exposure.VulnerabilityDistinction
Methodology.Validation.FalsePositiveHandling
```

---

# 278. Misconception: scanner = finding

Skills:

```text
Methodology.Validation.Reproduction
Methodology.Validation.Control
Evidence.Sufficiency.ClaimEvidenceAlignment
```

---

# 279. Misconception: authn = authz

Skills:

```text
Foundations.Security.AuthenticationAuthorization
Web.Authorization.*
API.Authorization.*
```

---

# 280. Curriculum support for assessment

Cada skill precisa eventualmente de:

- observable behaviors;
- assessment opportunities;
- rubric examples.

---

# 281. Curriculum support for Tutor

Cada skill pode fornecer:

- explanation notes;
- hints;
- examples;
- misconceptions;
- transfer prompts.

---

# 282. Curriculum support for Tool mapping

Cada technique pode mapear ferramentas possíveis.

Exemplo:

```text
HTTP request replay
→ Burp Repeater
→ Postman
→ curl
```

Nenhuma é obrigatória por princípio.

---

# 283. Learning objectives devem usar comportamento

Evitar:

> “Entender SQLi.”

Preferir:

> “Explicar o modelo de injection e identificar quando input pode alterar interpretação de uma query.”

---

# 284. Bad objective

> “Aprender Nmap.”

---

# 285. Better objective

> “Identificar serviços expostos em um host e interpretar os resultados de discovery.”

---

# 286. Curriculum evidence alignment

Cada objetivo deve apontar para behavior observável.

---

# 287. Depth per level

## Intern

“reconhece e explica”

## Junior

“executa em contexto familiar”

## Mid-Level

“seleciona e transfere”

## Senior

“julga e adapta”

## Specialist

“abstrai, revisa e ensina”

---

# 288. Level verbs

### Intern
- identificar;
- explicar;
- reproduzir;
- distinguir.

### Junior
- aplicar;
- investigar;
- comparar;
- validar.

### Mid-Level
- planejar;
- priorizar;
- transferir;
- combinar.

### Senior
- avaliar;
- adaptar;
- revisar;
- defender.

### Specialist
- abstrair;
- criar abordagem;
- ensinar;
- desafiar modelo.

---

# 289. Curriculum breadth vs specialization

Global Level requer breadth.

Domain Level permite depth.

Specialist Track aprofunda.

---

# 290. Domain floor v0.1

Para Senior global:

nenhum dos domínios Web/API/Infrastructure deve permanecer em nível Intern.

Thresholds exatos serão calibrados.

---

# 291. Domain floor for Mid-Level

Todos devem ter pelo menos base Junior funcional.

---

# 292. Evidence e Reporting não são opcionais

Não importa domínio.

---

# 293. Methodology não é opcional

Mesmo Specialist técnico precisa.

---

# 294. Tool Proficiency pode variar

Ferramenta pode ser substituída.

---

# 295. Curriculum progression should not be lockstep

Aluno pode:

```text
Web Mid-Level
API Junior
Infra Junior
```

e continuar avançando.

---

# 296. Global promotion waits for floor

Somente quando gates globais forem satisfeitos.

---

# 297. Specialist without global Specialist

Permitido:

```text
Global Senior
Web Specialist
```

---

# 298. Curriculum challenge policy

Challenges devem misturar skills.

---

# 299. Challenge v0.1 examples

- authorization + evidence;
- service enumeration + prioritization;
- business logic + reporting;
- API mapping + identity context.

---

# 300. Clean target tasks

Currículo deve incluir targets sem vulnerabilidade.

---

# 301. False signal tasks

Também.

---

# 302. Revalidation tasks

Skills antigas reaparecem de forma curta.

---

# 303. Review tasks

Senior/Specialist revisam trabalho.

---

# 304. Teach-Back tasks

Começam simples e crescem.

---

# 305. Learning path personalization

Tutor pode selecionar próxima unidade usando:

```text
prerequisite gap
promotion blocker
misconception
low confidence
transfer need
learner goal
```

---

# 306. No “lowest score wins”

Próxima task deve considerar valor pedagógico.

---

# 307. Example recommendation

```text
API.Authorization.ObjectLevel
Mastery 82
Confidence Medium
Transfer 41

Next:
C2 authorization task
```

---

# 308. Example remediation

```text
Web.Authorization
Mastery 42

Root prerequisite:
Foundations.Identity.Context 38

Next:
identity micro-unit
```

---

# 309. Curriculum coverage dashboard

Futuro:

```text
Foundations    81%
Methodology    68%
Web            72%
API            59%
Infrastructure 54%
Evidence       74%
Reporting      66%
```

Cobertura não é igual a nível.

---

# 310. Curriculum map view

Skill Graph visual deve mostrar:

- mastered;
- practicing;
- blocked;
- unknown;
- revalidation_due.

---

# 311. Core skill map v0.1

Primeira lista consolidada de core skills:

```text
FOUNDATIONS
AuthenticationAuthorization
VulnerabilityVsExposure
TrustBoundary
IPBasics
TCPUDP
PortsServices
DNSBasics
RequestResponse
Methods
Headers
Cookies
StatusCodes
Parameters
ProxyConcept
LinuxBasics
WindowsBasics
FilesPermissions
IdentityContext
Session
Token
RolePrivilege
JSON
IdentifierTypes
DataSensitivity
HashVsEncryption
ClientServer
FrontendBackend
APIConcept
TrustBoundaryMapping

METHODOLOGY
ScopeAwareness
FailClosed
SignalRecognition
Baseline
HypothesisFormation
Prediction
Refutation
Alternatives
NextBestAction
InformationValue
ControlVariables
SingleVariable
Reproduction
Control
ImpactConfirmation
FalsePositiveHandling
UncertaintyCalibration
InconclusiveOutcome

WEB
ApplicationMapping
AuthenticationFlowMapping
ObjectLevelAuthorization
FunctionLevelAuthorization
RoleBoundary
HorizontalVertical
CookieAttributes
SessionLifecycle
Reflection
Context
InjectionConcept
SQLInjectionConcept
XSSConcept
SameOriginConcept
CSRFConcept
WorkflowUnderstanding
StateTransition
TrustAssumption
DownloadAuthorization

API
EndpointInventory
ParameterInventory
IdentityContext
ResourceModel
MethodSemantics
StatusBehavior
TokenFlow
BearerTokenConcept
ObjectLevelAuthorization
FunctionLevelAuthorization
RoleContext
InjectionConcept
Workflow
StateAssumption
RequestResponsePreservation

INFRASTRUCTURE
HostDiscovery
PortDiscovery
ServiceIdentification
ServiceEnumeration
VersionContext
HTTPService
SMB
DNS
LinuxFilePermissions
WindowsFilePermissions
CredentialExposureRecognition
SecretHandling
ExcessiveExposure
VulnerabilityDistinction

EVIDENCE
BaselineCapture
TriggerCapture
ControlConstruction
Repeatability
ImpactDemonstration
RawArtifact
SufficiencyJudgment
ClaimEvidenceAlignment

REPORTING
FindingStructure
ReproductionClarity
Reproducibility
EvidenceSelection
TechnicalImpact
SeverityJustification
RootCauseAlignment
CommunicationPrecision
```

---

# 312. Curriculum size discipline

A v0.1 não deve crescer indefinidamente.

Adicionar skill somente se ela:

- possui valor pedagógico distinto;
- pode ser observada;
- altera Tutor;
- altera assessment;
- ou altera progressão.

---

# 313. Avoid micro-skill explosion

Não criar uma skill para cada header HTTP.

---

# 314. Avoid mega-skills

Não criar:

> `WebPentest`

como uma única skill.

---

# 315. Good skill granularity

Skill deve ser pequena o suficiente para orientar ensino, mas grande o suficiente para produzir evidence relevante.

---

# 316. Skill merge rule

Se duas skills sempre:

- aparecem juntas;
- são avaliadas juntas;
- possuem mesmo remediation,

considerar merge.

---

# 317. Skill split rule

Se uma skill possui comportamentos diferentes e caminhos de melhoria diferentes, dividir.

---

# 318. V0.1 curriculum governance

Toda alteração curricular deve possuir:

- rationale;
- affected skills;
- affected gates;
- migration impact.

---

# 319. Curriculum versioning

```text
v0.1
v0.2
...
```

---

# 320. Breaking curriculum change

Exemplos:

- remover core skill;
- mudar gate;
- dividir skill usada em scores;
- alterar level expectation.

---

# 321. Non-breaking change

Exemplos:

- melhorar descrição;
- adicionar exemplo;
- adicionar ferramenta alternativa.

---

# 322. Curriculum migration

SkillEvidence histórica deve ser migrável.

---

# 323. Curriculum review cadence

Revisar após:

- primeiros pilotos;
- primeiros promotion assessments;
- discrepâncias;
- feedback de instrutores.

---

# 324. Data-driven revision

Mudanças futuras devem observar:

- skills stalled;
- assessment failures;
- misconceptions;
- transfer gaps;
- false promotion.

---

# 325. Curriculum quality metrics

- prerequisite validity;
- assessment coverage;
- transfer;
- retention;
- skill granularity;
- promotion validity;
- learner independence.

---

# 326. Curriculum success criterion

Não é:

> “cobrimos todas as vulnerabilidades.”

É:

> “o aluno desenvolve método e consegue aprender vulnerabilidades novas depois.”

---

# 327. V0.1 required learning outcomes

Ao final do core curricular, um aluno avançado deve ser capaz de:

1. entender o sistema antes de testar;
2. formular hipóteses;
3. selecionar técnicas;
4. executar;
5. interpretar;
6. validar;
7. refutar;
8. preservar evidence;
9. comunicar;
10. adaptar.

---

# 328. Curriculum and real-world seniority

Brother Eye não certifica automaticamente cargo profissional.

---

# 329. External frameworks

O currículo pode mapear futuramente skills para referências externas, como:

- OWASP;
- PTES;
- NIST;
- MITRE ATT&CK;
- outros referenciais.

Esses mappings são referências, não estrutura central do currículo.

---

# 330. Framework mapping rule

Não organizar currículo diretamente pela ordem de um checklist externo.

---

# 331. Curriculum identity

Brother Eye deve possuir sua própria Skill Graph.

---

# 332. Framework compatibility

Pode mostrar:

```text
Skill X
Related:
OWASP ...
```

sem depender dela.

---

# 333. Certification neutrality

O currículo não deve ser desenhado para uma certificação específica.

---

# 334. Career usefulness

Pode cobrir competências úteis profissionalmente.

Mas learning evidence permanece prioridade.

---

# 335. V0.1 learning tracks

Currículo inicial pode oferecer:

```text
Core Pentest
Web Focus
API Focus
Infrastructure Focus
```

---

# 336. Core Pentest Track

Obrigatório para progressão global.

---

# 337. Focus tracks

Aumentam prática em domínio.

Não substituem core.

---

# 338. Specialist track unlock

Conceitualmente após Senior domain readiness.

---

# 339. Specialist track completion

Não depende de porcentagem simples.

Exige gates.

---

# 340. Specialist Web gates — draft

- advanced authorization;
- business logic;
- C3 transfer;
- D4/D5 task;
- review;
- Teach-Back.

---

# 341. Specialist API gates — draft

- complex authorization;
- token/context reasoning;
- REST/GraphQL transfer;
- D4/D5;
- review;
- Teach-Back.

---

# 342. Specialist Infrastructure gates — draft

- advanced enumeration;
- multi-service reasoning;
- network context;
- D4/D5;
- review;
- Teach-Back.

---

# 343. Specialist common gate

- uncertainty handling;
- root cause;
- evidence sufficiency;
- communication;
- adaptation.

---

# 344. Curriculum assessment requirement

Toda core skill deve possuir ao menos um caminho plausível de assessment.

---

# 345. Curriculum Tutor requirement

Toda core skill deve possuir orientação pedagógica futura.

---

# 346. Curriculum evidence requirement

Toda core skill deve produzir comportamento observável.

---

# 347. Skill not observable

Se não é observável, reformular.

---

# 348. Skill not teachable

Se é apenas outcome abstrato, decompor.

---

# 349. Example bad skill

> “Ser bom em pentest.”

---

# 350. Example better decomposition

- observation;
- hypothesis;
- prioritization;
- validation;
- evidence.

---

# 351. Curriculum progression invariant

Nunca promover por completar módulos.

---

# 352. Curriculum skill invariant

Toda skill possui propósito distinto.

---

# 353. Curriculum tool invariant

Tool skill separada de pentest skill.

---

# 354. Curriculum breadth invariant

Global Level exige Web + API + Infrastructure.

---

# 355. Curriculum methodology invariant

Methodology está presente em todos os níveis.

---

# 356. Curriculum evidence invariant

Evidence e Reporting não são “final da trilha”.

Começam em Intern.

---

# 357. Curriculum transfer invariant

Mid-Level+ exige aplicação fora do contexto original.

---

# 358. Curriculum Specialist invariant

Specialist exige depth + transfer + review + teaching.

---

# 359. Curriculum V1 implementation order

Quando chegar implementação:

1. importar Skill Graph;
2. cadastrar prerequisites;
3. cadastrar criticality;
4. cadastrar expected level;
5. cadastrar misconception mappings;
6. cadastrar assessment hooks;
7. cadastrar Tutor hooks;
8. criar primeiras unidades;
9. criar primeiros labs;
10. pilotar.

---

# 360. Primeiras unidades recomendadas

## Unit 001 — Pentest, escopo e evidência

Skills:

- scope;
- authorization;
- observed vs inferred;
- evidence.

## Unit 002 — Rede, portas e serviços

Skills:

- IP;
- TCP/UDP;
- ports;
- services;
- exposure vs vulnerability.

## Unit 003 — HTTP e requests

Skills:

- HTTP;
- parameters;
- headers;
- proxy.

## Unit 004 — Identidade

Skills:

- authn;
- authz;
- sessions;
- tokens.

## Unit 005 — Hipóteses

Skills:

- hypothesis;
- prediction;
- control;
- refutation.

---

# 361. Unit 006 — Primeiro Web Pentest

Integra:

- mapping;
- HTTP;
- identity;
- evidence.

---

# 362. Unit 007 — Primeiro API Pentest

Integra:

- endpoint;
- JSON;
- identity;
- authorization.

---

# 363. Unit 008 — Primeira Infra Enumeration

Integra:

- ports;
- services;
- enumeration;
- evidence.

---

# 364. Unit 009 — Validation

Integra:

- reproduction;
- control;
- false positives;
- impact.

---

# 365. Unit 010 — Reporting

Integra:

- finding;
- steps;
- evidence;
- severity;
- remediation.

---

# 366. Curriculum does not imply fixed course order

Essas unidades são baseline para aluno zero.

Tutor pode adaptar.

---

# 367. Placement-aware curriculum

Aluno experiente pode pular units após evidence.

---

# 368. Skip is evidence-based

Não apenas auto-declaração.

---

# 369. Skill mastery can cross units

Uma skill aparece repetidamente.

---

# 370. No “completed forever”

Skill pode exigir revalidation.

---

# 371. Curriculum and spaced practice

Reintroduzir:

- HTTP;
- identity;
- validation;
- evidence

em múltiplos contextos.

---

# 372. Curriculum and interleaving

A partir de Junior:

misturar Web/API/Infra.

---

# 373. Curriculum and productive struggle

Tasks devem permitir descoberta.

Não escrever tutorial dentro do lab.

---

# 374. Curriculum and spoilers

Learn:
pode explicitar skill.

Challenge:
menos.

Exam:
não.

---

# 375. Curriculum and clean targets

Pelo menos parte das tasks não deve conter vulnerability.

---

# 376. Curriculum and evidence quality

Task deve permitir coletar evidence real.

---

# 377. Curriculum and review

Mid-Level+ precisa revisar sessões anteriores.

---

# 378. Curriculum and Teach-Back

Começa antes de Specialist.

Specialist exige.

---

# 379. Curriculum and reflection

Todas as unidades importantes encerram com Reflection.

---

# 380. Curriculum and misconceptions

Cada unit deve ter lista de misconceptions prováveis.

---

# 381. Curriculum and challenge unlock

Quando skill atinge independent.

---

# 382. Curriculum and assessment unlock

Quando Confidence suficiente ou gate exige.

---

# 383. Curriculum and remediation loop

```text
assessment
↓
gap
↓
prerequisite
↓
practice
↓
challenge
↓
reassessment
```

---

# 384. Curriculum and personalization loop

```text
Learner Model
↓
Promotion blockers
↓
Next best skill
↓
Task
↓
Evidence
↓
Learner Model
```

---

# 385. Example learner path

```text
Intern
HTTP weak
→ HTTP unit

Authorization weak
→ identity unit

Practice API
→ H2

Practice API
→ H1

Challenge Web authz
→ H0

Transfer API
→ C2

Promotion readiness
```

---

# 386. Example advanced path

```text
Senior Web
API Mid-Level
Infra Junior

Goal:
Global Senior consolidation

Next:
Infrastructure breadth + cross-domain tasks
```

---

# 387. V0.1 unresolved curriculum decisions

Ainda não estão fixados:

- thresholds exatos;
- quantidade de tasks;
- tempo estimado;
- full Specialist content;
- AD/Cloud;
- lab catalog;
- detailed rubric por skill;
- tool alternatives completas.

---

# 388. Decisões normativas v0.1

Ficam estabelecidas:

1. oito domínios curriculares;
2. Foundations/Methodology/Web/API/Infrastructure/Evidence/Reporting são obrigatórios globalmente;
3. Tool Proficiency é separado;
4. skills usam IDs estruturados;
5. core/important/specialized;
6. prerequisite graph;
7. learning expectations A0–A5;
8. methodology cresce em todos os níveis;
9. evidence e reporting começam em Intern;
10. Web/API/Infra possuem breadth mínima global;
11. Mid-Level exige transfer;
12. Senior exige judgment/review;
13. Specialist exige track;
14. Specialist possui Web/API/Infrastructure inicialmente;
15. currículo não é vulnerability checklist;
16. currículo não é tool-first;
17. clean targets e false signals fazem parte;
18. skills devem ser observáveis;
19. placement pode pular conteúdo;
20. completion não promove.

---

# 389. Critérios de aprovação

Este Curriculum v0.1 está conceitualmente aprovado quando houver concordância de que:

- a divisão de domínios faz sentido;
- a árvore de core skills representa uma base realista;
- Methodology possui peso central;
- Web/API/Infra possuem breadth suficiente;
- Evidence e Reporting são core;
- Tool Proficiency está corretamente separado;
- Intern → Specialist representa aumento de autonomia e julgamento;
- Specialist Tracks são adequadas;
- o currículo não virou lista de vulnerabilidades;
- o currículo não virou lista de ferramentas.

---

# 390. Próximo documento

Após aprovação, o próximo documento será:

`docs/03-product/BROTHER_EYE_STUDENT_EXPERIENCE_AND_UX.md`

Ele definirá como o aluno realmente vive o Brother Eye:

- onboarding;
- placement;
- home;
- sessão;
- HUD;
- chat;
- voice;
- skill graph;
- progress;
- Why this score;
- modes;
- debrief;
- assessments;
- evidence;
- privacy controls.

---

# 391. Regra-mãe

> **O currículo do Brother Eye deve formar um pentester capaz de aprender problemas novos por conta própria, não apenas alguém capaz de repetir técnicas já ensinadas.**

---

## Status

**Draft v0.1**

Este documento deve ser validado conceitualmente antes da especificação de Student Experience & UX.

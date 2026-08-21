# Contagem de acessos/visitantes: opções

Registro das alternativas discutidas para adicionar uma contagem de visitantes ao projeto, para decidir com calma depois. Nenhuma foi implementada ainda.

## Por que não dá só em código

O projeto é 100% estático (sem backend, sem banco de dados, hospedagem prevista no GitHub Pages). Um contador de visitantes precisa de um lugar compartilhado guardando esse número entre todo mundo que acessa, e isso só um serviço externo ou um backend próprio resolve. `localStorage` (usado hoje para o tema) não serve para isso: é isolado por navegador/dispositivo, contaria só "quantas vezes esse navegador visitou", não visitantes reais.

## Opções, do mais simples ao mais robusto

### 1. Badge de contador (hit counter)

Serviços como [hits.seeyoufarm.com](https://hits.seeyoufarm.com/) ou visitor-badge: cola uma tag `<img>` apontando pra URL deles, e o serviço incrementa e devolve uma imagem com o número.

- Zero código além da tag `<img>`.
- Combina com a estética retrô/hacker que o projeto já tem.
- Só mostra um número, sem detalhe nenhum sobre quem/quando/de onde.
- Depende de um serviço de terceiro pequeno continuar no ar.

### 2. Analytics de verdade

Dá visitas, países, dispositivos, páginas mais vistas etc, não só um número. Exige colar um `<script>` na página. Dentro dessa categoria existem opções bem diferentes entre si:

| Serviço | Custo | Privacidade / cookies | Observação |
|---|---|---|---|
| **GoatCounter** | Gratuito (uso pessoal, hospedado por eles) | Sem cookies, não coleta dado pessoal | Leve, painel simples, projeto open source. Provavelmente a melhor relação custo/benefício para este projeto. |
| **Plausible** | Pago (versão hospedada); grátis só se você mesma hospedar em um servidor próprio | Sem cookies | Self-host contradiz a ideia de projeto sem backend; a versão paga é o caminho realista se quiser usar. |
| **Google Analytics (GA4)** | Gratuito | Usa cookies e coleta mais dado pessoal; no Brasil isso esbarra na LGPD, geralmente pede banner de consentimento | O mais completo e conhecido, mas o mais pesado e o que mais levanta questão de privacidade. |
| **Simple Analytics** | Pago (com teste grátis de 14 dias) | Sem cookies | Não tem plano gratuito permanente. |

### 3. GitHub Insights → Traffic

O próprio GitHub já mostra visitas ao repositório/Pages.

- Zero configuração, já existe.
- Só visível para quem administra o repositório, não é um contador público na página.
- Guarda só 14 dias de histórico.

### 4. Backend próprio

Ex: Cloudflare Workers + KV, Supabase. Uma função que incrementa um contador em um banco e a página lê esse valor via `fetch`.

- Controle total sobre o que é guardado e como é exibido.
- Bem mais setup para, no fim, só um número (ou dashboard próprio).
- Precisa manter uma conta em um provedor de nuvem, mesmo que no plano gratuito.

## Onde isso entra no projeto

Qualquer uma dessas opções introduz uma dependência externa, hoje listada como fora de escopo no [`VISAO.md`](VISAO.md) (seção 9). Ao decidir, vale atualizar aquela seção e, se for o caso, criar um novo requisito funcional (RF) e não funcional (RNF) formalizando a escolha, seguindo o padrão já usado no resto do documento.

## Estado atual da decisão

Inclinação inicial: **Analytics** (categoria 2), em vez de só um contador visual. Dentro dela, se a prioridade for gratuito e simples de manter sem servidor próprio, **GoatCounter** é o mais alinhado ao perfil do projeto (sem backend, leve, sem fricção de LGPD). Se a prioridade for o conjunto mais completo de métricas e a questão de privacidade/LGPD for aceitável, **Google Analytics** é o mais robusto.

Nada implementado ainda, isso aqui é só o registro das opções para revisão posterior.

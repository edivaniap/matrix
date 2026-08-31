# 🟢 Matrix Digital Rain: Guia Passo a Passo  アカサタナヤラガザダイホモゴゾポヴ

Bem-vindo(a) à Matrix. 🕶️ Aqui vai o passo a passo pra rodar a chuva de código na sua máquina, sem precisar escolher entre a pílula azul e a vermelha (pegue as duas, é só HTML/CSS/JS 😆).

---

## 📁 1. Estrutura do projeto

```
matrix/
├── index.html          → estrutura da página
├── style.css           → visual (fundo preto, texto neon, glow)
├── script.js           → a lógica da chuva de caracteres
└── documentacao/
    ├── GUIA.md          → você está aqui 👋
    ├── VISAO.md         → visão de produto e decisões de engenharia
    ├── VISITANTES.md    → opções de contagem de visitantes (backlog)
    └── DOWNLOAD.md       → opções de download da chuva (backlog)
```

## 🚀 2. Como rodar

Não precisa instalar nada, é tudo estático! Só três opções:

1. **Clique duplo** no [`index.html`](../index.html) e abra direto no navegador. 🖱️
2. **VS Code + Live Server**: clique com botão direito em `index.html` → "Open with Live Server". ⚡
3. **Terminal** (se tiver Python instalado):
   ```bash
   python -m http.server 8000
   ```
   e abra `http://localhost:8000` no navegador. 🌐

## 🧠 3. Como funciona (por baixo do capô)

- 🎨 **`<canvas>`**: é onde tudo é desenhado, pixel a pixel, 30 vezes por segundo.
- ⏱️ **O loop de animação**: o canvas não se redesenha sozinho, nada nele é "automático". No fim do [`script.js`](../script.js) tem `setInterval(draw, 33)`, uma função nativa do JavaScript que diz "chame `draw()` de novo a cada 33 milissegundos, pra sempre". Como 1000ms / 33ms ≈ 30, isso dá as tais 30 vezes por segundo. Cada chamada de `draw()` é um frame: pinta o rastro esmaecido e desenha um caractere novo em cada coluna. É literalmente a mesma função rodando em loop, repetida rápido o suficiente pra parecer animação contínua. (Curiosidade: o jeito mais "moderno" de animar canvas é `requestAnimationFrame`, sincronizado com a tela; usamos `setInterval` de propósito aqui, porque o efeito original tem um ritmo de queda fixo e bem definido, não precisa acompanhar a atualização da tela.)
- 🌧️ **Colunas**: a tela é dividida em colunas de 20px (`fontSize`). Cada coluna é uma "gota" que cai.
- 🖤 **Efeito de rastro**: em vez de limpar o canvas a cada frame, pintamos um retângulo preto **quase transparente** (`rgba(0,0,0,0.05)`) por cima. Isso faz os caracteres antigos "desbotarem" aos poucos, criando o rastro de cauda característico. ✨
- 💚 **Cores**: cada caractere é pintado de acordo com a altura dele na tela e o tema escolhido (mais sobre isso na seção 8), e um branco puro pra ponta, simulando o brilho do caractere "mais novo" caindo.
- 🔤 **Caracteres**: sorteados aleatoriamente a cada frame entre katakana japonês, letras e números (mais sobre isso já já 👇).

## ✏️ 4. Deixando com a sua cara

Abra o [`script.js`](../script.js) e brinque com:

| O que mudar | Onde | Efeito |
|---|---|---|
| `fontSize` | topo do arquivo | tamanho/densidade das colunas 📏 |
| `COR_RASTRO` | topo do arquivo | rastro mais longo (alpha menor) ou mais curto (alpha maior) 🎞️ |
| `THEMES` | topo do arquivo | cores da chuva (adicione seu próprio tema, ver seção 8) 🎨 |
| `PESO_KATAKANA` / `PESO_LATIM` / `PESO_NUMEROS` | topo do arquivo | proporção entre katakana, letras e números na chuva (os três precisam somar 1) 🔤 |
| `setInterval(draw, 33)` | fim do arquivo | velocidade geral da animação (fps, afeta também o flicker dos caracteres) ⏱️ |
| `VELOCIDADE_QUEDA` | topo do arquivo | velocidade só da queda das colunas, sem afetar o fps 🌧️ |

---

## 🍜 5. Curiosidade: a "receita" por trás dos caracteres

Você perguntou se dá pra usar caracteres japoneses e se a gente ia "usar a mesma receita de miojo do criador do filme", e aqui a lenda urbana e a realidade se cruzam de um jeito engraçado! 😂

**Sim, deu pra usar caracteres japoneses** ✅: o `script.js` usa um alfabeto com **katakana de meia-largura** (半角カタカナ) misturado com letras latinas e números, exatamente como no filme original.

Agora a parte curiosa 🤓: não foi bem uma receita de **miojo** (lámen instantâneo 🍜), mas a origem real é quase tão doméstica quanto isso! Segundo **Simon Whiteley**, o designer responsável pelos efeitos de "código chovendo" nos créditos originais de *The Matrix* (1999):

> A esposa dele tinha uma coleção de **livros de receitas japonesas** (inclusive de sushi 🍣) na cozinha. Ele gostou tanto da estética visual dos caracteres **katakana** impressos ali que escaneou páginas desses livros e usou os símbolos como base pro efeito da chuva digital. 📖➡️💻

Ou seja: a "chuva verde" mais icônica do cinema nasceu, literalmente, de uma receita, só que era de comida japonesa em geral, não miojo especificamente. Mas convenhamos, a vibe de "pegar um livro de receita aleatório e criar um dos efeitos visuais mais famosos da história do cinema" é 100% miojo de madrugada às 3h da manhã escrevendo código. 🌙👨‍💻

Curiosidades extras pra completar o pacote 🎁:

- 🔡 Os caracteres katakana usados não formam frases com sentido: são símbolos soltos, escolhidos pela estética, não pelo significado.
- 🎬 O efeito ficou tão marcante que virou sinônimo visual de "hackear" e "mundo digital" em incontáveis outras produções depois disso.
- 💾 Nos filmes, dizem que a "receita" (o código da chuva) representa o próprio código-fonte da Matrix, um universo simulado sendo renderizado em tempo real, igual ao nosso `<canvas>` aqui. 😏

---

## 🐇 6. Frase aleatória a cada reload e o que cada uma significa

Reparou que a fala embaixo do título muda toda vez que você recarrega a página? Isso não é aleatório à toa: peguei a ideia do site [shouldideploy.today](https://shouldideploy.today/), que sorteia uma resposta (com motivo) toda vez que você visita, pra decidir se hoje é um bom dia pra fazer deploy. Aqui fiz o mesmo esquema, só que sorteando falas icônicas do filme. 🎲

No [`script.js`](../script.js) tem um array `quotes`. A cada carregamento da página, `Math.random()` escolhe uma linha e joga no `<p id="quote">`. Quer adicionar a sua? É só colocar uma nova string dentro do array. 😉

Agora, o que cada frase representa dentro do filme:

| Frase | De onde vem 🎬 |
|---|---|
| 🐇 **Siga o coelho branco** | A mensagem que aparece no computador do Neo logo no início, seguida por uma garota com tatuagem de coelho branco na porta. É o gatilho que leva ele ao clube onde conhece a Trinity, a primeira pista de que existe algo além da realidade comum dele. Referência a *Alice no País das Maravilhas* (Alice segue o coelho branco pra dentro da toca). |
| 💊 **Pílula vermelha ou pílula azul?** | A cena mais famosa do filme: Morpheus oferece ao Neo a pílula azul (esquece tudo, volta pra "vida normal") ou a vermelha (descobre a verdade sobre a Matrix, sem volta). Virou metáfora universal pra "escolher entre a ignorância confortável ou a verdade desconfortável". |
| 🥄 **Não existe colher** | Dita por um garoto monge na sala de espera do Oráculo. Ele explica que não é a colher que se dobra: é a mente do Neo que precisa entender que, dentro da Matrix, "a realidade" é só código, então os limites físicos não são realmente limites. |
| 👁️ **A Matrix tem você** | Frase (em inglês, "The Matrix has you") que aparece no computador do Neo antes do encontro com o coelho branco, um aviso de que ele está sendo observado/preso dentro do sistema sem saber. |
| 🌀 **Acorde, Neo...** | Também parte da mesma sequência inicial no computador: literalmente um chamado pra ele "despertar" da ilusão em que vive, o tema central do filme inteiro. |
| 🏜️ **Bem-vindo ao deserto do real** | Morpheus mostra ao Neo o mundo real, destruído pelas máquinas, depois que ele toma a pílula vermelha. É o momento em que a "verdade" se revela literalmente feia e dura, em contraste com a Matrix, que é confortável mas falsa. |
| 🥋 **Eu sei kung fu** | Depois de ter um programa de treinamento de artes marciais baixado direto no cérebro, o Neo abre os olhos e diz só isso. Ficou como piada universal pra "aprender uma habilidade complexa instantaneamente". |
| 🤔 **O que é real? Como você define "real"?** | Pergunta filosófica do Morpheus antes de explicar a Matrix: questiona se "real" é só aquilo que sentimos e processamos como sinais elétricos no cérebro, base de toda a discussão filosófica do filme (inspirada em Descartes/Baudrillard). |
| 🚪 **Toc, toc, Neo** | Mensagem que a Trinity envia pro computador do Neo bem no início, avisando que ele está sendo vigiado e que a resposta que ele procura vai encontrá-lo. |
| 💭 **Você já teve aquele sonho que parece tão real?** | Primeira fala do Morpheus pro Neo pessoalmente, questionando como ele distinguiria o mundo dos sonhos do mundo real, plantando a dúvida principal do filme antes mesmo da pílula. |
| 🧠 **Livre sua mente** | Conselho repetido do Morpheus: pra fazer coisas "impossíveis" dentro da Matrix (pular prédios, desviar de balas), o Neo precisa parar de acreditar nas regras físicas que ele acha que existem. |
| 🤖 **Nunca envie um humano pra fazer o trabalho de uma máquina** | Frase do Agente Smith, o antagonista: resume a visão fria das máquinas sobre eficiência e desprezo pelos humanos, e é uma das falas mais citadas do vilão. |

Curiosidade a mais, além da lista acima: essas frases carregam uma segunda camada de significado que não é força de interpretação, é intenção confirmada por quem fez o filme. Em 2020, **Lilly Wachowski**, uma das diretoras (mulher trans), declarou publicamente que *Matrix* foi concebido desde o início como uma alegoria da experiência trans: o "farpa na sua mente" que Morpheus descreve funciona como metáfora da disforia de gênero, a pílula vermelha carrega simbolismo ligado a hormônios, e o próprio ato de "acordar" pra uma realidade que o mundo ao redor insiste em negar é, na origem, sobre descoberta e afirmação de identidade. Pra qualquer pessoa LGBTQIA+, essa estrutura (nascer dentro de uma sociedade que diz o contrário sobre a própria existência, e precisar descobrir e assumir uma verdade que sempre esteve ali) ressoa muito além da ficção, o que torna o tema de cores desse projeto (seção 8) menos "adicional" e mais uma continuação natural do que o filme já carregava. 🏳️‍🌈

Sources:
- [Lilly Wachowski confirms that, yes, The Matrix is an allegory for the trans experience (PinkNews)](https://www.thepinknews.com/2020/08/05/lilly-lana-wachowski-the-matrix-trans-experience-transgender-gender-dysphoria-red-pill/)
- ['The Matrix' Creator Explains What The Red Pill Really Is (Newsweek)](https://www.newsweek.com/matrix-creator-red-pill-trans-allegory-mens-rights-activists-1523669)

---

## 🖥️ 7. Melhorias visuais: o painel virou um "monitor antigo"

O título e a frase estavam meio difíceis de ler direto em cima da chuva, então demos uma repaginada no [style.css](../style.css):

- 🪟 **Painel com moldura neon**: título e frase agora ficam dentro de uma caixa (`.hud`) com fundo preto esverdeado translúcido (`rgba(0, 15, 0, 0.55)`), borda verde e `box-shadow` duplo (glow por fora + por dentro). Dá contraste suficiente pra ler sem esconder a chuva passando atrás.
- 🌫️ **`backdrop-filter: blur(2px)`**: borra levemente só o que está atrás do painel, sem tocar no resto da tela.
- 🔡 **Título em minúsculo e centralizado de verdade**: o `letter-spacing` deixava um "respiro" sobrando depois do último caractere (os `...`), o que empurrava o texto visualmente pra esquerda mesmo com `text-align: center`. A correção foi isolar o espaçamento num `<span class="title-text">` e aplicar uma margem negativa do mesmo tamanho pra compensar.
- 📺 **Scanlines**: um `::before` no painel desenha linhas horizontais escuras que rolam devagar por cima de tudo (`@keyframes scanlines`), simulando a varredura de uma tela CRT antiga.
- 🐛 **Glitch horizontal no título**: inspirado nas câmeras de segurança do FNAF! Dois pseudo-elementos (`::before`/`::after`) do título ficam escondidos quase o tempo todo e, por uma fração de segundo a cada ~14s, mostram fatias horizontais do texto deslocadas pros lados em vermelho e ciano (aberração cromática), como se o sinal falhasse por um instante. Pra ajustar a frequência, é só mexer nas porcentagens dos `@keyframes glitch-tear-1` e `glitch-tear-2`: janelas mais espaçadas = glitch mais raro.

---

## 🏳️‍🌈 8. Temas de cores e bandeiras

No canto superior direito da tela tem um seletor 🎨. É a maior novidade do projeto: agora dá pra trocar a cor inteira da chuva, não só o verde clássico.

### Como funciona

- 🌈 Cada tema (`THEMES`, no topo do [`script.js`](../script.js)) é uma lista de cores.
- 📏 A cor de cada caractere é escolhida pela **altura dele na tela** (`colorForY(y)`): a tela é dividida em faixas horizontais, uma pra cada cor do tema. É por isso que a chuva forma listras horizontais coloridas, como as faixas de uma bandeira, em vez de virar uma bagunça de cor aleatória.
- 💾 A escolha fica salva no navegador (`localStorage`), então na próxima vez que você abrir a página o tema continua o mesmo.
- 🟢 **Padrão**: verde clássico da Matrix. Sempre vai ser essa a cor de quem abre o arquivo pela primeira vez.
- 🎲 **Aleatório**: sorteia um tema novo (incluindo as bandeiras) a cada reload da página.

### Temas disponíveis

| Tema | Cores |
|---|---|
| 🟢 Matrix Clássico | Verde `#00ff41`, o original |
| 1️⃣ Matrix Binário | Verde `#00ff41`, igual ao Matrix Clássico, mas com o alfabeto trocado (ver abaixo) |
| 🏳️‍🌈 LGBTQIA+ Pride | Vermelho, laranja, amarelo, verde, azul, roxo, rosa choque |
| 🏳️‍⚧️ Trans | Azul claro, rosa, branco, rosa, azul claro |
| 💗 Bissexual | Rosa/magenta, roxo, azul |
| 🧡 Lésbica | Laranja, laranja claro, branco, rosa, magenta escuro |
| 💛 Pansexual | Rosa, amarelo, azul |
| 💜 Não-binárie | Amarelo, branco, roxo, preto |
| 🖤 Assexual | Preto, cinza, branco, roxo |

Quer adicionar outro tema? É só entrar no objeto `THEMES` em [`script.js`](../script.js) e criar uma nova entrada com `colors` (a lista de cores da faixa) e `accent` (a cor usada no brilho do painel e do seletor), depois adicionar a `<option>` correspondente no [`index.html`](../index.html). 🖌️

### Tema com alfabeto próprio (Matrix Binário)

Todos os outros temas só mudam a **cor** da chuva, o alfabeto (katakana + latim + números, com os pesos da seção 9) continua igual. O Matrix Binário quebra essa regra: ele define seu próprio conjunto de caracteres, só `0` e `1`, uma homenagem mais direta à computação. Por isso ele fica logo depois do Matrix Clássico na lista, não junto das bandeiras, é uma variação do tema original, não uma identidade.

Isso funciona porque `THEMES.binary` tem uma propriedade extra, `chars`:

```js
binary: { colors: ['#00ff41'], accent: '#00ff41', chars: ['0', '1'] },
```

E o sorteio de caractere passou a checar isso primeiro:

```js
function pickChar() {
  if (activeTheme.chars) {
    return activeTheme.chars[Math.floor(Math.random() * activeTheme.chars.length)];
  }
  return pickWeightedChar();
}
```

Se o tema ativo tiver `chars`, sorteia direto dali (uniforme, sem peso). Se não tiver (todos os outros temas), cai no sorteio ponderado padrão da seção 9. Quer criar outro tema com alfabeto próprio? É só adicionar `chars: [...]` na entrada dele em `THEMES`, funciona automaticamente.

### Agrupando visualmente o seletor

Com o Matrix Binário e as bandeiras convivendo na mesma lista, fazia sentido separar visualmente "as duas variações do Matrix" (Clássico e Binário) das bandeiras LGBTQIA+ ali embaixo. O HTML tem uma tag feita pra isso, `<optgroup>`, mas na prática ela tem suporte muito ruim a customização entre navegadores: `background-color` simplesmente não pega em vários deles (Firefox nem aceita), então o cabeçalho do grupo acaba aparecendo com fundo branco padrão do navegador, destoando total do resto da página escura.

A solução foi usar um `<option disabled>` como cabeçalho "fake" em vez de `<optgroup>`:

```html
<option disabled>Bandeiras LGBTQIA+</option>
<option value="rainbow">🏳️‍🌈 LGBTQIA+ Pride</option>
...
```

Como é um `<option>` normal (só que desabilitado, então não clicável), ele aceita nosso `background: #000` normalmente, igual qualquer outra opção. A cor do texto e o negrito que tentamos aplicar não pegam em todo navegador (o navegador força a aparência de opção desabilitada por cima), mas isso é só um detalhe estético a mais, o fundo preto já resolve o problema principal de não destoar. Como esse `<option>` não tem `value`, ele nunca aparece nas buscas por tema (`splitOptionLabel`), então não precisa de nenhum tratamento especial no JavaScript.

**Recuo dos itens agrupados**: só o cabeçalho não bastava pra deixar claro visualmente que os temas ali embaixo "pertencem" àquele grupo. `padding-left` em `<option>` sofre do mesmo problema de suporte instável que vimos com `<optgroup>`, então o recuo é feito direto no texto, com dois espaços especiais (`&nbsp;`, non-breaking space) antes do emoji:

```html
<option value="rainbow">&nbsp;&nbsp;🏳️‍🌈 LGBTQIA+ Pride</option>
```

Espaço normal em HTML é "colapsado" (o navegador ignora espaços repetidos), mas `&nbsp;` nunca é, por isso ele funciona pra indentação onde um espaço comum não funcionaria. Isso criou um efeito colateral: a opção selecionada guarda esse recuo no `textContent`, e o texto que aparece no select **fechado** (`splitOptionLabel`) usava esse texto direto, então o recuo vazava pro rótulo fechado também, feio. A correção foi dar um `.trim()` no texto antes de separar emoji e nome, removendo o recuo só nesse rótulo, sem tocar no texto original da opção (que continua recuado dentro da lista).

**Linha divisória antes do grupo**: como `border` em `<option>` também não é confiável entre navegadores (só `background-color` e `color` realmente funcionam ali), uma linha de verdade não dava. A alternativa foi simular com um caractere de desenho de linha (`─`, box drawing, diferente do travessão `—`) repetido numa opção desabilitada:

```html
<option disabled>──────────────────</option>
<option disabled>Bandeiras LGBTQIA+</option>
```

Por ser texto puro, funciona igual em qualquer navegador, sem depender de nenhuma propriedade CSS instável.

---

## 🧮 9. A matemática por trás da chuva

Prometido: aqui está o "por dentro" das contas. Nada muito avançado, é basicamente geometria de grid, probabilidade simples e uma conta de frames por segundo, mas junto é o que faz o efeito inteiro funcionar.

### A matriz (literalmente)

Curiosidade antes de entrar nas contas: **matriz**, em matemática, é justamente o nome de um arranjo de números organizado em linhas e colunas. O nome do filme brinca com isso (a "realidade simulada" e o "arranjo matemático" ao mesmo tempo), e o código deste projeto é estruturado exatamente assim:

- `columns = Math.floor(width / fontSize)`: divide a largura da tela pelo tamanho da fonte e arredonda pra baixo, isso dá quantas colunas cabem lado a lado.
- `drops` é um array com uma posição pra cada coluna da tela, ou seja, uma matriz **1×N** (uma linha só, com N colunas, sendo N o valor de `columns`). Cada `drops[i]` guarda, pra coluna `i`, não uma posição em pixel, mas um **índice de linha** (tipo "essa coluna está na linha 42").
- Pra desenhar, essa linha vira pixel: `y = drops[i] * fontSize` (linha vezes altura da célula) e `x = i * fontSize` (coluna vezes largura da célula). Essa multiplicação é a ponte entre "posição na matriz" (linha/coluna, números pequenos e abstratos) e "posição na tela" (pixels, números grandes e concretos).
- 🖼️ Visualmente, porém, essa matriz 1×N vira algo maior na tela: o canvas comporta um grid completo de **N colunas por M linhas**, sendo `N = columns` e `M = Math.floor(height / fontSize)` (quantas linhas de caracteres cabem verticalmente, calculado do mesmo jeito que `columns`, só que com a altura no lugar da largura). `drops` guarda apenas qual linha está "acesa" em cada coluna naquele instante, mas o grid inteiro onde os caracteres podem aparecer é N×M, não N×N, a não ser que a tela seja quadrada (`width = height`). Numa tela widescreen comum, M costuma ser menor que N.

### Os `Math.random()`

`Math.random()` sempre devolve um decimal entre 0 (incluso) e 1 (quase incluso, nunca chega a 1). Isso é usado de jeitos diferentes em seis lugares do código:

| Onde | Código | O que faz |
|---|---|---|
| Caractere de cada frame | `pickWeightedChar()` (dois `Math.random()` em sequência) | Primeiro sorteia **qual grupo** (katakana, latim ou números) usando os pesos de `PESO_KATAKANA`/`PESO_LATIM`/`PESO_NUMEROS`, depois sorteia um símbolo dentro daquele grupo com a mesma fórmula de índice de sempre. Ver detalhe abaixo |
| Linha inicial de cada coluna | `Math.floor((Math.random() * height) / fontSize) * -1` | Sorteia uma posição vertical aleatória (negativa, acima da tela), pra cada coluna começar a cair num momento diferente. É o que faz a chuva parecer assíncrona desde o primeiro frame |
| Cor de faísca | `Math.random() < CHANCE_FAISCA` (0.02) | Como `Math.random()` é uniforme entre 0 e 1, a chance de o resultado ser menor que 0.02 é exatamente 2%. É assim que se sorteia uma probabilidade a partir de um número contínuo |
| Reinício da coluna | `Math.random() > 0.975` | Mesma lógica, só que ao contrário: 2,5% de chance por frame. Sem isso, todas as colunas reiniciariam no exato instante em que saem da tela, criando um padrão repetitivo visível. Com a chance, cada coluna "hesita" um tempo aleatório antes de voltar pro topo |
| Tema aleatório | `themeKeys[Math.floor(Math.random() * themeKeys.length)]` | Mesma fórmula do caractere, mas sorteando entre os temas disponíveis |
| Frase aleatória | `quotes[Math.floor(Math.random() * quotes.length)]` | Mesma fórmula, sorteando entre as falas do filme |

O padrão se repete: **índice aleatório** é sempre `Math.floor(Math.random() * tamanho_da_lista)`, e **probabilidade** é sempre `Math.random() < chance_desejada`.

### Por que o caractere tem um sorteio em duas etapas

No começo, cada caractere era sorteado de um único array só (`katakana + latin + numbers` grudados), com todos os símbolos tendo a mesma chance. Isso deixava letras A-Z aparecendo quase 22% das vezes, mais do que o efeito original do filme, onde a katakana domina claramente.

A correção não foi diminuir o alfabeto latino (isso perderia variedade), foi separar em três grupos e sortear com pesos fixos: **80% katakana, 7% latim, 13% números** (`gruposDeCaracteres`, no topo do [`script.js`](../script.js)). Assim o alfabeto latino continua completo (todas as 26 letras podem aparecer), só que raramente, exatamente como no filme original.

### Os tempos

`setInterval(draw, 33)` chama `draw()` a cada 33 milissegundos. Fazendo a conta: `1000ms ÷ 33ms ≈ 30.3`, ou seja, ~30 quadros por segundo.

`VELOCIDADE_QUEDA` (hoje, `0.5`) é a fração de linha que a coluna deveria avançar por frame, em média. Como cada linha equivale a `fontSize` pixels (hoje, 20px), dá pra calcular a velocidade real de queda:

```
20px por linha × 0.5 linha por frame × 30 frames por segundo = 300px por segundo
```

Ou seja, cada gota cai a uma velocidade constante de aproximadamente 300 pixels por segundo (a metade do que era antes de existir o `VELOCIDADE_QUEDA`), não importa o tamanho da tela. `1` volta pro comportamento de antes desta constante existir (a issue #2 pediu justamente pra diminuir isso), valores menores deixam mais lenta, maiores que `1` deixam mais rápida do que estava. Não é uma medida da velocidade real do efeito no filme, é só a linha de base do nosso próprio código antes desse ajuste.

**Detalhe que quebrou na primeira tentativa**: somar `VELOCIDADE_QUEDA` (0.5) direto em `drops[i]` parece óbvio, mas isso faz `y = drops[i] * fontSize` cair fora dos múltiplos de `fontSize` (ex: 10px, 30px, 50px em vez de 0px, 20px, 40px). Como cada caractere de 20px precisa de quase esse espaço todo pra não encostar no vizinho, dois caracteres desenhados a só 10px de distância ficam visualmente sobrepostos. A correção foi separar duas coisas:

- **A posição (`drops[i]`) sempre pula um `fontSize` inteiro por vez**, nunca fração, então nunca sobrepõe.
- **Quantos frames esperar antes de dar esse pulo** é controlado por um acumulador:

```js
acumuladorQueda += VELOCIDADE_QUEDA;       // ex: 0.5, 1.0, 1.5, 2.0...
const linhasParaAvancar = Math.floor(acumuladorQueda); // 0, 0, 1, 0, 1...
acumuladorQueda -= linhasParaAvancar;      // guarda o resto pro próximo frame
drops[i] += linhasParaAvancar;             // sempre inteiro
```

Com `VELOCIDADE_QUEDA = 0.5`, isso avança uma linha inteira a cada 2 frames (metade da frequência, mas o pulo continua do tamanho certo), em vez de meia linha a cada frame (frequência igual, pulo errado).

**Segundo detalhe que quebrou**: mesmo com a posição corrigida, o caractere de cada coluna ainda era sorteado de novo (`pickWeightedChar()`) em **todo** frame, mesmo nos frames em que a linha não muda. Como o esmaecimento (`COR_RASTRO`) é só 5% de opacidade, dois símbolos diferentes desenhados na mesma posição em frames consecutivos (33ms de diferença) criavam um efeito de "fantasma"/duplicação temporária. A correção: `currentChars[i]` guarda o caractere atual de cada coluna, e só é sorteado de novo quando a coluna realmente muda de linha (avança ou reinicia no topo). Enquanto está "esperando" pra avançar, o mesmo símbolo é redesenhado no lugar, sem trocar.

---

## 💾 10. Baixando a chuva em PNG

No canto inferior direito tem o botão **⬇️ Baixar PNG**. Clicar nele expande um painel com três switches e um botão de confirmação, ao invés de baixar na hora:

| Switch | Padrão | Editável? |
|---|---|---|
| Incluir chuva (fundo) | Ligado | Não, é travado ligado, é o conteúdo principal da imagem |
| Incluir título | Ligado | Sim |
| Incluir frase aleatória | Ligado | Sim |

Com os três ligados (padrão), o PNG sai igual ao que você vê na tela: chuva, painel com o "wake up..." e a frase do momento. Desligando título e/ou frase, o PNG sai só com a chuva, sem nenhum texto por cima, uma opção "limpa" pra quem quiser usar como papel de parede sem o painel no meio.

### Como funciona

- 📸 **A chuva sempre é captura direta**: `canvas.toDataURL('image/png')` transforma o que está desenhado no `<canvas>` naquele exato momento num arquivo PNG. Não é um novo desenho gerado na hora, é literalmente uma foto do que você estava vendo. Isso vale pro fundo em qualquer combinação de switches.
- 🖋️ **Título e frase são redesenhados à mão, só na hora do download**: eles normalmente não fazem parte do canvas (são o `.hud` em HTML/CSS, por cima). Quando pelo menos um dos dois switches está ligado, o código copia o desenho da chuva pra um canvas temporário e pinta ali, com Canvas2D puro (`fillText`, `roundRect`), um painel parecido com o `.hud` da tela: mesma cor de destaque do tema, mesmo fundo translúcido, mesma borda com glow. Efeitos que só existem em CSS (blur, scanlines, glitch) não são replicados, já que fazem sentido numa animação ao vivo, não numa imagem parada.
- 🔍 **Qualidade**: o canvas é desenhado na resolução física da tela (`devicePixelRatio`), não só no tamanho em pixels CSS da janela. Numa tela de alta densidade (a maioria dos notebooks e celulares modernos), isso evita que o PNG baixado saia borrado.
- 🏷️ **Nome do arquivo**: sai como `matrix-rain-<tema>-<data>.png`, por exemplo `matrix-rain-trans-2026-08-09.png`, pra você já saber qual tema estava ativo quando salvou, independente dos switches escolhidos.

### Por que não é feito num canvas separado, maior

Dava pra desenhar tudo de novo num canvas escondido, numa resolução fixa tipo 4K, só pra ter um arquivo enorme garantido. Mas isso geraria um frame **novo**, com caracteres e posições diferentes dos que você viu na tela, o que contradiz a ideia original: baixar a arte exatamente como ela apareceu naquele momento único. Por isso o fundo é sempre uma cópia do canvas visível mesmo, e só o painel de texto (opcional) é desenhado por cima dessa cópia.

---

## ✅ 11. Checklist final

- [ ] Abri o `index.html` no navegador 🌐
- [ ] Vi a chuva verde caindo com katakana + letras + números 🌧️🔤
- [ ] Testei mudar velocidade e tamanho da fonte 🎛️
- [ ] Vi o painel neon com scanlines e o glitch no título 📺🐛
- [ ] Troquei o tema no seletor 🎨 e vi as faixas coloridas tipo bandeira 🏳️‍🌈
- [ ] Baixei um PNG da chuva 💾, testei com e sem título/frase nos switches
- [ ] Aceitei que não existe colher 🥄 (brincadeira, existe sim, é o `<canvas>`)

Divirta-se dentro da Matrix! 💊🟩

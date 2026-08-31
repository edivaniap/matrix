# Documento de Visão: Matrix Digital Rain

| |                                          |
|---|------------------------------------------|
| **Projeto** | Matrix Digital Rain                      |
| **Tipo** | Página web estática (HTML/CSS/JS puro)   |
| **Autoria** | Edivânia Pontes <edivania.dev@gmail.com> |
| **Última atualização** | 2026-08-09                               |
| **Status** | Em desenvolvimento ativo                 |

---

## 1. Propósito do documento

Este documento registra a visão geral do projeto: por que ele existe, o que já foi construído, quais decisões de engenharia foram tomadas e por quê, e onde ele pode crescer. Ele é o complemento "de arquitetura e intenção" do [`GUIA.md`](GUIA.md), que cobre o lado "como usar e curiosidades".

A ideia é este arquivo crescer junto com o projeto: cada nova funcionalidade relevante ganha uma entrada aqui antes ou depois de ser implementada, então ele funciona tanto como guia de decisão quanto como registro histórico.

## 2. Visão geral do produto

Uma página única que recria o efeito de "chuva digital" dos créditos originais de *The Matrix* (1999) usando `<canvas>`, com um conjunto de camadas extras que vão além da réplica simples:

- Painel central com título e frase, estilizado como um monitor CRT antigo (scanlines, glitch horizontal, glow neon).
- Frase aleatória a cada carregamento, sorteada entre falas icônicas do filme.
- Sistema de temas de cores, incluindo o verde clássico e paletas de bandeiras do movimento LGBTQIA+, renderizadas como faixas horizontais que a chuva atravessa.
- Preferência de tema persistida no navegador.

Vale registrar o que dá sentido pessoal a esse conjunto: o projeto une três paixões que normalmente não se cruzam, cinema, código e orgulho LGBTQIA+, numa peça só. Essa união tem uma qualidade poética, não porque o projeto seja um poema, mas porque, como qualquer coisa poética, ela pode tocar cada pessoa que a encontra de um jeito diferente, dependendo do que essa pessoa traz consigo. Alguém pode ver só um efeito visual bem feito; outra pessoa pode se reconhecer nas cores de uma bandeira caindo na tela junto com o "wake up..." do filme. O código por trás é o mesmo para todo mundo, mas o que ele desperta muda de quem olha, e é isso, no fundo, que se espera de algo poético.

Essa leitura não é só interpretação pessoal aplicada de fora: em 2020, Lilly Wachowski, uma das diretoras do filme (mulher trans), confirmou publicamente que *Matrix* foi concebido desde o início como uma alegoria da experiência trans, o aviso de Morpheus sobre uma "farpa na mente" como metáfora da disforia de gênero, a pílula vermelha ligada simbolicamente a hormônios, e o ato de "acordar" como a descoberta de uma verdade que o mundo ao redor insistia em negar (fonte: [PinkNews, 2020](https://www.thepinknews.com/2020/08/05/lilly-lana-wachowski-the-matrix-trans-experience-transgender-gender-dysphoria-red-pill/)). Essa mesma estrutura, nascer dentro de uma sociedade que afirma o contrário sobre a própria existência e precisar descobrir e assumir uma verdade que sempre esteve ali, ressoa com a experiência de qualquer pessoa LGBTQIA+, não só a trans. Por isso o sistema de temas com bandeiras (seção 6, RF02/RF03) não é um adendo estético ao projeto: é uma continuação de um sentido que o próprio filme já carregava antes de qualquer linha deste código existir.

## 3. Problema / motivação

Não existe um problema de negócio por trás deste projeto: a motivação é criativa e de aprendizado, exercitar HTML/CSS/JS puro (sem framework, sem build step) construindo algo visualmente satisfatório, e ao mesmo tempo praticar organização de projeto, documentação e decisões de engenharia mesmo em escala pequena.

## 4. Declaração de posicionamento

> Para quem quer uma tela de fundo/tributo nostálgico ao filme *The Matrix*, o **Matrix Digital Rain** é uma página estática e sem dependências que recria o efeito de chuva de código com fidelidade ao original (katakana real, ritmo de animação, estética) e adiciona camadas de identidade e personalização (temas de cores, easter eggs) que a réplica "padrão" encontrada por aí normalmente não tem.
>
> Diferente de implementações genéricas de "matrix rain" disponíveis em tutoriais, este projeto documenta as próprias decisões de design (por que katakana, por que aquela paleta, por que aquele efeito de glitch) e é pensado para ser estendido, não só copiado.

## 5. Stakeholders e usuários

| Papel | Interesse |
|---|---|
| Autora/desenvolvedora | Aprender e praticar engenharia de software em um projeto pequeno e prazeroso; incrementar portfólio |
| Visitante da página | Ver o efeito, ler as referências ao filme, opcionalmente trocar o tema de cor |
| Leitor da documentação | Entender as decisões técnicas por trás do projeto (recrutador, colega, o "eu" do futuro) |

## 6. Requisitos funcionais

Descrevem o que o sistema faz. Prioridade em escala Essencial / Importante / Desejável. Status reflete o estado no momento desta versão do documento.

| ID | Descrição | Prioridade | Status |
|---|---|---|---|
| RF01 | Renderizar a chuva digital animada em `<canvas>`, usando alfabeto misto (katakana de meia largura, letras latinas, números), a aproximadamente 30fps, com efeito de rastro esmaecido em vez de limpeza total do quadro a cada frame. | Essencial | Implementado |
| RF02 | Permitir a troca do tema de cores da chuva entre paletas predefinidas, através de um seletor visível na tela. | Essencial | Implementado |
| RF03 | Colorir cada caractere de acordo com sua posição vertical (Y) na tela, formando faixas horizontais que representam a paleta do tema ativo (efeito "bandeira"). | Essencial | Implementado |
| RF04 | Oferecer um modo "Aleatório" que sorteia um tema concreto a cada carregamento da página. | Importante | Implementado |
| RF05 | Persistir a preferência de tema do usuário entre sessões, sobrevivendo a reloads e ao fechamento do navegador. | Importante | Implementado |
| RF06 | Exibir, no estado fechado do seletor de tema, um rótulo dinâmico que reflete o tema realmente ativo (inclusive quando resolvido a partir do modo Aleatório), sem alterar o texto das opções da lista suspensa. | Desejável | Implementado |
| RF07 | Exibir um painel central (HUD) com título e frase, legível sobre a chuva em qualquer tema ativo. | Essencial | Implementado |
| RF08 | Sortear uma frase, entre um conjunto de falas icônicas do filme, a cada carregamento da página. | Desejável | Implementado |
| RF09 | Aplicar efeitos visuais de "monitor antigo" no painel: varredura de scanlines contínua e glitch horizontal periódico no título. | Desejável | Implementado |
| RF10 | Disponibilizar documentação de uso (`GUIA.md`) e de visão de produto (este documento) junto ao código-fonte. | Importante | Implementado |
| RF11 | Permitir o download, em PNG, do frame da chuva exatamente como renderizado no momento do clique (tema e posições aleatórias daquele instante). O seletor de tema nunca aparece na imagem. | Importante | Implementado |
| RF12 | Permitir escolher, antes do download, se o painel de título e o de frase aleatória entram na imagem exportada, via switches num painel expansível; a chuva de fundo é sempre incluída. | Importante | Implementado |
| RF13 | Sortear o caractere de cada posição da chuva por grupo com peso fixo (katakana, latim, números), em vez de peso uniforme entre todos os símbolos, pra manter a katakana como maioria visual, fiel ao efeito original. | Importante | Implementado |
| RF14 | Permitir ajustar a velocidade de queda das colunas de forma independente do fps geral da animação. | Importante | Implementado |
| RF15 | Oferecer um tema (Matrix Binário) cuja chuva usa exclusivamente os caracteres `0` e `1`, em homenagem à computação, mantendo os demais temas com o alfabeto padrão (katakana/latim/números). | Desejável | Implementado |

## 7. Requisitos não funcionais

Descrevem como o sistema deve se comportar (qualidade, restrições, atributos transversais).

| ID | Categoria | Descrição | Status |
|---|---|---|---|
| RNF01 | Desempenho | Manter a animação da chuva a aproximadamente 30fps de forma estável, replicando o ritmo dos créditos originais do filme. | Implementado |
| RNF02 | Portabilidade | Funcionar sem alteração de código tanto em execução local (`file://`) quanto hospedado em servidor estático (ex: GitHub Pages). | Implementado; ver seção 8 |
| RNF03 | Independência de infraestrutura | Não depender de backend, etapa de build ou bibliotecas/frameworks externos. | Implementado |
| RNF04 | Compatibilidade | Funcionar em navegadores modernos com suporte a Canvas2D, `backdrop-filter`, variáveis CSS (`--custom-property`) e `clip-path`. | Implementado |
| RNF05 | Usabilidade / legibilidade | Garantir contraste suficiente entre o painel HUD e a chuva ao fundo, em qualquer tema ativo. | Implementado |
| RNF06 | Consistência de dados | A escolha manual de tema deve sobreviver a reload; apenas o modo Aleatório varia o resultado entre carregamentos. | Implementado |
| RNF07 | Acessibilidade | O seletor de tema deve continuar navegável por teclado e compreensível por leitor de tela, mesmo com o rótulo visual customizado por cima do `<select>` nativo. | Implementado |
| RNF08 | Isolamento de armazenamento | A chave usada no `localStorage` deve ser específica o suficiente para não colidir com a de outros projetos eventualmente hospedados sob a mesma origem (relevante ao publicar este projeto como parte de um portfólio com múltiplos projetos no mesmo domínio). | Atenção; ver seção 8 |
| RNF09 | Idioma e convenção de escrita | Conteúdo e documentação em português do Brasil, sem uso de travessão (regra definida em `CLAUDE.md`). | Implementado |
| RNF10 | Qualidade de exportação | O PNG baixado deve refletir a densidade de pixels física da tela (`devicePixelRatio`), não só o tamanho em pixels CSS da janela, pra servir como papel de parede sem ficar borrado. | Implementado |

## 8. Observações sobre implantação (deploy)

Contexto: o plano é publicar este projeto como parte de um portfólio pessoal hospedado no GitHub Pages (plano gratuito).

- **Funcionamento geral (RNF02)**: GitHub Pages serve arquivos estáticos via HTTPS. Como o projeto não tem backend nem build step, o deploy é literalmente subir os arquivos, sem nenhuma adaptação de código necessária.
- **`localStorage` após o deploy**: `localStorage` é isolado por origem (protocolo + domínio + porta). Hoje, rodando via `file://`, o comportamento de origem varia entre navegadores, o que já causou um bug real neste projeto (o navegador restaurando sozinho o último valor do seletor de tema, corrigido com `autocomplete="off"`). No GitHub Pages, a origem passa a ser fixa e estável (`usuario.github.io` ou `usuario.github.io/repositorio/`), então o comportamento do `localStorage` fica mais previsível do que em desenvolvimento local, não menos.
- **Risco de colisão de chave (RNF08)**: a origem considera domínio, não o caminho. Se o portfólio publicar vários projetos sob `usuario.github.io/*`, todos compartilham o mesmo espaço de `localStorage` do navegador de quem visita. A chave atual (`matrixTheme`) já reduz bastante o risco por ser específica, mas o ideal, ao consolidar o portfólio, é namespacear as chaves de cada projeto (por exemplo `matrix-digital-rain:theme`) para eliminar de vez a possibilidade de colisão com chaves genéricas de outros projetos futuros.
- **Nenhuma configuração adicional é necessária no GitHub Pages** para o `localStorage` funcionar: é um recurso inteiramente do navegador, não depende de servidor.

## 9. Fora de escopo (por decisão de design)

- **Sem framework e sem build step**: o projeto roda abrindo o `index.html` direto no navegador. Isso é intencional, não uma limitação a resolver.
- **Sem dependências externas**: nenhuma biblioteca, CDN ou pacote. Tudo em HTML/CSS/JS puro. (Em avaliação: uma contagem de visitantes, ver seção 11, exigiria abrir uma exceção pontual a este item.)
- **Sem backend**: toda a persistência é local (`localStorage`), não existe servidor, conta de usuário ou sincronização entre dispositivos.
- **Não é um componente reutilizável/publicável como lib** (por enquanto). Se isso mudar, vira uma decisão nova, registrada aqui.

## 10. Glossário

| Termo | Significado |
|---|---|
| Digital rain | O efeito de "chuva de código" dos créditos do filme *The Matrix* |
| Katakana | Um dos alfabetos silábicos japoneses; aqui, usado na variante de meia largura (半角), igual ao efeito original |
| Banding por Y | Técnica usada no projeto de colorir cada caractere de acordo com sua posição vertical na tela, formando faixas horizontais |
| HUD | O painel central com título e frase, sobreposto à chuva |
| Accent | Cor de destaque de um tema, usada em bordas, glow e texto do painel |

## 11. Backlog / próximas funcionalidades

> Espaço reservado para as próximas ideias. Adicionar aqui conforme forem surgindo, com uma linha de contexto sobre o porquê, pra manter o mesmo padrão de decisão registrada usado no resto do documento.

- [ ] **Contagem de acessos/visitantes**: opções levantadas e comparadas em [`VISITANTES.md`](VISITANTES.md). Inclinação inicial por um serviço de analytics (GoatCounter como favorito por ser gratuito, sem backend próprio e sem fricção de LGPD), em vez de um badge simples de contador. Decisão ainda não tomada; ao decidir, atualizar a seção 9 (fora de escopo) e criar um RF/RNF novo aqui.
- [x] ~~Botão de download da chuva em PNG~~: implementado como RF11. Opções e tradeoffs originais em [`DOWNLOAD.md`](DOWNLOAD.md).
- [ ] **Download em vídeo (fase 2 do download)**: continua pendente, é a parte reconhecidamente mais difícil (gravação via `MediaRecorder` + `captureStream`, formato WebM, uso em live wallpapers do Windows). Ver [`DOWNLOAD.md`](DOWNLOAD.md). Decisão ainda não tomada; ao decidir, criar o RF correspondente na seção 6.

## 12. Histórico de decisões relevantes

| Decisão | Motivo |
|---|---|
| Cor por altura (Y) em vez de cor aleatória por caractere | Faz os temas de bandeira serem reconhecíveis como faixas, em vez de virarem ruído colorido |
| Tema padrão fixo em "Matrix Clássico" | Preserva a identidade original do efeito para quem abre a página pela primeira vez; "Aleatório" fica como opção explícita, não como padrão |
| Overlay de texto sobre o `<select>` em vez de dropdown 100% customizado | Mantém a acessibilidade e o comportamento nativo do `<select>`, resolvendo a necessidade de um texto "fechado" diferente do texto da lista com o mínimo de código |
| `autocomplete="off"` no seletor de tema | O navegador restaura automaticamente o último valor de formulário ao recarregar a página, o que conflitava com a lógica própria de persistência via `localStorage` |
| Painel translúcido com blur em vez de texto solto sobre o canvas | Legibilidade do título/frase sem esconder a chuva atrás |
| Documento de visão formalizado em RF/RNF numerados | Alinhar o documento a uma prática padrão de engenharia de software, facilitando rastrear prioridade e status de cada requisito conforme o projeto cresce |
| `matrixTheme` mantido por enquanto, mas sinalizado como item de atenção (RNF08) em vez de renomeado direto | O projeto vai ser publicado como parte de um portfólio maior; renomear a chave é seguro e barato, mas é uma decisão de nomenclatura que vale confirmar antes de aplicar |
| Tamanho da caixinha do seletor de tema definido pelo `.select-label` (texto real, no fluxo normal), com o `<select>` virando uma camada invisível por cima só pra capturar clique | O rótulo dinâmico do modo Aleatório (ex: "Aleatório: Bissexual") é maior que qualquer opção fixa da lista; deixar o `<select>` nativo definir o tamanho da caixa cortava esse texto |
| PNG capturado direto do canvas visível (`canvas.toDataURL`), em vez de renderizado de novo num canvas separado em resolução fixa | O pedido original era baixar "o desenho exatamente como foi renderizado naquele momento"; recriar o desenho numa resolução diferente geraria um frame novo, com caracteres e posições diferentes, perdendo justamente esse instante único |
| Título e frase (RF12) desenhados com Canvas2D puro (`fillText`, `roundRect`) num canvas temporário, em vez de alguma técnica de capturar o `.hud` (DOM) diretamente | Manter RNF03 (sem dependências externas); bibliotecas tipo html2canvas resolveriam isso, mas trariam peso e complexidade só pra replicar um painel simples que já sabemos desenhar à mão |
| Peso fixo por grupo de caractere (RF13), com o alfabeto latino completo mantido, em vez de simplesmente reduzir o tamanho do array de letras disponíveis | Reduzir o array (ex: manter só `EPXYZ`) muda a proporção como efeito colateral do tamanho do pool, sem controle direto sobre a porcentagem, e perde variedade das letras que sobram; pesos explícitos (80% katakana, 7% latim, 13% números) dão controle direto e documentável, sem abrir mão do alfabeto completo |
| Velocidade de queda (RF14) controlada por um acumulador (`acumuladorQueda`), que só libera avanços em linhas inteiras, em vez de aumentar o intervalo do `setInterval` | Mudar o `setInterval` deixaria a queda mais lenta, mas também deixaria o "flicker" dos caracteres mais lento e a animação como um todo mais travada; desacoplar os dois preserva o fps geral (RNF01) e ajusta só a velocidade percebida da chuva |
| Acumulador de linha inteira em vez de somar `VELOCIDADE_QUEDA` direto em `drops[i]` | A primeira versão (soma fracionária direta) tirava `y = drops[i] * fontSize` dos múltiplos de `fontSize`, fazendo caracteres consecutivos serem desenhados a menos de um `fontSize` de distância e aparecerem sobrepostos visualmente; o acumulador garante que a posição só avança em saltos de linha inteira, mudando apenas a frequência desses saltos |
| Caractere de cada coluna (`currentChars[i]`) só é sorteado de novo quando a linha muda, em vez de a cada frame | Com velocidade menor que 1, a mesma linha fica parada por mais de um frame; sortear caractere novo em cada frame mesmo parado desenhava símbolos diferentes na mesma posição em frames consecutivos, criando um efeito de duplicação/fantasma perceptível a olho nu |
| Alfabeto do tema Matrix Binário (RF15) definido como propriedade opcional `chars` dentro do próprio tema em `THEMES`, com `pickChar()` decidindo entre alfabeto do tema ou o sorteio ponderado padrão | Reaproveita a estrutura de temas que já existe (RF02/RF03) em vez de criar um sistema paralelo só pra esse caso; qualquer tema futuro pode ganhar alfabeto próprio só adicionando `chars`, sem mexer no restante do código |
| Switch "Incluir chuva (fundo)" sempre travado ligado, em vez de omitido da interface | Deixa explícito pro usuário que a chuva é o conteúdo obrigatório da imagem (não faria sentido baixar um PNG só com o painel), mantendo os três switches visualmente consistentes entre si |
| Canvas redimensionado pelo `devicePixelRatio` (`RNF10`) em vez de só pelo tamanho da janela | Resolve a qualidade do PNG sem contradizer a decisão acima: mesma imagem, mesmo instante, só desenhada na densidade de pixels real da tela em vez da resolução lógica em CSS |
| Painel HUD e seletor de tema ficam fora do PNG baixado sem nenhum código extra pra isso | Eles são elementos HTML/CSS por cima do canvas, nunca fizeram parte do desenho; capturar só o canvas já exclui a UI naturalmente |

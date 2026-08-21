# Download da chuva (imagem e vídeo): opções

Registro da ideia de um botão de download. A fase 1 (PNG) já foi implementada, ver seção "Estado atual". A fase 2 (vídeo) segue como registro de opções para decisão futura.

## O que foi pedido

Um botão que baixa o desenho da chuva **exatamente como ele está naquele momento** (tema e posições dos caracteres, já que tudo é aleatório) em boa qualidade, pra virar papel de parede ou protetor de tela. Como cada captura é única, a pessoa pode gerar e guardar várias versões diferentes. A ideia central: a interação vira algo que a pessoa "leva com ela", quase um presente.

Ideia estendida, já reconhecida como mais difícil: baixar em vídeo, pra usar em live wallpapers do Windows.

## Parte 1: download em PNG (implementado ✅)

O canvas (`#matrix`) é onde a chuva é desenhada; o painel HUD e o seletor de tema são elementos HTML/CSS por cima, não fazem parte do desenho. Capturar só o canvas com `canvas.toDataURL('image/png')` naturalmente exclui a UI da imagem baixada, sem esforço extra.

Das duas abordagens de qualidade que estavam em aberto, a escolhida foi **capturar o canvas como está na tela**, não renderizar de novo num canvas separado em resolução fixa. Motivo: o pedido original era baixar "o desenho exatamente como ele está naquele momento"; renderizar de novo geraria um frame diferente (outros caracteres, outras posições), o que contradiz a proposta. Pra resolver a preocupação de qualidade sem abrir mão disso, o canvas passou a ser desenhado na resolução física da tela (`devicePixelRatio`), não só no tamanho em pixels CSS da janela, isso já cobre a maior parte do problema de "PNG borrado" sem precisar recriar o desenho.

Decisões tomadas:
- Sem opção de resolução alvo fixa nem escolha manual pelo usuário; a captura segue o `devicePixelRatio` da tela de quem clicou.
- Painel HUD e seletor de tema não aparecem na imagem (confirmado; era o resultado esperado).
- Nome do arquivo: `matrix-rain-<tema>-<data>.png`, ex. `matrix-rain-trans-2026-08-09.png`.

Detalhes completos em [`VISAO.md`](VISAO.md): RF11, RNF10, e as linhas correspondentes no histórico de decisões (seção 12).

## Parte 2: download em vídeo (mais difícil, como você já apontou)

Duas rotas técnicas possíveis:

- **Gravação no navegador com `MediaRecorder` + `canvas.captureStream()`**: grava alguns segundos da própria animação do canvas e gera um arquivo de vídeo, sem servidor. O formato nativo suportado pela grande maioria dos navegadores é **WebM**. Continua alinhado com o RNF03 do [`VISAO.md`](VISAO.md) (sem backend, sem dependência externa pesada).
- **MP4**: `MediaRecorder` não gera MP4 nativamente na maioria dos navegadores; converter exigiria uma biblioteca pesada rodando no navegador (ex: ffmpeg.wasm), o que contradiz a filosofia atual do projeto de não ter dependências externas, além de aumentar bastante o peso da página só por causa desse recurso.

Sobre live wallpaper no Windows: o sistema não aceita vídeo como papel de parede nativamente, precisa de um app de terceiros. Confirmado para o **Lively Wallpaper** (gratuito, open source): aceita WebM de boa, o player dele é baseado em libVLC/libmpv, que é bem flexível com formato de vídeo. Já para o **Wallpaper Engine** (pago, o mais popular) não há confirmação sólida de suporte a WebM: a documentação oficial destaca mais MP4/MOV/AVI, então talvez precise de conversão pra funcionar lá. Ou seja, gerar WebM já resolve pra pelo menos um app real e gratuito, mas não é garantia universal.

## Recomendação pra fase 2

Se for seguir com o vídeo: download em WebM via `MediaRecorder`, não MP4, pra manter a filosofia sem dependências do projeto.

## Onde isso entra no projeto

Esse recurso é puramente client-side (nenhuma das duas rotas de vídeo/imagem exige backend), então não força uma exceção ao RNF03 do [`VISAO.md`](VISAO.md) como a contagem de visitantes forçaria. Ao decidir a abordagem do vídeo, criar o RF correspondente na seção 6 do documento de visão.

## Estado atual

- ✅ **Fase 1 (PNG)**: implementada em 2026-08-09, incluindo a opção de escolher se título e frase entram na imagem (painel expansível com switches). Ver [`GUIA.md`](GUIA.md) (seção 10) para como usar, e [`VISAO.md`](VISAO.md) (RF11, RF12, RNF10) para os requisitos formais.
- ⏳ **Fase 2 (vídeo)**: nada implementado, segue como registro de opções para decisão futura.

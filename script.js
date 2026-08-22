const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width, height, columns, drops, fontSize, currentChars;

// Katakana (metade-largura, igual aos créditos originais do filme) + latim + números
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

// katakana domina a chuva, igual ao efeito original; latim e números aparecem
// com o alfabeto completo, só que mais raramente (pesos somam 1)
const PESO_KATAKANA = 0.80;
const PESO_LATIM = 0.07;
const PESO_NUMEROS = 0.13;

const gruposDeCaracteres = [
  { chars: katakana.split(''), peso: PESO_KATAKANA },
  { chars: latin.split(''), peso: PESO_LATIM },
  { chars: numbers.split(''), peso: PESO_NUMEROS },
];

// sorteia primeiro o grupo (pelo peso), depois um caractere dentro dele
function pickWeightedChar() {
  const r = Math.random();
  let acumulado = 0;
  for (const grupo of gruposDeCaracteres) {
    acumulado += grupo.peso;
    if (r < acumulado) {
      return grupo.chars[Math.floor(Math.random() * grupo.chars.length)];
    }
  }
  // sobra de arredondamento de ponto flutuante: cai no último grupo
  const ultimoGrupo = gruposDeCaracteres[gruposDeCaracteres.length - 1].chars;
  return ultimoGrupo[Math.floor(Math.random() * ultimoGrupo.length)];
}

const COR_RASTRO = 'rgba(0, 0, 0, 0.05)'; // preto semi-transparente que esmaece o rastro
const COR_FAISCA = '#ffffff'; // branco do caractere na ponta, mais brilhante
const CHANCE_FAISCA = 0.02; // probabilidade de um caractere sair na cor da faísca
// fração de linha avançada por frame; 1 = como era antes desta constante
// existir, menor = mais lenta. Não é somada direto em `drops[i]` (isso tirava
// a posição da "grade" de fontSize e sobrepunha caracteres visualmente); em
// vez disso, acumula em `acumuladorQueda` e só avança linha inteira quando
// o acumulado completa 1, mantendo cada caractere sempre alinhado à grade
const VELOCIDADE_QUEDA = 0.5;
let acumuladorQueda = 0;

// paleta de cada tema: as cores são lidas de cima pra baixo na tela,
// como as faixas horizontais de uma bandeira
const THEMES = {
  matrix: { colors: ['#00ff41'], accent: '#00ff41' },
  rainbow: { colors: ['#ff0000', '#ff8c00', '#ffee00', '#00c853', '#2979ff', '#8e24aa', '#ff36ab'], accent: '#ff36ab' },
  trans: { colors: ['#5bcefa', '#f5a9b8', '#ffffff', '#f5a9b8', '#5bcefa'], accent: '#f5a9b8' },
  bi: { colors: ['#d60270', '#9b4f96', '#0038a8'], accent: '#9b4f96' },
  lesbian: { colors: ['#d62900', '#ff9b55', '#ffffff', '#d461a6', '#a50062'], accent: '#d461a6' },
  pan: { colors: ['#ff218c', '#ffd800', '#21b1ff'], accent: '#ff218c' },
  nonbinary: { colors: ['#fcf434', '#ffffff', '#9c59d1', '#2c2c2c'], accent: '#9c59d1' },
  ace: { colors: ['#000000', '#a4a4a4', '#ffffff', '#810081'], accent: '#810081' },
};
const themeKeys = Object.keys(THEMES);

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

let activeTheme = THEMES.matrix;
let activeThemeKey = 'matrix';

function applyTheme(key) {
  activeThemeKey = THEMES[key] ? key : 'matrix';
  activeTheme = THEMES[activeThemeKey];
  document.documentElement.style.setProperty('--accent', activeTheme.accent);
  document.documentElement.style.setProperty('--accent-rgb', hexToRgb(activeTheme.accent));
}

function pickRandomThemeKey() {
  return themeKeys[Math.floor(Math.random() * themeKeys.length)];
}

// cor de um caractere de acordo com a altura dele na tela,
// pintando faixas horizontais como numa bandeira
function colorForY(y) {
  const colors = activeTheme.colors;
  if (colors.length === 1) return colors[0];
  const t = Math.min(0.999, Math.max(0, y / height));
  return colors[Math.floor(t * colors.length)];
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  // desenha na resolução física da tela (não só na resolução em pixels CSS),
  // pra ficar nítido em telas de alta densidade e pro PNG baixado sair com
  // boa qualidade de verdade, não só do tamanho da janela
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  fontSize = 20;
  columns = Math.floor(width / fontSize);

  // cada coluna começa numa altura aleatória (efeito de chuva assíncrona)
  drops = new Array(columns).fill(0).map(() => Math.floor((Math.random() * height) / fontSize) * -1);

  // caractere atualmente desenhado em cada coluna; só troca quando a coluna
  // muda de linha, pra não sortear um símbolo novo em cima do mesmo lugar
  currentChars = new Array(columns).fill(0).map(() => pickWeightedChar());
}

function draw() {
  // rastro esmaecido: preto semi-transparente por cima do frame anterior
  ctx.fillStyle = COR_RASTRO;
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px monospace`;

  // quantas linhas inteiras avançar neste frame (0 na maioria dos frames,
  // já que VELOCIDADE_QUEDA < 1); o resto fica acumulado pro próximo frame
  acumuladorQueda += VELOCIDADE_QUEDA;
  const linhasParaAvancar = Math.floor(acumuladorQueda);
  acumuladorQueda -= linhasParaAvancar;

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // caractere da ponta mais brilhante (branco), cauda na cor do tema
    ctx.fillStyle = Math.random() < CHANCE_FAISCA ? COR_FAISCA : colorForY(y);
    ctx.fillText(currentChars[i], x, y);

    // reinicia a coluna no topo com chance aleatória, já passando da tela
    let mudouDeLinha = linhasParaAvancar > 0;
    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
      mudouDeLinha = true;
    } else {
      drops[i] += linhasParaAvancar;
    }

    // só sorteia caractere novo quando a coluna muda de linha de verdade;
    // enquanto "espera" pra avançar, redesenha o mesmo símbolo no lugar
    if (mudouDeLinha) {
      currentChars[i] = pickWeightedChar();
    }
  }
}

// frases exibidas embaixo do título, uma sorteada a cada reload
// (ideia inspirada no shouldideploy.today, que sorteia uma resposta a cada visita)
const quotes = [
  'Siga o coelho branco 🐇',
  'Pílula vermelha ou pílula azul? 💊',
  'Não existe colher. 🥄',
  'A Matrix tem você... 👁️',
  'Acorde, Neo... 🌀',
  'Bem-vindo ao deserto do real. 🏜️',
  'Eu sei kung fu. 🥋',
  'O que é real? Como você define "real"? 🤔',
  'Toc, toc, Neo. 🚪',
  'Você já teve aquele sonho que parece tão real? 💭',
  'Livre sua mente. 🧠',
  'Nunca envie um humano pra fazer o trabalho de uma máquina. 🤖',
];

document.getElementById('quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];

// tema: fica salvo no navegador. Padrão é o verde clássico da Matrix;
// "Aleatório" sorteia um tema novo a cada reload
const STORAGE_KEY = 'matrixTheme';
const themeSelect = document.getElementById('theme-select');
const themeSelectLabel = document.getElementById('theme-select-label');
const savedTheme = localStorage.getItem(STORAGE_KEY) || 'matrix';

// pega o texto de uma <option> (ex: "🏳️‍⚧️ Trans") e separa emoji do nome
function splitOptionLabel(key) {
  const option = themeSelect.querySelector(`option[value="${key}"]`);
  const text = option ? option.textContent : '';
  const firstSpace = text.indexOf(' ');
  return { emoji: text.slice(0, firstSpace), name: text.slice(firstSpace + 1) };
}

// atualiza o texto exibido no select fechado. Quando o tema real escolhido
// é "random", troca o dado 🎲 pelo emoji do tema sorteado e mostra o nome
// dele ("Aleatório: Trans"), mas isso NUNCA toca no texto da <option> em
// si, então a lista suspensa continua mostrando "🎲 Aleatório" normalmente
function updateSelectLabel(selectedValue, resolvedKey) {
  if (selectedValue === 'random') {
    const { emoji, name } = splitOptionLabel(resolvedKey);
    themeSelectLabel.textContent = `${emoji} Aleatório: ${name}`;
  } else {
    const { emoji, name } = splitOptionLabel(selectedValue);
    themeSelectLabel.textContent = `${emoji} ${name}`;
  }
}

function chooseTheme(selectedValue) {
  const resolvedKey = selectedValue === 'random' ? pickRandomThemeKey() : selectedValue;
  applyTheme(resolvedKey);
  updateSelectLabel(selectedValue, resolvedKey);
}

themeSelect.value = savedTheme;
chooseTheme(savedTheme);

themeSelect.addEventListener('change', () => {
  localStorage.setItem(STORAGE_KEY, themeSelect.value);
  chooseTheme(themeSelect.value);
});

// baixa exatamente o frame que está na tela agora (tema e posições aleatórias
// daquele momento). Título e frase são opcionais: por padrão o canvas não
// tem eles (são HTML/CSS por cima), então só entram na imagem se marcados,
// redesenhados à mão num painel parecido com o .hud da página
const downloadToggle = document.getElementById('download-toggle');
const downloadOptions = document.getElementById('download-options');
const downloadConfirm = document.getElementById('download-confirm');
const optTitle = document.getElementById('opt-title');
const optQuote = document.getElementById('opt-quote');

downloadToggle.addEventListener('click', () => {
  const isOpen = downloadOptions.classList.toggle('open');
  downloadToggle.setAttribute('aria-expanded', String(isOpen));
});

// desenha o painel de título/frase num contexto de canvas qualquer,
// nas mesmas coordenadas "lógicas" (CSS) usadas pelo resto do desenho
function drawHudOnCanvas(targetCtx, includeTitle, includeQuote) {
  if (!includeTitle && !includeQuote) return;

  const accent = activeTheme.accent;
  const titleText = document.querySelector('.title-text').textContent;
  const quoteText = document.getElementById('quote').textContent;
  const titleFont = 'bold 44px monospace';
  const quoteFont = '20px monospace';
  const paddingX = 48;
  const paddingY = 32;
  const gap = 18;
  const titleLineHeight = 54;
  const quoteLineHeight = 28;

  targetCtx.save();
  targetCtx.textAlign = 'center';
  targetCtx.textBaseline = 'middle';

  let maxWidth = 0;
  if (includeTitle) {
    targetCtx.font = titleFont;
    maxWidth = Math.max(maxWidth, targetCtx.measureText(titleText).width);
  }
  if (includeQuote) {
    targetCtx.font = quoteFont;
    maxWidth = Math.max(maxWidth, targetCtx.measureText(quoteText).width);
  }

  const panelH = (includeTitle ? titleLineHeight : 0) + (includeQuote ? quoteLineHeight : 0) +
    (includeTitle && includeQuote ? gap : 0) + paddingY * 2;
  const panelW = maxWidth + paddingX * 2;
  const panelX = width / 2 - panelW / 2;
  const panelY = height / 2 - panelH / 2;

  targetCtx.fillStyle = 'rgba(0, 15, 0, 0.8)';
  targetCtx.strokeStyle = accent;
  targetCtx.lineWidth = 2;
  targetCtx.shadowColor = accent;
  targetCtx.shadowBlur = 24;
  targetCtx.beginPath();
  targetCtx.roundRect(panelX, panelY, panelW, panelH, 14);
  targetCtx.fill();
  targetCtx.stroke();

  targetCtx.shadowBlur = 14;
  targetCtx.fillStyle = accent;

  let cursorY = panelY + paddingY;
  if (includeTitle) {
    targetCtx.font = titleFont;
    targetCtx.fillText(titleText, width / 2, cursorY + titleLineHeight / 2);
    cursorY += titleLineHeight + (includeQuote ? gap : 0);
  }
  if (includeQuote) {
    targetCtx.font = quoteFont;
    targetCtx.fillText(quoteText, width / 2, cursorY + quoteLineHeight / 2);
  }

  targetCtx.restore();
}

downloadConfirm.addEventListener('click', () => {
  const includeTitle = optTitle.checked;
  const includeQuote = optQuote.checked;

  let sourceCanvas = canvas;

  if (includeTitle || includeQuote) {
    const dpr = window.devicePixelRatio || 1;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext('2d');
    exportCtx.drawImage(canvas, 0, 0);
    exportCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawHudOnCanvas(exportCtx, includeTitle, includeQuote);
    sourceCanvas = exportCanvas;
  }

  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement('a');
  link.download = `matrix-rain-${activeThemeKey}-${date}.png`;
  link.href = sourceCanvas.toDataURL('image/png');
  link.click();

  downloadOptions.classList.remove('open');
  downloadToggle.setAttribute('aria-expanded', 'false');
});

setup();
window.addEventListener('resize', setup);

setInterval(draw, 33); // ~30fps, mesmo ritmo usado nos créditos originais

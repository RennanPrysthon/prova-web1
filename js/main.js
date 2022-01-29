const tab = document.querySelector('#tab');
const tabSizes = document.querySelector('#tabSizes');
const resetButton = document.querySelector('#reset-btn');
const mensagens = document.querySelector('#mensagem');

let tabSize = 8;
let rounds = 0;

function limparMensagens() {
  mensagens.innerHTML = '';
}

function showMessage(mensagem, error = false) {
  limparMensagens();
  let span = document.createElement('span');
  if (error) {
    span.classList.add('mensagem-erro')
  }

  span.innerText = mensagem;

  mensagens.appendChild(span);
}

function clearChecked() {
  let allChecked = document.querySelectorAll('#tab > div.checked') || []
  allChecked.forEach(el => {
    el.classList.remove('checked');
  })
}

function drawLines() {
  clearChecked()

  let allSelected = document.querySelectorAll('#tab > div.selected') || []
  
  allSelected.forEach(el => {
    let [posX, posY] = el.id
      .substr(1)
      .split('-')
      .map(val => Number(val))

    let diagonais = []
  
    for (let i = 0; i < tabSize; i++) {
      diagonais.push(`${posX}-${i}`)
    }
  
    for (let i = 0; i < tabSize; i++) {
      diagonais.push(`${i}-${posY}`)
    }

    let x = posX;
    let y = posY;
    
    while(x > 0 && y < tabSize) {
      x--;
      y++;

      diagonais.push(`${x}-${y}`)
    }
    
    while(x < tabSize && y > 0) {
      x++
      y--;
      diagonais.push(`${x}-${y}`)
    }
    
    x = posX;
    y = posY;

    while(x > 0 && y > 0) {
      x--;
      y--;
      diagonais.push(`${x}-${y}`)
    }

    while(x < tabSize && y < tabSize) {
      x++;
      y++;
      diagonais.push(`${x}-${y}`)
    }

    diagonais = [...new Set([...diagonais])]

    diagonais.forEach(diag => {
      const el = document.querySelector(`#p${diag}`)
      if (el && !el.classList.contains('selected')) {
        el.classList.add(`checked`)
      }
    })
  })
}

function checarFinalDeJogo() {
  let allAvailable = document.querySelectorAll('#tab > div:not(.checked, .selected)').length

  if (rounds === tabSize && allAvailable === 0) {
    showMessage("Parabéns, combinação encontrada");
  }

  if (allAvailable === 0 && rounds < tabSize) {
    showMessage("Combinação incorreta, tente novamente", true)
  }
}

function onClickTabItem(event) {
  let { target } = event
  
  if (target.classList.contains('checked')) {
    showMessage('Posição inválida!', true);
    return;
  }

  if (target.classList.contains('selected')) {
    showMessage("Posição já contém uma dama!", true);
    return;
  }

  limparMensagens()

  target.classList.add('selected');
  target.innerHTML = QUEEN_ICON
  rounds++;

  drawLines()

  checarFinalDeJogo()
}

function onRightClickTabItem(event) { 
  limparMensagens()

  let { target } = event;

  if (target.classList.contains('selected')) {
    target.classList.remove('selected');
    target.innerHTML = '';
    drawLines()
    rounds--;
    event.preventDefault();
  }
}

function drawTab(size = tabSize) {
  tab.innerHTML = '';
  tabSize = size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let isEven = (i + j) % 2 === 0;

      let ele = document.createElement('div')
      ele.id = `p${i}-${j}`;

      ele.classList.add(isEven ? 'color-1' : 'color-2')

      ele.onclick = onClickTabItem
      ele.oncontextmenu = onRightClickTabItem

      tab.appendChild(ele)
    }  
  }

  let style = `repeat(${size}, 50px)`;
  tab.style.gridTemplateColumns = style ;
  tab.style.gridTemplateRows = style;
}

tabSizes.addEventListener('change', (event) => {
  let { target: { value } } = event
  value = Number(value);
  rounds = 0;
  drawTab(value);
})

resetButton.addEventListener('click', () => {
  rounds = 0;
  drawTab()
})

drawTab();
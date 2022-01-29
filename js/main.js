const tabuleiro = document.querySelector('#tabuleiro');
const tabSizes = document.querySelector('#tabSizes');
const resetButton = document.querySelector('#reset-btn');

let tabSize = 4;

function onClickTabItem(event) {
  let { target } = event
  
  target.classList.toggle('selected')
}

function drawTab(size = 4) {
  tabuleiro.innerHTML = '';

  tabSize = size;
  const totalValues = size * size;

  const divList = Array(Number(totalValues)).fill(null)
  
  divList.forEach((_) => {
    let ele = document.createElement('div')
    ele.onclick = onClickTabItem

    tabuleiro.appendChild(ele)
  })

  let style = `repeat(${size}, 50px)`;
  tabuleiro.style.gridTemplateColumns = style ;
  tabuleiro.style.gridTemplateRows = style;
}

tabSizes.addEventListener('change', (event) => {
  let { target: { value } } = event
  value = Number(value);
  drawTab(value);
})

resetButton.addEventListener('click', () => drawTab())

drawTab();
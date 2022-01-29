const tab = document.querySelector('#tab');
const tabSizes = document.querySelector('#tabSizes');
const resetButton = document.querySelector('#reset-btn');

let tabSize = 4;

function onClickTabItem(event) {
  let { target } = event
  
  target.classList.toggle('selected')
}

function drawTab(size = tabSize) {
  tab.innerHTML = '';
  tabSize = size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let ele = document.createElement('div')
      ele.onclick = onClickTabItem

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
  drawTab(value);
})

resetButton.addEventListener('click', () => drawTab())

drawTab();
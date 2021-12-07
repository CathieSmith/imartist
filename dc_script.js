"use strict"

class ColorTask {
  constructor(colorMain, colorDif, sizeMatrix) {
    this.colorMain = colorMain;
    this.colorDif = colorDif;
    this.sizeMatrix = sizeMatrix;
  }
}

function getColorDif(color, deltaDif) {
  let newS = color.s, newL = color.l;
  (newL >= 70) ? newL -= deltaDif/2 : newL += deltaDif/2;
  (newS >= 50) ? newS -= deltaDif/2 : newS += deltaDif/2;

  let colorDif = new Color(color.h, newS, newL);
  console.log(`deltaDif = ${deltaDif}`);
  console.log(color);
  console.log(colorDif);
  return colorDif;
}

function openModal(step) {
  let modal = document.querySelector('.modal-right');
  modal.classList.add('active');
  let closeButton = document.querySelector('.modal-next');
  closeButton.onclick = function() {
    document.querySelector('.modal-right.active').classList.remove('active');
    test.setResultClick(step);
    updateTest();
  }
}

function selectTd(selectedTd, className) {
  let tds = document.getElementsByClassName('non-selected');
  for (let td of tds) {
    td.classList.remove('false-selected');
    td.classList.remove('true-selected');
  }
  selectedTd.classList.add(className);
}

function generateTasks(sizeMatrix, deltaDif) {
  let tasks = [];
  let color = new Color();
  while (sizeMatrix < 10) {
    console.log(`size = ${sizeMatrix}`);
    color.generateColor();
    tasks.push(new ColorTask(new Color(color.h, color.s, color.l), getColorDif(color, deltaDif), sizeMatrix));
    sizeMatrix++;
    deltaDif -= 2;
  }
  return tasks;
}

function tableCreate(task) {
  let table = document.querySelector('#color-table');
  if (table) {
    while(table.rows.length > 0) {
      table.deleteRow(0);
    }
  }
  let randomI = getRandomInt(0, task.sizeMatrix);
  let randomJ = getRandomInt(0, task.sizeMatrix);

  const gameSpace = document.querySelector('#gamespace');
  for (let i = 0; i < task.sizeMatrix; i++) {
    const tr = table.insertRow();

    for (let j = 0; j < task.sizeMatrix; j++) {
      if (i === task.sizeMatrix && j === task.sizeMatrix) {
        break;
      } else {
        const td = tr.insertCell();
        let h = gameSpace.clientHeight;
        let w = gameSpace.clientWidth;

        let tdSize = (h - 50) / task.sizeMatrix;
        td.height = `${tdSize}px`;
        td.width = `${tdSize}px`;

        (i == randomI && j == randomJ) ? td.style.background = task.colorDif.getColor() : td.style.background = task.colorMain.getColor();  
        td.classList.add('non-selected');
      }
    }
  }
  table.setAttribute('data-size', task.sizeMatrix);
  table.setAttribute('data-color-dif', task.colorDif.getColor());
  return table;
}

function setEventClick(table) {
  let step = 0;
  table.addEventListener('click', function(e) {    
    let td = e.target.closest('td'); 
  
    if (!td) return; 
    if (!table.contains(td)) return; 
  
    let selected = td.style.background; // rgb
    let colorDif = table.getAttribute('data-color-dif');

    ++step;
    console.log(`cur color = ${selected}`);
    console.log(`main color = ${hslToRgb(colorDif)}`);
  
    if (selected == hslToRgb(colorDif)) {
      selectTd(td, 'true-selected');
  
      for (let row of table.rows) {
        for (let cell of row.cells) {
          cell.classList.add('non-clickable');
        }
      }
      console.log(`steps = ${step}`);
      openModal(step); 
    } else {
      selectTd(td, 'false-selected');
    }
  });
}

let sizeMatrix = 5;
let deltaDif = 10;
const test = new Test(generateTasks(sizeMatrix, deltaDif));
updateTest();

function updateTest() {
  if (test.current < test.tasks.length) {
    console.log(`cur = ${test.current}`);
    let task = test.tasks[test.current]; 
    console.log(`task sizeMatrix = ${task.sizeMatrix}`);
    console.log(`task colorMain = ${task.colorMain.getColor()}`);
    console.log(`task colorDif = ${task.colorDif.getColor()}`);

    let table = tableCreate(task);
    const gameSpace = document.querySelector('#gamespace');
    gameSpace.appendChild(table);
    setEventClick(table);
  } else {
    let score = getTextForm(test.score, ['попытку', 'попытки', 'попыток']);
    if (test.score > 5) {
      document.querySelector('#gamespace').innerHTML = `поздравляю! <br>вы прошли все уровни за ${test.score} ${score}<br><br>(а могли бы за 5)`;
    } else {
      document.querySelector('#gamespace').innerHTML = `поздравляю! <br>вы прошли все уровни за ${test.score} ${score}<br>`;
    }
  }  
}

"use strict"

class ColorScheme {
    constructor(type, colors) {
        this.type = type;
        this.colors = colors;
    }

    generateMonochrome(number) {
        let left = 30;
        let right = 80;
        let delta = (right - left) / (number - 1);

        let color = new Color();
        color.generateColor();

        let colors = [];
        while (left < right) {
            colors.push(new Color(color.h, color.s, left));
            left += delta;
        }
        colors.push(new Color(color.h, color.s, right));
        this.colors = colors;
        this.type = "Monochrome";
    }

    generateComplimentary() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(color);
        colors.push(new Color((color.h + 180) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "Complimentary";
    }

    generateDoubleComplimentary() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(color);
        colors.push(new Color((color.h + 20) % 360, color.s, color.l));
        colors.push(new Color((color.h + 180) % 360, color.s, color.l));
        colors.push(new Color((color.h + 200) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "DoubleComplimentary";
    }

    generateClassicalTriad() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(color);
        colors.push(new Color((color.h + 120) % 360, color.s, color.l));
        colors.push(new Color((color.h + 240) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "ClassicalTriad";
    }

    generateAnalogTriad() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(color);
        colors.push(new Color((color.h + 20) % 360, color.s, color.l));
        colors.push(new Color((color.h + 40) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "AnalogTriad";
    }

    generateContrastTriad() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(color);
        let opposite = (color.h + 180) % 360;
        colors.push(new Color((opposite + 20) % 360, color.s, color.l));
        colors.push(new Color((opposite - 20) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "ContrastTriad";
    }

    generateSquare() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(new Color((color.h + 90) % 360, color.s, color.l));
        colors.push(new Color((color.h + 180) % 360, color.s, color.l));
        colors.push(new Color((color.h + 270) % 360, color.s, color.l));
        colors.push(new Color((color.h + 360) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "Square";
    }

    generateRectangular() {
        let color = new Color();
        color.generateColor();
        let colors = [];
        colors.push(new Color((color.h + 60) % 360, color.s, color.l));
        colors.push(new Color((color.h + 120) % 360, color.s, color.l));
        colors.push(new Color((color.h + 240) % 360, color.s, color.l));
        colors.push(new Color((color.h + 300) % 360, color.s, color.l));
        this.colors = colors;
        this.type = "Rectangular";
    }
}

let tasks = [];
const answers =
[
    new Answer("Monochrome", "монохромная схема"),
    new Answer("Square", "квадратная схема"),
    new Answer("ContrastTriad", "контрастная схема"),
    new Answer("AnalogTriad", "аналоговая схема"),
    new Answer("ClassicalTriad", "классическая схема"),
    new Answer("Complimentary", "комплиментарная схема"),
    new Answer("Rectangular", "прямоугольная схема"),
    new Answer("DoubleComplimentary", "двойная комплиментарная схема")
];

let colorPalette = new ColorScheme();
colorPalette.generateClassicalTriad();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateMonochrome(4);
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateAnalogTriad();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateSquare();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateMonochrome(2);
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateComplimentary();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateContrastTriad();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateMonochrome(3);
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateRectangular();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));
colorPalette.generateDoubleComplimentary();
tasks.push(new ColorScheme(colorPalette.type, colorPalette.colors));


function tableCreate(colors) {
    let table = document.querySelector('#color-table');
    if (table) {
      while(table.rows.length > 0) {
        table.deleteRow(0);
      }
    }
    const gameSpace = document.querySelector('#gamespace');
    const tr = table.insertRow();
    for (let i = 0; i < colors.length; i++) {
        const td = tr.insertCell();
        let h = gameSpace.clientHeight;
        let w = gameSpace.clientWidth;
  
        let tdSize = (h - 50) / colors.length;
        td.height = `${tdSize}px`;
        td.width = `${tdSize}px`;
  
        td.style.background = colors[i];
    }
    return table;
}

function setEventClick() {
   let btns = document.getElementsByClassName("button");
   for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(e) { 
            click(e.target);
        });
    }
}

function click(target) {
    let correct = target.getAttribute("data-is-correct");
    if (correct == "true") {
        target.className = "button button-correct";
        test.setResultClick(1);
    } else {
        target.className = "button button-wrong";
        let btns = document.getElementsByClassName("button");
        for (let btn of btns) {
            if (btn.getAttribute("data-is-correct") == "true") {
                btn.className = "button button-correct";
            }
        }
        test.setResultClick(0);
    }
    let btns = document.getElementsByClassName("button");
    for (let btn of btns) {
        btn.classList.add("no-hover");
        btn.classList.add("non-clickable");
    }
    setTimeout(updateTest, 1000);
}
let temp = 0;
console.log(`${temp} ${getTextForm(temp, ["минута", "минуты", "минут"])}`);
const test = new Test(getShuffleArray(tasks));
updateTest();
 
function updateTest() {
    let buttons = document.querySelector('#buttons');
    if (test.current < test.tasks.length) {
        console.log(`cur = ${test.current}`);
        let task = test.tasks[test.current]; 
        let rightType = task.type; 
        console.log(`right = ${rightType}`);
        let colorsTask = task.colors; 

        let colorsHsl = [];
        for (let color of colorsTask) {
            colorsHsl.push(color.getColor()); 
        }
        console.log(`colorHsl = ${colorsHsl}`);

        let table = tableCreate(colorsHsl);
        let gameSpace = document.querySelector('#gamespace');
        gameSpace.appendChild(table);

        let arrText = [];
        for (let ans of answers) {
            arrText.push(ans.key); 
        }
        let butText = getRandomArray(arrText, 4, rightType); 
        butText = getShuffleArray(butText);
        console.log(butText);
        
        buttons.innerHTML = "";
        for (let i = 0; i < butText.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            let buttonText, colorType;
            for (let ans of answers) {
                if (ans.key == butText[i]) {
                    buttonText = ans.value;
                    colorType = ans.key;
                }
            }
            btn.innerHTML = buttonText;
            if (colorType == rightType) {
                btn.setAttribute("data-is-correct", "true");
            } else {
                btn.setAttribute("data-is-correct", "false");
            }
            btn.style.width = `${table.offsetWidth}px`;
            btn.style.height = '40px';
            buttons.appendChild(btn);
        }
        gameSpace.appendChild(buttons);
        setEventClick();
    } else {
        document.getElementById("task").remove();
        document.getElementById("buttons").remove();
        if (test.score >= tasks.length / 2) {
            document.querySelector('#gamespace').innerHTML = `успешно!<br>ваш счет: ${test.score} из ${tasks.length}<br><br>так держать!`;
        } else {
            document.querySelector('#gamespace').innerHTML = `слабовато!<br>ваш счет: ${test.score} из ${tasks.length}<br><br>тренируйтесь больше!`;
        }
    }  
}
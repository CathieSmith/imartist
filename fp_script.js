"use strict"

class FontPair {
    constructor(titleFont, title, text, answers) {
        this.titleFont = titleFont;
        this.title = title;
        this.text = text;
        this.answers = answers;
    }
}

let tasks = [
    new FontPair('Roboto Condensed', `По возможности используйте только одну гарнитуру шрифта`,
            `В настоящее время можно найти большое количество развитых семейств шрифтов, где есть всё, что нужно 
            (начертания с засечками и без засечек, светлые и жирные, широкие и узкие).`,
            [
                new Answer('Roboto', 1),
                new Answer('PT Mono', 0),
                new Answer('Oswald', 0),
                new Answer('Raleway', 0)
            ]),
    new FontPair('Raleway', `Иногда выгодно использовать только один шрифт`,
            `Правильно сочетая начертания вы получите необходимый контраст. Самая распространенная схема: жирный/полужирный и светлый варианты.`,
            [
                new Answer('Raleway', 1),
                new Answer('Roboto', 0),
                new Answer('Jost', 0),
                new Answer('Nunito', 0)
            ]),
    new FontPair('Yeseva One', `Максимум контраста для привлечения внимания`,
            `Вы можете взять абсолютно непохожие шрифты, которые в паре текстовый + акцидентный достигнут своей цели.`,
            [
                new Answer('Open Sans', 1),
                new Answer('Vollkorn', 0),
                new Answer('Playfair Display', 0),
                new Answer('PT Mono', 0)
            ]),
    new FontPair('Playfair Display', `Дополнительный шрифт для мелких элементов`,
            `Если для основного текста вы используете антикву, то для очень мелких примечаний, сносок и комментариев используйте
            гротеск с крупным очком строчных.`,
            [
                new Answer('IBM Plex Sans', 1),
                new Answer('Playfair Display', 0),
                new Answer('Oswald', 0),
                new Answer('Vollkorn', 0)
            ]),
    new FontPair('Vollkorn', `Шрифт должен быть уместен`,
            `Для примера возьмем ситуацию, когда текст должен соответствовать эпохе XVIII - XIX веков. В таком случае следует использовать статическую антикву.`,
            [
                new Answer('Vollkorn', 1),
                new Answer('Playfair Display', 0),
                new Answer('Roboto', 0),
                new Answer('Jost', 0)
            ]),
    new FontPair('Oswald', `Текст должен передавать настроение`,
            `Например, моноширинные варианты, по форме имитирующие шрифт пишущей машинки, воспринимаются как попытка создать технический стиль.`,
            [
                new Answer('PT Mono', 1),
                new Answer('Roboto', 0),
                new Answer('Raleway', 0),
                new Answer('Vollkorn', 0)
            ])
];

function setEventClick() {
    let btns = document.getElementsByClassName("button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(e) { 
            click(e.target);
        });
    }
}
 
function click(target) {
    let correct = target.getAttribute("data-is-answer");
    if (correct == "true") {
        target.className = "button button-correct";
        test.setResultClick(1);
    } else {
        target.className = "button button-wrong";
        let btns = document.getElementsByClassName("button");
        for (let btn of btns) {
            if (btn.getAttribute("data-is-answer") == "true") {
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

const test = new Test(getShuffleArray(tasks));
updateTest();
 
function updateTest() {
    let buttons = document.querySelector('#buttons');
    let pairTitle = document.querySelector('#pair-title');
    let pairText = document.querySelector('#pair-text');
    if (test.current < test.tasks.length) {
        console.log(`cur = ${test.current}`);
        let task = test.tasks[test.current];

        pairTitle.innerHTML = "";
        pairText.innerHTML = "";

        let p1 = document.createElement("p");
        p1.innerHTML = task.title;
        p1.style.fontFamily = task.titleFont;
        p1.style.fontSize = "30pt";

        let p2 = document.createElement("p");
        p2.innerHTML = task.text;
        p2.style.fontSize = "15pt";

        pairTitle.appendChild(p1);
        pairText.appendChild(p2);
        
        buttons.innerHTML = "";
        let answers = getShuffleArray(task.answers);
        for (let i = 0; i < answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";
            btn.innerHTML = answers[i].key;
            if (answers[i].value == 1) {
                btn.setAttribute("data-is-answer", "true");
            } else {
                btn.setAttribute("data-is-answer", "false");
            }
            btn.style.width = `550px`;
            btn.style.height = '40px';
            
            btn.onmouseover = function(e) {
                p2.style.fontFamily = e.target.innerHTML;
            };
            buttons.appendChild(btn);
        }
        let gameSpace = document.querySelector('#gamespace');
        gameSpace.appendChild(buttons);
        setEventClick();
    } else {
        document.querySelector('#gamespace').classList
        document.getElementById("pair-title").remove();
        document.getElementById("pair-text").remove();
        document.getElementById("buttons").remove();
        let text = getTextForm(test.score, ['шрифтовую пару', 'шрифтовых пары', 'шрифтовых пар']);
        if (test.score >= tasks.length / 2) {
            document.querySelector('#gamespace').innerHTML = `вы удачно подобрали ${test.score} ${text} из ${tasks.length}<br><br>так держать!`;
        } else {
            document.querySelector('#gamespace').innerHTML = `вы удачно подобрали ${test.score} ${text} из ${tasks.length}<br><br>тренируйтесь больше!`;
        }
        document.querySelector('#gamespace').innerHTML = `поздравляю!<br>вы удачно подобрали ${test.score} ${text} из ${tasks.length}`;
    }  
}
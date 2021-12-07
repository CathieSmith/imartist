"use strict"

class AnatomyTask {
    constructor(code, img) {
        this.code = code;
        this.img = img;
    }
}

class AnatomyTest extends Test{
    goNext() {
        this.current += 2;
        if (this.current >= this.tasks.length) {
            this.getScore();
        }
    }
}

let tasks = [];
const answers =
[
    new Answer("accent", "акцент"),
    new Answer("drop", "капля"),
    new Answer("leg", "нога"),
    new Answer("loop", "петля"),
    new Answer("overhang", "свисание"),
    new Answer("serif", "засечка"),
    new Answer("shoulder", "плечо"),
    new Answer("stem", "основной штрих"),
    new Answer("stress", "наплыв"),
    new Answer("terminal", "концевой элемент"),
    new Answer("cender", "выносной элемент"),
    new Answer("hairline", "соединение"),
    new Answer("arc", "дуга")
];

tasks.push(new AnatomyTask(1, "accent"));
tasks.push(new AnatomyTask(2, "drop"));
tasks.push(new AnatomyTask(3, "leg"));
tasks.push(new AnatomyTask(4, "loop"));
tasks.push(new AnatomyTask(5, "overhang"));
tasks.push(new AnatomyTask(6, "serif"));
tasks.push(new AnatomyTask(7, "shoulder"));
tasks.push(new AnatomyTask(8, "stem"));
tasks.push(new AnatomyTask(9, "stress"));
tasks.push(new AnatomyTask(10, "terminal"));

let steps = 0;
let dragged;

    document.addEventListener("drag", function(e) {
    }, false);

    document.addEventListener("dragstart", function(e) {
        dragged = e.target;
        e.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function(e) {
        e.target.style.opacity = "";
    }, false);

    document.addEventListener("dragover", function(e) {
        e.preventDefault();
    }, false);

    document.addEventListener("dragenter", function(e) {
        if (e.target.classList.contains("able")) {
            e.target.style.background = "#B8D7C7";
        }
    }, false);

    document.addEventListener("dragleave", function(e) {
        if (e.target.classList.contains("able")) {
            e.target.style.background = "";
        }
    }, false);

    document.addEventListener("drop", function(e) {
        e.preventDefault();
        
        let dropZone = e.target;
        let variants = document.querySelector('#answers');

        if (dropZone.classList.contains("able")) {
            ++steps;
            if (dropZone.innerHTML == "") {
                dropZone.style.background = "";
                // variants.removeChild(dragged);
                dragged.classList.add("able");
                dropZone.appendChild(dragged);
                // ++steps;
                checkClick();
            } else {
                let currentId;
                for (let ans of answers) {
                    if (ans.value == dropZone.textContent) {
                        currentId = ans.key;
                    }
                }
                // console.log(`currentId ${currentId}`);

                let currentTitle = document.querySelector(`#${currentId}`);
                dragged.classList.add("able");
                currentTitle.replaceWith(dragged);

                let newNode = document.createElement('div');
                newNode.innerHTML = dropZone.textContent;
                for (let ans of answers) {
                    if (ans.value == dropZone.textContent) {
                        newNode.id = ans.key;
                    }
                }
                newNode.style.height = dragged.style.height;
                newNode.style.fontSize = dragged.style.fontSize;
                newNode.style.cursor = dragged.style.cursor;
                newNode.draggable = true;
                variants.appendChild(newNode);
                // ++steps;
                checkClick();
            }
        }
    }, false);

function openModal() {
    let modal = document.querySelector('.modal-right');
    modal.classList.add('active');
    let closeButton = document.querySelector('.modal-next');
    closeButton.onclick = function() {
      document.querySelector('.modal-right.active').classList.remove('active');
      test.setResultClick(steps);
      updateTest();
    }
}

function checkAnswers() {
    let title1 = document.querySelector(`#t-1`);
    let title2 = document.querySelector(`#t-2`);

    // console.log(`title1.getAttribute("data-is-correct") = ${title1.getAttribute("data-is-correct")}`);
    // console.log(`title2.getAttribute("data-is-correct") = ${title2.getAttribute("data-is-correct")}`);

    if (title1.getAttribute("data-is-correct") == "true" && title2.getAttribute("data-is-correct") == "true") {
        openModal();
        let answ = document.querySelector('#answers');
        console.log(answ);
        for (let ans in answ) {
            ans.draggable = false;
        }
        title1.draggable = false;
        title2.draggable = false;
    }
}

function checkClick() {
    let img1 = document.querySelector(`#svg-1`);
    let img2 = document.querySelector(`#svg-2`);

    let title1 = document.querySelector(`#t-1`);
    let title2 = document.querySelector(`#t-2`);

    let answer1, answer2;

    if (title1 != null && title1.hasChildNodes()) {
        answer1 = title1.childNodes[0].id;
    } else {
        answer1 = "";
    }

    if (title2 != null && title2.hasChildNodes()) {
        answer2 = title2.childNodes[0].id;
    } else {
        answer2 = "";
    }

    let xmlHTTP1 = new XMLHttpRequest();
    xmlHTTP1.open("GET", img1.getAttribute("data"));
    xmlHTTP1.send();

    xmlHTTP1.onload = function() {
        let response = xmlHTTP1.response;
        console.log(response);
        let svgId = response.split(" ")[1].split(`"`)[1];
        
        if (svgId == answer1) {
            // console.log(`svgId ${svgId} == answer1 ${answer1}`);
            title1.setAttribute("data-is-correct", "true");
            checkAnswers();
        } else {
            // console.log(`svgId ${svgId} != answer1 ${answer1}`);
            title1.setAttribute("data-is-correct", "false");
        }
    };

    xmlHTTP1.onerror = function() {
        console.log("Запрос не удался");
    };

    let xmlHTTP2 = new XMLHttpRequest();
    xmlHTTP2.open("GET", img2.getAttribute("data"));
    xmlHTTP2.send();

    xmlHTTP2.onload = function() {
        let response = xmlHTTP2.response;
        let svgId = response.split(" ")[1].split(`"`)[1];
        
        if (svgId == answer2) {
            // console.log(`svgId ${svgId} == answer2 ${answer2}`);
            title2.setAttribute("data-is-correct", "true");
            checkAnswers();
        } else {
            // console.log(`svgId ${svgId} != answer2 ${answer2}`);
            title2.setAttribute("data-is-correct", "false");
        }
    };

    xmlHTTP2.onerror = function() {
        console.log("Запрос не удался");
    };
}

const test = new AnatomyTest(getShuffleArray(tasks));
updateTest();

function updateTest() {
    steps = 0;
    let variants = document.querySelector('#answers');
    let img1 = document.querySelector('#i-1');
    let img2 = document.querySelector('#i-2');
    let title1 = document.querySelector(`#t-1`);
    let title2 = document.querySelector(`#t-2`);

    if (test.current < test.tasks.length) {
        let cur = test.current;
        // console.log(`cur = ${test.current}`);
        let task1 = test.tasks[cur];
        let task2 = test.tasks[++cur];

        let shuffledAnswers = getShuffleArray(answers);
        
        variants.innerHTML = "";

        for (let ans of shuffledAnswers) {
            let div = document.createElement("div");
            div.innerHTML = ans.value;
            div.style.height = "30px";
            div.style.fontSize = "20px";
            div.style.cursor = "move";
            div.id = `${ans.key}`;
            div.draggable = true;

            div.addEventListener(`dragstart`, (e) => {
                e.dataTransfer.dropEffect = "copy";
                e.dataTransfer.setData("text/plain", e.target.id);
            });
            variants.appendChild(div);
        }

        img1.innerHTML = "";
        img2.innerHTML = "";

        title1.setAttribute("data-is-correct", "false");
        title2.setAttribute("data-is-correct", "false");
        title1.innerHTML = "";
        title2.innerHTML = "";

        let svg = document.createElement("object");
        svg.setAttribute("type", "image/svg+xml");
        svg.setAttribute("data", `svg/${task1.code}.svg`);
        svg.setAttribute("id", "svg-1");

        img1.append(svg);

        svg = document.createElement("object");
        svg.setAttribute("type", "image/svg+xml");
        svg.setAttribute("data", `svg/${task2.code}.svg`);
        svg.setAttribute("id", "svg-2");

        img2.append(svg);
    } else {
        let score = getTextForm(test.score, ['попытку', 'попытки', 'попыток']);
        if (test.score > 10) {
          document.querySelector('#gamespace').innerHTML = `поздравляю! <br>вы прошли все уровни за ${test.score} ${score}<br><br>(а могли бы за 10)`;
        } else {
          document.querySelector('#gamespace').innerHTML = `поздравляю! <br>вы прошли все уровни за ${test.score} ${score}<br>`;
        }
    }  
}

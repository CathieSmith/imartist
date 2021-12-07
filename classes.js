"use strict"

class Color {
    constructor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    generateColor() {
        let hue = getRandomInt(0, 360);         //тон от 0° до 360°. Красный цвет имеет угол 0° или 360°. Зеленый — 120°. Синий — 240°.
        let saturation = getRandomInt(30, 80);  //насыщенность. 100% означает полную насыщенность, а 0% дает оттенок серого.
        let lightness = getRandomInt(30, 80);   // 100% светлоты дает белый цвет, 0% — черный цвет.
        this.h = hue;
        this.s = saturation;
        this.l = lightness;
    }

    getColor() {
        return (`hsl(${this.h}, ${this.s}%, ${this.l}%)`);
    }
}

class Test {
    constructor(tasks) {
        this.tasks = tasks;
        this.score = 0;
        this.current = 0;
    }
 
    setResultClick(value) {
        // console.log(`score = ${this.score}`);
        this.score += value;
        this.goNext();
    }

    goNext() {
        this.current++;
        if (this.current >= this.tasks.length) {
            this.getScore();
        }
    }

    getScore() {
        return this.score;
    }
}

class Answer {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
"use strict"

// function getRandomHex() {
//   return '#' + (Math.random().toString(16)).substring(2,8).toUpperCase();
// }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// function hexToRgb(hex) {
//     return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
//     .substring(1).match(/.{2}/g)
//     .map(x => parseInt(x, 16));
// }

// function rgbToHex(rgb) {
//     let colorRgb = rgb.split("(")[1].split(")")[0].split(",");
  
//     return '#' + colorRgb.map(x => {             
//       const hex = parseInt(x).toString(16);      
//       return hex.length === 1 ? '0' + hex : hex; 
//     }).join('').toUpperCase();
// }

// function hslToHex(hsl) {
//     let colorHsl = hsl.replace(/[^0-9,\s]/g, '').split(",");
//     let h = colorHsl[0] / 360;
//     let s = colorHsl[1] / 100;
//     let l = colorHsl[2] / 100;
//     let r, g, b;
  
//     if (s === 0) {
//       r = g = b = l; // achromatic
//     } else {
//       const hue2rgb = (p, q, t) => {
//         if (t < 0) t += 1;
//         if (t > 1) t -= 1;
//         if (t < 1 / 6) return p + (q - p) * 6 * t;
//         if (t < 1 / 2) return q;
//         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//         return p;
//       };
//       const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//       const p = 2 * l - q;
//       r = hue2rgb(p, q, h + 1 / 3);
//       g = hue2rgb(p, q, h);
//       b = hue2rgb(p, q, h - 1 / 3);
//     }
//     const toHex = x => {
//       const hex = Math.round(x * 255).toString(16);
//       return hex.length === 1 ? '0' + hex : hex;
//     };
    
//     return `#${toHex(r).toUpperCase()}${toHex(g).toUpperCase()}${toHex(b).toUpperCase()}`;
// }

function hslToRgb(hsl) {
  let colorHsl = hsl.replace(/[^0-9,\s]/g, '').split(",");
  let h = colorHsl[0];
  let s = colorHsl[1] / 100;
  let l = colorHsl[2] / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let hs = h / 60;
  let x = c * (1 - Math.abs(hs % 2 - 1));
  let r, g, b;

  if (!hs) {r = 0; g = 0; b = 0;}
  if (hs >= 0 && hs < 1) {r = c; g = x; b = 0;}
  if (hs >= 1 && hs < 2) {r = x; g = c; b = 0;}
  if (hs >= 2 && hs < 3) {r = 0; g = c; b = x;}
  if (hs >= 3 && hs < 4) {r = 0; g = x; b = c;}
  if (hs >= 4 && hs < 5) {r = x; g = 0; b = c;}
  if (hs >= 5 && hs < 6) {r = c; g = 0; b = x;}

  let m = l - c / 2;
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function getTextForm(n, text) {  
    let tens = Math.abs(n) % 100; 
    let ones = tens % 10;
    // if (tens > 10) { 
      if (tens > 10 && tens < 20) { 
        return text[2]; 
    }
    if (ones > 1 && ones < 5) { 
        return text[1]; 
    }
    if (ones == 1) { 
        return text[0]; 
    }
    return text[2];
}

function getShuffleArray(arr) {
    let curr = arr.length, temp, rand;
    while (0 !== curr) {
      rand = Math.floor(Math.random() * curr);
      --curr;
      temp = arr[curr];
      arr[curr] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
}

function getRandomArray(arr, n, except) {
    let newArr = [];
    newArr.push(except);
    --n;
    if (n >= arr.length) {
      return arr;
    }
    for (let i = 0; i < n; i++) {
        let newElem = arr[Math.floor(Math.random() * arr.length)];
        while (newArr.includes(newElem)) {
            newElem = arr[Math.floor(Math.random() * arr.length)];
        }
        newArr.push(newElem);
    }
    return newArr;
} 
// var c1 = document.querySelectorAll("circle")[0],
// c2 = document.querySelectorAll("circle")[1],
// c3 = document.querySelectorAll("circle")[2],
// path = document.querySelectorAll("path")[0],
// drag, d = {x1:10,y1:80,x2:95,y2:10,x3:180,y3:80};    

// window.addEventListener("mousedown",mdHandler);
// function mdHandler(e){
//   if(e.srcElement instanceof SVGCircleElement){
//     drag = e.srcElement;
//     drag.x = e.srcElement.getAttribute("cx");
//     drag.y = e.srcElement.getAttribute("cy");
//     drag.clientX = e.clientX;
//     drag.clientY = e.clientY;
    
//     window.addEventListener("mousemove",mmHandler);
//     window.addEventListener("mouseup",muHandler);
//   }
// }

// function mmHandler(e){
//   drag.setAttribute("cx",e.clientX - (drag.clientX - drag.x));
//   drag.setAttribute("cy",e.clientY - (drag.clientY - drag.y));
//   switch( drag ){
//     case c1:
//       d.x1 = drag.getAttribute("cx");
//       d.y1 = drag.getAttribute("cy"); break;    
//     case c2:
//       d.x2 = drag.getAttribute("cx");
//       d.y2 = drag.getAttribute("cy"); break;
//     case c3:
//       d.x3 = drag.getAttribute("cx");
//       d.y3 = drag.getAttribute("cy"); break;      
//   }
//   path.setAttribute("d",`M${d.x1} ${d.y1} Q ${d.x2} ${d.y2} ${d.x3} ${d.y3}`);
//   document.getElementById("path").innerHTML = path.getAttribute("d");
// }
// function muHandler(e){
//   window.removeEventListener("mousemove",mmHandler);
//   window.removeEventListener("mouseup",muHandler);
// }


let xmlns = "http://www.w3.org/2000/svg";
let xlinkns  = "http://www.w3.org/1999/xlink";

let box = {left: 20, top: 20, right: 520, bottom: 520};

document.documentElement.ondragstart = function() {
	return false;
};

let pointsIn = [0, 0, 0.5, 0, 0.5, 1, 1, 1];
let points = [];

// read points from ?p=...
for(let i=0; i<pointsIn.length; i++) {
	let x = box.left + (box.right - box.left)*pointsIn[i];
	let y = box.bottom + (box.top - box.bottom)*pointsIn[++i];
	points.push({x: x, y: y});
}

console.log(pointsIn);
console.log(points);

let bezierPath = document.getElementById("bezier-path");
let controlPath = document.getElementById("control-path");

console.log(bezierPath);
console.log(controlPath);

let tPathTemplate = document.getElementById("t-path-template");
tPathTemplate.parentNode.removeChild(tPathTemplate);

function drawPath() {
	let letter;
	switch (points.length) {
	case 4:
		letter = 'C';
	    break;
	case 3:
	    letter = 'Q';
	    break;
	default:
	    letter = 'L';
	}
	let bezierPathD = "M" + points[0].x + ',' + points[0].y + ' '+letter;
	let controlPathD = "M" + points[0].x + ',' + points[0].y + ' L';

	for(let i = 1; i < points.length; i++) {
	    bezierPathD += points[i].x + ',' + points[i].y + ' ';
	    controlPathD += points[i].x + ',' + points[i].y + ' ';
	}
	bezierPath.setAttribute('d', bezierPathD);
	controlPath.setAttribute('d', controlPathD);

	function dist(a,b) {
	    return Math.round(Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y)));
	}

	if (hideMiddleControlPath) {
	    controlPath.setAttribute('stroke-dasharray', dist(points[0],points[1])+' '+dist(points[1],points[2])+' 9999 9999');
	}
}

// draw control points
function drawPoints(points) {
	let p = document.getElementById('p-template');
	p.removeAttribute('id');
	p.parentNode.removeChild(p);

	for(let i=0; i<points.length; i++) {
	    let point = p.cloneNode(true);
	    point.getElementsByTagName('text')[0].firstChild.data = i+1;
	    setPointCoords(point, i);
	    setPointHandler(point, i);
	    document.documentElement.appendChild(point);
	}
}

// control points coords are shifted from Left-Upper corner a bit
// to give them space to render
function setPointCoords(point, i) {
	point.setAttribute('x', points[i].x-20);
	point.setAttribute('y', points[i].y-20);
}

function setPointHandler(point, i) {
	let circle = point.getElementsByTagName('circle')[0];
	circle.onmousedown = function() {
	    document.onmousemove = function(e) {
	      	let x = e.pageX, y = e.pageY;

	      	// constrain withing the box
	      	if (x < box.left) x = box.left;
	      	if (x > box.right) x = box.right;
	      	if (y > box.bottom) y = box.bottom;
	      	if (y < box.top) y = box.top;

	      	points[i].x = x;
	      	points[i].y = y;
	      	setPointCoords(point, i);
	      	drawPath();
	    }
	    document.onmouseup = function() {
	    	document.onmousemove = document.onmouseup = null;
	    }
	    return false;
	}
}

// draw point connectors which form the curve
function drawT(points, t) {
	let path = document.getElementById('t-'+points.length);

	if (!path) {
	    path = tPathTemplate.cloneNode(true);
	    path.setAttribute('stroke', ["blue","#0a0","red"][points.length % 3]);
	    path.setAttribute('id', 't-'+points.length);
	    document.documentElement.appendChild(path);
	}

	let subPoints = [];
	let x = points[0].x + (points[1].x - points[0].x)*t;
	let y = points[0].y + (points[1].y - points[0].y)*t;

	let tPathD = "M" + x + ',' + y + ' L';
	subPoints.push({x, y});

	for(let i=1; i<points.length-1; i++) {
	    let x = points[i].x + (points[i+1].x - points[i].x)*t;
	    let y = points[i].y + (points[i+1].y - points[i].y)*t;
	    subPoints.push({x: x, y: y});

	    tPathD += x + ',' + y + ' ';
	}

	if (points.length <= 3) {
	    let m = document.getElementById('marker');
	    let mx, my;
	    if (t == 1) {
	      	mx = -10, my = -10;
	    } else {
	      	mx = subPoints[0].x + (subPoints[1].x-subPoints[0].x)*t;
	      	my = subPoints[0].y + (subPoints[1].y-subPoints[0].y)*t;
	    }
	    m.setAttribute('cx', mx);
	    m.setAttribute('cy', my);
	    path.setAttribute('stroke-width', 2);
	}
	if (points.length == 2) {
	    // only 2 points provided, special case
	    tPathD = "M"+points[0].x+","+points[0].y+" L"+x+","+y;
	}

	path.setAttribute('d', tPathD);

	if (subPoints.length > 2) {
	    drawT(subPoints, t);
	}
}

// let t = 0;
// let timer;

// // animate the curve
// function animate(complete) {

// 	timer = setInterval(function() {
// 	    if (t>1) {
// 	    	t = 1;
// 	    }
// 	    //bezierPath.setAttribute('stroke-dasharray', t*bezierPath.getTotalLength()+' '+bezierPath.getTotalLength());
// 	    drawT(points, t);

// 	    document.getElementById('t-value').firstChild.nodeValue = t==0 ? 0 : t == 1 ? 1 : t.toFixed(3);
	
// 	    // if (t >= 0.5) {
// 	    //   clearInterval(timer);
// 	    //   runButton.parentNode.style.display = 'none';
// 	    //   return;
// 	    // }
	
// 	    if (t == 1) {
// 	      	clearInterval(timer);
// 	      	timer = 0;
// 	     	complete && complete();
// 	      	return;
// 	    }
// 	    t += 0.005;
// 	}, 30);
// }

// function animationDone() {
// 	for(let i=1; i<=points.length; i++) {
// 	    let path = document.getElementById('t-'+i);
// 	    path && document.documentElement.removeChild(path);
// 	}
// 	t = 0;
// 	runButton.setAttributeNS(xlinkns, 'xlink:href', 'play.png');
// }

// runButton.onclick = onAnimate;

// function onAnimate() {
// 	if (timer) {
// 	    // animation in action
// 	    runButton.setAttributeNS(xlinkns, 'xlink:href', 'play.png');
// 	    clearInterval(timer);
// 	    timer = 0;
// 	    return;
// 	}
// 	runButton.setAttributeNS(xlinkns, 'xlink:href', 'pause.png');
// 	animate(animationDone);
// }

drawPath();
drawPoints(points);
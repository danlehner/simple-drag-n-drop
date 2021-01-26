const draggables = document.querySelectorAll('.draggable'); 
const containers = document.querySelectorAll('.container'); 
const firstContainer = document.getElementById('one'); 

let draggingElement; 
let otherDropZoneId; 

function addListeners() {

  let args = arguments; 
  for (let arg of args) {
    arg.addEventListener("dragstart", dragStart); 
    arg.addEventListener("dragend", dragEnd); 
    arg.addEventListener("dragover", dragOver); 
    arg.addEventListener("dragenter", dragEnter); 
    arg.addEventListener("dragleave", dragLeave); 
    arg.addEventListener("drop", drop);
  } 
}

function addContListeners() {

  let args = arguments; 
  for (let arg of args) {
    arg.addEventListener("dragover", contDragOver); 
    arg.addEventListener("drop", contDragDrop); 
  }
}

for (let draggable of draggables) {
  addListeners(draggable); 
}

for (let container of containers) {
  addContListeners(container); 
}

function contDragOver(e) {
  e.preventDefault(); 

  const dragParent = draggingElement.parentNode.id; 

  if (this.id !== dragParent) {
    otherDropZoneId = this.id; 
  } 
}

function contDragDrop(e) {
  e.preventDefault(); 
  if (e.target.id === otherDropZoneId) {
    let containerZone = document.getElementById(otherDropZoneId)
    containerZone.append(draggingElement); 
  }
}

function dragStart(e) { 
  e.target.classList.add("dragging"); 
  draggingElement = e.target; 
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
  draggingElement = null;  
}

function dragOver(e) {
  e.preventDefault(); 
}

function dragEnter(e) {
  if (e.target !== draggingElement) {
    e.target.classList.add("dragged-on")
  }
}

function dragLeave(e) {
  e.target.classList.remove("dragged-on")
}

function drop(e) {
  e.preventDefault(); 

  if (e.target !== draggingElement) {
    let dragClone = draggingElement.cloneNode(true); 
    let targetClone = e.target.cloneNode(true); 

    dragClone.classList.remove("dragging"); 
    targetClone.classList.remove("dragged-on"); 
    e.target.classList.remove("dragged-on"); 

    targetParent = e.target.parentNode; 
    dragParent = draggingElement.parentNode; 

    targetParent.replaceChild(dragClone, e.target); 
    dragParent.replaceChild(targetClone, draggingElement); 

    addListeners(dragClone, targetClone);
  }
}

const shuffleButton = document.getElementById('shuffle'); 

shuffleButton.addEventListener('click', shuffleElements); 

function fyShuffle(array) {
  var m = array.length, t, i;
  while (m) {

    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
} 

function shuffleElements() {

  containers.forEach(container => {
    let array = Array.prototype.slice.call(container.children); 
    let shuffledArray = fyShuffle([...array]); 
    for (let i = 0; i < array.length; i++) {
      container.append(shuffledArray[i])
    }
  })
}

const resetButton = document.getElementById('reset'); 
resetButton.addEventListener('click', resetElements); 

const boxArray = Array.prototype.slice.call(draggables);

function resetElements() {

  for (let container of containers) {
    while (container.firstChild) {
      container.removeChild(container.lastChild); 
    }
  }
  
  for (let box of boxArray) {
    firstContainer.append(box); 
  }
}
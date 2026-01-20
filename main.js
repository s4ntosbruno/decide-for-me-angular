const

window.onload = onInit();

function selectRandomThingToDo() {
  const randomIndex = Math.floor(Math.random() * defaultThingsToDo.length);
  // const randomThingToDo = defaultThingsToDo[randomIndex];

  const list = document
    .getElementById("things-to-do")
    .getElementsByTagName("li");
  const randomThingToDo = list[randomIndex].textContent;

  const p = document.getElementById("random-thing-to-do");
  p.textContent = `${randomThingToDo}`;
}

function onInit() {
  showDefaultThigsToDo();
}

function showDefaultThigsToDo() {
  const list = document.getElementById("things-to-do");
  defaultThingsToDo.forEach((thing) => {
    createThingToDo(thing.name);
  });
}

function createThingToDo(text) {
  const list = document.getElementById("things-to-do");
  const para = document.createElement("li");
  const node = document.createTextNode(text);
  para.appendChild(node);
  list.appendChild(para);
}

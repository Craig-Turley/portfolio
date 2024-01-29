import animejs from "https://esm.sh/animejs";

const blob = document.querySelector('.blob');

document.onmousemove = e => {
   blob.animate ({
     left: `${e.clientX}px`,
     top: `${e.clientY}px`
   }, { duration: 400, fill: "forwards" });
};

let columns = 0;
let rows = 0;

let cards = document.querySelectorAll('.card');

const createTiles = (quantity, card, cardIndex) => {
  Array.from(Array(quantity)).map((tile, index) => {
    card.appendChild(createTile(index, cardIndex));
  });
};

let toggled = [false, false, false, false];

const handleClick = (index, cardIndex) => {

  toggled[cardIndex] = !toggled[cardIndex];

  cards[cardIndex].querySelector('.icons').classList.toggle('toggled');

  animejs({
    targets: `.tile[data-card-index="${cardIndex}"]`,
    opacity: toggled[cardIndex] ? 0 : 1,
    delay: animejs.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = (index, cardIndex) => {

  let tile = document.createElement('div');

  tile.classList.add('tile');
  tile.dataset.cardIndex = cardIndex;

  tile.onclick = () => handleClick(index, cardIndex);

  return tile;

};

const createGrids = () => {

  columns = Math.floor(cards[0].clientWidth / 50);
  rows = Math.floor(cards[0].clientHeight / 50);

  cards.forEach((card, index) => {
    let icons = card.querySelector('.icons');
    let header = card.querySelector('.card-header');
    card.innerHTML = '';
    card.appendChild(header);
    card.appendChild(icons);
    
    card.style.setProperty('--columns', columns);
    card.style.setProperty('--rows', rows);
  
    createTiles(columns * rows, card, index);
  });

};

document.onresize = () => createGrids;

createGrids();
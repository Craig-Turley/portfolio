const blob = document.querySelector('.blob');

window.onmousemove = e => {
   blob.animate ({
     left: `${e.clientX}px`,
     top: `${e.clientY}px`
   }, { duration: 400, fill: "forwards" });
};
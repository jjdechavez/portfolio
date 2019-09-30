import jump from 'https://jjdechavez.netlify.com/node_modules/jump.js/dist/jump.module.js';

const project = document.querySelector('.project');
const landing = document.querySelector('.landing');
const btnScrollDown = document.querySelector('.scroll-down');
const btnUpArrow = document.querySelector('.up-arrow');

sal({
  once: false,
});

btnScrollDown.addEventListener('click', () => {
  jump(project, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false 
  });
});

btnUpArrow.addEventListener('click', () => {
  jump(landing, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false 
  });
});
import jump from './node_modules/jump.js/dist/jump.module.js';

const project = document.querySelector('.project');
const btnScrollDown = document.querySelector('.scroll-down');

btnScrollDown.addEventListener('click', () => {
  jump(project, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false 
  });
});
import jump from './script/jump';
import sal from 'sal.js';
import './styles/style.scss';

const project = document.querySelector('.project');
const btnScrollDown = document.querySelector('.scroll-down');
const element = (element) => document.querySelector(element);

sal({
  once: true,
});

btnScrollDown.addEventListener('click', () => {
  jump(project, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false
  });
});
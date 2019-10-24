// import jump from './script/jump';
// import sal from 'sal.js';
// import './styles/style.scss';

const project = document.querySelector('.project');
const btnScrollDown = document.querySelector('.scroll-down');
const element = (element) => document.querySelector(element);

// sal({
//   once: true,
// });

// btnScrollDown.addEventListener('click', () => {
//   jump(project, {
//     duration: 1800,
//     offset: 0,
//     callback: undefined,
//     a11y: false
//   });
// });


// function viewportChange(x) {
//   if (x.matches) { 
//     let click = false;

//     element('.open').addEventListener('click', () => {
//       click = !click;
//       if (click === false) {
//         element('.detail-img').style.display = 'none';
//         element('.more-details').style.display = 'inherit';
//       } else {
//         element('.detail-img').style.display = 'inherit';
//         element('.more-details').style.display = 'none';
//       }
//     });
//   } else {
//     element('.open').removeEventListner('click');
//   }
// }

// var x = window.matchMedia("(min-width: 587px)")
// viewportChange(x) // Call listener function at run time
// x.addListener(viewportChange) // Attach listener function on state changes

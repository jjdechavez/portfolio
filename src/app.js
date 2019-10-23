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

// if (window.matchMedia < 587) {
//   console.log('hit')

//   });
// }

function viewportChange(x) {
  if (x.matches) { 
    let click = false;

    element('.open').addEventListener('click', () => {
      click = !click;
      if (click === false) {
        element('.detail-img').style.display = 'none';
        element('.more-details').style.display = 'inherit';
      } else {
        element('.detail-img').style.display = 'inherit';
        element('.more-details').style.display = 'none';
      }
    });
  }
}

var x = window.matchMedia("(max-width: 587px)")
viewportChange(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

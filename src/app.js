import sal from 'sal.js';
import jump from 'jump.js';
import projects from './static/projects.json';
import images from './static/*.webp';

const jumpContainer = document.querySelector('main');
const btnScrollDown = document.querySelector('.scroll-down');

const Sal = sal({
  once: true,
});

if (btnScrollDown) {
  btnScrollDown.addEventListener('click', () => {
    jump(jumpContainer, {
      duration: 1800,
      offset: 0,
      callback: undefined,
      a11y: false,
    });
  });
}

const projectList = document.querySelector('#projects');

if (projectList) {
  const currentPathName = window.location.pathname;

  projects
    .filter((project) =>
      currentPathName === '/'
        ? project.type === 'EXPERCIENCE'
        : project.type === 'PERSONAL'
    )
    .map((project) => {
      const tile = document.createElement('article');
      tile.setAttribute('data-sal', 'slide-up');
      tile.setAttribute('data-sal-duration', '1200');
      tile.setAttribute('data-sal-delay', '300');
      tile.setAttribute('data-sal-easing', 'ease-out-bounce');
      tile.setAttribute('class', 'project-grid-item');

      tile.innerHTML = `
      <header>
        <a href="${project.link}" target="_blank" rel="noopener">
          <img class="detail-img" src="${images[project.coverImage]}" alt="${project.name}">
       </a>
      </header>
      <div class="project-detail project-flex-about">
        <h4 class="project-title">
          ${project.name}
          <small class="project-background">
            ${new Date(project.endedAt).getFullYear().toString()}
          </small>
        </h4>
        <p class="more-details">${project.description}</p>
        <p class="project-background">${project.technologies.join(', ')}</p>
      </div>
    `;
      projectList.appendChild(tile);
    });

  Sal.update();
}

import sal from 'sal.js';
import jump from 'jump.js';
import projects from './static/projects.json';
import images from './static/*.webp'

const jumpContainer = document.querySelector('.project');
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

console.log(import.meta.url)

const projectList = document.querySelector('#projects');

projects
  .filter((project) => project.type === 'EXPERCIENCE')
  .map((project) => {
    const tile = document.createElement('div');
    tile.setAttribute('data-sal', 'slide-up');
    tile.setAttribute('data-sal-duration', '1200');
    tile.setAttribute('data-sal-delay', '300');
    tile.setAttribute('data-sal-easing', 'ease-out-bounce');
    tile.setAttribute('class', 'project-grid-item project-flex-item');

    tile.innerHTML = `
      <a href="${project.link}" target="_blank" rel="noopener">
      <img class="detail-img" src="${images[project.coverImage]}" alt="${
      project.name
    }">
      </a>
      <div class="project-detail project-flex-about">
        <p class="project-title">
          ${project.name}
          <span class="project-background">
            ${new Date(project.endedAt).getFullYear().toString()}
          </span>
        </p>
        <p class="more-details">${project.description}</p>
        <p class="project-background">${project.technologies.join(', ')}</p>
      </div>
    `;
    projectList.appendChild(tile);
  });

Sal.update();

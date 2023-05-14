import jump from 'jump.js'
import autosize from 'autosize'

export const flags = ({ env }) => {
  // Called before our Elm application starts
  return {
    projects: JSON.parse(window.localStorage["x-projects"] ?? null),
    noteData: JSON.parse(window.localStorage["x-notes"] ?? null),
  }
}

export const onReady = ({ env, app }) => {
  // Called after our Elm application starts
  const ports = app.ports;
  if (ports && ports.sendToLocalStorage) {
    ports.sendToLocalStorage.subscribe(({ key, value }) => {
      window.localStorage[key] = JSON.stringify(value);
    })
  }

  if (ports && ports.scrollToProjects) {
    ports.scrollToProjects.subscribe(jumping => {
      const jumpContainer = document.querySelector('main');

      if (jumping) {
        jump(jumpContainer, {
          duration: 1800,
          offset: -100,
          callback: undefined,
          a11y: false,
        });
      }
    })
  }

  if (ports && ports.autosizeTextarea) {
    ports.autosizeTextarea.subscribe(() => {
      autosize(document.querySelectorAll('textarea'));
    });
  }
}

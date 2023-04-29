import jump from 'jump.js'
import sal from 'sal.js'


export const flags = ({ env }) => {
  // Called before our Elm application starts
  return {
    projects: JSON.parse(window.localStorage["x-projects"] ?? null)
  }
}

export const onReady = ({ env, app }) => {
  // Called after our Elm application starts
  const Sal = sal({
    once: true,
  });

  const ports = app.ports;
  if (ports && ports.sendToLocalStorage) {
    app.ports.sendToLocalStorage.subscribe(({ key, value }) => {
      window.localStorage[key] = JSON.stringify(value);
    })
  }

  if (ports && ports.scrollToProjects) {
    app.ports.scrollToProjects.subscribe(jumping => {
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

  if (ports && ports.updateSal) {
    app.ports.updateSal.subscribe(() => {
      Sal.reset();
    })
  }
}


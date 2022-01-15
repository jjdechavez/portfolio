import sal from "sal.js";
import jump from "jump.js";

const project = document.querySelector(".project");
const btnScrollDown = document.querySelector(".scroll-down");

sal({
  once: true,
});

btnScrollDown.addEventListener("click", () => {
  jump(project, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false,
  });
});

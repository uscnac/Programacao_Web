import { TAMX } from "./config.js";
import { space } from "./space.js";

export const ufos = [];

export function createRandomUFO(speedMultiplier = 1) {
  if (Math.random() < 0.002) {
    const ufo = document.createElement("img");
    ufo.className = "enemy-ufo";
    ufo.src = "assets/png/enemyUFO.png";
    ufo.style.position = "absolute";
    ufo.style.top = "-40px";
    ufo.style.left = `${Math.random() * (TAMX - 50)}px`;
    space.element.appendChild(ufo);

    ufos.push({ element: ufo, direction: Math.random() < 0.5 ? 1 : -1 });
  }
}

export function moveUFOs(speedMultiplier = 1) {
  ufos.forEach((ufo, index) => {
    let top = parseInt(ufo.element.style.top);
    let left = parseInt(ufo.element.style.left);

    top += 2 * speedMultiplier;
    left += ufo.direction * 1.5 * speedMultiplier;

    if (left <= 0) ufo.direction = 1;
    if (left >= TAMX - ufo.element.width) ufo.direction = -1;

    ufo.element.style.top = `${top}px`;
    ufo.element.style.left = `${left}px`;

    if (top > space.element.clientHeight) {
      ufo.element.remove();
      ufos.splice(index, 1);
    }
  });
}

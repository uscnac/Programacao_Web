import { TAMX } from "./config.js";
import { space } from "./space.js";

export const meteors = [];

export function createRandomMeteor(speedMultiplier = 1) {
  if (Math.random() < 0.003) {
    const meteor = document.createElement("img");
    meteor.className = "meteor";
    meteor.src = Math.random() < 0.5 ? "assets/png/meteorBig.png" : "assets/png/meteorSmall.png";
    meteor.style.position = "absolute";
    meteor.style.top = "-50px";

    // Decide se meteoros entram da esquerda ou direita
    const fromLeft = Math.random() < 0.5;
    meteor.style.left = fromLeft ? "-50px" : `${TAMX + 50}px`;

    space.element.appendChild(meteor);

    meteors.push({
      element: meteor,
      direction: fromLeft ? 1 : -1,
      speedX: (Math.random() * 2 + 1) * speedMultiplier,
      speedY: (Math.random() * 2 + 1) * speedMultiplier,
    });
  }
}

export function moveMeteors(speedMultiplier = 1) {
  meteors.forEach((meteor, index) => {
    let top = parseInt(meteor.element.style.top);
    let left = parseInt(meteor.element.style.left);

    top += meteor.speedY;
    left += meteor.speedX * meteor.direction;

    meteor.element.style.top = `${top}px`;
    meteor.element.style.left = `${left}px`;

    // Remove meteoros fora da tela
    if (
      top > space.element.clientHeight ||
      left < -100 ||
      left > TAMX + 100
    ) {
      meteor.element.remove();
      meteors.splice(index, 1);
    }
  });
}

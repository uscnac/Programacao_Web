import { space } from "./space.js";

export const shots = [];

export function createShot(shipElement) {
  const shot = document.createElement("img");
  shot.src = "assets/png/laserGreenShot.png";
  shot.style.position = "absolute";
  shot.style.width = "10px";
  shot.style.height = "30px";

  const shipRect = shipElement.getBoundingClientRect();
  const parentRect = space.element.getBoundingClientRect();
  const left = shipElement.offsetLeft + shipElement.width / 2 - 5;
  const bottom = parseInt(shipElement.style.bottom) + shipElement.height;

  shot.style.left = `${left}px`;
  shot.style.bottom = `${bottom}px`;

  space.element.appendChild(shot);
  shots.push({ element: shot });
}

export function moveShots() {
  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i];
    let bottom = parseInt(shot.element.style.bottom);
    bottom += 10; 
    if (bottom > space.element.clientHeight) {
      shot.element.remove();
      shots.splice(i, 1);
    } else {
      shot.element.style.bottom = `${bottom}px`;
    }
  }
}

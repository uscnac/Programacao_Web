import { TAMX } from "./config.js";
import { space } from "./space.js";

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
];

class Ship {
  constructor() {
    this.element = document.createElement("img");
    this.element.id = "ship";
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.element.style.bottom = "20px";
    this.element.style.left = `${TAMX / 2 - 50}px`;
    space.element.appendChild(this.element);

    this.isDamaged = false;
    this.damageTimeout = null;
  }

  changeDirection(giro) {
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro;

    if (!this.isDamaged) {
      this.element.src = directions[this.direction];
    }
  }

  move(speedMultiplier = 1) {
    const speed = 2 * speedMultiplier;
    if (this.direction === 0) {
      let newLeft = parseInt(this.element.style.left) - speed;
      if (newLeft < 0) newLeft = 0;
      this.element.style.left = `${newLeft}px`;
    }
    if (this.direction === 2) {
      let newLeft = parseInt(this.element.style.left) + speed;
      if (newLeft > TAMX - this.element.width) newLeft = TAMX - this.element.width;
      this.element.style.left = `${newLeft}px`;
    }
  }

  showDamaged() {
    if (this.isDamaged) return; 

    this.isDamaged = true;
    this.element.src = "assets/png/playerDamaged.png";

    this.damageTimeout = setTimeout(() => {
      this.isDamaged = false;
      this.element.src = directions[this.direction];
    }, 5000);
  }
}

export const ship = new Ship();

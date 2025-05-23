import { FPS } from "./config.js";
import { space } from "./space.js";
import { ship } from "./ship.js";
import { createRandomEnemyShip, moveEnemyShips, enemyShips } from "./enemyShip.js";
import { createRandomUFO, moveUFOs, ufos } from "./enemyUFO.js";
import { createRandomMeteor, moveMeteors, meteors } from "./meteor.js";
import { shots, createShot, moveShots } from "./shots.js";

let score = 0;
let lives = 3;
let speedMultiplier = 1;
let paused = false; 

const scoreElement = document.createElement("div");
const livesElement = document.createElement("div");

function initUI() {
  scoreElement.style.position = "absolute";
  scoreElement.style.top = "10px";
  scoreElement.style.left = "10px";
  scoreElement.style.color = "white";
  scoreElement.style.fontSize = "20px";

  livesElement.style.position = "absolute";
  livesElement.style.top = "10px";
  livesElement.style.right = "10px";
  livesElement.style.color = "white";
  livesElement.style.fontSize = "20px";

  space.element.appendChild(scoreElement);
  space.element.appendChild(livesElement);

  updateUI();
}

function updateUI() {
  scoreElement.textContent = `Pontuação: ${score}`;
  livesElement.textContent = `Vidas: ${lives}`;
}

function checkCollisions() {
  if (paused) return; 

  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i];
    for (let j = enemyShips.length - 1; j >= 0; j--) {
      const enemy = enemyShips[j];
      if (isColliding(shot.element, enemy.element)) {
        enemy.element.remove();
        enemyShips.splice(j, 1);

        shot.element.remove();
        shots.splice(i, 1);

        score += 10;
        updateUI();
        break;
      }
    }
  }

  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i];
    for (let j = ufos.length - 1; j >= 0; j--) {
      const ufo = ufos[j];
      if (isColliding(shot.element, ufo.element)) {
        ufo.element.remove();
        ufos.splice(j, 1);

        shot.element.remove();
        shots.splice(i, 1);

        score += 20;
        updateUI();
        break;
      }
    }
  }

  for (let i = shots.length - 1; i >= 0; i--) {
    const shot = shots[i];
    for (let j = meteors.length - 1; j >= 0; j--) {
      const meteor = meteors[j];
      if (isColliding(shot.element, meteor.element)) {
        meteor.element.remove();
        meteors.splice(j, 1);

        shot.element.remove();
        shots.splice(i, 1);

        score += 5;
        updateUI();
        break;
      }
    }
  }

  for (let i = enemyShips.length - 1; i >= 0; i--) {
    const enemy = enemyShips[i];
    if (isColliding(enemy.element, ship.element)) {
      enemy.element.remove();
      enemyShips.splice(i, 1);
      lives--;
      ship.showDamaged();
      updateUI();
      if (lives <= 0) {
        gameOver();
      }
    }
  }

  for (let i = ufos.length - 1; i >= 0; i--) {
    const ufo = ufos[i];
    if (isColliding(ufo.element, ship.element)) {
      ufo.element.remove();
      ufos.splice(i, 1);
      lives--;
      ship.showDamaged();
      updateUI();
      if (lives <= 0) {
        gameOver();
      }
    }
  }

  for (let i = meteors.length - 1; i >= 0; i--) {
    const meteor = meteors[i];
    if (isColliding(meteor.element, ship.element)) {
      meteor.element.remove();
      meteors.splice(i, 1);
      lives--;
      ship.showDamaged();
      updateUI();
      if (lives <= 0) {
        gameOver();
      }
    }
  }
}

function isColliding(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.left > r2.right ||
    r1.right < r2.left
  );
}

function gameOver() {
  alert(`Game Over! Sua pontuação final foi: ${score}`);
  window.location.reload();
}

function increaseDifficulty() {
  if (!paused) {
    speedMultiplier += 0.1;
  }
}

function run() {
  if (paused) return; 

  space.move();
  ship.move(speedMultiplier);
  createRandomEnemyShip(speedMultiplier);
  moveEnemyShips(speedMultiplier);
  createRandomUFO(speedMultiplier);
  moveUFOs(speedMultiplier);
  createRandomMeteor(speedMultiplier);
  moveMeteors(speedMultiplier);
  moveShots();
  checkCollisions();
}

function init() {
  initUI();
  setInterval(run, 1000 / FPS);
  setInterval(increaseDifficulty, 60 * 1000); 
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.changeDirection(-1);
  if (e.key === "ArrowRight") ship.changeDirection(+1);
  if (e.key === " ") createShot(ship.element);
  if (e.key.toLowerCase() === "p") {
    paused = !paused;
    console.log(paused ? "Jogo pausado" : "Jogo retomado");
  }
});

init();

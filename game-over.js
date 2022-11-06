import {
  fill,
  height,
  keyCode,
  millis,
  text,
  textFont,
  textSize,
  width,
} from './_snowpack/pkg/p8gjs.js';
import { Ball } from './ball.js';
import { CONTEXT, createBricks } from './context.js';
import { GAME, GAME_OVER, RED, WHITE } from './defaults.js';
import { MainScene } from './main-scene.js';

export class GameOver extends MainScene {
  constructor() {
    super(GAME_OVER);
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
    fill(WHITE);
    textSize(16);
    if (Math.floor(millis() / 1000) % 2) {
      text('Press enter to restart', width / 2 - 83, height / 2 + 25);
    }
    textFont(CONTEXT.font);
    textSize(32);
    text('Game over', width / 2 - 110, height / 2);
  }

  keyPressed() {
    if (keyCode == 257) {
      CONTEXT.timer.reset().start();
      CONTEXT.ball = new Ball(RED);
      CONTEXT.activeSceneIndex = GAME;
      CONTEXT.lives = 3;
      CONTEXT.score = 0;
      CONTEXT.bricks = createBricks();
    }
  }
}

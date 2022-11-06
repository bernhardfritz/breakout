import {
  fill,
  height,
  keyCode,
  millis,
  text,
  textFont,
  textSize,
  width,
} from 'p8g.js';
import { Ball } from './ball';
import { CONTEXT, createBricks } from './context';
import { GAME, RED, VICTORY, WHITE } from './defaults';
import { MainScene } from './main-scene';

export class Victory extends MainScene {
  constructor() {
    super(VICTORY);
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
    fill(WHITE);
    textSize(16);
    if (Math.floor(millis() / 1000) % 2) {
      text('Press enter to play again', width / 2 - 97, height / 2 + 25);
    }
    textFont(CONTEXT.font);
    textSize(32);
    text('You won!', width / 2 - 91, height / 2);
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

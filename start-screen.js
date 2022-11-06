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
import { CONTEXT } from './context.js';
import { GAME, RED, START_SCREEN, WHITE } from './defaults.js';
import { MainScene } from './main-scene.js';

export class StartScreen extends MainScene {
  constructor() {
    super(START_SCREEN);
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
    fill(WHITE);
    textSize(16);
    if (Math.floor(millis() / 1000) % 2) {
      text('Press enter to start', width / 2 - 75, height / 2 + 25);
    }
    textFont(CONTEXT.font);
    textSize(32);
    text('Breakout', width / 2 - 100, height / 2);
  }

  keyPressed() {
    if (keyCode == 257) {
      CONTEXT.timer.start();
      CONTEXT.ball = new Ball(RED);
      CONTEXT.activeSceneIndex = GAME;
    }
  }
}

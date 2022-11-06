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
import { CONTEXT } from './context';
import { GAME, RED, START_SCREEN, WHITE } from './defaults';
import { MainScene } from './main-scene';

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

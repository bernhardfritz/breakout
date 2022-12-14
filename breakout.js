import p8g, { createCanvas, randomSeed } from 'p8g.js';
import { CONTEXT } from './context';
import { GAME_OVER, HEIGHT, START_SCREEN, VICTORY, WIDTH } from './defaults';

randomSeed(new Date().getTime());

p8g.draw = () => {
  CONTEXT.scenes[CONTEXT.activeSceneIndex].update();
  CONTEXT.scenes[CONTEXT.activeSceneIndex].draw();
};

p8g.keyPressed = () => {
  switch (CONTEXT.activeSceneIndex) {
    case START_SCREEN:
      CONTEXT.scenes[START_SCREEN].keyPressed();
      break;
    case GAME_OVER:
      CONTEXT.scenes[GAME_OVER].keyPressed();
      break;
    case VICTORY:
      CONTEXT.scenes[VICTORY].keyPressed();
  }
};

const canvasWrapper = document.getElementById('canvas-wrapper');
const canvas = createCanvas(WIDTH, HEIGHT);
canvasWrapper.appendChild(canvas);

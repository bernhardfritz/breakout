import { height, width } from 'p8g.js';
import { CONTEXT } from './context';
import { BRICK_WIDTH, GAME, GAME_OVER, VICTORY } from './defaults';
import { MainScene } from './main-scene';

export class Game extends MainScene {
  constructor() {
    super(GAME);
  }

  update() {
    super.update();
    if (CONTEXT.lives == 0) {
      CONTEXT.activeSceneIndex = GAME_OVER;
      return;
    }
    if (CONTEXT.bricks.length === 0) {
      CONTEXT.activeSceneIndex = VICTORY;
      return;
    }
    CONTEXT.ball.update(
      2 * BRICK_WIDTH,
      width - BRICK_WIDTH,
      height,
      BRICK_WIDTH,
    );
  }

  draw() {
    super.draw();
    CONTEXT.ball.draw();
  }
}

import {
  background,
  CORNERS,
  fill,
  height,
  noSmooth,
  noStroke,
  pop,
  push,
  rect,
  rectMode,
  text,
  textFont,
  textSize,
  width,
} from 'p8g.js';
import { CONTEXT } from './context';
import { BRICK_WIDTH, GRAY, WALL_THICKNESS } from './defaults';
import { Scene } from './scene';

export class MainScene extends Scene {
  constructor(gameState) {
    super(gameState);
  }

  update() {
    CONTEXT.paddle.update(BRICK_WIDTH, width - BRICK_WIDTH);
  }

  draw() {
    push();
    noSmooth();
    background(0);
    this.drawBoundaries();
    CONTEXT.bricks.forEach((brick) => brick.draw());
    CONTEXT.paddle.draw();
    noStroke();
    textFont(CONTEXT.font);
    textSize(32);
    fill(GRAY);
    const score = `${CONTEXT.score}`;
    text(`Lives: ${CONTEXT.lives}`, 7, 26);
    text(`Score: ${score.padStart(4, '0')}`, width - 258, 26);
    pop();
  }

  drawBoundaries() {
    push();
    fill(GRAY);
    noStroke();
    rectMode(CORNERS);
    rect(0, WALL_THICKNESS, width, 2 * WALL_THICKNESS);
    rect(0, 2 * WALL_THICKNESS, WALL_THICKNESS, height);
    rect(width - WALL_THICKNESS, 2 * WALL_THICKNESS, width, height);
    pop();
  }
}

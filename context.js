import { loadFont } from 'p8g.js';
import Victor from 'victor';
import { Brick } from './brick';
import {
  BLUE,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  BROWN,
  GREEN,
  HEIGHT,
  ORANGE,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  RED,
  START_SCREEN,
  WALL_THICKNESS,
  WIDTH,
  YELLOW,
} from './defaults';
import { Game } from './game';
import { GameOver } from './game-over';
import { Paddle } from './paddle';
import { StartScreen } from './start-screen';
import { Timer } from './timer';
import { Victory } from './victory';

export const createBricks = () => {
  const colors = [RED, ORANGE, BROWN, YELLOW, GREEN, BLUE];
  const bricks = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 18; col++) {
      bricks.push(
        new Brick(
          new Victor(
            WALL_THICKNESS + BRICK_WIDTH / 2 + col * BRICK_WIDTH,
            WALL_THICKNESS +
              WALL_THICKNESS +
              48 +
              BRICK_HEIGHT / 2 +
              row * BRICK_HEIGHT,
          ),
          new Victor(BRICK_WIDTH / 2, BRICK_HEIGHT / 2),
          colors[row],
        ),
      );
    }
  }
  return bricks;
};

export const CONTEXT = {
  lives: 3,
  score: 0,
  timer: new Timer(),
  bricks: createBricks(),
  paddle: new Paddle(
    new Victor(WIDTH / 2, HEIGHT - BRICK_WIDTH - PADDLE_HEIGHT / 2),
    new Victor(PADDLE_WIDTH / 2, PADDLE_HEIGHT / 2),
    RED,
  ),
  ball: null,
  font: await loadFont('upheavtt.ttf'),
  scenes: [new StartScreen(), new Game(), new GameOver(), new Victory()],
  activeSceneIndex: START_SCREEN,
};

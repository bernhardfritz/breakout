import {
  deltaTime,
  fill,
  noStroke,
  pop,
  push,
  RADIUS,
  random,
  rect,
  rectMode,
  text,
  textSize,
} from './_snowpack/pkg/p8gjs.js';
import Victor from './_snowpack/pkg/victor.js';
import { AABB } from './aabb.js';
import { CONTEXT } from './context.js';
import {
  BALL_RADIUS,
  BALL_RESPAWN_DELAY,
  BALL_SPEED,
  BLUE,
  BRICK_WIDTH,
  BROWN,
  GREEN,
  HEIGHT,
  ORANGE,
  RED,
  WHITE,
  WIDTH,
  YELLOW,
} from './defaults.js';
import { Timer } from './timer.js';
import { clamp } from './utils.js';

export class Ball extends AABB {
  constructor(color) {
    super(new Victor(0, 0), new Victor(BALL_RADIUS, BALL_RADIUS));
    this._color = color;
    this.respawn();
  }

  respawn() {
    this.center = new Victor(
      random(2 * BRICK_WIDTH, WIDTH - 2 * BRICK_WIDTH),
      HEIGHT / 2 + 60,
    );
    this._velocity = new Victor(random(-BALL_SPEED, BALL_SPEED), BALL_SPEED);
    this._prevCenters = Array.from(new Array(7), () => this.center.clone());
    this._respawnTimer = new Timer().start();
  }

  update(topBoundary, rightBoundary, bottomBoundary, leftBoundary) {
    if (this._respawnTimer.elapsed < BALL_RESPAWN_DELAY) {
      return;
    }
    if (
      (this._velocity.x < 0 && this.left < leftBoundary) ||
      (this._velocity.x > 0 && this.right > rightBoundary)
    ) {
      this._velocity.x *= -1;
    }
    if (this._velocity.y < 0 && this.top < topBoundary) {
      this._velocity.y *= -1;
    } else if (this._velocity.y > 0 && this.bottom > bottomBoundary) {
      CONTEXT.lives--;
      this.respawn();
      return;
    }
    if (this._velocity.y > 0 && this.intersects(CONTEXT.paddle)) {
      this._velocity.x = clamp(
        this._velocity.x + CONTEXT.paddle.horizontalVelocity,
        -BALL_SPEED,
        BALL_SPEED,
      );
      this._velocity.y *= -1;
    }
    for (let i = 0; i < CONTEXT.bricks.length; i++) {
      const brick = CONTEXT.bricks[i];
      if (!this.intersects(brick)) {
        continue;
      }
      if (
        (this._velocity.x > 0 && this.center.x < brick.left) ||
        (this._velocity.x < 0 && brick.right < this.center.x)
      ) {
        this._velocity.x *= -1;
      }
      if (
        (this._velocity.y > 0 && this.center.y < brick.top) ||
        (this._velocity.y < 0 && brick.bottom < this.center.y)
      ) {
        this._velocity.y *= -1;
      }
      const elapsed = CONTEXT.timer.elapsed;
      switch (brick.color) {
        case RED:
          CONTEXT.score += Math.max(1, 150 - Math.floor(elapsed / 10_000));
          break;
        case ORANGE:
          CONTEXT.score += Math.max(1, 125 - Math.floor(elapsed / 10_000));
          break;
        case BROWN:
          CONTEXT.score += Math.max(1, 100 - Math.floor(elapsed / 10_000));
          break;
        case YELLOW:
          CONTEXT.score += Math.max(1, 75 - Math.floor(elapsed / 10_000));
          break;
        case GREEN:
          CONTEXT.score += Math.max(1, 50 - Math.floor(elapsed / 10_000));
          break;
        case BLUE:
          CONTEXT.score += Math.max(1, 25 - Math.floor(elapsed / 10_000));
          break;
      }
      CONTEXT.bricks.splice(i, 1);
      break;
    }
    this._prevCenters.shift();
    this._prevCenters.push(this.center.clone());
    const deltaSpace = new Victor(
      this._velocity.x * deltaTime,
      this._velocity.y * deltaTime,
    );
    this.center.add(deltaSpace);
  }

  draw() {
    push();
    noStroke();
    if (this._respawnTimer.elapsed < BALL_RESPAWN_DELAY) {
      fill(WHITE);
      textSize(16);
      text(
        `${3 - Math.floor(this._respawnTimer.elapsed / 1000)}`,
        this.center.x + 67 * this._velocity.x - 4,
        this.center.y + 67 * this._velocity.y + 8,
      );
    }
    rectMode(RADIUS);
    this.drawTrail();
    fill(this._color);
    rect(
      this.center.x,
      this.center.y,
      this.halfDimension.x,
      this.halfDimension.y,
    );
    pop();
  }

  drawTrail() {
    const color = [...this._color];
    for (let i = 0; i < this._prevCenters.length; i++) {
      const pct = 1 - (i + 1) / this._prevCenters.length;
      fill(color[0], color[1], color[2], pct * color[3]);
      rect(
        this._prevCenters[this._prevCenters.length - 1 - i].x,
        this._prevCenters[this._prevCenters.length - 1 - i].y,
        pct * this.halfDimension.x,
        pct * this.halfDimension.y,
      );
    }
  }
}

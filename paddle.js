import {
  deltaTime,
  fill,
  mouseX,
  noStroke,
  pop,
  push,
  RADIUS,
  rect,
  rectMode,
} from './_snowpack/pkg/p8gjs.js';
import { AABB } from './aabb.js';

export class Paddle extends AABB {
  constructor(center, halfDimension, color) {
    super(center, halfDimension);
    this._color = color;
    this._prevCenter = center.clone();
    this._deltaIndex = 0;
    this._deltas = new Array(10).fill(0);
  }

  get horizontalVelocity() {
    return (
      this._deltas.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) / this._deltas.length
    );
  }

  update(leftBoundary, rightBoundary) {
    this._prevCenter = this.center.clone();
    this.center.x = mouseX;
    if (this.left < leftBoundary) {
      this.left = leftBoundary;
    } else if (this.right > rightBoundary) {
      this.right = rightBoundary;
    }
    this._deltas[this._deltaIndex] =
      (this.center.x - this._prevCenter.x) / deltaTime;
    this._deltaIndex = (this._deltaIndex + 1) % this._deltas.length;
  }

  draw() {
    push();
    fill(this._color);
    noStroke();
    rectMode(RADIUS);
    rect(
      this.center.x,
      this.center.y,
      this.halfDimension.x,
      this.halfDimension.y,
    );
    pop();
  }
}

import { fill, noStroke, pop, push, RADIUS, rect, rectMode } from './_snowpack/pkg/p8gjs.js';
import { AABB } from './aabb.js';

export class Brick extends AABB {
  constructor(center, halfDimension, color) {
    super(center, halfDimension);
    this._color = color;
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

  get color() {
    return this._color;
  }
}

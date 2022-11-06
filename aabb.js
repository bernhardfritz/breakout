export class AABB {
  constructor(center, halfDimension) {
    this.center = center;
    this.halfDimension = halfDimension;
  }

  get top() {
    return this.center.y - this.halfDimension.y;
  }

  set top(top) {
    this.center.y = top + this.halfDimension.y;
  }

  get right() {
    return this.center.x + this.halfDimension.x;
  }

  set right(right) {
    this.center.x = right - this.halfDimension.x;
  }

  get bottom() {
    return this.center.y + this.halfDimension.y;
  }

  set bottom(bottom) {
    this.center.y = bottom - this.halfDimension.y;
  }

  get left() {
    return this.center.x - this.halfDimension.x;
  }

  set left(left) {
    this.center.x = left + this.halfDimension.x;
  }

  intersects(that) {
    const sum = this.halfDimension.clone().add(that.halfDimension);
    return (
      Math.abs(this.center.x - that.center.x) <= sum.x &&
      Math.abs(this.center.y - that.center.y) <= sum.y
    );
  }
}

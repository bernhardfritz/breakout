import { millis } from 'p8g.js';

export class Timer {
  constructor() {
    this._paused = true;
    this._startTime = 0;
    this._elapsed = 0;
  }

  start() {
    if (!this._paused) {
      return;
    }
    this._startTime = millis();
    this._paused = false;
    return this;
  }

  stop() {
    if (this._paused) {
      return;
    }
    this._elapsed += millis() - this._startTime;
    this._paused = true;
    return this;
  }

  reset() {
    this._paused = true;
    this._startTime = 0;
    this._elapsed = 0;
    return this;
  }

  get elapsed() {
    return this._paused
      ? this._elapsed
      : this._elapsed + millis() - this._startTime;
  }
}

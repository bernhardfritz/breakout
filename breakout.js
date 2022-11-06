import p8g, { background, createCanvas, rect } from 'p8g.js';

p8g.draw = () => {
  background(220);
  rect(50, 50, 100, 100);
};

createCanvas(320, 320);

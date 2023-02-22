import P5 from "p5";

interface PlayerProps {
  size: number;
  initialX: number;
  initialY: number;
}

class Player {
  _p5: P5;

  pos: P5.Vector;
  speed: P5.Vector;
  acceleration: P5.Vector;

  // mass: number;
  size: number;

  constructor(p5: P5, { size, initialX, initialY }: PlayerProps) {
    this._p5 = p5;
    this.pos = p5.createVector(initialX, initialY);
    this.speed = p5.createVector();
    this.acceleration = p5.createVector(0, 1);
    this.size = size;
  }

  update() {
    const p5 = this._p5;
    this.speed.add(this.acceleration);
    this.pos.add(this.speed);

    if (this.pos.y > p5.height - this.size)
      this.pos.y = p5.height - this.size;
  }

  draw() {
    const p5 = this._p5;

    p5.push();
    
    p5.fill("purple");
    p5.noStroke();
    p5.rect(this.pos.x, this.pos.y, this.size, this.size);

    p5.pop();
  }
}

export default Player;
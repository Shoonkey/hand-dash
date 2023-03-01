import P5 from "p5";
import { GRAVITY, GROUND_HEIGHT } from "../constants";

interface PlayerProps {
  size: number;
  initialX: number;
  initialY: number;
}

class Player {
  private _p5: P5;

  pos: P5.Vector;
  speed: P5.Vector;
  acceleration: P5.Vector;
  size: number;
  isJumping: boolean;
  gravity: P5.Vector;

  constructor(p5: P5, { size, initialX, initialY }: PlayerProps) {
    this._p5 = p5;

    this.pos = p5.createVector(initialX, initialY);
    this.size = size;

    this.speed = p5.createVector();
    this.acceleration = p5.createVector();
    this.gravity = p5.createVector(0, GRAVITY);

    this.isJumping = false;
  }

  applyForce(force: P5.Vector) { 
    this.acceleration.add(force);
  }

  jump() {
    if (this.isJumping)
      return;
    
    this.applyForce(this._p5.createVector(0, -15));
    this.isJumping = true;
  }

  update() {
    const p5 = this._p5;

    this.applyForce(this.gravity);

    this.speed.add(this.acceleration);
    this.pos.add(this.speed);
    this.acceleration.mult(0);

    if (this.pos.y > p5.height - this.size - GROUND_HEIGHT) {
      this.speed.mult(0);
      this.pos.y = p5.height - this.size - GROUND_HEIGHT;
      this.isJumping = false;
    }
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
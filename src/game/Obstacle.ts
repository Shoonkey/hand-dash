import P5 from "p5";

import { GROUND_HEIGHT, SPEED } from "./constants";
import Player from "./Player";

interface ObstacleProps {
  spikeWidth: number;
  spikeHeight: number;
  amountOfSpikes: number;
}

class Obstacle {
  private _p5: P5;

  pos: P5.Vector;
  spikeWidth: number;
  spikeHeight: number;
  amountOfSpikes: number;
  color: "red" | "black";

  constructor(
    p5: P5,
    { spikeWidth, spikeHeight, amountOfSpikes }: ObstacleProps
  ) {
    this._p5 = p5;
    this.pos = p5.createVector(p5.width, p5.height - GROUND_HEIGHT);
    this.spikeWidth = spikeWidth;
    this.spikeHeight = spikeHeight;
    this.amountOfSpikes = amountOfSpikes;
    this.color = "black";
  }

  isOffscreen() {
    return this.pos.x + this.amountOfSpikes * this.spikeWidth < 0;
  }

  collidesWith(player: Player) {
    return (
      player.pos.x + player.size >= this.pos.x &&
      player.pos.y + player.size >= this.pos.y
    );
  }

  update() {
    this.pos.x -= SPEED;
  }

  draw() {
    const p5 = this._p5;

    p5.push();

    p5.noStroke();
    p5.fill("black");

    for (let i = 0; i < this.amountOfSpikes; i++)
      p5.triangle(
        this.pos.x + this.spikeWidth * i,
        this.pos.y,
        this.pos.x + this.spikeWidth * (i + 1),
        this.pos.y,
        this.pos.x + (this.spikeWidth * (i + 1) + this.spikeWidth * i) / 2,
        this.pos.y - this.spikeHeight
      );

    p5.pop();
  }
}

export default Obstacle;

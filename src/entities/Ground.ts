import P5 from "p5";

interface GroundProps {
  height: number;
}

class Ground {
  _p5: P5;
  height: number;

  constructor(p5: P5, { height }: GroundProps) {
    this._p5 = p5;
    this.height = height;
  }

  draw() {
    const p5 = this._p5;

    p5.push();

    p5.noStroke();
    p5.fill("green");
    p5.rect(0, p5.height - this.height, p5.width, this.height);

    p5.pop();
  }
}

export default Ground;

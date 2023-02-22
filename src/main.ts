
import P5 from "p5";

import Player from "./entities/Player";

const sketch = (p5: P5) => {
  let player: Player;

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent("#app");
    player = new Player(p5, { initialX: 100, initialY: 100, size: 100 });
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    player = new Player(p5, { initialX: 100, initialY: 100, size: 100 });
  }

  p5.draw = () => {
    p5.background("#2b2b2b");
    player.update();
    player.draw();
  }

}

new P5(sketch);
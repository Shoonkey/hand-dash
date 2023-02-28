import P5 from "p5";

import Ground from "./entities/Ground";
import Player from "./entities/Player";
import { GRAVITY, GROUND_HEIGHT, PLAYER_SIZE } from "./constants";

const sketch = (p5: P5) => {
  let player: Player;
  let ground: Ground;
  let gravity;

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent("#app");

    gravity = p5.createVector(0, GRAVITY);
    ground = new Ground(p5, { height: GROUND_HEIGHT });

    player = new Player(p5, {
      initialX: 100,
      initialY: p5.windowHeight - GROUND_HEIGHT - PLAYER_SIZE * 2.5,
      size: PLAYER_SIZE,
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background("#2b2b2b");

    ground.draw();

    let gravity = p5.createVector(0, GRAVITY);
    player.applyForce(gravity);

    player.update();
    player.draw();
  };

  p5.keyPressed = (event: KeyboardEvent) => {
    if (event.key === " ") player.jump();
  };
};

new P5(sketch);

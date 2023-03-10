import P5 from "p5";

import Ground from "./Ground";
import Player from "./Player";
import Obstacle from "./Obstacle";
import { GROUND_HEIGHT, PLAYER_SIZE } from "./constants";

const sketch = (p5: P5) => {
  let player: Player;
  let ground: Ground;
  let obstacles: Obstacle[];

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth - 100, p5.windowHeight - 100);
    canvas.parent("#canvas-container");

    ground = new Ground(p5, { height: GROUND_HEIGHT });
    player = new Player(p5, {
      initialX: 100,
      initialY: p5.windowHeight - GROUND_HEIGHT - PLAYER_SIZE * 2.5,
      size: PLAYER_SIZE,
    });
    obstacles = [
      new Obstacle(p5, {
        spikeWidth: PLAYER_SIZE * 0.5,
        spikeHeight: PLAYER_SIZE * 0.7,
        amountOfSpikes: 3,
      }),
    ];
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth - 200, p5.windowHeight - 100);
  };

  p5.draw = () => {
    p5.background("#80FFFB");

    ground.draw();

    player.update();
    player.draw();

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].draw();

      if (obstacles[i].collidesWith(player)) {
        p5.textAlign(p5.CENTER);
        p5.textSize(32);
        p5.text("Obstacle colliding with player!", p5.width / 2, 50);
      }

      if (obstacles[i].isOffscreen()) obstacles.splice(i, 1);
    }
  
    // one obstacle appears every few seconds
    if (p5.frameCount % 240 === 0) {
      obstacles.push(
        new Obstacle(p5, {
          spikeWidth: PLAYER_SIZE * 0.5,
          spikeHeight: PLAYER_SIZE * 0.7,
          amountOfSpikes: 3,
        })
      );
    }
  };

  p5.keyPressed = (event: KeyboardEvent) => {
    if (event.key === " ") player.jump();
  };
};

export default sketch;
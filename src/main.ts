import P5 from "p5";

import sketch from "./game/sketch";
import prepareDOM from "./util/prepareDOM";

import "./main.css";

new P5(sketch);
prepareDOM();
# Hand dash

A prototype game built with Node, P5.js and Typescript to explore machine learning hand detection.
You can play the game by using the space key on your keyboard or using your webcam, opening and closing your hand.
The idea for building this came from watching [Erick Wendel](https://github.com/ErickWendel)'s JS Expert Week 07 (his code can be found [here](https://github.com/ErickWendel/semana-javascript-expert07)).

Just like Erick Wendel, I used [TensorflowJS handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose) and [Fingerpose](https://github.com/andypotato/fingerpose)

## Wanna run it yourself?

This project is built using Node v18.13.0, so make sure you have it installed. As usual with Node projects, running `npm i` will download all dependencies necessary for running the code.

I use Vite for tooling so running `npm run dev` will get the server up and running in port 5173. And that's it! The project is running on your local machine (`http://localhost:5173`) or whatever the address it's showing on your terminal!
import { HandPose, load as loadHandposeModel } from '@tensorflow-models/handpose';
import { GestureEstimator } from "fingerpose"

import { PaperGesture, RockGesture } from "./gestures";

import '@tensorflow/tfjs-backend-webgl';

class Predictor {

  model?: HandPose;
  gestureEstimator?: GestureEstimator;

  async init() {
    this.model = await loadHandposeModel();
    this.gestureEstimator = new GestureEstimator([PaperGesture, RockGesture])
    return this;
  }

  async predictGesture(cameraVideo: HTMLVideoElement) {
    if (!this.model || !this.gestureEstimator)
      return;

    const predictions = await this.model.estimateHands(cameraVideo);

    if (predictions.length === 0)
      return;
    
    const estimations = this.gestureEstimator.estimate(predictions[0].landmarks, 9);

    if (estimations.gestures.length === 0)
      return;

    let highestConfidenceGesture = estimations.gestures[0];

    // Get the gesture with the highest confidence
    for (let i = 1; i < estimations.gestures.length; i++)
      if (highestConfidenceGesture.confidence < estimations.gestures[i].confidence)
        highestConfidenceGesture = estimations.gestures[i];
    
    return highestConfidenceGesture.name;
  }

}

export default Predictor
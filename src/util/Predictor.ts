import { HandPose, AnnotatedPrediction, load as loadHandposeModel } from '@tensorflow-models/handpose';
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

  async estimateHands(cameraVideo: HTMLVideoElement): Promise<AnnotatedPrediction | undefined> {
    if (!this.model)
      return;

    const predictions = await this.model.estimateHands(cameraVideo);
    
    if (predictions.length === 0)
      return
    
    return predictions[0];
  }

  async predictGesture(handEstimate: AnnotatedPrediction) {
    if (!this.gestureEstimator || !handEstimate)
      return;
    
    const estimations = this.gestureEstimator.estimate(handEstimate.landmarks, 9);

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
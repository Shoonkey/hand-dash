import {
  SupportedModels,
  createDetector,
  HandDetector,
  Hand,
  Keypoint,
} from "@tensorflow-models/hand-pose-detection";
import { GestureEstimator } from "fingerpose";

import { PaperGesture, RockGesture } from "./gestures";

import "@tensorflow/tfjs-backend-webgl";

class Predictor {
  model?: HandDetector;
  gestureEstimator?: GestureEstimator;
  videoFrameCanvas?: HTMLCanvasElement;
  videoFrameCanvasContext?: CanvasRenderingContext2D | null;

  async init() {
    this.model = await createDetector(SupportedModels.MediaPipeHands, {
      runtime: "tfjs",
      maxHands: 1,
      modelType: "full"
    });
    this.gestureEstimator = new GestureEstimator([PaperGesture, RockGesture]);
    this.videoFrameCanvas = document.createElement("canvas");
    this.videoFrameCanvasContext = this.videoFrameCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    return this;
  }

  private getVideoFrame(cameraVideo: HTMLVideoElement) {
    if (!this.videoFrameCanvas || !this.videoFrameCanvasContext) return;

    const [width, height] = [cameraVideo.videoWidth, cameraVideo.videoHeight];
    this.videoFrameCanvas.width = width;
    this.videoFrameCanvas.height = height;

    this.videoFrameCanvasContext.drawImage(cameraVideo, 0, 0, width, height);
    return this.videoFrameCanvasContext.getImageData(0, 0, width, height);
  }

  private getLandMarksFromKeypoints(keypoints3D: Keypoint[]) {
    return keypoints3D.map(keypoint =>
      [keypoint.x, keypoint.y, keypoint.z]
    );
  }

  async estimateHands(
    cameraVideo: HTMLVideoElement
  ): Promise<Hand | undefined> {

    const videoFrame = this.getVideoFrame(cameraVideo);

    if (!this.model || !videoFrame) return;

    const hands = await this.model.estimateHands(videoFrame);

    if (hands.length === 0) return;

    return hands[0];
  }

  async predictGesture(handEstimate: Hand) {
    if (!this.gestureEstimator || !handEstimate?.keypoints3D) return;

    const estimations = this.gestureEstimator.estimate(
      this.getLandMarksFromKeypoints(handEstimate.keypoints3D),
      9
    );

    console.log(estimations);

    if (estimations.gestures.length === 0) return;

    let highestConfidenceGesture = estimations.gestures[0];

    // Get the gesture with the highest confidence
    for (let i = 1; i < estimations.gestures.length; i++)
      if (
        highestConfidenceGesture.score < estimations.gestures[i].score
      )
        highestConfidenceGesture = estimations.gestures[i];

    return highestConfidenceGesture.name;
  }
}

export default Predictor;

import getCameraStream from "./getCameraStream";

const elt = (id: string) => document.getElementById(id);

let usingKeyboard = true;
let videoStream: MediaStream | null = null;

const cameraVideo = elt("camera-video")! as HTMLVideoElement;
const changeControlsBtn = elt("change-controls-btn")! as HTMLButtonElement;
const howToPlay = elt("how-to-play")! as HTMLParagraphElement;
const cameraNotSupported = elt("camera-not-supported")! as HTMLParagraphElement;

function prepareDOM() {
  // If the camera API isn't available, don't show "use camera" button
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    changeControlsBtn.style.display = "none";
    cameraNotSupported.style.display = "block";
  } else cameraNotSupported.style.display = "none";

  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === " ") event.preventDefault();
  };

  changeControlsBtn.onclick = () => {
    changeControlsBtn.innerText = "Loading...";

    if (usingKeyboard)
      getCameraStream()
        .then((stream) => {
          videoStream = stream;
          cameraVideo.style.display = "block";
          cameraVideo.srcObject = stream;
          cameraVideo.play();

          changeControlsBtn.innerText = "Use only keyboard";
          howToPlay.innerText = "Open your hand to jump";

          usingKeyboard = false;
        })
        .catch((err) => {
          changeControlsBtn.style.display = "none";
          cameraNotSupported.style.display = "block";
          console.warn(err);
        });
    else if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      videoStream = null;

      cameraVideo.style.display = "none";
      howToPlay.innerHTML = "Tap <kbd>Space</kbd> to jump!";
      changeControlsBtn.innerText = "Use gestures with camera too";

      usingKeyboard = true;
    }
  };

  // This simulates typing space
  // ? I'm probably gonna use this simulation with the AI
  // window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
  // window.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
}

export default prepareDOM;

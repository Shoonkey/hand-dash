async function getCameraStream() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 320, height: 240,
      frameRate: {
        ideal: 60,
      },
    },
  });

  return stream;
}

export default getCameraStream;

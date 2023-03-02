async function getCameraStream() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: 200,
      frameRate: {
        ideal: 60,
      },
    },
  });

  return stream;
}

export default getCameraStream;

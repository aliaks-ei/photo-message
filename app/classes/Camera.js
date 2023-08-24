class Camera {
  constructor(videoNode) {
    this.videoNode = videoNode;
  }

  // Camera feed (viewfinder) on
  switchOn() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
        audio: false,
      })
      .then((stream) => {
        this.stream = stream;
        this.videoNode.srcObject = stream;
      });
  }

  // Camera feed (viewfinder) off
  switchOff() {
    this.videoNode.pause();

    // Stop media stream
    this.stream.getTracks()[0].stop();
  }

  // Capture photo from camera stream
  takePhoto() {
    let canvas = document.createElement("canvas");

    // Set canvas dimensions same as video stream
    canvas.setAttribute("width", 600);
    canvas.setAttribute("height", 600);

    let context = canvas.getContext("2d");

    context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

    // Get the canvas image as a data uri
    this.photo = context.canvas.toDataURL();

    context = null;
    canvas = null;

    return this.photo;
  }
}

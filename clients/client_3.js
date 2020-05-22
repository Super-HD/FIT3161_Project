const express = require('express');
// cors for allowing cross origin resource sharing between different localhosts
const cv = require('opencv4nodejs')
const axios = require('axios')
const cors = require("cors")
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
// allow cross origin resource sharing
app.use(cors());
// dont need body parser anymore just do this
app.use(express.json());

const vCap = new cv.VideoCapture(0)
vCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
vCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);
const FPS = 10;

// do async call register API to make server store the new client & camera data
const testClient = {
  clientName: "Tasmania University",
  cameras: []
}

const testCameraOne = {
  cameraLocation: "Building C",
  cameraURL: "http://localhost:5300",
  // cameraClient: clientRes.data._id,
  startTime: {
    hour: "00",
    minute: "00"
  },
  endTime: {
    hour: "00",
    minute: "00"
  },
  motionClips: []
}

async function doSetup() {
  const client = await axios.post('http://localhost:4200/client', testClient)
  console.log("Client Added: ", client.data._id)

  const cameraOne = await axios.post('http://localhost:4200/camera', { ...testCameraOne, cameraClient: client.data._id })
  console.log("Camera 1 Added: ", cameraOne.data._id)

  // add camera1 to client camera array
  const camToClientOne = await axios.post('http://localhost:4200/addcamera', { clientId: client.data._id, cameraId: cameraOne.data._id })

  console.log("Camera 1 Added to Client Camera Array ", camToClientOne.data.cameras)
}

// Change to PORT constant once deployed online
server.listen(5300, () => {
  console.log(`Client Server Successfully Started on Port ${5300}`);

  // run function to setup adding cameras and clients to mongoDB
  doSetup()

  // this code runs and tests a client webcam and uses socket.io to send frame data to server with a fake id
  setInterval(() => {
    // vCap.read returns a mat file
    const frame = vCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('buildingAFrame', image)
  }, 1000 / FPS)
})
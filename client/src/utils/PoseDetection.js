import getScoreHost from './compare';
// import { increaseScore } from "../utils/socket"

export default {


  poseComparison(hostVideoElement, participantVideoElement, increaseScore) {
    console.log("comparing...");
    let hostPoses;
    let hostCachedPoses = [];
    let participantPoses;

    const poseOptions = {
       detectionType: 'single',
    }

    hostVideoElement.width = 640;
    hostVideoElement.height = 360;
    participantVideoElement.width = 640;
    participantVideoElement.height = 360;

    const hostPoseNet = window.ml5.poseNet(hostVideoElement, poseOptions);
    const participantPoseNet = window.ml5.poseNet(participantVideoElement, poseOptions);



    let currIndex = 0;
    hostPoseNet.on("pose", (results) => {
      hostPoses = results;

      hostCachedPoses[currIndex] = results[0]

      currIndex = (currIndex + 1) % 50
    });

    participantPoseNet.on("pose", (results) => {
      participantPoses = results;
    });

    setInterval(() => {
      console.log("compare!", {hostPoses, participantPoses, hostCachedPoses});

      if (hostPoses && participantPoses && hostPoses.length > 0 && participantPoses.length > 0) {
        const hostPose = hostPoses[0]
        const participantPose = participantPoses[0]

        const score = getScoreHost(hostCachedPoses, participantPose, 30);
        console.log("SCORED", {score, hostPose, participantPose});

        increaseScore(score)

        if (participantPoses.length > 1) console.warn("PARTICIPANT MORE THAN 1 POSE")
        if (hostPoses.length > 1) console.warn("HOST MORE THAN 1 POSE")
      }
    }, 1000)
  },

  /**
   * @param video video HTMl dom element
 */
  detectPose(video) {
    console.log("initializing pose detector");

    let poses = [];

    const modelLoaded = () => {
      console.log("the model has been loaded");
    }

    const poseNet = window.ml5.poseNet(video, modelLoaded);

    // listen to new 'pose' events
    poseNet.on('pose', (results) => {
      poses = results;
      console.log({poses});
    });

    // function draw() {
    //   window.image(video, 0, 0, 640, 360);
    //
    //   // We can call both functions to draw all keypoints and the skeletons
    //   drawKeypoints();
    //   drawSkeleton();
    // }


    // A function to draw ellipses over the detected keypoints
    // function drawKeypoints()  {
    //   // Loop through all the poses detected
    //   for (let i = 0; i < poses.length; i++) {
    //     // For each pose detected, loop through all the keypoints
    //     let pose = poses[i].pose;
    //     for (let j = 0; j < pose.keypoints.length; j++) {
    //       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    //       let keypoint = pose.keypoints[j];
    //       // Only draw an ellipse is the pose probability is bigger than 0.2
    //       if (keypoint.score > 0.2) {
    //         window.fill(255, 0, 0);
    //         window.noStroke();
    //         window.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    //       }
    //     }
    //   }
    // }
    //
    // // A function to draw the skeletons
    // function drawSkeleton() {
    //   // Loop through all the skeletons detected
    //   for (let i = 0; i < poses.length; i++) {
    //     let skeleton = poses[i].skeleton;
    //     // For every skeleton, loop through all body connections
    //     for (let j = 0; j < skeleton.length; j++) {
    //       let partA = skeleton[j][0];
    //       let partB = skeleton[j][1];
    //       window.stroke(255, 0, 0);
    //       window.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    //     }
    //   }
    // }
  },
}


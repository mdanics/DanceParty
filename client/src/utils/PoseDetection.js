export default {
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
  }
}


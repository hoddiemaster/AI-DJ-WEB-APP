left_wristY = 0;
left_wristX = 0;
right_wristX = 0;
right_wristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(570, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    

    if (scoreLeftWrist > 0.2) {
        circle(left_wristX, left_wristY, 20);
        InNumberLeftWristY = Number(left_wristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);

    }

    if (scoreRightWrist > 0.2) {
        circle(right_wristX , right_wristY , 20);
        if ( right_wristY > 0 && right_wristY <= 100) {
 document.getElementById("sound").innerHTML = "speed = 0.5x";
 song.rate(0.5);
        }
        else if ( right_wristY > 100 && right_wristY <= 200) {
            document.getElementById("sound").innerHTML = "speed = 1x";
 song.rate(1);
        }
        else if ( right_wristY > 200 && right_wristY <= 300) {
            document.getElementById("sound").innerHTML = "speed = 1.5x";
 song.rate(1.5);
        }
        else if ( right_wristY > 300 && right_wristY <= 400) {
            document.getElementById("sound").innerHTML = "speed = 2x";
            song.rate(2); 
        }
        else if ( right_wristY > 400 && right_wristY <= 500) {
            document.getElementById("sound").innerHTML = "speed = 2.5x";
 song.rate(2.5);
        }
    }

}

function modelLoaded() {
    console.log("model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + right_wristX + " right wrist y = " + right_wristY);

        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + left_wristX + "left wrist y = " + left_wristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
// https://medium.com/@abhishek_guy/guide-to-use-the-document-picture-in-picture-api-51ecfac058f7

const videoElement = document.querySelector(".video");
const btn = document.querySelector(".glow-on-hover");
const label = document.querySelector(".label");

async function selectMediaStram() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
      label.textContent = "";
      btn.classList.remove("hidden");
    };
  } catch (err) {
    console.dir(err);
    label.textContent = err;
  }
}

async function startSharing() {
  const options = {
    width: 400,
    height: 400,
  };
  await videoElement.requestPictureInPicture(options);
}

function stopSharing() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
}

if ("pictureInPictureEnabled" in document) {
  btn.addEventListener("click", function () {
    if (this.innerText.toLowerCase() === "start") {
      startSharing();
      this.innerText = "Stop";
    } else {
      stopSharing();
      this.innerText = "Start";
    }
  });
} else {
  label.textContent = "your browser has picture-in-picture support enabled";
}

selectMediaStram();

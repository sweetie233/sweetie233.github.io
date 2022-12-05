const control = document.querySelector("#musicontrol");
const audio = document.querySelector("audio");

control.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.6;
    audio.play(); 
  } else {
    audio.pause();
  }
});
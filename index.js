window.addEventListener("load", (event) => {
  const player = document.getElementById("player");
  for (const element of document.getElementsByTagName("h1")) {
    element.classList.add("loaded");
  }
  console.log("asasdasd");
});

document.addEventListener("click", () => {
  const audio = document.getElementById("player");
  audio.volume = 0.1;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Get the source
  audio.onplay = () => audioCtx.resume();
  const source = audioCtx.createMediaElementSource(audio);

  // Create an analyser
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2 ** 8;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // Connect parts
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  console.log(analyser.frequencyBinCount);

  const backgroundImage = document.getElementById("background-image");

  setInterval(() => {
    analyser.getByteTimeDomainData(dataArray);

    const data = dataArray.map((d) => Math.abs(128 - d) * 2.8125);
    const value = Math.max(...data);

    backgroundImage.style.filter = `brightness(${100 + value}%)`;
  }, 32);

  audio.play();
});

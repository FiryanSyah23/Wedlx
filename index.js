//humburger
const offCanvas = document.querySelector(".offcanvas");
const stickyTop = document.querySelector(".sticky-top");
const icon = document.querySelector(".audio-icon-wrapper");
const audio = document.querySelector("#mp3");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
let isPlay = false;

offCanvas.addEventListener("show.bs.offcanvas", () => {
  stickyTop.style.overflow = "visible";
});

offCanvas.addEventListener("hidden.bs.offcanvas", () => {
  stickyTop.style.overflow = "hidden";
});

// disable scroll
const rootElemnt = document.querySelector(":root");

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollTop;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElemnt.style.scrollBehavior = "auto";
}

// enable scroll
function enableScroll() {
  playAudio();
  window.onscroll = function () {};
  rootElemnt.style.scrollBehavior = "smooth";
  // localStorage.setItem("opened", "true");
}

if (!localStorage.getItem("opened")) {
  disableScroll();
}

// play audio
const playAudio = () => {
  audio.volume = 0.3;
  audio.play();
  icon.style.display = "flex";
  isPlay = true;
};

// pause audio
icon.onclick = () => {
  if (isPlay) {
    audio.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
    icon.style.animation = "0s";
  } else {
    audio.play();
    audioIcon.classList.remove("bi-pause-circle");
    audioIcon.classList.add("bi-disc");
    icon.style.animation = "rotate 4s linear infinite";
  }

  isPlay = !isPlay;
};

// sheet data load
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi kehadiran berhasil!");
    });
  });
});

// dilarang copy
document.addEventListener("copy", function (e) {
  e.preventDefault();
  alert("Copy tidak diizinkan!");
});

// url give name
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p") || "Bapak/Ibu/Saudara/i";
const namaContainer = document.querySelector(".hero h4 span");
namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");
document.querySelector("#nama").value = nama;

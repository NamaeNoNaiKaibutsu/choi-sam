let sliderVolume = document.getElementById("volume_changer");
let progressBar1 = document.getElementById("progressBar1");
let progressBar2 = document.getElementById("progressBar2");

sliderVolume.oninput = function() {
  progressBar1.style.width = this.value +  "px";
}


let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('.title');
let recent_volume = document.querySelector('#volume_changer');
let volume_show = document.querySelector('#volume');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');

slider.oninput = function() {
  progressBar2.style.width = (this.value * 3) + "px";
}

let timer;
let autoplay = false;



let index_no = 0;
let playing_song = false;

let track = document.createElement('audio');

let All_song = [
  {
    name: "1. 벌레",
    path: "01. 벌레.mp3"
  },
  {
    name: "2. 누구야",
    path: "02. 누구야.mp3"
  },
  {
    name: "3. 뭐라카노",
    path: "03. 뭐라카노.mp3"
  },
  {
    name: "4. Not over (ft. 브레이)",
    path: "04. Not Over(Feat. 브레이).mp3"
  },
  {
    name: "5. Plan B",
    path: "05. Plan B.mp3"
  },
  {
    name: "6. Still (ft. 브레이)",
    path: "06. Still (Feat. 브레이).mp3"
  },
  {
    name: "7. 강박증 (ft. Nyrual)",
    path: "07. 강박증(Feat. Nyrual).mp3"
  },
  {
    name: "8. 봄이 왔다더니",
    path: "08. 봄이 왔다더니.mp3"
  }
];



let lyricsPages = document.querySelectorAll(".lyrics");
console.log(lyricsPages);

function load_track(index_no) {
  clearInterval(timer);
  reset_slider();
  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track.load();

  timer = setInterval(range_slider, 1000);
}
load_track(index_no);

var albumCover = document.getElementById("mortiiMatii");





function reset_slider() {
  slider.value = 0;
}
// let play_button = document.getElementById('play');

// play_button.addEventListener("click", justplay, false)


function justplay() {
  if(playing_song == false) {
    playsong();
    albumCover.removeAttribute("id", "mortiiMatii");
    albumCover.setAttribute("id", "rotating");
    for (i = 0; i < lyricsPages.length; i++) {
      lyricsPages[i].removeAttribute("id", "visible");
    }
    lyricsPages[index_no].setAttribute("id", "visible");
  }else {
    pausesong();
    albumCover.removeAttribute("id", "rotating");
    albumCover.setAttribute("id", "mortiiMatii");
  }
  console.log(playing_song);
}


function autoplay_switch() {
  if (autoplay == false) {
    auto_play.style.background = "rgb(200, 77, 77)"
    autoplay = true;
    track.onended = function() {
    index_no += 1;
    load_track(index_no);
    playsong(index_no);

  }
  }else if (autoplay == true) {
    auto_play.style.background = "rgba(255,255,255,.3)"
    autoplay = false;
    track.onended = function() {
      justplay();
    }
}
}


function playsong() {
  track.play();
  progressBar2.style.width = 0;
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause"></i>';
}

function pausesong() {
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class="fa-solid fa-play" id="play_img" aria-hidden="true"></i>';
}

function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  }
  for (i = 0; i < lyricsPages.length; i++) {
      lyricsPages[i].removeAttribute("id", "visible");
    }
    lyricsPages[index_no].setAttribute("id", "visible");
}


function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
    console.log(index_no);
  }
  for (i = 0; i < lyricsPages.length; i++) {
      lyricsPages[i].removeAttribute("id", "visible");
    }
    lyricsPages[index_no].setAttribute("id", "visible");
}



// changevolume

function volume_change() {
  track.volume = recent_volume.value / 100;
}

// change slider position

function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  progressBar2.style.width = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}








function range_slider() {
  let position = 0;

  if(!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }
}



if (track.onended) {
  play.innerHTML = '<i class="fa-solid fa-play" id="play_img" aria-hidden="true">';
  if (autoplay==true) {
    index_no += 1;
    load_track(index_no);
    playsong();
    console.log(index_no);
    lyricsPages[index_no-1].removeAttribute("id", "visible");
    lyricsPages[index_no].setAttribute("id", "visible");
  }
}

var newIndex = '';

track.addEventListener("ended", function() {
  if (autoplay == false) {
    play.innerHTML = '<i class="fa-solid fa-play" id="play_img" aria-hidden="true">';
    albumCover.removeAttribute("id", "rotating");
    albumCover.setAttribute("id", "mortiiMatii");
  } else {
    console.log(index_no);
    newIndex = index_no +1;
    lyricsPages[index_no].removeAttribute("id", "visible");
    lyricsPages[newIndex].setAttribute("id", "visible");
    console.log("hellooo");
  }
}
);






// SPECIALLLL

let tableRows = document.querySelectorAll(".td");



// TABLEROW 1

tableRows[0].addEventListener("click", function (e) {
  
  index_no = 0;
  load_track(0);
  if (playing_song = false) {
    justplay();
    justplay(0);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(0);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 2

tableRows[1].addEventListener("click", function (e) {
  
  index_no = 1;
  load_track(1);
  if (playing_song = false) {
    justplay();
    justplay(1);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(1);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 3

tableRows[2].addEventListener("click", function (e) {
  
  index_no = 2;
  load_track(2);
  if (playing_song = false) {
    justplay();
    justplay(2);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(2);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 4 

tableRows[3].addEventListener("click", function (e) {
  
  index_no = 3;
  load_track(3);
  if (playing_song = false) {
    justplay();
    justplay(3);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(3);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 5 

tableRows[4].addEventListener("click", function (e) {
  
  index_no = 4;
  load_track(4);
  if (playing_song = false) {
    justplay();
    justplay(4);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(4);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 6 

tableRows[5].addEventListener("click", function (e) {
  
  index_no = 5;
  load_track(5);
  if (playing_song = false) {
    justplay();
    justplay(5);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(5);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 7

tableRows[6].addEventListener("click", function (e) {
  
  index_no = 6;
  load_track(6);
  if (playing_song = false) {
    justplay();
    justplay(6);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(6);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 8

tableRows[7].addEventListener("click", function (e) {
  
  index_no = 7;
  load_track(7);
  if (playing_song = false) {
    justplay();
    justplay(7);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(7);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 9

tableRows[8].addEventListener("click", function (e) {
  
  index_no = 8;
  load_track(8);
  if (playing_song = false) {
    justplay();
    justplay(8);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(8);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 10

tableRows[9].addEventListener("click", function (e) {
  
  index_no = 9;
  load_track(9);
  if (playing_song = false) {
    justplay();
    justplay(9);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(9);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);

// TABLEROW 11

tableRows[10].addEventListener("click", function (e) {
  
  index_no = 10;
  load_track(10);
  if (playing_song = false) {
    justplay();
    justplay(10);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  } else {
    justplay(10);
    const playPromise = track.play();
    if (playPromise !== null){
    playPromise.catch(() => { track.play(); })
    }
  }
}, false);





const allButtons = document.querySelectorAll("button");

let body = document.querySelector("body");
let music = document.querySelector(".audio");
let nameOfMusic = document.querySelector(".nameOfMusic");
let musicAmount = document.querySelector(".musicAmount");
let currentTime = document.querySelector(".currentTime");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector(".bar");
let stopButtonIcon = document.querySelector(".stop>i");
let volumeBar = document.querySelector(".volume input");
let speedSlider = document.querySelector(".speed input");
let chooseMusic = document.querySelector(".chooseMusic input");
let darkModeButton = document.querySelector(".darkModeButton");
let darkModeButtonIcon = document.querySelector(".darkModeButton>i");

stopButtonIcon.style.opacity = 0.4;
setInterval(() => update(),10);

for (const button of allButtons) {
    button.addEventListener("focus" , () => button.blur());
}

document.addEventListener('keydown',(event) => {
    if (event.code == "Enter" || event.code == "Space") playAndPause();
    else if (event.code == "Backspace") stop();
    else if (event.code == "ArrowUp") changeVolume(1);
    else if (event.code == "ArrowDown") changeVolume(-1);
    else if (event.code == "ArrowRight") backAndForward(1);
    else if (event.code == "ArrowLeft") backAndForward(-1);
})

speedSlider.addEventListener("input", () => {
    music.playbackRate = speedSlider.value;
    speedSlider.blur();
})

chooseMusic.addEventListener("change",(event) => changeMusic(event))

darkModeButton.addEventListener("click",()=> changeTheme());

function formatTime(time) {
    let minutes = Math.trunc(time/60).toString().padStart(2, "0");
    let seconds = Math.trunc(time % 60).toString().padStart(2, "0");
    return minutes +":"+ seconds;
}

function update() {
    currentTime.innerHTML = formatTime(music.currentTime);
    progressBar.style.width = (music.currentTime/music.duration * 100) + "%";
    volumeBar.value = music.volume * 100;
    musicAmount.innerHTML = formatTime(music.duration);
}

function changeIcon(node,firstClass,secondClass) {
    node.classList.remove(firstClass);
    node.classList.add(secondClass);
}

function getAllTexts() {
    arrayOfP = document.querySelectorAll("p");
    arrayOfH2 = document.querySelectorAll("h2");
    returnArray = new Array();
    for (const p of arrayOfP) {
        returnArray.push(p);
    }

    for (const h2 of arrayOfH2) {
        returnArray.push(h2);
    }
    console.log(returnArray);
    return returnArray;
}

function changeTheme() {
    if (darkModeButtonIcon.classList.contains("fa-toggle-off")) {
        console.log("hello its light and i want to make it dark");
        body.style.backgroundColor = 'black';
        for (const text of getAllTexts()) {
            text.style.color = 'white';
        }
        changeIcon(darkModeButtonIcon,"fa-toggle-off","fa-toggle-on"); 
    } else {
        console.log("its vise versa");
        body.style.backgroundColor = 'white';
        for (const text of getAllTexts()) {
            text.style.color = 'black';
        }
        changeIcon(darkModeButtonIcon,"fa-toggle-on","fa-toggle-off"); 
    }
}


function playAndPause() {
    stopButtonIcon.style.opacity = 1;
    if (music.paused) {
        changeIcon(document.querySelector(".play>i"),"fa-play","fa-pause");
        music.play();
    } else {
        changeIcon(document.querySelector(".play>i"),"fa-pause","fa-play");
        music.pause();
    }
}

function backAndForward(direction) {
    music.currentTime += (direction * 5);
}

function stop() {
    music.currentTime = 0;
    music.pause();
    changeIcon(document.querySelector(".play>i"),"fa-pause","fa-play");
    stopButtonIcon.style.opacity = 0.4;
}

function changeVolume(direction) {
    let currentVolume = music.volume;
    let newVolume = currentVolume += (0.1 * direction);
    if (newVolume < 0) music.volume = 0;
    else if (newVolume > 1) music.volume = 1;
    else music.volume = newVolume;
}

function changeMusic(event) {
    stop();
    const selectedFile = event.target.files[0];
    music = new Audio();
    music.src = URL.createObjectURL(selectedFile);
    nameOfMusic.innerHTML = selectedFile.name;
    chooseMusic.blur();
}
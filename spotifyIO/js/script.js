// console.log("lets write js")
let currSong = new Audio();
const play = document.getElementById('play');
let songs;

let songUl;
let currFolder = "hitesh"
let volumeImg;
let info;
let left;

const clickingCard = () =>{

    let cards;
    cards = document.getElementsByClassName("card");
    // console.log(cards)
    

        Array.from(cards).forEach((card) => {
            card.addEventListener("click", async (e) => {
                // console.log("click")
                // console.log(e.currentTarget.dataset.folder);
                currFolder = e.currentTarget.dataset.folder;
                songs = await fetchSongs(e.currentTarget.dataset.folder);
                if (songs) {
                    songUl.innerHTML = "";
                    left.style.left = '0%'
                    showSongs(songs);
                    await playMusic(songs[0]);
                }
            })
        })
}
const fetchSongs = async (folder) => {
    let res = await fetch(`http://127.0.0.1:5500/songs/${folder}`);
    let data = await res.text();
    let div = document.createElement('div');
    div.innerHTML = data;
    let a = div.getElementsByTagName("a");
    a = Array.from(a);
    // console.log(a);
    let songs = [];
    a.forEach(element => {
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    });

    // console.log(songs);
    return songs;



}

const playMusic = (url, pause = false) => {
    // var audio = new Audio(`http://127.0.0.1:5500/songs/${url}`);
    // console.log("hii")
    // console.log(audio) 
    currSong.src = `http://127.0.0.1:5500/songs/${currFolder}/${url}`;
    if (!pause) {

        play.src = '/img/pause.svg';
        currSong.play().catch((err) => {
            // console.log(err);
        });
    }


    document.querySelector(".songinfo").innerHTML = url;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"



}

const showSongs = (songs) => {
    songUl = document.querySelector('.songList').getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML += ` <li>
        <img class="invert" src="/img/music.svg" alt="">
        <div class="info">
            <div class="title">${song.replaceAll("%20", " ")}</div>
            <div>Hitesh</div>
        </div>
        <div class="playNow">
            
           <span>Play Now</span> 
            <img src="/img/play.svg" class="invert" alt="">
        </div>
    </li>`

    }
    // add fuctinality for click songs that songs play 
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        // console.log(e.getElementsByTagName("div")[0])
        e.addEventListener("click", (element) => {
            // console.log(e.target.className);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);

        })
    })
}

// this function is used to fetch the folder from songs folder 

const diplayAlbums = async () => {
    let albums = await fetch(`http://127.0.0.1:5500/songs/`);
    albums = await albums.text();
    let div = document.createElement('div');
    div.innerHTML = albums;
    let a = div.getElementsByTagName('a');
    a = Array.from(a);
    let allfolder = [];
    a.forEach((element) => {
        if (element.href.includes("/songs/")) {
            // console.log(element.title)
            // console.log(element);
            allfolder.push(element.title);
        }


    })
    let cardContainer = document.querySelector('.cardContainer');
    // console.log(allfolder)
    allfolder.forEach(async (element) => {

        let json = await fetch(`/songs/${element}/info.json`);
        json = await json.json();
        info = json;

       
        cardContainer.innerHTML = cardContainer.innerHTML + ` <div class="card" data-folder="${element}">
                                                            <div class="play">
                                                                <svg width="28" fill="#000" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 20V4L19 12L5 20Z" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/>
                                                                    </svg>
                                                                    
                                                            </div>
                                                            <img src="${json.cover}" style=" height:207px" alt="">
                                                            <h2>${json.heading}</h2>
                                                            <p>${json.description}</p>
                                                        </div>`;
                    
        clickingCard();
        
    })
    // console.log(a)

}

async function main() {

    songs = await fetchSongs(currFolder);
    playMusic(songs[0], true);
    showSongs(songs);

    // Display all the albums on the page 
   

    // console.log(songs[5])
    // thsi is the fuction to convert seconds to Minutes 

    function secondsToMinutes(seconds) {

        if (!seconds) {
            return "00:00"
        }
        var minutes = Math.floor(seconds / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var remainingSeconds = seconds % 60;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        let i = remainingSeconds.toString().indexOf(".");
        return minutes + ":" + remainingSeconds.toString().slice(0, i);
    }

    // Attach an event listener to play , next and previous
    const stopPlayFunctionality = async() =>{
        if (currSong.paused) {
            play.src = '/img/pause.svg'
            currSong.play();
        } else {
            play.src = '/img/play.svg'
            currSong.pause();
        }
        if (currSong.src == "") {
            // console.log(songs[0]);
            play.src = '/img/pause.svg';
            document.querySelector(".songinfo").innerHTML = songs[0]
            currSong.src = `http://127.0.0.1:5500/songs/${songs[0]}`;
            await currSong.play();
        }

    }
    play.addEventListener('click', async () => {
        stopPlayFunctionality();
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
          stopPlayFunctionality();
        }
      })

    // add event listener to add seekbar or progress bar for songs 

    let circle = document.querySelector(".circle");
    const seekBar = document.querySelector('.seekbar');
    seekBar.addEventListener('click', (e) => {
        // console.log(e.offsetX, e.target.getBoundingClientRect().width);
        let percentage = (e.offsetX * 100) / e.target.getBoundingClientRect().width;
        currSong.currentTime = (currSong.duration * percentage) / 100;
        circle.style.left = `${percentage}%`;

    })

    // Listen for timeupdate event to show time and duration of songs 
    currSong.addEventListener('timeupdate', () => {
        // console.log(currSong.currentTime, currSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currSong.currentTime)}/ ${secondsToMinutes(currSong.duration)}`;
        // console.log(circle)
        circle.style.left = `${(currSong.currentTime * 100) / (currSong.duration)}%`
        if (currSong.currentTime == currSong.duration) {
            play.src = '/img/play.svg';
            let i = currSong.src.lastIndexOf('/') + 1;
            currSongName = currSong.src.slice(i, currSong.src.length)

            let nextIndex = songs.indexOf(currSongName) + 1;
            if (nextIndex < songs.length) {
                // console.log("condition")
                let nextSong = songs[nextIndex].replaceAll("%20", " ");
                playMusic(nextSong);
            }
    }
})
    left = document.querySelector('.left');
    let cross = document.querySelector('.cross');
    // console.log(left)
    // add functionality for show hide playlist by clicking on hamburger icon in left 


    const hamburger = document.querySelector('.hamburger');
    // console.log(hamburger)
    hamburger.addEventListener('click', () => {
        // console.log("hamburger clicked")
        left.style.left = '0%'
    })

    cross.addEventListener('click', () => {
        left.style.left = '-130%'
    })

    // const lists = document.querySelector('.songList')


    // audio.addEventListener("loadeddata" , () =>{
    //     let duration = audio.duration;
    //     console.log(duration, audio.currentSrc, audio.currentTime);
    // })
    // await audio.play();
    // console.log(songs)

    // Add an event listener to previous and next

    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    // add event listener for previous song fuctionality in playbar 

    prev.addEventListener('click', () => {
        // console.log("previous click");
        let i = currSong.src.lastIndexOf('/') + 1
        currSongName = currSong.src.slice(i, currSong.src.length)

        let prevIndex = songs.indexOf(currSongName) - 1;
        if (prevIndex >= 0) {
            let prevSong = songs[prevIndex].replaceAll("%20", " ");
            playMusic(prevSong);
        }

    })
    // add event listeners for next song functionality and toggle pause and play image 

    next.addEventListener('click', () => {
        // console.log("next click");
        let i = currSong.src.lastIndexOf('/') + 1;
        currSongName = currSong.src.slice(i, currSong.src.length)

        let nextIndex = songs.indexOf(currSongName) + 1;
        if (nextIndex < songs.length) {
            // console.log("condition")
            let nextSong = songs[nextIndex].replaceAll("%20", " ");
            playMusic(nextSong);
        }
    })


    // add an event listener to update volume value by on channge event on range input

    let volRange = document.querySelector('.range').getElementsByTagName('input')[0];
    // console.log(volRange);
    volRange.addEventListener('change', (e) => {
        // console.log(e)
        // console.log(e.target.value);
        currSong.volume = parseFloat(e.target.value) / 100;
        if (currSong.volume == 0) {
            volumeImg.src = '/img/mute.svg';
        } else {
            volumeImg.src = '/img/volume.svg';
        }
    })

    // load folder when click on the card 
    let flag = await diplayAlbums();

 
    
    
    

        
    




    // mute functionality on playalist toggle volume svg and mute svg by their function 

    volumeImg = document.querySelector('.volume').getElementsByTagName('img')[0];
    // console.log(volumeImg)

    let prevVol;
    let prevRange;
    volumeImg.addEventListener('click', (e) => {
        // console.log("click")
        // e.target.src = "mute.svg"
        // console.log(volumeImg.src);
        // volumeImg.src = `http://127.0.0.1:5500/mute.svg`;
        if (volumeImg.src == "http://127.0.0.1:5500/volume.svg") {

            prevVol = currSong.volume;
            volumeImg.src = "/img/mute.svg"
            prevRange = volRange.value;
            volRange.value = 0;

            currSong.volume = 0;
        } else {
            volumeImg.src = "/img/volume.svg";
            currSong.volume = prevVol;
            volRange.value = prevRange;
        }
    })


}








main();

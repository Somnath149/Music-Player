let index=0;
let playingsong=false;
let songname= document.querySelector(".songname");
let volumerange= document.querySelector("#volumerange");
let sd= document.querySelector("#sd");
let playlist= document.querySelector("#playlist");
let pl= document.querySelector(".playlist");
let songimg= document.querySelector(".song-img");
let artist= document.querySelector(".artist");
let track= document.createElement("audio");   // created audio tag
let vm= document.querySelector("#vm");
let play= document.querySelector("#play");  
let songs=[]



loadsongsfromjson("https://somnath149.github.io/Music-Player/songs.json")

function loadtrack(index){
    track.src=songs[index].path;
    songname.innerHTML= songs[index].name;
    artist.innerHTML= songs[index].singer;
    songimg.style=  `background-image: url("${songs[index].image}")`;

    volume();
    duration();
    setInterval(()=>{
        sd.max=track.duration
        sd.value=track.currentTime
    },1000)
    track.load();
    track.loop=false;
}


async function loadsongsfromjson(url){
    try{
        const res= await fetch(url)
        const data= await res.json()
        songs= data
        index = 0;
        loadtrack(index)
        loadPlaylist();
    }
    catch (err) {
        console.error("Error loading songs:", err);
    }
}

function playpause() {
    if (playingsong==false) {
        playSong(); 
    } else {
        pausesong();  
    } 
}

function playSong(){
    track.play();
    playingsong=true;
    play.src="pause.svg"
}

function pausesong(){
    track.pause();
    playingsong=false;
    play.src="play.svg"

}

function next(){
    if(index<songs.length-1){
        index++;
        loadtrack(index)
        playSong()
    }else{
        index=0;
        loadtrack(index)
        playSong()
    }
}

function previous(){
    if(index>0){
        index--;
        loadtrack(index)
        playSong()
    }else{
        index=songs.length-1;
        loadtrack(index)
        playSong()
    }
}

function volume(){
    track.volume= volumerange.value/100;
    if(volumerange.value==0){
        vm.src="volumelow.svg"
    }
    else{
        vm.src="volume.svg"
    }

}

function duration(){
    track.currentTime=sd.value;
}

playlist.addEventListener("click",()=>{
    pl.classList.toggle("playlist-active");
})

track.addEventListener("ended",()=>{
    next();
})

function loadPlaylist() {
    pl.innerHTML = "";

    songs.forEach((song, i) => {
        const songCard = document.createElement("div");
        songCard.classList.add("playlist-song");
        songCard.innerHTML = `
            <img src="${song.image}" alt="${song.name}" style="width: 100%; height: auto; border-radius: 10px;">
            <p style="margin-top: 10px; font-size: 14px;">${song.name}</p>
        `;

        songCard.addEventListener("click", () => {
            index = i;
            loadtrack(index);
            playSong();
        });

        pl.appendChild(songCard);
    });
}



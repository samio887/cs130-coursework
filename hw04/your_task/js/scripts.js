// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}
const playTrack = (ev) => {
    //console.log(ev.currentTarget);
    const elem = ev.currentTarget;
    const previewURL = elem.dataset.previewTrack;
    console.log(previewURL);
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else { 
        console.log('there is no preview available.');
        //elem.dataset.previewTrack;

    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
    //document.querySelector('footer .track-item').innerHTML = elem.innerHTML;

};
const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}&limit=5`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            for (const track of data) {
                // create an HTML element for each track:
                //if (!track.preview_url) {
                    //console.log('no preview available');
                    //continue;
                //}
                const template = `<section class="track-item preview" data-preview-track="${track.preview_url}"> 
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h3>${track.name}</h3>
                    <p>
                        ${track.artist.name}
                    </p>
                </div>
            </section>`;
                document.querySelector('#tracks').innerHTML += template;
                console.log(track);
            }
            for (const elem of document.querySelectorAll('.track-item.preview')) {
                elem.onclick = playTrack;
            }
        
        })
    //attachEventHandlers();

};

const getAlbums = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            for (const album of data) {
                // create an HTML element for each track:
                const template = `<section class="album-card" id="${data.id}">
                <div>
                    <img src="${album.image_url}">
                    <h3>${album.name}</h3>
                    <div class="footer">
                        <a href="${album.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`;
                document.querySelector('#albums').innerHTML += template;
                console.log(album);
            }
        })
};

const getArtist = (term) => {
    //console.log(`
        //get artists from spotify based on the search term
        //"${term}" and load the first artist into the #artist section 
        //of the DOM...`);
    url = baseURL + "?type=artist&q=" + term;
    fetch(url)
        .then(response => response.json())
        .then(data => displayArtist(data[0]));
          
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
// const displayTracks = (foundtracks) =>{
//     if(foundtracks == null){
//         document.querySelector("#tracks").innerHTML = "no tracks found :(";
//     } else {
//         const lentracks = foundtracks.length;
//         for (t= 0; t < Math.min(5, lentracks); t++){
//             template = `<section class="track-item preview" data-preview-track="${foundtracks[t].preview_url}">
//             <img src="${foundtracks[t].album.image_url}">
//             <i class="fas play-track fa-play" aria-hidden="true"></i>
//             <div class="label">
//                 <h3>${foundtracks[t].name}</h3>
//                 <p>
//                     ${foundtracks[t].artist.name}
//                 </p>
//             </div>
//         </section>`;
//         document.querySelector("#tracks").innerHTML += template;

//         }
//     }
// };

const displayArtist = (art) => {
if (art == null) {
    document.querySelector("#artist").innerHTML = "no artist found";
} else {
    template = `<section class="artist-card" id="${art.id}">
                    <div>
                        <img src="${art.image_url}">
                        <h3>${art.name}</h3>
                        <div class="footer">
                            <a href="${art.spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`;
document.querySelector('#artist').innerHTML = template;
}
}
//const displayTrack = (clicked) => {
    //template = 
    //`<img src="${clicked.image_url}">`;
    
    // update footer to correspnding clicked track
    //template = `<img src="${clicked.image_url}">`;
//document.querySelector('.track-item').innerHTML = template;


//}
//const attachEventHandlers =()=> {
    //const trackElements = document.querySelectorAll('#tracks');
    //for (const elem of trackElements) {
       // elem.onclick = displayTrack();
    ////}
////}

//attachEventHandlers();

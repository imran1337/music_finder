const mainDiv = document.getElementById("search_result");
const lyricsDiv = document.querySelector(".single-lyrics");

document.getElementById("song_search_btn").addEventListener("click", () => {
  const searchInput = document.getElementById("song_search_input").value;
  fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
    .then((res) => res.json())
    .then((data) => showSongs(data));
  mainDiv.innerHTML = "";
  lyricsDiv.innerHTML = "";
});

function showSongs(songData) {
  const songs = songData.data;

  console.log(songs);
  songs.forEach((song) => {
    const songName = song.title;
    const songArtistName = song.artist.name;
    const div = document.createElement("div");
    // div er vitore btn e getLyrics function call kora hoice
    div.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${songName}</h3>
            <p class="author lead">Album by <span>${songArtistName}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <a href="#content">
            <button onclick="getLyrics('${songArtistName}','${songName}')" class="btn btn-success getLyricsBtn">Get Lyrics</button>
            </a>            
        </div>
    </div>
        `;
    mainDiv.appendChild(div);
  });
  //
}

function getLyrics(artistName, songTitle) {
  fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
    .then((res) => res.json())
    .then((data) => showLyrics(data, songTitle))
    .catch((err) => console.log(err));
}

function showLyrics(songLyrics, songTitle) {
  const { lyrics } = songLyrics;
  if (lyrics !== "") {
    lyricsDiv.innerHTML = `<h3 style="color: #fff;">${songTitle}</h3> <pre style="color:#fff;">${lyrics}</pre>`;
  } else {
    lyricsDiv.innerHTML = `<h3 style="color: #fff;">Lyrics not available!</h3>`;
  }
}
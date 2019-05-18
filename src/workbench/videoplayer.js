import videojs from "video.js"

let player = undefined

const init = (elementId, video, config, textTracks) => {
  player = videojs(elementId, config);
  player.ready(() => {
    player.src({
      src: video.src,
      type: video.type
    })
    // Add text tracks if available
    createTextTracks(player, textTracks)
  });

  // Add support for listening to cue changes
  player.one("loadedmetadata", ()=> {
    let tt = player.textTracks()[0];
    tt.oncuechange = function () {
      if (tt.activeCues[0] !== undefined) {
        if(!isNaN(tt.activeCues[0].id)){
          let id = tt.activeCues[0].id
          let previousElements = document.getElementsByClassName('active-caption')
          for (let i=0; i<previousElements.length; i++) {
            previousElements[i].classList.remove('active-caption');
          }
          let element = document.getElementById(`caption_${id}`)
          element.scrollIntoView({behavior: "smooth", block: "center"})
          element.setAttribute('class', 'active-caption')
        }
      }
    }
  });
}

// Pause player
const pausePlayer = () => {
  if (player) {
    player.pause()
  }
}

// Add text tracks
const createTextTracks = async (player, textTracks) => {
  textTracks.forEach((track) => {
    player.addRemoteTextTrack({
      src: track.src,
      kind: track.kind,
      srclang: track.srclang,
      label: track.label,
      default: track.default,
      mode: track.default ? 'showing': 'hidden'
    }, false);
  });
}

export {
  init,
  pausePlayer
}
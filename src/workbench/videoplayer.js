import videojs from "video.js"

let player = undefined
let currentCueId = 1
const init = (elementId, video, config, textTracks) => {
  player = videojs(elementId, config);
  player.ready(() => {
    player.src({
      src: video.src,
      type: video.type
    })
    // Add text tracks if available
    createTextTracks(player, textTracks)
    setTimeout(() => {
      let element = document.getElementById(`caption_${currentCueId}`)
      element.scrollIntoView({behavior: "smooth", block: "center"})
      element.setAttribute('class', 'active-caption')
    }, 1000);
  });

  // Add support for listening to cue changes
  player.one("loadedmetadata", ()=> {
    let tt = player.textTracks()[0];
    tt.oncuechange = function () {
      if (tt.activeCues[0] !== undefined) {
        if(!isNaN(tt.activeCues[0].id)){
          currentCueId = tt.activeCues[0].id
          // if (cueId > 1) {
          //   cueId -= 1
          // }
          // let previousElements = document.getElementsByClassName('active-caption')
          // for (let i=0; i<previousElements.length; i++) {
          //   previousElements[i].classList.remove('active-caption');
          // }
          // let element = document.getElementById(`caption_${cueId}`)
          // element.scrollIntoView({behavior: "smooth", block: "center"})
          // element.setAttribute('class', 'active-caption')
          if (currentCueId > 1) {
            player.pause()
          }
        }
      }
    }
  });
}

// Pause player
const pause = () => {
  if (player && !player.paused()) {
    player.pause()
  }
}

// Play
const play = () => {
  if (player) {
    let cueId = currentCueId
    let previousElements = document.getElementsByClassName('active-caption')
    for (let i=0; i<previousElements.length; i++) {
      previousElements[i].classList.remove('active-caption');
    }
    let element = document.getElementById(`caption_${cueId}`)
    element.scrollIntoView({behavior: "smooth", block: "center"})
    element.setAttribute('class', 'active-caption')
    player.play()
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
  play,
  pause
}
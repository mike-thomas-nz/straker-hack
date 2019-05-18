import * as videoplayer from "./workbench/videoplayer";
import 'socket.io-client';

import './workbench/editor.js';
import './workbench/util.js';

import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'video.js/dist/video-js.css';
import './style.css';

let videoSrc = '/resources/video/animation/dash/animation.mpd'
let videoType= 'application/dash+xml'
let srtSrc = '/resources/subs/animation/english.srt'

videoplayer.init('my-player', {
  src: videoSrc,
  type: videoType
}, {
  controls: true,
  autoplay: false,
  preload: 'auto',
  width: '640',
  height: '400'
},[{
  src: srtSrc,
  kind: 'captions',
  srclang: 'en',
  label: 'English',
  default: true
}])

const socket = io("http://localhost:3000")
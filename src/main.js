import * as videoplayer from "./workbench/videoplayer";
import 'socket.io-client';

import './workbench/editor.js';
import './workbench/util.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'video.js/dist/video-js.css';
import './style.css';
let videoSrc = '/resources/video/rocket/640x480/rocket.mp4'
let srtSrc = '/resources/subs/rocket/english_webvtt.srt'
videoplayer.init('my-player', videoSrc, {
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

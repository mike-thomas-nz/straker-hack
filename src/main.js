import * as videoplayer from "./videoplayer";

import './editor.js';
import './util.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'video.js/dist/video-js.css';
import './style.css';
let videoSrc = '/resources/video/rocket/640x480/rocket.mp4'
videoplayer.init('my-player', videoSrc, {
  controls: true,
  autoplay: false,
  preload: 'auto',
  width: '640',
  height: '400'
},[{
  src: '/resources/subs/rocket/english_webvtt.srt',
  kind: 'captions',
  srclang: 'en',
  label: 'English',
  default: true
}])

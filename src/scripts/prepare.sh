#!/usr/bin/env bash

path=$(dirname $1)
file=$(basename $1)
overlay=$(echo $file | sed s/\\./-overlay./)
segment_length=8000

realname="James Hanson"
email="james@translate.com"
username="jhanson"
job_id="TJ123456"
owner="NZ Story"
ip="202.49.183.123"
city="Gisborne"
latlong="178.003998,-38.653000"

if [[ ! -f $path/$file ]]; then
  echo "Couldn't find file ${file} in ${path}"
  exit 1
fi

cd $path

# # add overlay
ffmpeg -i $file -vf \
  "[in] \
    drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${realname}':x=10:y=(h)/2-100, \
    drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${email}':x=10:y=((h)/2)-75, \
    drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${username}':x=10:y=((h)/2)-50, \
    drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${job_id}':x=10:y=((h)/2), \
    drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='PROPERTY OF ${owner}':x=10:y=((h)/2)+25, \
    drawtext=fontsize=16:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${ip}':x=10:y=((h)/2)+50, \
    drawtext=fontsize=16:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${city}':x=10:y=((h)/2)+75, \
    drawtext=fontsize=16:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${latlong}':x=10:y=((h)/2)+100 \
  [out]" -y $overlay

# ffmpeg -i $file -vf \
#   "[in] \
#     drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${realname}':x=10:y=(h)/2-100, \
#     drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${email}':x=10:y=((h)/2)-75, \
#     drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${username}':x=10:y=((h)/2)-50, \
#     drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='${job_id}':x=10:y=((h)/2), \
#     drawtext=fontsize=20:fontcolor=white:borderw=1:bordercolor=black@0.5:fontfile='/Users/mike/src/javascript/streaming/mike/assets/fonts/courier.ttf':text='PROPERTY OF ${owner}':x=10:y=((h)/2)+25 \
#   [out]" -y $overlay


# # segment for dash
if [[ ! -d dash ]]; then
  echo "Creating dash folder"
  mkdir dash
elif [[ ! -z "$(ls -A dash)" ]]; then
  echo "clearing dash folder"
  rm dash/*
fi

MP4Box -dash $segment_length -frag-rap -bs-switching no -profile live -out dash/$(basename $file)_dash $overlay#video $overlay#audio

#!/usr/bin/env ruby

def parse_times(filename)
    times = []
    # secs
    
    f = File.open filename
    
    f.readlines.each { |line|
        if line =~ /^\d\d:\d\d.\d{3}\s+\-\-\>\s+\d\d:\d\d.\d{3}/
            puts line
            this_time = line.chomp.split(/\s+\-\-\>\s+/)

            time_parsed = this_time.map.with_index { |t, i|
                smh = t.split /(\d+):(\d+)\.(\d+)/
                secs = (smh[1].to_i * 60) + smh[2].to_i

                [secs, "#{00}:#{t.split(/\./).first}"]
            }

            times << time_parsed

            # time_parsed = this_time.map.with_index { |t, i|
            #     smh = t.split /(\d+):(\d+)\.(\d+)/
            #     secs = (smh[1].to_i * 60) + smh[2].to_i
                
            #     "#{00}:#{t.split(/\./).first}"
                
            #     # secs += (i == 0) ? -1 : 1
            #     secs
            # }

            # times << this_time.map { |t|
            #     # p t.split /./
            #     "#{00}:#{t.split(/\./).first}"
            # }

        end 
    }
    
    # p times
    times
end

def build_ffmpeg(times, file)
    ffmpeg = "ffmpeg -i #{file} "

    p times

    ffmpeg += times.map.with_index { |t,i|
        if i-1 > 0
            skip = t[0][0] - times[i-1][1][0]
            p skip
        else
        end
    }

    # ffmpeg += times.map.with_index { |t, i|
    #     "-ss #{t[0]} -t #{t[1]} pieces/file#{i}.mp4 "
    # }.join

    # p ffmpeg

    ffmpeg
end

=begin

ffmpeg -i abcdef.tvshow -t 0:00:05 a.tvshow -ss 0:00:10 -t 0:00:05 c.tvshow -ss 0:00:20 -t 0:00:05 e.tvshow

ffmpeg -i animation.mp4 -ss 0:00:03 1.mp4 -t 0:00:04 pieces/1.mp4 -ss 0:00:04 -t 0:00:05 2.mp4 -ss 0:00:05 -t 0:00:08 3.mp4 -ss 


ffmpeg -i  animation.mp4 -vf \
    "[in] \
        trim=10:20 \
    [out]"

ffmpeg -i  animation.mp4 -filter_complex \
"[0:v]trim=start=10:end=15,setpts=PTS-STARTPTS[1]; \
[0:v]trim=start=20:end=25,setpts=PTS-STARTPTS[2]; \
[1][2]concat[3] \
[0:v]trim=start=30:end=35,setpts=PTS-STARTPTS[4]; \
[3][4]concat[5]
[0:v]trim=start=40:end=45,setpts=PTS-STARTPTS[6]; \
[5][6]concat[7] \
[out1]" -map [out1] out.mp4

ffmpeg -i in.ts -filter_complex \
"[0:v]trim=duration=30[a]; \
 [0:v]trim=start=40:end=50,setpts=PTS-STARTPTS[b]; \
 [a][b]concat[c]; \
 [0:v]trim=start=80,setpts=PTS-STARTPTS[d]; \
 [c][d]concat[out1]" -map [out1] out.ts

ffmpeg -i animation.mp4 -filter_complex \
"[0:v]trim=duration=30[a]; \
[0:v]trim=start=40:end=50,setpts=PTS-STARTPTS[b]; \
[a][b]concat[c]; \
[0:v]trim=start=80,setpts=PTS-STARTPTS[d]; \
[c][d]concat[out1]" -map [out1] out.mp4

    ffmpeg -i in.ts -filter_complex \
        "[0:v]trim=duration=30[a]; \
         [0:v]trim=start=40:end=50,setpts=PTS-STARTPTS[b]; \
         [a][b]concat[c]; \
         [0:v]trim=start=80,setpts=PTS-STARTPTS[d]; \
         [c][d]concat[out1]" -map [out1] out.ts


    ffmpeg -i utv.ts -filter_complex \
        "[0:v]trim=duration=30[av];[0:a]atrim=duration=30[aa];\
        [0:v]trim=start=40:end=50,setpts=PTS-STARTPTS[bv];\
        [0:a]atrim=start=40:end=50,asetpts=PTS-STARTPTS[ba];\
        [av][bv]concat[cv];[aa][ba]concat=v=0:a=1[ca];\
        [0:v]trim=start=80,setpts=PTS-STARTPTS[dv];\
        [0:a]atrim=start=80,asetpts=PTS-STARTPTS[da];\
        [cv][dv]concat[outv];[ca][da]concat=v=0:a=1[outa]" -map [outv] -map [outa] out.ts

=end

def run
    file = "english.srt"
    times = parse_times file
    build_ffmpeg times, file
end

if __FILE__ == $0
    run
end
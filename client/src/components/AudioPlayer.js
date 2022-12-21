import React, { useRef, useState, useEffect } from 'react';
import { Button, Grid , IconButton, Typography, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
function AudioPlayer(props) {
  // Create a reference to the audio element
  const audioRef = useRef(null);

  // Create state variables to track the audio playback status and progress
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Define a function to toggle the audio playback
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeekChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  // Render the audio player
  return (
    <Grid container style={{ backgroundColor: 'black' }}>
      <audio
        ref={audioRef}
        src={props.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      />
      <Grid item xs={1}>
      <IconButton style={{ color: 'white' }} onClick={togglePlay}>{isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}</IconButton>
      </Grid>

      <Grid item xs={8}>
      <Slider 
      style={{ color: 'white' }}
      value={currentTime}
      onChange={handleSeekChange}
      aria-labelledby="audio-seek"
      min={0}
      max={duration}
      />
      </Grid>
      <Grid item>
        <Typography id="audio-seek">
          {currentTime.toFixed(0)} / {duration.toFixed(0)}
        </Typography>
      </Grid>

      <Grid item xs={1}>
      <IconButton style={{ color: 'white' }}>{isMute ? <VolumeOffIcon/> : <VolumeUpIcon/>}</IconButton>
      </Grid>

      <Grid item xs={1}>
      <Slider style={{ color: 'white' }}/>
      </Grid>

    </Grid >
  );
}

export default AudioPlayer;
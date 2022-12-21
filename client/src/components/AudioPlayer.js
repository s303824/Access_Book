import React, { useRef, useState, useContext } from 'react';
import { Grid , IconButton, Typography, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { GlobalStoreContext } from '../store'

function AudioPlayer(props) {
  // Create a reference to the audio element
  const audioRef = useRef(null);
  const { store } = useContext(GlobalStoreContext);

  // Create state variables to track the audio playback status and progress
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const [volume, setVolume] = useState(0.5);
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

  const toggleMute = () => {
    if (isMute) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMute(!isMute);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeekChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const updateVolume = (event) => {
    audioRef.current.volume = event.target.value;
    setVolume(event.target.value);
    if(event.target.value == 0.0){
      toggleMute();
    }
  }
  const handleNext = () => {
    store.nextPage();
  }

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
      <Grid item>
      <IconButton style={{ color: 'white' }}><SkipPreviousIcon/></IconButton>
      </Grid>
      <Grid item>
      <IconButton style={{ color: 'white' }} onClick={handleNext}><SkipNextIcon/></IconButton>
      </Grid>


      <Grid item>
      <IconButton style={{ color: 'white' }} onClick={toggleMute}>{isMute ? <VolumeOffIcon/> : <VolumeUpIcon/>}</IconButton>
      </Grid>

      <Grid item xs={1}>
      <Slider style={{ color: 'white' }} value={volume} min={0} max={1} step={0.01} onChange={updateVolume} />
      </Grid>

    </Grid >
  );
}

export default AudioPlayer;
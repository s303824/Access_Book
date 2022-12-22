import React, { useRef, useState, useContext, useEffect } from 'react';
import { Grid , IconButton, Typography, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { GlobalStoreContext } from '../store'

function AudioPlayer(props) {
  // Create a reference to the audio element
  const audioRef = useRef(null);
  const { store } = useContext(GlobalStoreContext);

  useEffect( () => {
    if(audioRef && currentTime === duration){
      handleNext()
    }
    if(audioRef){
      audioRef.current.playbackRate = playbackRate;
    }
  });

  // Create state variables to track the audio playback status and progress
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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
    if(event.target.value === 0.0){
      toggleMute();
    }
  }
  const handleNext = () => {
    if(store.pageNum < store.count){
      store.nextPage();
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
      }
  }

  const handlePrev = () => {
    if(store.pageNum > 1){
      store.prevPage();
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }  
    }
  }

  const secondsToHHMMSS = (value) =>{
    var time = Number(value);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);
  
    // round seconds
    seconds = Math.round(seconds * 100) / 100
  
    var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
  }

  const handleSelect = (rate) => {
    setPlaybackRate(rate);
    setAnchorEl(null);
  };

  // Render the audio player
  return (
    <Grid container style={{ backgroundColor: 'black' }}
    spacing={1}>
      <audio
        ref={audioRef}
        src={props.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        playbackRate={playbackRate}
        preload="auto"
      />
      <Grid item>
      <IconButton style={{ color: 'white' }} onClick={togglePlay}>{isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}</IconButton>
      </Grid>

      <Grid item xs={7}>
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
        <Typography id="audio-seek" sx={{color:"white"}}>
          {secondsToHHMMSS(currentTime.toFixed(0))} / {secondsToHHMMSS(duration.toFixed(0))}
        </Typography>
      </Grid>
      <Grid item>
      <IconButton style={{ color: 'white' }} onClick={handlePrev}><SkipPreviousIcon/></IconButton>
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
      <Grid item>
      <IconButton style={{ color: 'white' }} onClick={handleClick}><SettingsIcon/></IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography>Playback Rate</Typography>
        {[0.5, 0.75, 1, 1.5, 2].map((rate) => (
          <MenuItem key={rate} onClick={() => handleSelect(rate)}>{rate}</MenuItem>
        ))}
      </Menu>
      </Grid>
    </Grid >
  );
}

export default AudioPlayer;
import '../App.css';
import { useState, useContext, useEffect } from "react";
import { GlobalStoreContext } from '../store'
import AudioPlayer from '../components/AudioPlayer';
import { Typography } from '@mui/material';
function BookViewer() {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() =>{
    if(store.text === ""){
      store.nextPage();
    }
  })

  return (
    <header className=".App-header">
      <AudioPlayer src="https://ia600707.us.archive.org/20/items/walden_librivox/walden_c01_p01.mp3"/>
      <Typography>{store.text}</Typography>
    </header>
  );
}

export default BookViewer;

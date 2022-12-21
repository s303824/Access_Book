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
      <AudioPlayer src={store.audio}/>
      <Typography>{store.text}</Typography>
    </header>
  );
}

export default BookViewer;

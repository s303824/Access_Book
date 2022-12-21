import '../App.css';
import { useState, useContext, useEffect } from "react";
import { GlobalStoreContext } from '../store'
import AudioPlayer from '../components/AudioPlayer';
function BookViewer() {
  const { store } = useContext(GlobalStoreContext);


  return (
    <div className="App">
      <header className="App-header">
      <AudioPlayer src="https://ia600707.us.archive.org/20/items/walden_librivox/walden_c01_p01.mp3"/>
    </header>
    </div>
  );
}

export default BookViewer;

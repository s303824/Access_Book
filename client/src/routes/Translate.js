import '../App.css';
import logo from '../assets/translate.jpg';
import { Button } from '@mui/material';
import { useState, useContext } from "react";
import { GlobalStoreContext } from '../store'

function Translate() {
  const { store } = useContext(GlobalStoreContext);

  const handleInput = (event) =>{
    store.createAudioFile(event.target.files[0]);
  }
  
  return (
    <div className="App">
      <header className="App-header2">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Select a book and we'll translate it to you!
        </p>
        <input
          accept=".pdf, .epub"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(event) => handleInput(event)}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" className="span">
            Upload
          </Button>
        </label>
      </header>
    </div>
  );
}

export default Translate;

import '../App.css';
import logo from '../assets/megaphone.jpg';
import { Button } from '@mui/material';
import { useContext } from "react";
import { GlobalStoreContext } from '../store'

function Book2Speech() {
  const { store } = useContext(GlobalStoreContext);

  const handleInput = (e) =>{
    store.startReading(e.target.files[0]);
  }
  
    //                  TODO: EPUB FILE FUNCTIONALITY

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Select a book and we'll read it to you!
        </p>
        <input
          accept=".pdf"
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

export default Book2Speech;

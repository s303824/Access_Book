import '../App.css';
import { useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import AudioPlayer from '../components/AudioPlayer';
import { TextField, Typography } from '@mui/material';
function BookViewer() {
  const { store } = useContext(GlobalStoreContext);

  return (
    <header className=".App-header">
      <AudioPlayer src={store.audio}/>
      <Typography sx={{textAlign:'center', fontSize: 'h6.fontSize' }}>Page {store.pageNum}</Typography>
      <Typography>{store.text}</Typography>
    </header>

  );
  /*const [index, setIndex] = useState(store.pageNum);

  const handleGetPage = (event) => {
    if(event.keyCode===13){
      store.getPage(index);
    }
  }

  const handleChange = (event) => {
    setIndex(event.target.value )
  }

  return (
    <header className=".App-header">
      <AudioPlayer src={store.audio}/>
      <div className='App'>
      <Typography sx={{textAlign:'center', fontSize: 'h6.fontSize' }}></Typography>
      <TextField 
      id="filled-basic" 
      type="number" 
      label={"Page"} 
      variant="filled" 
      textAlign="center" 
      inputProps={{min : 1, max : store.count}}
      defaultValue={store.pageNum} 
      onKeyDown={handleGetPage}
      onChange={handleChange}/>      
      </div>
      <Typography>{store.text}</Typography>
    </header>
  );*/
}

export default BookViewer;

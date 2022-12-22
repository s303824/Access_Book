import { useNavigate } from 'react-router-dom'
import { createContext, useState } from 'react'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const GlobalStoreContext = createContext();

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        file: null,
        audio : "https://ia600707.us.archive.org/20/items/walden_librivox/walden_c01_p01.mp3",
        pageNum: 1,
        text : "",
        count : 1
        });
    const navigate= useNavigate();



      //                  TODO: EPUB FILE FUNCTIONALITY
      //                  TODO: FILTER OUT BLANK PAGES
      //                  TODO: HANDLE MP3 FILE PROPERLY


    store.startReading = (selectedFile) => {
        console.log(selectedFile);

        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append('number', 1);

        api.post('/generateTextPage', formData).then((response) => {
            console.log("Page received")
            setStore({
              file : selectedFile,
              audio : 'http://localhost:4000/createAudioFile?text='+JSON.stringify(response.data.text),
              pageNum : 1,
              text : response.data.text,
              count : response.data.pageCount
            });
              navigate('/read');
          }).catch((error) => {
            console.error(error);
          });
    }

    store.nextPage =  () => {
      const formData = new FormData();
      formData.append('pdf', store.file);
      formData.append('number', store.pageNum + 1);

      api.post('/generateTextPage', formData).then((response) => {
        console.log("Page received")
        console.log(response.data.text);
        setStore({
            file : store.file,
            audio : 'http://localhost:4000/createAudioFile?text='+JSON.stringify(response.data.text),
            pageNum : store.pageNum + 1,
            text : response.data.text,
            count : response.data.pageCount
        });
        }).catch((error) => {
          console.error(error);
        });
  }

  store.prevPage =  () => {
    const formData = new FormData();
    formData.append('pdf', store.file);
    formData.append('number', store.pageNum - 1);

    api.post('/generateTextPage', formData).then((response) => {
      console.log("Page received")
      console.log(response.data.text);
      setStore({
          file : store.file,
          audio : 'http://localhost:4000/createAudioFile?text='+JSON.stringify(response.data.text),
          pageNum : store.pageNum - 1,
          text : response.data.text,
          count : response.data.pageCount
        });
      }).catch((error) => {
        console.error(error);
      });
}


      
    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}
export default GlobalStoreContext;
export { GlobalStoreContextProvider };
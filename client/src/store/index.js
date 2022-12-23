import { useNavigate } from 'react-router-dom'
import { createContext, useState } from 'react'
import axios from 'axios';

const url = 'http://localhost:4000'
const api = axios.create({
  baseURL: url,
});

export const GlobalStoreContext = createContext();

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        file: null,
        audio : "https://ia600707.us.archive.org/20/items/walden_librivox/walden_c01_p01.mp3",
        pageNum: 1,
        text : "",
        count : 1,
        type : ""
        });
    const navigate= useNavigate();



      //                  TODO: EPUB FILE FUNCTIONALITY
      //                  TODO: FILTER OUT BLANK PAGES
      //                  TODO: HANDLE MP3 FILE PROPERLY


    store.startReading = (selectedFile) => {
        console.log(selectedFile);
        if(selectedFile.type === "application/pdf"){
          const formData = new FormData();
          formData.append('pdf', selectedFile);
          formData.append('number', 1);
  
          api.post('/generateTextPagePdf', formData).then((response) => {
              setStore({
                file : selectedFile,
                audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
                pageNum : 1,
                text : response.data.text,
                count : response.data.pageCount,
                type : "Pdf"
              });
                navigate('/read');
            }).catch((error) => {
              console.error(error);
            });  
        }
        else{
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('number', 1);
  
          api.post('/generateTextPageEpub', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
              setStore({
                file : selectedFile,
                audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
                pageNum : 1,
                text : response.data.text,
                count : response.data.pageCount,
                type : "Epub"
              });
                navigate('/read');
            }).catch((error) => {
              console.error(error);
            });
  
        }
    }

    store.nextPage =  () => {
      if(store.type === "Pdf"){
        const formData = new FormData();
        formData.append('pdf', store.file);
        formData.append('number', store.pageNum + 1);
    
        api.post('/generateTextPagePdf', formData).then((response) => {
            setStore({
              file : store.file,
              audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
              pageNum : store.pageNum + 1,
              text : response.data.text,
              count : response.data.pageCount,
              type : "Pdf"
            });
              navigate('/read');
          }).catch((error) => {
            console.error(error);
          });  
      }
      else{
        const formData = new FormData();
        formData.append('epub', store.file);
        formData.append('number', store.pageNum + 1);

        api.post('/generateTextPageEpub', formData).then((response) => {
            setStore({
              file : store.file,
              audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
              pageNum : store.pageNum + 1,
              text : response.data.text,
              count : response.data.pageCount,
              type : "Epub"
            });
              navigate('/read');
          }).catch((error) => {
            console.error(error);
          });
        }
  }

  store.prevPage =  () => {
    if(store.type === "Pdf"){
      const formData = new FormData();
      formData.append('pdf', store.file);
      formData.append('number', store.pageNum - 1);
  
      api.post('/generateTextPagePdf', formData).then((response) => {
          setStore({
            file : store.file,
            audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
            pageNum : store.pageNum - 1,
            text : response.data.text,
            count : response.data.pageCount,
            type : "Pdf"
          });
            navigate('/read');
        }).catch((error) => {
          console.error(error);
        });  
    }
    else{
      const formData = new FormData();
      formData.append('epub', store.file);
      formData.append('number', store.pageNum - 1);

      api.post('/generateTextPageEpub', formData).then((response) => {
          setStore({
            file : store.file,
            audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
            pageNum : store.pageNum - 1,
            text : response.data.text,
            count : response.data.pageCount,
            type : "Epub"
          });
            navigate('/read');
        }).catch((error) => {
          console.error(error);
        });
      }
}

store.getPage =  (index) => {
  if(store.type === "Pdf"){
    const formData = new FormData();
    formData.append('pdf', store.file);
    formData.append('number', index);

    api.post('/generateTextPagePdf', formData).then((response) => {
        setStore({
          file : store.file,
          audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
          pageNum : index,
          text : response.data.text,
          count : response.data.pageCount,
          type : "Pdf"
        });
          navigate('/read');
      }).catch((error) => {
        console.error(error);
      });  
  }
  else{
    const formData = new FormData();
    formData.append('epub', store.file);
    formData.append('number', index);

    api.post('/generateTextPageEpub', formData).then((response) => {
        setStore({
          file : store.file,
          audio : url+'/createAudioFile?text='+JSON.stringify(response.data.text),
          pageNum : index,
          text : response.data.text,
          count : response.data.pageCount,
          type : "Epub"
        });
          navigate('/read');
      }).catch((error) => {
        console.error(error);
      });
    }
}

 
    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}
export default GlobalStoreContext;
export { GlobalStoreContextProvider };
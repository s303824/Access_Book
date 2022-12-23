import { useNavigate } from 'react-router-dom'
import { createContext, useState } from 'react'
import axios from 'axios';
const pdfjs = require('pdfjs-dist');

const url = 'http://localhost:4000/api'
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
          const source = {
            data: new Uint8Array(selectedFile.buffer),
                    };
        console.log(selectedFile)
          let text = "";
          var loadingTask = pdfjs.getDocument(source);
          loadingTask.promise.then(function(doc) {
            doc.getPage(1).then((page) => {
              page.getTextContent().then((content) => {
                content.items.forEach((item) => {
                  text+=item.str + " ";
                });
                text = text.trim().replace(/\s+/g, ' ');
                setStore({
                  file : selectedFile,
                  audio : url+'/createAudioFile?text='+JSON.stringify(text),
                  pageNum : 1,
                  text : text,
                  count : doc.numPages,
                  type : "Pdf"
                });
                  navigate('/read');
              });
            });
          });
        }
    }

    store.nextPage =  () => {
      if(store.type === "Pdf"){
          const source = {
            data: new Uint8Array(store.file.buffer),    };
        
          let text = "";
          var loadingTask = pdfjs.getDocument(source);
          loadingTask.promise.then(function(doc) {
            doc.getPage(store.pageNum + 1).then((page) => {
              page.getTextContent().then((content) => {
                content.items.forEach((item) => {
                  text+=item.str + " ";
                });
                text = text.trim().replace(/\s+/g, ' ');
                setStore({
                  file : store.file,
                  audio : url+'/createAudioFile?text='+JSON.stringify(text),
                  pageNum : store.pageNum + 1,
                  text : text,
                  count : doc.numPages,
                  type : "Pdf"
                });
              });
            });
          });
        }
    }

  store.prevPage =  () => {
    if(store.type === "Pdf"){
      const source = {
        data: new Uint8Array(store.file.buffer),    };
    
      let text = "";
      var loadingTask = pdfjs.getDocument(source);
      loadingTask.promise.then(function(doc) {
        doc.getPage(store.pageNum - 1).then((page) => {
          page.getTextContent().then((content) => {
            content.items.forEach((item) => {
              text+=item.str + " ";
            });
            text = text.trim().replace(/\s+/g, ' ');
            setStore({
              file : store.file,
              audio : url+'/createAudioFile?text='+JSON.stringify(text),
              pageNum : store.pageNum - 1,
              text : text,
              count : doc.numPages,
              type : "Pdf"
            });
          });
        });
      });
    }
}

store.getPage =  (index) => {
  if(store.type === "Pdf"){
    const source = {
      data: new Uint8Array(store.file.buffer),    };
  
    let text = "";
    var loadingTask = pdfjs.getDocument(source);
    loadingTask.promise.then(function(doc) {
      doc.getPage(index).then((page) => {
        page.getTextContent().then((content) => {
          content.items.forEach((item) => {
            text+=item.str + " ";
          });
          text = text.trim().replace(/\s+/g, ' ');
          setStore({
            file : store.file,
            audio : url+'/createAudioFile?text='+JSON.stringify(text),
            pageNum : store.pageNum + 1,
            text : text,
            count : doc.numPages,
            type : "Pdf"
          });
        });
      });
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
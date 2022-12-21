import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const GlobalStoreContext = createContext();

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        file: null,
        text: []
        });
    const navigate= useNavigate();

    store.createAudioFile =  (selectedFile, index) => {
        console.log(selectedFile);

        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append('number', index);

        api.post('/createAudioFile', formData).then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.error(error);
          });
         navigate('/read');
    }

      
    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}
export default GlobalStoreContext;
export { GlobalStoreContextProvider };
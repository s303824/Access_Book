import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'
import * as pdfjs from 'pdfjs-dist';
import { CloseOutlined } from '@mui/icons-material';

export const GlobalStoreContext = createContext();

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        file: null,
        text: []
        });
    const navigate= useNavigate();

    store.storeFile = async function (e) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setStore({file : e.target.result});
        };
        reader.readAsDataURL(e.target.files[0]);
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
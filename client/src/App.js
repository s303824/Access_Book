import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Book2Speech from "./routes/Book2Speech";
import Translate from "./routes/Translate";
import BookViewer from "./routes/BookViewer";
import TopBar from './components/TopBar';
import { GlobalStoreContextProvider } from './store'

function App() {  
  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>  
      <TopBar/>
      <Routes>
        <Route path="/" element={<Book2Speech/>}/>
        <Route path="/translate" element={<Translate/>}/>
        <Route path="/read" element={<BookViewer/>}/>
      </Routes>
      </GlobalStoreContextProvider>  
    </BrowserRouter>
  );
}

export default App;
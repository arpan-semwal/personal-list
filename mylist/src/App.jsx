
import {BrowserRouter , Routes , Route} from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
function App() {
  

return (
  <BrowserRouter>
<div>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path="/" Component={Home}></Route>
      </Routes>
    </div>

</BrowserRouter>


    
  )
}

export default App

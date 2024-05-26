
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import React ,{useState} from 'react';
 

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRoutes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Home from './components/Home';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message , type) =>{
    setAlert({
      msg : message ,
      type : type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
    <NoteState>

      <Navbar></Navbar>
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>}/>    
        <Route path="/about" element={<About/>}/>   
        <Route path="/login" element={<Login alert={alert} showAlert={showAlert}/>}/>  
        <Route path="/signup" element={<Signup showAlert={showAlert} alert={alert}/>}/>  
</Routes>
    </NoteState>
    </>
  );
}
export default App;

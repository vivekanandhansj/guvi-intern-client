
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'


function App() {
  return (
   <BrowserRouter>      
      <Routes>
        <Route path="/profile" exact element={<Home />} />
        <Route path="/" exact element={<Register />} />
        <Route  path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

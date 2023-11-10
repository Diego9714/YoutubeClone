import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Componentes para cada ruta
import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import Video from './page/Video';

import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

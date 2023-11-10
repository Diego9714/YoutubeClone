import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Componentes para cada ruta
import Home from './page/Home';
import Register from './page/Register';
import RegisterVideos from './page/RegisterVideos';
import Login from './page/Login';
import Video from './page/Video';
import History from './page/History';
import Popular from './page/Popular';
import Statistics from './page/Statistics';

import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register-videos" element={<RegisterVideos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/history" element={<History />} />
          <Route path="/home" element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

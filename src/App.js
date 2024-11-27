// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadService from './UploadService';
import GalleryPage from './GalleryPage';
import Doc from './Doc';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadService />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/doc" element={<Doc />} />
      </Routes>
    </Router>
  );
}

export default App;

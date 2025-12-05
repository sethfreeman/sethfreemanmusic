import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Bio from './pages/Bio';
import Music from './pages/Music';
import Photos from './pages/Photos';
import Video from './pages/Video';
import Shows from './pages/Shows';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <h1>Seth Freeman</h1>
            <p className="tagline">Singer / Songwriter</p>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/photos">Photos</Link></li>
            <li><Link to="/video">Video</Link></li>
            <li><Link to="/bio">Bio</Link></li>
            <li><Link to="/shows">Tour</Link></li>
          </ul>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/music" element={<Music />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/video" element={<Video />} />
            <Route path="/shows" element={<Shows />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 Seth Freeman Music. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

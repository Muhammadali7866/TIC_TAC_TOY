import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Content from './components/content';
import Board from "./components/board";
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Board />} /> */}
          <Route path="/about" element={<Content />} />
          <Route path="/contact" element={<Board/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

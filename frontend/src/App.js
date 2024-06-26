import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Content from "./components/content";
import Board from "./components/board";
import UserContextProvider from "./context/UserContextProvider";
import Startgame from "./components/startgame";
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
import PrivateRoute from "./components/PrivateRoute";
import GameHistory from "./components/GameHistory";
function App() {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Board />} /> */}
            <Route path="/friend" element={<Content />} />
            <Route path="/history" element={<GameHistory />} />
            {/* <Route path="/contact" element={<Board />} /> */}
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Board />
                </PrivateRoute>
              }
            />{" "}
            <Route path="/popUp" element={<Startgame />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;

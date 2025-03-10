import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import RaceMode from "./pages/RaceMode";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";

export default function Router() {
    return (
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/visualizer">Visualizer</Link>
                <Link to="/race-mode">Race Mode</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualizer" element={<Visualizer />} />
                <Route path="/race-mode" element={<RaceMode />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

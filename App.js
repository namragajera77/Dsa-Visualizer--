import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Visualizer from "./pages/Visualizer"
import RaceMode from "./pages/RaceMode"
import Leaderboard from "./pages/Leaderboard"
import About from "./pages/About"
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

// Create a separate component for the animated routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/race-mode" element={<RaceMode />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

// Add this component to handle route changes
function RouteChangeHandler() {
  const location = useLocation();

  useEffect(() => {
    // Cleanup any running audio contexts when route changes
    const cleanup = () => {
      // Stop all audio contexts
      const audioContexts = window.audioContextInstances || [];
      audioContexts.forEach(context => {
        try {
          if (context.state === 'running') {
            context.suspend();
            context.close();
          }
        } catch (e) {
          console.log('Error cleaning up audio:', e);
        }
      });

      // Clear any running intervals
      if (window.visualizerIntervals) {
        window.visualizerIntervals.forEach(interval => clearInterval(interval));
        window.visualizerIntervals = [];
      }

      // Reset audio instances
      window.audioContextInstances = [];
    };

    // Run cleanup when location changes
    if (!location.pathname.includes('/visualizer')) {
      cleanup();
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <RouteChangeHandler />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;


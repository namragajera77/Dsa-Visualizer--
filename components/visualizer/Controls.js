import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../constants/index";

// Add default SPEEDS object
const DEFAULT_SPEEDS = {
  LOW: 1000,
  MEDIUM: 500,
  HIGH: 100
};

const Controls = ({
  isPaused,
  isRunning,
  startVisualization,
  stopVisualization,
  resetData,
  searchResultMessage,
  algorithm,
  foundIndex,
  currentStep = 0,
  currentSteps = [],
  speed,
  setSpeed,
  showSpeedMenu,
  setShowSpeedMenu,
  SPEEDS = DEFAULT_SPEEDS,
  stepCounts = { comparisons: 0, swaps: 0 },
}) => {
  // Helper function to safely get speed label
  const getSpeedLabel = () => {
    if (!SPEEDS || !speed) return 'medium';
    const speedEntry = Object.entries(SPEEDS).find(([_, value]) => value === speed);
    return speedEntry ? speedEntry[0].toLowerCase() : 'medium';
  };

  // Helper function to safely calculate progress percentage
  const getProgressPercentage = () => {
    if (!currentSteps || !currentSteps.length) return '0%';
    return `${Math.round((currentStep / currentSteps.length) * 100)}%`;
  };

  // Helper function to check if current algorithm is a sorting algorithm
  const isSortingAlgorithm = () => {
    return algorithm?.includes('sort');
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 mb-4 p-4 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Speed Control with improved animation */}
        <div className="relative speed-control">
          <motion.button
            className="speed-control relative px-4 py-2 bg-white rounded shadow-sm hover:shadow-md 
              transition-all flex items-center gap-2 text-gray-700"
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            disabled={isRunning && !isPaused}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Speed: {getSpeedLabel()}</span>
          </motion.button>
          
          <AnimatePresence>
            {showSpeedMenu && (
              <motion.div 
                className="absolute mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black 
                  ring-opacity-5 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="py-1" role="menu">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${speed === SPEEDS.LOW ? 'bg-purple-100 text-purple-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSpeed(SPEEDS.LOW)}
                  >
                    Low Speed
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${speed === SPEEDS.MEDIUM ? 'bg-purple-100 text-purple-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSpeed(SPEEDS.MEDIUM)}
                  >
                    Medium Speed
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${speed === SPEEDS.HIGH ? 'bg-purple-100 text-purple-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSpeed(SPEEDS.HIGH)}
                  >
                    High Speed
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Control Buttons with better visual feedback */}
        <div className="flex flex-wrap gap-3">
          <button
            className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 
              transform active:scale-95 flex items-center gap-2 ${
              isPaused 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
            onClick={startVisualization}
            disabled={isRunning && !isPaused}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isPaused ? "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}
              />
            </svg>
            {isPaused ? 'Resume' : 'Start'}
          </button>
          {isRunning && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={stopVisualization}
              disabled={isPaused}
            >
              Stop
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={resetData}
            disabled={isRunning && !isPaused}
          >
            Reset
          </button>
        </div>

        {/* Search Result Message */}
        {algorithm?.includes('search') && searchResultMessage && currentStep >= currentSteps.length && (
          <div className={`px-4 py-2 rounded-lg font-medium ${
            foundIndex !== null ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {searchResultMessage}
          </div>
        )}
      </div>

      {/* Statistics Cards - Show for both sorting and searching algorithms */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[
          {
            label: "Comparisons",
            value: stepCounts?.comparisons || 0,
            color: "yellow"
          },
          {
            label: "Swaps/Steps",
            value: stepCounts?.swaps || 0,
            color: "blue"
          },
          {
            label: "Progress",
            value: getProgressPercentage(),
            color: "purple"
          }
        ].map(({ label, value, color }) => (
          <motion.div
            key={label}
            className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200`}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`text-${color}-800 text-lg font-medium`}>{label}</div>
            <div className={`text-2xl font-bold text-${color}-900`}>{value}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Controls; 
"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import * as SortingAlgorithms from "../components/visualizer/algorithms/SortingAlgorithms";
import * as SearchAlgorithms from "../components/visualizer/algorithms/SearchAlgorithms";
import { SPEEDS } from "../constants";

const algorithms = {
  sorting: [
    { 
      name: "Bubble Sort", 
      func: SortingAlgorithms.bubbleSortWithSteps,
      complexity: "O(n²)",
      description: "Simple sorting algorithm that repeatedly steps through the list"
    },
    { 
      name: "Selection Sort", 
      func: SortingAlgorithms.selectionSortWithSteps,
      complexity: "O(n²)",
      description: "Finds minimum element and places it at the beginning"
    },
    { 
      name: "Insertion Sort", 
      func: SortingAlgorithms.insertionSortWithSteps,
      complexity: "O(n²)",
      description: "Builds sorted array one element at a time"
    },
    { 
      name: "Merge Sort", 
      func: SortingAlgorithms.mergeSortWithSteps,
      complexity: "O(n log n)",
      description: "Divides array into smaller subarrays and merges them"
    },
    { 
      name: "Quick Sort", 
      func: SortingAlgorithms.quickSortWithSteps,
      complexity: "O(n log n)",
      description: "Uses pivot to partition array into smaller segments"
    }
  ],
  searching: [
    { 
      name: "Linear Search", 
      func: SearchAlgorithms.linearSearchWithSteps,
      complexity: "O(n)",
      description: "Sequentially checks each element in the array"
    },
    { 
      name: "Binary Search", 
      func: SearchAlgorithms.binarySearchWithSteps,
      complexity: "O(log n)",
      description: "Efficiently finds element in sorted array"
    }
  ]
};

const NUM_RUNS = 3;

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[100px]" />
    </div>
  );
};

const RaceMode = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [arrayData, setArrayData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [speed, setSpeed] = useState(SPEEDS.MEDIUM);
  const [searchValue, setSearchValue] = useState(null);
  const [algorithmType, setAlgorithmType] = useState('sorting');
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const resultsRef = useRef(null);

  // Update generateArray to use fixed size of 10
  const generateArray = () => {
    const length = 10; // Fixed array size
    const newArray = Array.from({ length }, () => 
      Math.floor(Math.random() * 99) + 1
    );
    setArrayData(newArray);
    
    if (algorithmType === 'searching') {
      const randomIndex = Math.floor(Math.random() * length);
      setSearchValue(newArray[randomIndex]);
    }
  };

  useEffect(() => {
    generateArray();
  }, [algorithmType]);

  const startRace = async () => {
    if (selectedAlgorithms.length < 2) return;
    setIsRunning(true);
    setResults([]);

    try {
      // Run algorithms sequentially instead of parallel to prevent freezing
      const results = [];
      for (const algo of [...new Set(selectedAlgorithms)]) {
        let totalTime = 0;
        let totalSteps = 0;
        let totalComparisons = 0;
        let successfulSearches = 0;

        const sortedArray = algorithmType === 'searching' 
          ? [...arrayData].sort((a, b) => a - b) 
          : null;

        // Run each algorithm NUM_RUNS times
        for (let i = 0; i < NUM_RUNS; i++) {
          // Add small delay between runs to prevent UI freeze
          await new Promise(resolve => setTimeout(resolve, 10));

          const startTime = performance.now();
          const steps = algorithmType === 'searching'
            ? algo.name === 'Binary Search'
              ? algo.func(sortedArray, searchValue, arrayData)
              : algo.func(arrayData, searchValue, arrayData)
            : algo.func([...arrayData]);
          const endTime = performance.now();

          if (algorithmType === 'searching') {
            const foundStep = steps.find(step => step.found !== undefined);
            if (foundStep) successfulSearches++;
          }

          totalTime += endTime - startTime;
          totalSteps += steps.length;
          totalComparisons += steps.filter(step => step.comparing?.length > 0).length;
        }

        results.push({
          name: algo.name,
          time: totalTime / NUM_RUNS,
          steps: Math.round(totalSteps / NUM_RUNS),
          comparisons: Math.round(totalComparisons / NUM_RUNS),
          successRate: algorithmType === 'searching' ? (successfulSearches / NUM_RUNS) * 100 : 100,
          complexity: algo.complexity
        });

        // Update results after each algorithm to show progress
        const fastestTime = Math.min(...results.map(r => r.time));
        setResults(results.map(result => ({
          ...result,
          isFastest: result.time === fastestTime
        })));
      }

      // Scroll to results after all algorithms are done
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);

    } catch (error) {
      console.error('Error running algorithms:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // Update the array display to handle larger arrays
  const DisplayArray = ({ array, title, bgColor = "bg-blue-100" }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-center mb-4 text-xl font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {array.map((value, index) => (
            <div 
              key={index}
              className={`w-12 h-12 flex items-center justify-center ${bgColor} 
                rounded-lg text-lg font-medium shadow-sm`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleCustomArray = (numbers) => {
    // Allow any length array
    setArrayData(numbers);
    if (algorithmType === 'searching') {
      setSearchValue(numbers[Math.floor(Math.random() * numbers.length)]);
    }
  };

  const InputArrayModal = ({ isOpen, onClose, onSubmit }) => {
    const inputRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      const input = inputRef.current.value;
      const numbers = input.split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
      
      if (numbers.length > 0) {
        onSubmit(numbers);
        onClose();
      } else {
        alert('Please enter at least one valid number');
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div 
          className="bg-white rounded-lg p-6 w-96"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h3 className="text-xl font-bold mb-4">Enter Custom Array</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter numbers (comma-separated)
              </label>
              <input
                ref={inputRef}
                type="text"
                placeholder="1, 2, 3..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <motion.div 
        className="relative container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h1 className="text-6xl font-bold text-gray-800 mb-6 relative">
            Algorithm Race Mode
            <motion.span
              className="absolute -right-12 top-0 text-5xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              🏃
            </motion.span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare different algorithms and see which one performs better
          </p>
        </motion.div>

        {/* Algorithm Type Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {['sorting', 'searching'].map(type => (
            <motion.button
              key={type}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                algorithmType === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setAlgorithmType(type);
                setSelectedAlgorithms([]);
                setResults([]);
                generateArray();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative z-10">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Algorithm Selection */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {algorithms[algorithmType].map((algo, index) => (
            <motion.div
              key={algo.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className={`p-6 rounded-xl cursor-pointer transform transition-all duration-300
                ${selectedAlgorithms.includes(algo)
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 shadow-blue-200'
                  : 'bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg'
                } shadow-md`}
              onClick={() => {
                if (selectedAlgorithms.includes(algo)) {
                  setSelectedAlgorithms(prev => prev.filter(a => a !== algo));
                } else {
                  setSelectedAlgorithms(prev => [...prev, algo]);
                }
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-2xl ${
                  selectedAlgorithms.includes(algo) ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  {algo.name.includes('Sort') ? '🔄' : '🔍'}
                </div>
                <h3 className={`text-xl font-bold ${
                  selectedAlgorithms.includes(algo) ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {algo.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{algo.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm font-mono bg-opacity-50 px-3 py-1 rounded-full
                  bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                  {algo.complexity}
                </div>
                {selectedAlgorithms.includes(algo) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50 relative"
            onClick={startRace}
            disabled={selectedAlgorithms.length < 2 || isRunning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative">
              {selectedAlgorithms.length < 2 
                ? 'Select at least 2 algorithms'
                : 'Start Race'
              }
            </span>
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium"
            onClick={generateArray}
            disabled={isRunning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Array
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium"
            onClick={() => setIsInputModalOpen(true)}
            disabled={isRunning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Custom Array
          </motion.button>
        </div>

        {/* Array Display */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="text-center mb-2">
            <p className="text-gray-600">Array Size: {arrayData.length} elements</p>
            {algorithmType === 'searching' && (
              <p className="text-gray-600 mt-2">
                Search Value: <span className="font-bold">{searchValue}</span>
              </p>
            )}
          </div>
          
          <DisplayArray 
            array={arrayData} 
            title="Input Array" 
          />
          
          {algorithmType === 'searching' && selectedAlgorithms.some(algo => algo.name === 'Binary Search') && (
            <DisplayArray 
              array={[...arrayData].sort((a, b) => a - b)} 
              title="Sorted Array (for Binary Search)"
              bgColor="bg-green-100"
            />
          )}
        </div>

        {/* Add array size information to results */}
        <div className="text-center mb-8 text-gray-600">
          <p>Testing with array size: {arrayData.length}</p>
          {algorithmType === 'searching' && (
            <p>Searching for value: {searchValue}</p>
          )}
        </div>

        {/* Results */}
        <div ref={resultsRef} className="flex justify-center items-center w-full min-h-[50vh]">
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                className="container mx-auto px-4 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 place-items-center">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.name}
                      className={`w-full max-w-md p-6 rounded-xl shadow-lg transform transition-all duration-300
                        ${result.isFastest 
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500'
                          : 'bg-white border border-gray-200 hover:border-blue-300'
                        }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {result.name.includes('Sort') ? '🔄' : '🔍'}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800">{result.name}</h3>
                        </div>
                        {result.isFastest && (
                          <span className="bg-gradient-to-r from-green-500 to-emerald-500 
                            text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm">
                            Fastest
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {algorithmType === 'searching' && (
                          <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                            <span className="text-gray-600">Success Rate</span>
                            <span className="font-mono font-medium text-green-600">
                              {result.successRate.toFixed(0)}%
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                          <span className="text-gray-600">Time</span>
                          <span className="font-mono font-medium text-blue-600">
                            {result.time.toFixed(2)}ms
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                          <span className="text-gray-600">Steps</span>
                          <span className="font-mono font-medium text-purple-600">
                            {result.steps}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                          <span className="text-gray-600">Comparisons</span>
                          <span className="font-mono font-medium text-orange-600">
                            {result.comparisons}
                          </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm font-mono bg-gradient-to-r from-indigo-50 to-purple-50 
                            px-3 py-2 rounded-lg text-indigo-700 font-medium text-center">
                            {result.complexity}
                          </div>
                        </div>
                      </div>
                    </motion.div>
        ))}
      </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add race track animation when showing results */}
        {results.length > 0 && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Add loading state indicator */}
        {isRunning && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-lg font-medium">Running algorithms...</span>
              </div>
            </div>
          </div>
        )}

        <InputArrayModal 
          isOpen={isInputModalOpen}
          onClose={() => setIsInputModalOpen(false)}
          onSubmit={handleCustomArray}
        />
      </motion.div>
    </div>
  );
};

export default RaceMode;


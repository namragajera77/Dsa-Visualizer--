import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VisualizationBars from "../components/visualizer/VisualizationBars";
import Controls from "../components/visualizer/Controls";
import AlgorithmInfo from "../components/visualizer/AlgorithmInfo";
import { ALGORITHM_INFO, SPEEDS, MAX_ARRAY_LENGTH } from "../constants";
import { AUDIO_FREQUENCIES } from "../constants/audio";
import * as SortingAlgorithms from "../components/visualizer/algorithms/SortingAlgorithms";
import * as SearchAlgorithms from "../components/visualizer/algorithms/SearchAlgorithms";

const ANIMATION_SPEED = 500;

const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();
if (!window.audioContextInstances) {
  window.audioContextInstances = [];
}
window.audioContextInstances.push(AUDIO_CONTEXT);

if (!window.visualizerIntervals) {
  window.visualizerIntervals = [];
}

const Visualizer = () => {
  const [searchParams] = useSearchParams();
  const [algorithm, setAlgorithm] = useState(null);
  const [data, setData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [animationInterval, setAnimationInterval] = useState(null);
  const [speed, setSpeed] = useState(SPEEDS.MEDIUM);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [originalValues, setOriginalValues] = useState([]);
  const [currentArrayDisplay, setCurrentArrayDisplay] = useState('');
  const [targetInput, setTargetInput] = useState('');

  const [activeOscillators, setActiveOscillators] = useState([]);
  
  const [stepCounts, setStepCounts] = useState({ comparisons: 0, swaps: 0 });
  
  const [isEditing, setIsEditing] = useState(false);

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const [searchResultMessage, setSearchResultMessage] = useState('');

  const [targetError, setTargetError] = useState('');

  const [arrayError, setArrayError] = useState('');

  const createTone = (frequency, duration) => {
    try {
      if (AUDIO_CONTEXT.state === 'suspended') {
        AUDIO_CONTEXT.resume();
      }
      
      const oscillator = AUDIO_CONTEXT.createOscillator();
      const gainNode = AUDIO_CONTEXT.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(AUDIO_CONTEXT.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(0.1, AUDIO_CONTEXT.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, AUDIO_CONTEXT.currentTime + duration);
      
      oscillator.start(AUDIO_CONTEXT.currentTime);
      oscillator.stop(AUDIO_CONTEXT.currentTime + duration);

      setActiveOscillators([oscillator]);

      setTimeout(() => {
        setActiveOscillators(prev => prev.filter(osc => osc !== oscillator));
      }, duration * 1000);
    } catch (e) {
      console.log('Error creating tone:', e);
    }
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  useEffect(() => {
    const algo = searchParams.get("algo");
    
    stopVisualization();
    cleanupVisualization();
    cleanupAudio();

    if (algo !== algorithm) {
      setAlgorithm(algo);
      
        const newRandomArray = Array.from(
          { length: MAX_ARRAY_LENGTH }, 
          () => Math.floor(Math.random() * 100) + 1
        );
        
        if (algo === 'binary-search') {
          newRandomArray.sort((a, b) => a - b);
        }
        
        setOriginalValues(newRandomArray);
      setData([...newRandomArray]);
    }

    return () => {
      cleanupVisualization();
      cleanupAudio();
      if (AUDIO_CONTEXT.state === 'running') {
        AUDIO_CONTEXT.suspend();
        AUDIO_CONTEXT.close();
      }
      window.audioContextInstances = window.audioContextInstances.filter(
        ctx => ctx !== AUDIO_CONTEXT
      );
    };
  }, [searchParams, algorithm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSpeedMenu && !event.target.closest('.speed-control')) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSpeedMenu]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopVisualization();
        cleanupVisualization();
        cleanupAudio();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const resetData = () => {
    cleanupVisualization();
    cleanupAudio();
    setStepCounts({ comparisons: 0, swaps: 0 });
    
    let randomArray = Array.from(
      { length: MAX_ARRAY_LENGTH }, 
      () => Math.floor(Math.random() * 100) + 1
    );

    if (algorithm === 'binary-search') {
      randomArray.sort((a, b) => a - b);
    }
    
    setOriginalValues(randomArray);
    setData([...randomArray]);
    setSortingSteps([]);
    setFoundIndex(null);
    setCurrentSteps([]);
    setInputError('');
    setTargetInput('');
    setSearchValue(null);
    setSearchResultMessage('');
  };

  const runAlgorithm = (algo, arr) => {
    switch (algo) {
      case "bubble-sort":
        return SortingAlgorithms.bubbleSortWithSteps(originalValues);
      case "selection-sort":
        return SortingAlgorithms.selectionSortWithSteps(originalValues);
      case "insertion-sort":
        return SortingAlgorithms.insertionSortWithSteps(originalValues);
      case "merge-sort":
        return SortingAlgorithms.mergeSortWithSteps(originalValues);
      case "quick-sort":
        return SortingAlgorithms.quickSortWithSteps(originalValues);
      case "linear-search":
        return SearchAlgorithms.linearSearchWithSteps(data, searchValue, originalValues);
      case "binary-search":
        const sortedArr = [...originalValues].sort((a, b) => a - b);
        setData(sortedArr);
        return SearchAlgorithms.binarySearchWithSteps(sortedArr, searchValue, sortedArr);
      default:
        return [];
    }
  };

  const animateSteps = (steps) => {
    if (!steps || !Array.isArray(steps)) {
      console.error('Invalid steps array');
      return;
    }

    let stepIndex = currentStep;

    if (animationInterval) {
      clearInterval(animationInterval);
      window.visualizerIntervals = window.visualizerIntervals.filter(
        int => int !== animationInterval
      );
    }

    const animate = () => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setAnimationInterval(null);
        setIsRunning(false);
        setIsPaused(false);
        setComparingIndices([]);
        setSwappedIndices([]);

        if (algorithm?.includes('search')) {
          const lastStep = steps[steps.length - 1];
          if (lastStep.found !== undefined && lastStep.found !== -1) {
            setFoundIndex(lastStep.found);
            setSearchResultMessage(`Found ${searchValue} at index ${lastStep.found}`);
          } else {
            setFoundIndex(null);
            setSearchResultMessage(`${searchValue} not found in array`);
          }
        }
        return;
      }

      const step = steps[stepIndex];
      setData(step.array);
      setOriginalValues(step.array);
      setComparingIndices(step.comparing || []);
      setSwappedIndices(step.swapped ? step.comparing : []);
      
      if (!algorithm?.includes('search')) {
        setFoundIndex(step.found);
      }
      
      const speedLevel = Object.entries(SPEEDS).find(([_, value]) => value === speed)[0] || 'MEDIUM';
      
        if (step.found !== undefined) {
          createTone(AUDIO_FREQUENCIES[speedLevel].found, speed / 1000);
        } else if (step.swapped) {
          createTone(AUDIO_FREQUENCIES[speedLevel].swap, speed / 1000);
        } else if (step.comparing?.length) {
          createTone(AUDIO_FREQUENCIES[speedLevel].comparison, speed / 1000);
      }
      
      setCurrentStep(stepIndex + 1);
      stepIndex++;

      setStepCounts(prev => ({
        comparisons: prev.comparisons + (step.comparing ? 1 : 0),
        swaps: prev.swaps + (step.swapped ? 1 : 0)
      }));
    };

    const interval = setInterval(animate, speed);
    setAnimationInterval(interval);
    window.visualizerIntervals.push(interval);

    return () => {
      clearInterval(interval);
      window.visualizerIntervals = window.visualizerIntervals.filter(
        int => int !== interval
      );
      setAnimationInterval(null);
    };
  };

  const stopVisualization = () => {
    setIsPaused(true);
    if (animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }
    cleanupAudio();
  };

  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    setShowSpeedMenu(false);
    
    if (isRunning) {
      const currentStepIndex = currentStep;
      stopVisualization();
      setTimeout(() => {
        setCurrentStep(currentStepIndex);
        startVisualization();
      }, 0);
    }
  };

  const barStyles = `
    .bar-tooltip {
      position: relative;
    }

    .bar-tooltip:hover::after {
      content: attr(data-value);
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 10;
    }
  `;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = barStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const cleanupAudio = () => {
    activeOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Ignore errors from already stopped oscillators
      }
    });
    setActiveOscillators([]);

    if (AUDIO_CONTEXT.state === 'running') {
      AUDIO_CONTEXT.suspend();
    }
  };

  const cleanupVisualization = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setComparingIndices([]);
    setSwappedIndices([]);
    
    if (animationInterval) {
      clearInterval(animationInterval);
      window.visualizerIntervals = window.visualizerIntervals.filter(
        int => int !== animationInterval
      );
      setAnimationInterval(null);
    }
    
    cleanupAudio();
  };

  const startVisualization = () => {
    if (isRunning && !isPaused) return;

    if (algorithm?.includes('search')) {
      if (targetInput === '' || searchValue === null) {
        setTargetError('Please enter a target value to search');
        return;
      }
      if (!originalValues.length) {
        setArrayError('Please set an array first');
        return;
      }
    }
    setTargetError('');

    if (animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }

    setStepCounts({ comparisons: 0, swaps: 0 });

    let steps;
    if (isPaused) {
      steps = currentSteps;
      setIsPaused(false);
    } else {
      steps = runAlgorithm(algorithm, data);
      setCurrentSteps(steps);
      setSortingSteps(steps);
      setCurrentStep(0);
    }

    setIsRunning(true);
    animateSteps(steps);
  };

  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
    setInputError('');
  };

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const setCustomArray = () => {
    if (isRunning && !isPaused) return;

    try {
      const newArray = customInput
        .split(',')
        .map(num => {
          const parsed = parseInt(num.trim());
          if (isNaN(parsed)) throw new Error('Invalid number format');
          return parsed;
        });

      // Validate array length
      if (newArray.length < 2) {
        setArrayError('Please enter at least 2 numbers');
        return;
      }
      if (newArray.length > MAX_ARRAY_LENGTH) {
        setArrayError(`Please enter maximum ${MAX_ARRAY_LENGTH} numbers`);
        return;
      }

      // Special validation for binary search
      if (algorithm === 'binary-search') {
        // Check if array is sorted
        for (let i = 1; i < newArray.length; i++) {
          if (newArray[i] < newArray[i - 1]) {
            setArrayError('Binary search requires a sorted array in ascending order (e.g., 1,3,5,7,9)');
          return;
          }
        }
      }

      setArrayError('');
      setOriginalValues(newArray);
      setData(newArray);
      setCustomInput('');
      setCurrentStep(0);
      setComparingIndices([]);
      setSwappedIndices([]);
      setFoundIndex(null);
      setSearchResultMessage('');
    } catch (error) {
      setArrayError('Please enter valid numbers separated by commas');
    }
  };

  const handleEditArray = () => {
    setIsEditing(true);
    setCustomInput(originalValues.join(', '));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="relative inline-block">
            {/* Background decoration */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 
              to-purple-500/20 blur-xl rounded-lg -z-10"/>
            
            {/* Algorithm Title */}
            <h1 className="text-3xl font-bold text-center px-8 py-3 bg-white/50 backdrop-blur-sm 
              rounded-xl border border-gray-100 shadow-sm">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                bg-clip-text text-transparent">
                {algorithm === 'bubble-sort' && 'Bubble Sort'}
                {algorithm === 'quick-sort' && 'Quick Sort'}
                {algorithm === 'merge-sort' && 'Merge Sort'}
                {algorithm === 'insertion-sort' && 'Insertion Sort'}
                {algorithm === 'selection-sort' && 'Selection Sort'}
                {algorithm === 'linear-search' && 'Linear Search'}
                {algorithm === 'binary-search' && 'Binary Search'}
              </span>
        </h1>
          </div>
        </div>
      </div>

      {/* Main content with visualization and controls */}
      <div className="flex gap-8 justify-center">
        {/* Left side - Visualization Bars */}
        <div className="w-1/2">
          <VisualizationBars
            data={data}
            comparingIndices={comparingIndices}
            swappedIndices={swappedIndices}
            foundIndex={foundIndex}
            searchValue={searchValue}
          />
        </div>

        {/* Right side - Current Array Display */}
        <div className="w-[450px]">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-6 py-3">
              <h3 className="text-white font-medium text-sm tracking-wider uppercase text-center">
                Current Array
              </h3>
      </div>

            <div className="p-4">
              <div className="flex flex-wrap justify-center gap-2">
                {originalValues.map((value, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-lg font-mono text-sm font-medium
                      ${comparingIndices.includes(index)
                        ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                        : swappedIndices.includes(index)
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : foundIndex === index
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-800'
                      }
                      transform transition-all duration-200
                      ${comparingIndices.includes(index) || swappedIndices.includes(index) || foundIndex === index
                        ? 'scale-110 shadow-md'
                        : 'hover:scale-105'
                      }`}
                  >
                    {value}
                  </span>
                ))}
            </div>
      </div>
      </div>

          {/* Array Input Controls */}
          <div className="mt-4 space-y-4">
            <div className="relative group">
            <input
              type="text"
                className={`w-full px-6 py-4 bg-white rounded-xl border-2 
                  ${arrayError ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}
                  text-gray-700 text-lg placeholder:text-gray-400
                  focus:ring-4 ${arrayError ? 'focus:ring-red-100' : 'focus:ring-blue-100'}
                  transition-all duration-300 outline-none
                  shadow-sm hover:shadow-md`}
              placeholder={algorithm === 'binary-search' 
                    ? "Enter sorted array in ascending order (e.g., 1,3,5,7,9)" 
                    : "Enter array (e.g., 5,2,8,1,9)"}
              value={customInput}
                onChange={(e) => {
                  setCustomInput(e.target.value);
                  setArrayError('');
                }}
              disabled={isRunning}
            />
              {arrayError && (
                <div className="absolute -bottom-6 left-0 right-0 text-red-500 text-sm bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                  {arrayError}
                </div>
              )}
      </div>

          {algorithm?.includes('search') && (
              <div className="relative group mb-8">
                <div className="mb-2 text-sm font-medium text-gray-600 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Enter Target Value
                </div>

                {targetError && (
                  <div className="mb-2 text-red-500 text-sm 
                    bg-red-50 px-4 py-2 rounded-lg border border-red-200 
                    flex items-center gap-2 shadow-sm"
                  >
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="font-medium">{targetError}</span>
                  </div>
                )}

                <input
                  type="number"
                  className={`w-full px-6 py-4 bg-white rounded-xl border-2 
                    ${targetError ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-purple-500'}
                    text-gray-700 text-lg placeholder:text-gray-400
                    focus:ring-4 ${targetError ? 'focus:ring-red-100' : 'focus:ring-purple-100'}
                    transition-all duration-300 outline-none
                    shadow-sm hover:shadow-md`}
                  placeholder="Enter a number to search in the array"
                  value={targetInput}
                  onChange={(e) => {
                    setTargetInput(e.target.value);
                    setSearchValue(parseInt(e.target.value));
                    setFoundIndex(null);
                    setComparingIndices([]);
                    setCurrentStep(0);
                    setSearchResultMessage('');
                    setTargetError('');
                  }}
                  disabled={isRunning}
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={setCustomArray}
                disabled={isRunning || !customInput.trim()}
                className="flex-1 py-3 rounded-xl font-medium text-white
                  bg-gradient-to-r from-green-500 to-emerald-600
                  hover:from-green-600 hover:to-emerald-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transform hover:scale-102 active:scale-98
                  transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Set Array
              </button>
              <button
                onClick={resetData}
                disabled={isRunning && !isPaused}
                className="flex-1 py-3 rounded-xl font-medium text-white
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  hover:from-blue-600 hover:to-indigo-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transform hover:scale-102 active:scale-98
                  transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Random Array
              </button>
            </div>
          </div>
        </div>
      </div>

      <Controls 
        isPaused={isPaused}
        isRunning={isRunning}
        startVisualization={startVisualization}
        stopVisualization={stopVisualization}
        resetData={resetData}
        searchResultMessage={searchResultMessage}
        algorithm={algorithm}
        foundIndex={foundIndex}
        currentStep={currentStep}
        currentSteps={currentSteps}
        speed={speed}
        setSpeed={changeSpeed}
        showSpeedMenu={showSpeedMenu}
        setShowSpeedMenu={setShowSpeedMenu}
        SPEEDS={SPEEDS}
        stepCounts={stepCounts}
        isSoundEnabled={isSoundEnabled}
        toggleSound={toggleSound}
      />
      
      <AlgorithmInfo 
        algorithm={algorithm}
        algorithmInfo={ALGORITHM_INFO[algorithm]}
      />

      {arrayError && algorithm === 'binary-search' && (
        <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {arrayError}
          </p>
        </div>
      )}

      {algorithm?.includes('search') && targetError && (
        <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {targetError}
          </p>
        </div>
      )}
    </div>
  );
};

export default Visualizer;

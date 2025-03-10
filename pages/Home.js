import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const algorithms = {
  sorting: {
    title: "Sorting Algorithms",
    description: "Learn how different sorting algorithms work",
    icon: "🔄",
    color: "blue",
    algorithms: [
      {
        name: "Bubble Sort",
        path: "/visualizer?algo=bubble-sort",
        description: "Simple sorting algorithm that repeatedly steps through the list",
        complexity: "O(n²)",
        icon: "🫧"
      },
      {
        name: "Selection Sort",
        path: "/visualizer?algo=selection-sort",
        description: "Finds minimum element and places it at the beginning",
        complexity: "O(n²)",
        icon: "📊"
      },
      {
        name: "Insertion Sort",
        path: "/visualizer?algo=insertion-sort",
        description: "Builds sorted array one element at a time",
        complexity: "O(n²)",
        icon: "📥"
      },
      {
        name: "Merge Sort",
        path: "/visualizer?algo=merge-sort",
        description: "Divides array into smaller subarrays and merges them",
        complexity: "O(n log n)",
        icon: "🔄"
      },
      {
        name: "Quick Sort",
        path: "/visualizer?algo=quick-sort",
        description: "Uses pivot to partition array into smaller segments",
        complexity: "O(n log n)",
        icon: "⚡"
      }
    ]
  },
  searching: {
    title: "Searching Algorithms",
    description: "Explore different searching techniques",
    icon: "🔍",
    color: "green",
    algorithms: [
      {
        name: "Linear Search",
        path: "/visualizer?algo=linear-search",
        description: "Sequentially checks each element in the array",
        complexity: "O(n)",
        icon: "➡️"
      },
      {
        name: "Binary Search",
        path: "/visualizer?algo=binary-search",
        description: "Efficiently finds element in sorted array",
        complexity: "O(log n)",
        icon: "🎯"
      }
    ]
  }
};

const featureCards = [
  {
    title: "Interactive Learning",
    description: "Watch algorithms in action with step-by-step visualization",
    icon: "🎯",
    color: "blue"
  },
  {
    title: "Race Mode",
    description: "Compare different algorithms and test your knowledge",
    icon: "🏃",
    color: "green"
  },
  {
    title: "Performance Metrics",
    description: "Understand time and space complexity with real examples",
    icon: "📊",
    color: "purple"
  }
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
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
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-500/30 to-teal-500/30 rounded-full blur-3xl"
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

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredAlgo, setHoveredAlgo] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // Clear the selected category when browser back button is pressed
      setSelectedCategory(null);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setTouchStart({
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        time: Date.now()
      });
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStart && selectedCategory) {
      const touchEnd = (e.changedTouches[0].clientX + e.changedTouches[1].clientX) / 2;
      const timeDiff = Date.now() - touchStart.time;
      const distance = touchEnd - touchStart.x;

      if (timeDiff < 300 && Math.abs(distance) > 100) {
        setSelectedCategory(null);
      }
    }
    setTouchStart(null);
  };

  const handleCategorySelect = (key) => {
    setSelectedCategory(key);
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatedBackground />
      
      <div className="relative py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section with enhanced styling */}
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
              Algorithm Visualizer
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
                🔄
              </motion.span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn algorithms through interactive visualizations and step-by-step animations
            </p>
          </motion.div>

          {/* Update the Categories Section container */}
          <motion.div
            className="mb-24 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="absolute -right-32 top-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Choose a Category
            </h2>

            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                // Category Selection View
                <motion.div 
                  className="grid md:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Object.entries(algorithms).map(([key, category]) => (
                    <motion.div
                      key={key}
                      className={`bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl 
                        transition-all cursor-pointer border-2 border-${category.color}-500/30`}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: `var(--${category.color}-500)`,
                      }}
                      onClick={() => handleCategorySelect(key)}
                    >
                      <div className="text-5xl mb-4">{category.icon}</div>
                      <h2 className={`text-3xl font-bold mb-3 text-${category.color}-600`}>
                        {category.title}
                      </h2>
                      <p className="text-gray-600">{category.description}</p>
                      <div className="mt-4 text-sm text-gray-500">
                        {category.algorithms.length} algorithms available
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // Algorithm Selection View
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <motion.button
                    className="mb-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg 
                      rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 
                      hover:text-blue-500 border border-gray-200"
                    onClick={() => setSelectedCategory(null)}
                    whileHover={{ x: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7" 
                      />
                    </svg>
                    <span className="font-medium">Back to Categories</span>
                  </motion.button>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {algorithms[selectedCategory].algorithms.map((algo, index) => (
                      <motion.div
                        key={algo.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.1 }
                        }}
                        whileHover={{ scale: 1.03 }}
                        onHoverStart={() => setHoveredAlgo(algo.name)}
                        onHoverEnd={() => setHoveredAlgo(null)}
                        className={`bg-white/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden
                          border-2 border-transparent hover:border-${algorithms[selectedCategory].color}-500`}
                      >
                        <Link to={algo.path} className="block p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{algo.icon}</span>
                            <h3 className="text-xl font-bold text-gray-800">
                              {algo.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-4">{algo.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-full">
                              {algo.complexity}
                            </span>
                            <motion.span 
                              className={`text-${algorithms[selectedCategory].color}-500 flex items-center gap-2`}
                              animate={{ x: hoveredAlgo === algo.name ? 5 : 0 }}
                            >
                              Start Learning
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Update the Feature Cards Section */}
          {!selectedCategory && (
            <motion.div 
              className="mt-24 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="absolute -left-32 top-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, -50, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {featureCards.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.3 + index * 0.1 }
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`text-5xl mb-6 text-${feature.color}-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

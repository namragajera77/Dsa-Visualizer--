import { useState } from "react";

const algorithms = {
  sorting: [
    { 
      name: "Bubble Sort",
      complexity: "O(n²)",
      bestCase: "O(n)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      spaceComplexity: "O(1)",
      stable: true,
      description: "Simple sorting algorithm that repeatedly steps through the list"
    },
    { 
      name: "Selection Sort",
      complexity: "O(n²)",
      bestCase: "O(n²)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      spaceComplexity: "O(1)",
      stable: false,
      description: "Finds minimum element and places it at the beginning"
    },
    { 
      name: "Insertion Sort",
      complexity: "O(n²)",
      bestCase: "O(n)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      spaceComplexity: "O(1)",
      stable: true,
      description: "Builds sorted array one element at a time"
    },
    { 
      name: "Merge Sort",
      complexity: "O(n log n)",
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(n)",
      stable: true,
      description: "Divides array into smaller subarrays and merges them"
    },
    { 
      name: "Quick Sort",
      complexity: "O(n log n)",
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n²)",
      spaceComplexity: "O(log n)",
      stable: false,
      description: "Uses pivot to partition array into smaller segments"
    }
  ],
  searching: [
    { 
      name: "Linear Search",
      complexity: "O(n)",
      bestCase: "O(1)",
      averageCase: "O(n)",
      worstCase: "O(n)",
      spaceComplexity: "O(1)",
      requiresSorting: false,
      description: "Sequentially checks each element in the array"
    },
    { 
      name: "Binary Search",
      complexity: "O(log n)",
      bestCase: "O(1)",
      averageCase: "O(log n)",
      worstCase: "O(log n)",
      spaceComplexity: "O(1)",
      requiresSorting: true,
      description: "Efficiently finds element in sorted array"
    }
  ]
};

// Add these new statistics
const algorithmStats = {
  sorting: {
    "Bubble Sort": {
      averageExecutionTime: "2.5ms",
      memoryUsage: "Low",
      useCase: "Small datasets, nearly sorted arrays",
      pros: ["Simple implementation", "In-place sorting", "Stable sorting"],
      cons: ["Poor performance on large datasets", "Not suitable for big data"],
      realWorldUse: "Educational purposes, tiny datasets < 100 items"
    },
    "Selection Sort": {
      averageExecutionTime: "2.1ms",
      memoryUsage: "Low",
      useCase: "Small arrays, minimizing memory writes",
      pros: ["Simple implementation", "Minimal memory writes", "In-place sorting"],
      cons: ["Always O(n²) even if sorted", "Not stable by default"],
      realWorldUse: "Systems with expensive writes but cheap reads"
    },
    "Insertion Sort": {
      averageExecutionTime: "1.8ms",
      memoryUsage: "Low",
      useCase: "Small datasets, online sorting",
      pros: ["Adaptive", "Stable", "Online algorithm"],
      cons: ["Poor performance on large unsorted arrays"],
      realWorldUse: "Real-time streaming data, nearly sorted data"
    },
    "Merge Sort": {
      averageExecutionTime: "0.8ms",
      memoryUsage: "High",
      useCase: "Large datasets, stable sorting needed",
      pros: ["Stable sorting", "Predictable performance", "Parallelizable"],
      cons: ["Extra space required", "Not in-place"],
      realWorldUse: "External sorting, database operations"
    },
    "Quick Sort": {
      averageExecutionTime: "0.7ms",
      memoryUsage: "Medium",
      useCase: "Large datasets, general purpose",
      pros: ["Fast average case", "Cache friendly", "In-place sorting"],
      cons: ["Unstable", "Poor pivot choice can be slow"],
      realWorldUse: "Standard library sort in many languages"
    }
  },
  searching: {
    "Linear Search": {
      averageExecutionTime: "1.2ms",
      memoryUsage: "Low",
      useCase: "Unsorted arrays, small datasets",
      pros: ["Simple implementation", "Works on unsorted data", "Cache friendly"],
      cons: ["Slow for large datasets", "Not suitable for big data"],
      realWorldUse: "Small arrays, searching through cached data"
    },
    "Binary Search": {
      averageExecutionTime: "0.3ms",
      memoryUsage: "Low",
      useCase: "Sorted arrays, large datasets",
      pros: ["Very efficient", "Predictable performance", "Space efficient"],
      cons: ["Requires sorted array", "Not cache friendly"],
      realWorldUse: "Database indexing, dictionary lookups"
    }
  }
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('sorting');
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  // Add comparison feature
  const compareAlgorithms = (algo1, algo2) => {
    if (!algo1 || !algo2) return {};
    
    return {
      bestCase: algo1.bestCase === algo2.bestCase ? 'equal' : 
        (algo1.bestCase < algo2.bestCase ? 'better' : 'worse'),
      averageCase: algo1.averageCase === algo2.averageCase ? 'equal' : 
        (algo1.averageCase < algo2.averageCase ? 'better' : 'worse'),
      worstCase: algo1.worstCase === algo2.worstCase ? 'equal' : 
        (algo1.worstCase < algo2.worstCase ? 'better' : 'worse'),
      spaceComplexity: algo1.spaceComplexity === algo2.spaceComplexity ? 'equal' : 
        (algo1.spaceComplexity < algo2.spaceComplexity ? 'better' : 'worse')
    };
  };

  // Add this component for detailed view
  const AlgorithmDetailView = ({ algo, stats }) => (
    <div className="mt-8 bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{algo.name}</h3>
          <p className="text-gray-600">{algo.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {stats.averageExecutionTime} avg. execution
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Memory Usage: {stats.memoryUsage}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Time Complexity</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best Case:</span>
                <span className="font-mono font-medium text-green-600">{algo.bestCase}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Case:</span>
                <span className="font-mono font-medium text-blue-600">{algo.averageCase}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Worst Case:</span>
                <span className="font-mono font-medium text-red-600">{algo.worstCase}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Best Use Case</h4>
            <p className="text-gray-700 leading-relaxed">{stats.useCase}</p>
          </div>
        </div>

        {/* Full Width Section */}
        <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Real World Applications</h4>
          <p className="text-gray-700 leading-relaxed">{stats.realWorldUse}</p>
        </div>
      </div>
    </div>
  );
  
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Search */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Algorithm Leaderboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Compare different algorithms and their performance characteristics
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-500">{algorithms.sorting.length}</div>
              <div className="text-gray-600">Sorting Algorithms</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-500">{algorithms.searching.length}</div>
              <div className="text-gray-600">Searching Algorithms</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-500">O(1)</div>
              <div className="text-gray-600">Best Space Complexity</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-500">O(n log n)</div>
              <div className="text-gray-600">Best Time Complexity</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          {['sorting', 'searching'].map(tab => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-medium mx-2 transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedAlgo(null);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Algorithm Cards with Comparison */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms[activeTab].map((algo) => (
            <div
              key={algo.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:-translate-y-1 cursor-pointer
                ${selectedAlgo?.name === algo.name ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedAlgo(selectedAlgo?.name === algo.name ? null : algo)}
            >
              {/* Algorithm Header */}
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{algo.name}</h3>
                  {selectedAlgo && selectedAlgo.name !== algo.name && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                      Click to Compare
                    </span>
                  )}
                </div>
                <p className="text-blue-100 text-sm">{algo.description}</p>
              </div>

              {/* Complexity Information */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {['bestCase', 'averageCase', 'worstCase', 'spaceComplexity'].map((metric) => (
                    <div key={metric} className="space-y-2">
                      <p className="text-sm text-gray-500">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-medium text-gray-800">
                          {algo[metric]}
                        </p>
                        {selectedAlgo && selectedAlgo.name !== algo.name && (
                          <span className={`text-xs ${
                            compareAlgorithms(algo, selectedAlgo)[metric] === 'better' 
                              ? 'text-green-500' 
                              : compareAlgorithms(algo, selectedAlgo)[metric] === 'worse'
                                ? 'text-red-500'
                                : 'text-gray-500'
                          }`}>
                            {compareAlgorithms(algo, selectedAlgo)[metric] === 'better' ? '↑' :
                             compareAlgorithms(algo, selectedAlgo)[metric] === 'worse' ? '↓' : '='}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="pt-4 border-t border-gray-200">
                  {activeTab === 'sorting' ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Stable</span>
                      <span className={`text-sm font-medium ${
                        algo.stable ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {algo.stable ? 'Yes' : 'No'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Requires Sorting</span>
                      <span className={`text-sm font-medium ${
                        algo.requiresSorting ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {algo.requiresSorting ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Algorithm Info */}
        {selectedAlgo && (
          <AlgorithmDetailView 
            algo={selectedAlgo} 
            stats={algorithmStats[activeTab][selectedAlgo.name]} 
          />
        )}
      </div>
    </div>
  );
};
  
export default Leaderboard;
  
  
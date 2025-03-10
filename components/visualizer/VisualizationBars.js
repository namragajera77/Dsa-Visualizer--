import React from 'react';
import { motion } from 'framer-motion';

const VisualizationBars = ({ data, comparingIndices, swappedIndices, foundIndex, searchValue }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="relative h-[300px] flex items-end justify-center gap-1 p-4 bg-white rounded-xl shadow-lg">
      {/* Modern grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      <div className="relative flex items-end justify-center gap-1 w-full h-full z-10">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isComparing = comparingIndices.includes(index);
          const isSwapped = swappedIndices.includes(index);
          const isFound = foundIndex === index;
          const isTarget = value === searchValue;

          let barColor = 'from-indigo-400 to-indigo-600';
          let glowColor = '';
          
          if (isComparing) {
            barColor = 'from-amber-400 to-amber-600';
            glowColor = 'shadow-amber-200';
          } else if (isSwapped) {
            barColor = 'from-emerald-400 to-emerald-600';
            glowColor = 'shadow-emerald-200';
          } else if (isFound) {
            barColor = 'from-sky-400 to-sky-600';
            glowColor = 'shadow-sky-200';
          } else if (isTarget) {
            barColor = 'from-violet-400 to-violet-600';
            glowColor = 'shadow-violet-200';
          }

          return (
            <motion.div
              key={`${index}-${value}`}
              className="relative group"
              initial={{ height: 0 }}
              animate={{ 
                height: `${height}%`,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              style={{ width: `${60 / data.length}%`, minWidth: '12px', maxWidth: '30px' }}
            >
              {/* Value label - made smaller */}
              <motion.div
                className={`absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 
                  rounded text-xs font-medium bg-white shadow-sm z-20
                  ${isComparing ? 'text-amber-600' :
                    isSwapped ? 'text-emerald-600' :
                    isFound ? 'text-sky-600' :
                    isTarget ? 'text-violet-600' : 'text-indigo-600'}`}
              >
                {value}
              </motion.div>

              {/* Bar */}
              <motion.div
                className={`h-full w-full rounded-t-md bg-gradient-to-b ${barColor} 
                  relative overflow-hidden transition-all duration-200 group-hover:brightness-110`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-t ${barColor}`} />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                
                {/* Animated glow on active states */}
                {(isComparing || isSwapped || isFound || isTarget) && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Index indicator - made smaller */}
              <motion.div
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 
                  text-[10px] font-medium
                  ${isComparing ? 'text-amber-600' :
                    isSwapped ? 'text-emerald-600' :
                    isFound ? 'text-sky-600' :
                    isTarget ? 'text-violet-600' : 'text-gray-400'}`}
              >
                {index}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend - made more compact */}
      <div className="absolute top-2 right-2 bg-white rounded-lg shadow-sm p-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-400 to-amber-600" />
            <span className="text-sm font-medium text-gray-600">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <span className="text-sm font-medium text-gray-600">Swapped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-sky-400 to-sky-600" />
            <span className="text-sm font-medium text-gray-600">Found</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-violet-400 to-violet-600" />
            <span className="text-sm font-medium text-gray-600">Target</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationBars; 
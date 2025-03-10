import { motion } from "framer-motion";

const AnimatedBar = ({ 
  value, 
  index, 
  maxValue, 
  isComparing, 
  isFound, 
  isTarget,
  isSwapping 
}) => {
  const heightPercentage = (value / maxValue) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        height: `${heightPercentage}%`,
        scale: isFound ? 1.1 : 1
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`relative w-8 mr-1 rounded-t-lg ${
        isFound ? 'bg-green-500' :
        isComparing ? 'bg-yellow-500' :
        isTarget ? 'bg-purple-500' :
        'bg-blue-500'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow-sm"
      >
        {value}
      </motion.span>
    </motion.div>
  );
};

export default AnimatedBar; 
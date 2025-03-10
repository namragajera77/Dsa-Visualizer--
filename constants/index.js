export const SPEEDS = {
  LOW: 1000,    // 1 second
  MEDIUM: 500,  // 0.5 seconds
  HIGH: 100     // 0.1 seconds
};

export const MAX_ARRAY_LENGTH = 15;

// Animation constants
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export const ALGORITHM_INFO = {
  'bubble-sort': {
    name: 'Bubble Sort',
    category: 'sorting'
  },
  'selection-sort': {
    name: 'Selection Sort',
    category: 'sorting'
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    category: 'sorting'
  },
  'merge-sort': {
    name: 'Merge Sort',
    category: 'sorting'
  },
  'quick-sort': {
    name: 'Quick Sort',
    category: 'sorting'
  },
  'linear-search': {
    name: 'Linear Search',
    category: 'searching'
  },
  'binary-search': {
    name: 'Binary Search',
    category: 'searching'
  }
}; 
export const linearSearchWithSteps = (array, target, originalValues) => {
  const steps = [];
  let swaps = 0; // Add swap counter
  
  for (let i = 0; i < array.length; i++) {
    // Add step for current comparison
    steps.push({
      array: [...originalValues],
      comparing: [i],
      found: null,
      swaps: swaps, // Include swaps in steps
      comparisons: i + 1 // Add comparison count
    });

    // If element is found
    if (originalValues[i] === target) {
      steps.push({
        array: [...originalValues],
        comparing: [i],
        found: i,
        swaps: swaps,
        comparisons: i + 1
      });
      return steps;
    }
  }

  // If element is not found
  steps.push({
    array: [...originalValues],
    comparing: [],
    found: -1,
    swaps: swaps,
    comparisons: array.length
  });

  return steps;
};

export const binarySearchWithSteps = (arr, target, originalValues) => {
  const steps = [];
  let swaps = 0; // Add swap counter
  let comparisons = 0;
  
  const sortedArr = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    steps.push({
      array: sortedArr,
      comparing: [mid],
      searchRange: [left, right],
      target: target,
      swaps: swaps,
      comparisons: comparisons,
      message: `Checking middle element at index ${mid}`
    });

    if (sortedArr[mid] === target) {
      steps.push({
        array: sortedArr,
        comparing: [mid],
        found: mid,
        target: target,
        swaps: swaps,
        comparisons: comparisons,
        message: `Found ${target} at index ${mid}!`
      });
      return steps;
    }

    if (sortedArr[mid] < target) {
      left = mid + 1;
      steps.push({
        array: sortedArr,
        comparing: [mid],
        searchRange: [left, right],
        target: target,
        swaps: swaps,
        comparisons: comparisons,
        message: `${sortedArr[mid]} < ${target}, searching right half`
      });
    } else {
      right = mid - 1;
      steps.push({
        array: sortedArr,
        comparing: [mid],
        searchRange: [left, right],
        target: target,
        swaps: swaps,
        comparisons: comparisons,
        message: `${sortedArr[mid]} > ${target}, searching left half`
      });
    }
  }

  steps.push({
    array: sortedArr,
    comparing: [],
    target: target,
    swaps: swaps,
    comparisons: comparisons,
    message: `${target} not found in array`
  });

  return steps;
}; 
export const bubbleSortWithSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  const n = arrCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arrCopy],
        comparing: [j, j + 1],
        message: `Comparing ${arrCopy[j]} and ${arrCopy[j + 1]}`
      });

      if (arrCopy[j] > arrCopy[j + 1]) {
        // Swap elements
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({
          array: [...arrCopy],
          comparing: [j, j + 1],
          swapped: true,
          message: `Swapped ${arrCopy[j]} and ${arrCopy[j + 1]}`
        });
      }
    }
  }

  steps.push({
    array: [...arrCopy],
    comparing: [],
    message: "Sorting completed"
  });

  return steps;
};

export const selectionSortWithSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  const n = arrCopy.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arrCopy],
        comparing: [minIdx, j],
        message: `Comparing ${arrCopy[minIdx]} and ${arrCopy[j]}`
      });

      if (arrCopy[j] < arrCopy[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Swap elements
      [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
      steps.push({
        array: [...arrCopy],
        comparing: [i, minIdx],
        swapped: true,
        message: `Swapped ${arrCopy[i]} and ${arrCopy[minIdx]}`
      });
    }
  }

  steps.push({
    array: [...arrCopy],
    comparing: [],
    message: "Sorting completed"
  });

  return steps;
};

export const insertionSortWithSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  const n = arrCopy.length;

  for (let i = 1; i < n; i++) {
    let key = arrCopy[i];
    let j = i - 1;

    steps.push({
      array: [...arrCopy],
      comparing: [i, j]
    });

    while (j >= 0 && arrCopy[j] > key) {
      arrCopy[j + 1] = arrCopy[j];
      steps.push({
        array: [...arrCopy],
        comparing: [j + 1, j],
        swapped: true
      });
      j--;
    }

    arrCopy[j + 1] = key;
    steps.push({
      array: [...arrCopy],
      comparing: [j + 1],
      swapped: true
    });
  }

  steps.push({
    array: [...arrCopy],
    comparing: []
  });
  return steps;
};

export const mergeSortWithSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];

  const merge = (left, right, startIdx) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...arrCopy],
        comparing: [startIdx + i, startIdx + left.length + j]
      });

      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }

    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    // Copy back to the main array
    for (let k = 0; k < result.length; k++) {
      arrCopy[startIdx + k] = result[k];
      steps.push({
        array: [...arrCopy],
        comparing: [startIdx + k],
        swapped: true
      });
    }

    return result;
  };

  const mergeSort = (startIdx, endIdx) => {
    if (endIdx - startIdx <= 1) return arrCopy.slice(startIdx, endIdx);

    const mid = Math.floor((startIdx + endIdx) / 2);
    const left = mergeSort(startIdx, mid);
    const right = mergeSort(mid, endIdx);
    return merge(left, right, startIdx);
  };

  mergeSort(0, arrCopy.length);
  steps.push({
    array: [...arrCopy],
    comparing: []
  });

  return steps;
};

export const quickSortWithSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];

  const partition = (low, high) => {
    const pivot = arrCopy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arrCopy],
        comparing: [j, high],
        message: `Comparing ${arrCopy[j]} with pivot ${pivot}`
      });

      if (arrCopy[j] < pivot) {
        i++;
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        steps.push({
          array: [...arrCopy],
          comparing: [i, j],
          swapped: true,
          message: `Swapped ${arrCopy[i]} and ${arrCopy[j]}`
        });
      }
    }

    [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
    steps.push({
      array: [...arrCopy],
      comparing: [i + 1, high],
      swapped: true,
      message: `Placed pivot ${pivot} at correct position`
    });

    return i + 1;
  };

  const quickSort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  quickSort(0, arrCopy.length - 1);
  steps.push({
    array: [...arrCopy],
    comparing: [],
    message: "Sorting completed"
  });

  return steps;
}; 
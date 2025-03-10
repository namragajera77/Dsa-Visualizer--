export const SPEEDS = {
  LOW: 1000,    // 1 second
  MEDIUM: 500,  // 0.5 seconds
  HIGH: 100     // 0.1 seconds
};

export const MAX_ARRAY_LENGTH = 15;

export const ALGORITHM_INFO = {
  'bubble-sort': {
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  'selection-sort': {
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
  return arr
}`,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  'insertion-sort': {
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
  return arr
}`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  'merge-sort': {
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr
  
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  
  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)'
  },
  'quick-sort': {
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }
  return arr
}`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)'
  },
  'linear-search': {
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)'
  },
  'binary-search': {
    code: `function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)'
  },
  'bfs': {
    name: 'Breadth First Search',
    code: `function bfs(graph, start) {
  const visited = new Set()
  const queue = [start]
  
  while (queue.length > 0) {
    const vertex = queue.shift()
    if (!visited.has(vertex)) {
      visited.add(vertex)
      queue.push(...graph[vertex])
    }
  }
  return visited
}`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    description: 'Explores nodes level by level in a graph, visiting all neighbors before moving to the next level.'
  },
  'dfs': {
    name: 'Depth First Search',
    code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start)
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited)
    }
  }
  return visited
}`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    description: 'Explores as far as possible along each branch before backtracking.'
  },
  'dijkstra': {
    name: "Dijkstra's Algorithm",
    code: `function dijkstra(graph, start) {
  const distances = {}
  const pq = new PriorityQueue()
  
  for (const vertex in graph) {
    distances[vertex] = Infinity
  }
  distances[start] = 0
  pq.enqueue(start, 0)
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue()
    
    for (const [neighbor, weight] of graph[current]) {
      const distance = distances[current] + weight
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance
        pq.enqueue(neighbor, distance)
      }
    }
  }
  return distances
}`,
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)'
    },
    spaceComplexity: 'O(V)',
    description: 'Finds the shortest path between nodes in a weighted graph.'
  }
}; 
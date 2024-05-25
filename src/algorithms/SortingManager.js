export function handleSort(sortingAlgo, array) {
    switch(sortingAlgo['value']) {
        case "Insertion Sort":
            return {
                desc: sortingAlgoDesc[sortingAlgo['value']], 
                tcomplx: sortingAlgoTimeComplx[sortingAlgo['value']],
                scomplx: sortingAlgoSpaceComplx[sortingAlgo['value']],
                steps: insertionSort(array)
            };
        case "Bubble Sort":
            return {
                desc: sortingAlgoDesc[sortingAlgo['value']], 
                tcomplx: sortingAlgoTimeComplx[sortingAlgo['value']],
                scomplx: sortingAlgoSpaceComplx[sortingAlgo['value']],
                steps: bubbleSort(array)
            };
        case "Merge Sort":
            return {
                desc: sortingAlgoDesc[sortingAlgo['value']], 
                tcomplx: sortingAlgoTimeComplx[sortingAlgo['value']],
                scomplx: sortingAlgoSpaceComplx[sortingAlgo['value']],
                steps: mergeSort(array)
            };
        case "Selection Sort":
            return {
                desc: sortingAlgoDesc[sortingAlgo['value']], 
                tcomplx: sortingAlgoTimeComplx[sortingAlgo['value']],
                scomplx: sortingAlgoSpaceComplx[sortingAlgo['value']],
                steps: selectionSort(array)
            };
        default:
            return "Sorting algorithm is unavailable";
    }
};



let sortingAlgoDesc = {"Insertion Sort": "Insertion sort works by iteratively inserting each element of an unsorted list into its correct position in a sorted portion of the list. It is a stable sorting algorithm, elements with equal values maintain their relative order in the sorted output.",
"Bubble Sort": "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This pushes the largest element to the sorted portion at the end each iteration.                                                                                       ",
"Merge Sort": "Merge sort uses a divide and conquer approach to recursively divide the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array                                                                                                 ",
"Selection Sort": "Selection sort repeatedly selects the smallest element from the unsorted portion and swaps it with the first element of the unsorted part. This process is repeated for the remaining unsorted portion until the entire list is sorted                                                        "
}

let sortingAlgoTimeComplx = {"Insertion Sort": "Best case: O(n) Sorted Array, Average case: O(n2), Worst case: O(n2) Array in reversed order ",
"Bubble Sort": "Best case: O(n) Sorted Array, Average case: O(n2), Worst case: O(n2)                                                         ",
"Merge Sort": "Best Case: O(n log n), Sorted or nearly sorted Array, Average Case: O(n log n), Worst Case: O(n log n) reversed order",
"Selection Sort": "Always O(n2)                                                                                                              "
}

let sortingAlgoSpaceComplx = {"Insertion Sort": "Auxiliary Space: O(1)                       ",
"Bubble Sort": "Auxiliary Space: O(1)                                                        ",
"Merge Sort": "O(n), Additional space is required for the temporary array used during merging",
"Selection Sort": "Auxiliary Space: O(1)                                                     "
}

function insertionSort(array) {
    const steps = [];

    for (let i = 1; i < array.length; i++) {
        let endPtr = i - 1;
        let curr = array[i];

        while (endPtr >= 0) {
            let endVal = array[endPtr];

            if (curr < endVal) {
                steps.push([endPtr, endVal, endPtr + 1, curr, true]);
                array[endPtr + 1] = array[endPtr];
                endPtr--;
            } else {
                steps.push([endPtr, endVal, endPtr + 1, curr, false]);
                break;
            }
        }
        endPtr++;
        array[endPtr] = curr;
    }  
    return steps;      
};

function bubbleSort(array) {
    const steps = [];
    let len = array.length;

    for (let i = 1; i < len; i++) {
        for (let j = i; j < len; j++) {
            let currPos = j - i + 1;
            let currVal = array[currPos];
            let prevVal = array[currPos-1];

            if (array[currPos] < array[currPos-1]) {
                steps.push([currPos-1, prevVal, currPos, currVal, true]);
                let tmp = array[currPos];
                array[currPos] = array[currPos-1];
                array[currPos-1] = tmp;
            } else {
                steps.push([currPos-1, prevVal, currPos, currVal, false]);
            }
        }
    }  
    return steps;      
};

function mergeSort(array) {
    const steps = [];
    mergeSortHelper(array, 0, array.length - 1, steps)
    return steps;
};

function mergeSortHelper(array, left, right, steps) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(array, left, mid, steps);
        mergeSortHelper(array, mid + 1, right, steps);
        merge(array, left, mid, right, steps);
    }
}

function merge(array, left, mid, right, steps) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let leftPos = 0, rightPos = 0, curr = left;

    while (leftPos < leftArr.length && rightPos < rightArr.length) {
        if (leftArr[leftPos] <= rightArr[rightPos]) {
            steps.push([curr, leftArr[leftPos], curr, array[curr], true]);
            array[curr] = leftArr[leftPos];
            leftPos++;
            curr++;
        } else {
            steps.push([curr, rightArr[rightPos], curr, array[curr], true]);
            array[curr] = rightArr[rightPos]; 
            rightPos++;
            curr++;
        }
    }

    while (leftPos < leftArr.length) {
        steps.push([curr, leftArr[leftPos], curr, array[curr], true]);
        array[curr] = leftArr[leftPos];
        leftPos++;
        curr++;
    }

    while (rightPos < rightArr.length) {
        steps.push([curr, rightArr[rightPos], curr, array[curr], true]);
        array[curr] = rightArr[rightPos];
        rightPos++;
        curr++;
    }
}

function selectionSort(array) {
    const steps = [];

    for (let i = 0; i < array.length; i++) {
        let currMinIdx = 0, currMinVal = 121; // max val is 120
        for (let j = i; j < array.length; j++) {
            steps.push([j, array[j], i, array[i], false]);

            if (array[j] < currMinVal) {
                currMinVal = array[j];
                currMinIdx = j;
            }
        }

        if (currMinIdx !== i) {
            steps.push([currMinIdx, currMinVal, i, array[i], true]);
            let tmp = array[i];
            array[i] = array[currMinIdx];
            array[currMinIdx] = tmp;
        }
    }
    return steps;
};

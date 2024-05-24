export function handleSort(sortingAlgo, array) {
    switch(sortingAlgo['value']) {
        case "Insertion Sort":
            return insertionSort(array);
        case "Bubble Sort":
            return bubbleSort(array);
        case "Merge Sort":
            return mergeSort(array);
        case "Selection Sort":
            return selectionSort(array);
        default:
            return "Sorting algorithm is unavailable";
    }
};

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

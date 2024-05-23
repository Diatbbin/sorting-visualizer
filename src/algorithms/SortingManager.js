export function handleSort(sortingAlgo, array) {
    switch(sortingAlgo['value']) {
        case "Insertion Sort":
            return insertionSort(array);
        case "Bubble Sort":
            return bubbleSort(array);
        case "Merge Sort":
            return mergeSort(array);
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
    if (left == right) {
        return;
    }

    mergeSortHelper(array, left, right/2, steps);
    mergeSortHelper(array, right/2 + 1, right, steps);

    for (let i = left + 1; i < right + 1; i++) {
        if (array[i] < array[i-1]) {
            steps.push([i-1, array[i-1], i, array[i], true]);
            let tmp = array[i];
            array[i] = array[i-1];
            array[i-1] = tmp;
        } else {
            steps.push([i-1, array[i-1], i, array[i], false]);
        }
    }
}

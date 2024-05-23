export function handleSort(sortingAlgo, array) {
    switch(sortingAlgo['value']) {
        case "Insertion Sort":
            return insertionSort(array);
        case "Bubble Sort":
            return bubbleSort(array);
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


import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";

export function heapSort(arr) {
	buildMaxHeap(arr);
	var lastElement = arr.length - 1;

	while (lastElement > 0) {
		[arr[0], arr[lastElement]] = [arr[lastElement], arr[0]];
		heapify(arr, 0, lastElement);
		lastElement -= 1;
	} 

    return arr;
}

function buildMaxHeap(arr) {
	var i = Math.floor(arr.length/2-1);
	while (i >= 0) {
		heapify(arr, i, arr.length);
		i -= 1;
	}
}

function heapify(heap, i, max) {
	var index, leftChild, rightChild;
	while (i < max) {
		index = i;
		leftChild = 2*i + 1;
		rightChild = leftChild + 1;
		if (leftChild < max && heap[leftChild].weight > heap[index].weight) {
			index = leftChild;
		}
		if (rightChild < max && heap[rightChild].weight > heap[index].weight) {
			index = rightChild;
		}
		if (index === i) {
			return;
		}
		[heap[i], heap[index]] = [heap[index], heap[i]];
		i = index;
	}
}
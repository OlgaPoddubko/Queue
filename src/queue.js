const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		} else {this.maxSize = 30;
		}

		this.heap = new MaxHeap ();
	}

	push(data, priority) {
		if (this.heap.size() < this.maxSize) {
		this.heap.push(data,priority);
		} else {
			throw new Error ("This queue already has max size");
		}
	}

	shift() {
		if(this.heap.isEmpty()){
			throw "empty";
		} else{
			return this.heap.pop();
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;

const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if(this.root==null) {
			return;
		}

		let detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);

		this.heapSize--;

		return detachedRoot.data;
	}

	detachRoot() {
		let returnValue = this.root;
		if(this.parentNodes[0] == this.root){
			this.parentNodes.shift();
		}
		this.root = null;
		return returnValue;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0) {
			return;
		}

		let lastNode =  this.parentNodes[this.parentNodes.length-1];
		this.root = lastNode;
		let lastNodeParent = lastNode.parent;
		lastNode.remove();
		this.root.appendChild(detached.left);
		this.root.appendChild(detached.right);
		this.parentNodes.pop();
	
		if(lastNodeParent != this.parentNodes[0]){
			if (lastNodeParent==detached)
			{
				this.parentNodes.unshift(lastNode);
			}
			else
			{
				this.parentNodes.unshift(lastNodeParent);
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if(this.root == null){
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if(this.root == null){
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].left && this.parentNodes[0].right){
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(node && node.parent){
			if(node.priority > node.parent.priority){
				this.swapWithParent(node);
				this.shiftNodeUp(node);
			}
		} 
	}

	swapWithParent(node){
		let parentNode = node.parent;
		let nodeIndex = this.parentNodes.indexOf(node);
		let parentIndex = this.parentNodes.indexOf(parentNode);

		if(nodeIndex>-1){
			this.parentNodes[nodeIndex] = parentNode;
		}
		if(parentIndex>-1){
			this.parentNodes[parentIndex] = node;
		}

		if(node.parent == this.root){
			this.root = node;
		}
		node.swapWithParent();
	}

	shiftNodeDown(node) {
		if(node == null) {
			return;
		}

		let child;
		if((node.left && !node.right) || (node.left && node.right && node.left.priority > node.right.priority)){
			child = node.left;
		} else{
			child = node.right;
		}
		if(child && child.priority > node.priority) {
			this.swapWithParent(child);
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;

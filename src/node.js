class Node {
	
    constructor (data, priority){
	    this.data = data;
	    this.priority = priority;
	    this.parent = null;
	    this.left = null;
	    this.right = null;
    }
	
	appendChild (node) {
		if (node == null) {
			return;
		}
		
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		}
        else if (this.right === null){
			this.right = node;
			node.parent = this;
		}
	}
	
	removeChild(node) {
		if (node == null) {
			return;
		}


        if (node == this.left){
			this.left = null;
			node.parent = null;
		}
		else if (node == this.right){
			this.right = null;
			node.parent = null;
		}
		else throw new Error('Passed node is not a child of this node');
	}
	
	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
	
	swapWithParent() {
		if (this.parent) {
			let initialNode = this;
			let nodeParent = this.parent;
			let nodeLeft = this.left;
			let nodeRight = this.right;
			let parentLeft = this.parent.left;
			let parentRight = this.parent.right;
			let parentParent = this.parent.parent;

			initialNode.removeChild(nodeLeft);
			initialNode.removeChild(nodeRight);
			nodeParent.removeChild(parentLeft);
			nodeParent.removeChild(parentRight);
			if (parentParent) {
			    parentParent.removeChild(nodeParent);
           		parentParent.appendChild(initialNode);
 			}

			if (initialNode == parentLeft) {
				initialNode.appendChild(nodeParent);
				initialNode.appendChild(parentRight);
			}
			else {
				initialNode.appendChild(parentLeft);
				initialNode.appendChild(nodeParent);
			}

			nodeParent.appendChild(nodeLeft);
			nodeParent.appendChild(nodeRight);
		}
	}
}

module.exports = Node;

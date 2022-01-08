function Node(data) {
	this.data = data === undefined ? null : data;
	this.next = null;
}

class LinkedList {
	constructor(head = null) {
		this.head = head;
	}

	addNewNode(data) {
		const newNode = new Node(data);
		this.head.next = newNode;
	}
}

const res = new LinkedList();

function reverse(head) {
	if (head === null && res.head === null) return null;
	if (head.next === null) return head;
	if (head.next !== null) {
		res.head = head;
		const newNode = new Node(head.next.data);
		newNode.next = head;
		reverse(newNode);
	}
	return res;
}

const initialLinkedList = new LinkedList(new Node(3));
initialLinkedList.head.next = new Node(2);
initialLinkedList.head.next = new Node(1);
console.log(initialLinkedList);

export class CircularNode {
    prev: CircularNode;
    next: CircularNode;
    data: any;
    constructor(data) {
        this.prev = null;
        this.next = null;
        this.data = data;
    }
}


export class CircularList {
    first: CircularNode;
    last: CircularNode;

    constructor() {
        this.first = undefined;
        this.last = undefined;
    }

    add(node) {
        if (!this.first) {
            node.next = node;
            node.prev = node;
            this.first = node;
            this.last = node;
        } else {
            node.prev = this.last;
            node.next = this.first;
            this.first.prev = node;
            this.last.next = node;
            this.last = node;
        }
    }
}
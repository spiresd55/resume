export enum BinaryHeapType {
    MIN = "min",
    MAX = "max"
}

export class BinaryHeap<T> { // Binary Heap requires generics
    items: any;
    type: BinaryHeapType;
    objectProperty: string;

    constructor(type, objectProperty) {
        this.items = [0];
        this.type = type;
        this.objectProperty = objectProperty; // The property on the object the queue is comparing
    }

    length() {
        return this.items.length - 1; // Return the length of the heap
    }

    insert(node) {
        this.items.push(node); // At new node to end up heap, and perculate up
        this.percolateUp();
    }

    del() {
        // Delete the top of the list
        const item = this.items[1];

        // Swap the end of the list to the root
        this.items[1] = this.items[this.length()];

        // pop the last item
        this.items.pop();

        // Percolate the large root down the data structure
        this.percolateDown(1);

        return item;
    }

    isEmpty(): boolean {
        return this.length() === 0;
    }

    buildHeap(list: T[]) {
        // This function currently doesn't support existing lists
        if (this.length() > 1) {
            return;
        }

        this.items = [0, ...list];
        let i = Math.floor(this.length() / 2 );
        while (i > 0) {
            this.percolateDown(i);
            i = i - 1;
        }
    }

    private shouldSwap(node: T, node2: T) {
        if(this.type === BinaryHeapType.MIN) {
            if(node[this.objectProperty] < node2[this.objectProperty]) {
                return true;
            }
        } else {
            if (node[this.objectProperty] > node2[this.objectProperty]) {
                return true;
            }
        }

        return false;
    }

    private percolateUp() {
        let i = this.length();
        while (Math.floor(i / 2 ) > 0) {
            const parentIndex = Math.floor(i /2 );
            if (this.shouldSwap(this.items[i], this.items[parentIndex])) {
                const temp = this.items[i];
                this.items[i] = this.items[parentIndex];
                this.items[parentIndex] = temp;
            }
            i = Math.floor(i / 2);
        }
    }

    private percolateDown(index) {
        let i = index;
        while (i * 2 <= this.length()) {
            const mc = this.minChild(i);

            if (this.shouldSwap(this.items[mc], this.items[i])) {
                const temp = this.items[i];
                this.items[i] = this.items[mc];
                this.items[mc] = temp;
            }
            i = mc;
        }
    }

    private minChild(index) {
        if (index * 2 + 1 > this.length()) {
            return index * 2;
        }

        if (this.shouldSwap(this.items[index * 2], this.items[index * 2 + 1])) {
            return index * 2;
        }

        return index * 2 + 1;
    }
}
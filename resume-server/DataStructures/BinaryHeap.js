class BinaryHeap {
    constructor(type) {
        this.items = [0];
        this.type = type;
    }

    length() {
        return this.items.length - 1;
    }

    insert(node) {
        this.items.push(node);
        this.percolateUp();
    }

    del() {
        //Delete the top of the list
        const item = this.items[1];

        //Swap the end of the list to the root
        this.items[1] = this.items[this.length()];

        //pop the last item
        this.items.pop();

        //Percolate the large root down the data structure
        this.percolateDown(1);

        return item;
    }

    isEmpty() {
        this.length() === 0;
    }

    buildHeap(list) {
        //This function currently doesn't support existing lists
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

    //TODO:make private
    shouldSwap(node, node2) {
        if(this.type === "min") {
            if(node < node2) {
                return true;
            }
        } else {
            if (node > node2) {
                return true;
            }
        }

        return false;
    }

    //TODO: Make private
    percolateUp() {
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

    //TODO: Make Private
    percolateDown(index) {
        let i = index;
        console.log("pd", i);
        while (i * 2 <= this.length()) {
            let mc = this.minChild(i);

            if (this.shouldSwap(this.items[mc], this.items[i])) {
                const temp = this.items[i];
                this.items[i] = this.items[mc];
                this.items[mc] = temp;
            }
            i = mc;
        }
    }

    //TODO: Make Private
    minChild(index) {
        if (index * 2 + 1 > this.length()) {
            return index * 2;
        }

        if (this.shouldSwap(this.items[index * 2], this.items[index * 2 + 1])) {
            return index * 2;
        }

        return index * 2 + 1;
    }
}
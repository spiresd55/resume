//#1 solve for final coordinate
//#2 create a graph data structure
//#3 solve for shortest path

class Node {
    constructor(data) {
        this.prev = null;
        this.next = null;
        this.data = data;
    }
}


class CircularList {
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

class Compass {
    constructor(startingDirection) {
        this.directions = new CircularList();

        const nodes = {
            "N": new Node("N"),
            "E": new Node("E"),
            "S": new Node("S"),
            "W": new Node("W")
        };

        this.directions.add(nodes.N);
        this.directions.add(nodes.E);
        this.directions.add(nodes.S);
        this.directions.add(nodes.W);

        this.pointer = nodes[startingDirection];
    }

    moveLeft() {
        this.pointer = this.pointer.prev;
    }

    moveRight() {
        this.pointer = this.pointer.next;
    }

    getPosition() {
        return this.pointer.data;
    }
}

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class BinaryHeap {
    constructor() {
        this.items = [0];
    }

    length() {
        return this.items.length - 1;
    }

    insert(node) {
        this.items.push(node);
        this.percolateUp();
    }

    delMin() {
        //Delete the top of the list
        const item = this.items[1];

        //Swap the end of the list to the root
        this.items[1] = this.items[this.length()];

        //pop the last item
        this.items.pop();

        //Percolate the large root down the data structure
        this.percolateDown();

        return item;
    }

    isEmpty() {

    }

    size() {

    }

    buildHeap(list) {

    }

    //TODO: Make private
    percolateUp() {
        let i = this.length();
        while (Math.floor(i / 2 ) > 0) {
            const parentIndex = Math.floor(i /2 );
            if (this.items[i] < this.items[parentIndex]) {
                const temp = this.items[i];
                this.items[i] = this.items[parentIndex];
                this.items[parentIndex] = temp;
            }
            i = Math.floor(i / 2);
        }
    }

    //TODO: Make Private
    percolateDown() {
        let i = 1;

        while (i * 2 <= this.length()) {
            let mc = this.minChild(i);

            if (this.items[i] > this.items[mc]) {
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

        if (this.items[index * 2] < this.items[index * 2 + 1]) {
            return index * 2;
        }

        return index * 2 + 1;
    }
}


const isValidDirection = (direction) => direction === "R" || direction === "L";

const calculateOriginalPath = (startingPosition, instructions) => {
    //#1 solve for final coordinate
    const compass = new Compass("N");
    const path = [startingPosition];

    instructions.forEach((instruction) => {
        //Destructure the string
        let [direction, distance] = instruction;
        distance = parseInt(distance);

        if (isValidDirection(direction) && distance > 0) {
            const lastPosition = path[path.length - 1];
            if (direction === "L") {
                compass.moveLeft();
            }
            if (direction === "R") {
                compass.moveRight();
            }

            const currentPosition = compass.getPosition();

            if (currentPosition === "N") {
                path.push(new Coordinate(lastPosition.x, lastPosition.y + distance));
            } else if (currentPosition === "S") {
                path.push(new Coordinate(lastPosition.x, lastPosition.y - distance));
            } else if (currentPosition === "E") {
                path.push(new Coordinate(lastPosition.x + distance, lastPosition.y));
            } else {
                path.push(new Coordinate(lastPosition.x - distance, lastPosition.y));
            }
        }
    });

    return path;
};



const results = calculateOriginalPath(new Coordinate(3,5), ["R3", "L3", "L3", "R4"]);
console.log(results);


console.log("TESTING HEAP");
const pQueue = new BinaryHeap();
pQueue.insert(3);
//console.log(pQueue);
pQueue.insert(5);
//console.log(pQueue);
pQueue.insert(10);
//console.log(pQueue);
pQueue.insert(4);
//console.log(pQueue);

//console.log(pQueue.delMin())
//console.log(pQueue);
console.log(pQueue.minChild(3));

console.log(pQueue);

console.log(pQueue.delMin());
console.log(pQueue);
console.log(pQueue.delMin());
console.log(pQueue);
console.log(pQueue.delMin());
console.log(pQueue)



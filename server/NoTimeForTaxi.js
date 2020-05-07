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

//This BinaryHeap supports both min and max priority queues
//TODO: Make this support objects
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


//console.log("TESTING HEAP");
//const pQueue = new BinaryHeap("min");
//pQueue.insert(3);
//console.log(pQueue);
//pQueue.insert(5);
//console.log(pQueue);
//pQueue.insert(10);
//console.log(pQueue);
//pQueue.insert(4);
//console.log(pQueue);

//console.log(pQueue.delMin())
//console.log(pQueue);
//console.log(pQueue.minChild(3));

//console.log(pQueue);

//console.log(pQueue.delMin());
//console.log(pQueue);
//console.log(pQueue.delMin());
//console.log(pQueue);
//console.log(pQueue.delMin());
//console.log(pQueue)

const pQueue2 = new BinaryHeap("max");
//pQueue2.insert(20);
//pQueue2.insert(30);
pQueue2.buildHeap([11,3,4,5,100,2,6,8,9]);
/*console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());
console.log(pQueue2.delMin());*/
console.log(pQueue2);


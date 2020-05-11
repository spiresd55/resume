import {CircularNode, CircularList} from "../../dataStructures/CircularList";

class Compass {
    directions: CircularList;
    pointer: CircularNode;

    constructor(startingDirection) {
        this.directions = new CircularList();

        const nodes = {
            "N": new CircularNode("N"),
            "E": new CircularNode("E"),
            "S": new CircularNode("S"),
            "W": new CircularNode("W")
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

export default Compass;
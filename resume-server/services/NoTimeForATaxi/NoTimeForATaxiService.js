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

    //Set Boundaries (will use this later to create a coordinate plane graph
    let minX = startingPosition.x,
        maxX = startingPosition.x,
        minY = startingPosition.y,
        maxY = startingPosition.y;

    //Determine boundaries

    path.forEach((p) => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y)
    });

    return {path, minX, maxX, minY, maxY};
};

const createCoordinatePlane = (pathDetails) => {
    const {path, minX, maxX, minY, maxY} = pathDetails;
    console.log('coordinate plane', path[0], path[path.length - 1]);

    //Create Empty Graph
    const coordinatePlane = new Graph();

    //Draw Coordinate Plane
    for(let i = minX; i <= maxX; i++) {
        for(let j = minY; j <= maxY; j++) {
            console.log(i, j);

            const currentPoint = `(${i},${j})`;
            //Corners
            if (i === minX && j === minY) {
                //Bottom Left Corner
                coordinatePlane.addEdge(currentPoint, `(${i + 1},${j})`, 1);
                coordinatePlane.addEdge(currentPoint, `(${i},${j + 1})`, 1);
                console.log(coordinatePlane.getVertice(`(${i},${j})`))
            } else if (i === minX && j === maxY) {
                //Top Left Corner
                coordinatePlane.addEdge(currentPoint, `(${i + 1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,  `(${i - 1},${j})`,1)
            } else if (i === maxX && j === minY) {
                //Bottom right corner
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            } else if (i === maxX && j === maxY) {
                //Top right corner
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
            } else if (j === minY) {
                //Bottom Edge
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`, 1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            } else if (j === maxY) {
                //Top Edge
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
            } else if (i === minX) {
                //Left Edge
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
            } else if (i === maxX) {
                //Right Edge
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
            } else {
                //Other
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            }
        }
    }

    return coordinatePlane;
};

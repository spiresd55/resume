import Compass from "./Compass";
import Coordinate from "./Coordinate";
import {Graph, Dijkstra} from "../../dataStructures/Graph";

const isValidDirection = (direction) => direction === "R" || direction === "L";

const calculateOriginalPath = (startingPosition: Coordinate, instructions) => {
    // #1 solve for final coordinate
    const compass = new Compass("N");
    const pathTraveled: Coordinate[] = [startingPosition];

    instructions.forEach((instruction) => {
        // Destructure the string
        let [direction, ...distance] = instruction;
        // I can improve this by having the instruction object payload sent: Payload: Instructions[{direction: string, distance:number}]
        distance = parseInt(distance.join(""));

        if (isValidDirection(direction) && distance > 0) {
            const lastPosition = pathTraveled[pathTraveled.length - 1];
            if (direction === "L") {
                compass.moveLeft();
            }
            if (direction === "R") {
                compass.moveRight();
            }

            const currentPosition = compass.getPosition();

            if (currentPosition === "N") {
                pathTraveled.push(new Coordinate(lastPosition.x, lastPosition.y + distance));
            } else if (currentPosition === "S") {
                pathTraveled.push(new Coordinate(lastPosition.x, lastPosition.y - distance));
            } else if (currentPosition === "E") {
                pathTraveled.push(new Coordinate(lastPosition.x + distance, lastPosition.y));
            } else {
                pathTraveled.push(new Coordinate(lastPosition.x - distance, lastPosition.y));
            }
        }
    });

    // Set Boundaries (will use this later to create a coordinate plane graph
    let minX = startingPosition.x,
        maxX = startingPosition.x,
        minY = startingPosition.y,
        maxY = startingPosition.y;

    // Determine boundaries
    pathTraveled.forEach((p) => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y)
    });

    return {pathTraveled, minX, maxX, minY, maxY};
};

const createCoordinatePlane = (pathDetails) => {
    const {minX, maxX, minY, maxY} = pathDetails;

    // Create Empty Graph
    const coordinatePlane = new Graph();

    // Draw Coordinate Plane
    for(let i = minX; i <= maxX; i++) {
        for(let j = minY; j <= maxY; j++) {
            console.log(i, j);

            const currentPoint = `(${i},${j})`;
            // Corners
            if (i === minX && j === minY) {
                // Bottom Left Corner
                coordinatePlane.addEdge(currentPoint, `(${i + 1},${j})`, 1);
                coordinatePlane.addEdge(currentPoint, `(${i},${j + 1})`, 1);
                console.log(coordinatePlane.getVertice(`(${i},${j})`))
            } else if (i === minX && j === maxY) {
                // Top Left Corner
                coordinatePlane.addEdge(currentPoint, `(${i + 1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,  `(${i - 1},${j})`,1)
            } else if (i === maxX && j === minY) {
                // Bottom right corner
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            } else if (i === maxX && j === maxY) {
                // Top right corner
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
            } else if (j === minY) {
                // Bottom Edge
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`, 1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            } else if (j === maxY) {
                // Top Edge
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
            } else if (i === minX) {
                // Left Edge
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
            } else if (i === maxX) {
                // Right Edge
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
            } else {
                // Other
                coordinatePlane.addEdge(currentPoint,`(${i+1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i-1},${j})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j-1})`,1);
                coordinatePlane.addEdge(currentPoint,`(${i},${j+1})`,1);
            }
        }
    }

    return coordinatePlane;
};

export const findShortestPath = (startingPosition: Coordinate, instructions: string[]) => {
    // Calculate the original path based on instructions provided
    const originalPathDetails = calculateOriginalPath(startingPosition, instructions);

    // Create a coordinate plane graph object
    const coordinatePlane = createCoordinatePlane(originalPathDetails);


    const dijkstra = new Dijkstra(coordinatePlane);
    // Find ending position
    const endingPosition = originalPathDetails.pathTraveled[originalPathDetails.pathTraveled.length - 1];

    // Find the shortest path
    const results = dijkstra.findShortestPath(
        `(${startingPosition.x},${startingPosition.y})`,
        `(${endingPosition.x},${endingPosition.y})`
    );

    return {
        ...results,
        originalPathTraveled: originalPathDetails.pathTraveled,
    }
};
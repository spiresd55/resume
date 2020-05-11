import {findShortestPath} from "./NoTimeForATaxiService";
import Coordinate from "./Coordinate";

it("should return shortest path", () => {
    const results = findShortestPath(new Coordinate(3, 5), ["R3", "L3", "L3", "R4", "B2"]);

    expect(results.shortestDistance).toBe(7);
    expect(results.originalPathTraveled).toEqual([
        {x: 3, y: 5},
        {x: 6, y: 5},
        {x: 6, y: 8},
        {x: 3, y: 8},
        {x: 3, y: 12}
    ]);
    expect(results.shortestPath).toEqual([
        "(3,6)",
        "(3,7)",
        "(3,8)",
        "(3,9)",
        "(3,10)",
        "(3,11)",
        "(3,12)",
    ]);
});

it("should return shortest path again", () => {
    const results = findShortestPath(new Coordinate(3, 5), ["R3", "R3", "R3", "R7", "L10"]);

    expect(results.shortestDistance).toBe(14);
    expect(results.shortestPath).toEqual([
        "(2,5)",
        "(1,5)",
        "(0,5)",
        "(-1,5)",
        "(-2,5)",
        "(-3,5)",
        "(-4,5)",
        "(-5,5)",
        "(-5,6)",
        "(-5,7)",
        "(-5,8)",
        "(-6,8)",
        "(-7,8)",
        "(-7,9)",
    ]);
});
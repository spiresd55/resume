import express from "express";
const problemRouter = express.Router();

import Coordinate from "../services/NoTimeForATaxi/Coordinate";
import {findShortestPath} from "../services/NoTimeForATaxi/NoTimeForATaxiService";

/* GET home page. */
problemRouter.get('/', (req, res, next) => {

    findShortestPath(new Coordinate(3,5), ["R3", "L3", "L3", "R4"]);
    res.json({
        data: "test"
    })
});

export default problemRouter;
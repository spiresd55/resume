import {findShortestPath} from "../services/NoTimeForATaxi/NoTimeForATaxiService";
import {getSumOfSectorIds} from "../services/Checksum/ChecksumService";
import {balanceBots} from "../services/BalanceBots/BalanceBots";
import Coordinate from "../services/NoTimeForATaxi/Coordinate";

export const noTimeForATaxiCtrl = (req, res, next) => {
    // NOTE: Didnt have time to enforce the params sent to the rest service TODO: verify req params
    try {

        // This can be flushed out quite a bit, to have better error handling, and a better request payload
        let directions = req.query.directions.split(',');
        let startingPosition = req.query.start.split(',');

        const results = findShortestPath(
            new Coordinate(parseInt(startingPosition[0]),
                parseInt(startingPosition[1])), directions
        );

        res.json(results);
    } catch (e) {
        res.send("Something went wrong");
    }
};

export const checksumCtrl = (req, res) => {
    try {
        const names = req.body.names;
        res.json({names, sum: getSumOfSectorIds(names)});
    } catch (e) {
        res.send("something went wrong");
    }
};

export const botsCtrl = (req, res) => {
    try {
        const {start, low, high} = req.query;
        const botNumber = balanceBots(+start, +low, +high);
        res.json({botNumber});
    } catch(e) {
        res.send("something went wrong")
    }
};
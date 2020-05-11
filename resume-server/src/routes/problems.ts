import express from "express";
const problemRouter = express.Router();
import {noTimeForATaxiCtrl, checksumCtrl, botsCtrl} from "../controllers/ProblemsController";

problemRouter.get('/noTimeForTaxi', noTimeForATaxiCtrl);
problemRouter.post('/checksum', checksumCtrl);
problemRouter.get('/bots', botsCtrl);

export default problemRouter;
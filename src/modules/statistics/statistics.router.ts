import express from 'express';
import { getStatisticsByDate } from "./statistics.controller";

const statisticsRouter = express.Router();
//Statistics
statisticsRouter.get('', getStatisticsByDate);


export default statisticsRouter;
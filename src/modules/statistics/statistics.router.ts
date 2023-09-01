import express from 'express';
import { getStatisticsByDemographic, getStatisticsByUser } from "./statistics.controller";

const statisticsRouter = express.Router();
//Statistics
statisticsRouter.get('/user', getStatisticsByUser);
statisticsRouter.get('/demographic', getStatisticsByDemographic);


export default statisticsRouter;
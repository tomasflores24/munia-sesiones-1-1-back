import express from 'express';
import { getStatisticsByAges, getStatisticsByGenders, getStatisticsByServices, getStatisticsByUser, getStatisticsGeneral } from "./statistics.controller";

const statisticsRouter = express.Router();
//Statistics
statisticsRouter.get('/users', getStatisticsByUser);
statisticsRouter.get('/genders', getStatisticsByGenders);
statisticsRouter.get('/ages', getStatisticsByAges);
statisticsRouter.get('/services', getStatisticsByServices);
statisticsRouter.get('/general', getStatisticsGeneral);


export default statisticsRouter;
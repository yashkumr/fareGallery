import express from 'express';
import { exchangeRateController, flightResultController, getbill, getLocations } from '../controllers/flightController.js';

const router = express.Router();

router.get('/locations', getLocations);
router.get('/search-flights',flightResultController)
router.post('/travel/getbill', getbill);
router.get('/exchange-rates', exchangeRateController)


export default router;

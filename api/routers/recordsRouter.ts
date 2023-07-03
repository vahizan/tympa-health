
import { updateDeviceRecord } from '../controllers/recordsController';

import express from 'express';

export const recordsRouter = express.Router();

recordsRouter.put('/devices/:deviceId', updateDeviceRecord);
recordsRouter.post('/', () => {});
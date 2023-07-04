import {
  getRecords,
  removeDeviceRecord,
  updateDeviceRecord,
  addDeviceRecord,
} from "../controllers/recordsController";

import express from "express";

export const recordsRouter = express.Router();

recordsRouter.put("/devices/:deviceId", updateDeviceRecord);
recordsRouter.delete("/devices/:deviceId", removeDeviceRecord);
recordsRouter.get("/devices/all", getRecords);
recordsRouter.post("/devices/add", addDeviceRecord);

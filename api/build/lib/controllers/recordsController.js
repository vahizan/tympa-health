"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeviceRecord = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const DeviceRecordsRequest_1 = require("../validator/DeviceRecordsRequest");
const updateDeviceRecord = async (req, res) => {
    const { deviceId } = req.params;
    const body = req.body;
    try {
        const isValidBody = await (0, DeviceRecordsRequest_1.deviceRecordValidate)(body);
        if (!isValidBody) {
            return res.status(400).json({ error: "Invalid body values" });
        }
        await prismaClient_1.default.tbl_device.update({
            where: { device_id: deviceId },
            data: body,
        });
        res.status(200).json({ message: `${deviceId} record update success` });
    }
    catch (error) {
        const err = error;
        console.error("Error updating device:", error);
        res
            .status(500)
            .json({ error: "Failed to update device record", reason: err.message });
    }
};
exports.updateDeviceRecord = updateDeviceRecord;
//# sourceMappingURL=recordsController.js.map
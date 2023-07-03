"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recordsController_1 = require("./recordsController");
const setup_1 = require("../testUtils/setup");
const DeviceRecordsRequest_1 = require("../validator/DeviceRecordsRequest");
jest.mock("../validator/DeviceRecordsRequest");
describe("recordsController", () => {
    describe("updateDeviceRecord", () => {
        let req;
        let res;
        beforeEach(() => {
            req = {
                params: { deviceId: "123" },
                body: {},
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        it("should return 403 if the body is invalid", async () => {
            DeviceRecordsRequest_1.deviceRecordValidate.mockReturnValue(false);
            await (0, recordsController_1.updateDeviceRecord)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid body values" });
        });
        it("should update the device and return the updated device", async () => {
            DeviceRecordsRequest_1.deviceRecordValidate.mockReturnValue(true);
            await (0, recordsController_1.updateDeviceRecord)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: `123 record update success`,
            });
        });
        it("should handle errors and return 500 if an error occurs", async () => {
            DeviceRecordsRequest_1.deviceRecordValidate.mockReturnValue(true);
            setup_1.prismaMock.tbl_device.update.mockRejectedValue(new Error("Some error occurred"));
            await (0, recordsController_1.updateDeviceRecord)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Failed to update device record",
                reason: "Some error occurred",
            });
        });
    });
});
//# sourceMappingURL=recordsController.spec.js.map
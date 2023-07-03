import { Request, Response } from "express";
import { updateDeviceRecord } from "./recordsController";
import { prismaMock } from "../testUtils/setup";
import { deviceRecordValidate } from "../validator/DeviceRecordsRequest";

jest.mock("../validator/DeviceRecordsRequest");

describe("recordsController", () => {
  describe("updateDeviceRecord", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

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
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(false);

      await updateDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid body values" });
    });

    it("should update the device and return the updated device", async () => {
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(true);

      await updateDeviceRecord(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: `123 record update success`,
      });
    });

    it("should handle errors and return 500 if an error occurs", async () => {
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(true);
      (prismaMock.tbl_device.update as jest.Mock).mockRejectedValue(
        new Error("Some error occurred")
      );

      await updateDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to update device record",
        reason: "Some error occurred",
      });
    });
  });
});

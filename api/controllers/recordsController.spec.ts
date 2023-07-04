import { Request, Response } from "express";
import {
  addDeviceRecord,
  getRecords,
  removeDeviceRecord,
  updateDeviceRecord,
} from "./recordsController";
import { prismaMock } from "../testUtils/setup";
import {
  deviceRecordValidate,
  updateDeviceRecordValidate,
} from "../validator/DeviceRecordsRequest";

jest.mock("../validator/DeviceRecordsRequest");

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("recordsController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2000-01-01").getTime());
  });

  describe("addDeviceRecord", () => {
    beforeEach(() => {
      res = mockResponse();
      req = {
        body: {
          device_id: "123",
          last_updated_datetime: Date.now() / 1000,
          created_datetime: Date.now() / 1000,
          device_status_code: "1",
        },
      };
    });

    it("should create a new device record", async () => {
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(true);
      await addDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "123 record successfully created",
      });
      const expectedDate = new Date("2000-01-01");
      expect(prismaMock.tbl_device.create).toHaveBeenCalledWith({
        data: {
          device_id: "123",
          device_status_code: "1",
          last_updated_datetime: expectedDate,
          created_datetime: expectedDate,
        },
      });
    });

    it("should handle invalid body values", async () => {
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(false);

      await addDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: "Invalid body values" });
      expect(prismaMock.tbl_device.create).not.toHaveBeenCalled();
    });
  });

  describe("updateDeviceRecord", () => {
    beforeEach(() => {
      req = {
        params: { deviceId: "123" },
        body: {},
      };
      res = mockResponse();
    });

    it("should return 403 if the body is invalid", async () => {
      (deviceRecordValidate as unknown as jest.Mock).mockReturnValue(false);

      await updateDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Invalid body values",
      });
    });

    it("should update the device and return the updated device", async () => {
      (updateDeviceRecordValidate as unknown as jest.Mock).mockReturnValue(
        true
      );
      req = {
        params: { deviceId: "123" },
        body: {
          device_status_code: "SOME CODE",
        },
      };

      await updateDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(prismaMock.tbl_device.update).toHaveBeenCalledWith({
        data: {
          device_status_code: "SOME CODE",
          last_updated_datetime: new Date("2000-01-01"),
        },
        where: {
          device_id: "123",
        },
      });
      expect(res.json).toHaveBeenCalledWith({
        message: `123 record update success`,
      });
    });

    it("should handle errors and return 500 if an error occurs", async () => {
      (updateDeviceRecordValidate as unknown as jest.Mock).mockReturnValue(
        true
      );
      (prismaMock.tbl_device.update as jest.Mock).mockRejectedValue(
        new Error("Some error occurred")
      );

      await updateDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to update record. Please try again later",
      });
    });
  });

  describe("getRecords", () => {
    beforeEach(() => {
      req = {
        params: { deviceId: "123" },
        body: {},
      };
      res = mockResponse();
    });

    it("should retrieve all device records", async () => {
      const mockRecords = [
        { device_id: "123", device_status_code: "code" },
        {
          device_id: "456",
          device_status_code: "code",
        },
      ];
      // @ts-ignore
      prismaMock.tbl_device.findMany.mockResolvedValueOnce(mockRecords);

      await getRecords(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockRecords);
      expect(prismaMock.tbl_device.findMany).toHaveBeenCalled();
    });

    it("should handle error while retrieving records", async () => {
      prismaMock.tbl_device.findMany.mockRejectedValueOnce(
        new Error("Database error")
      );

      await getRecords(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to retrieve records. Please try again later",
      });
      expect(prismaMock.tbl_device.findMany).toHaveBeenCalled();
    });
  });

  describe("removeDeviceRecord", () => {
    beforeEach(() => {
      req = {
        params: { deviceId: "123" },
        body: {},
      };
      res = mockResponse();
    });

    it("should remove an existing device record", async () => {
      await removeDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "123 record deletion success",
      });
      expect(prismaMock.tbl_device.delete).toHaveBeenCalledWith({
        where: { device_id: "123" },
      });
    });

    it("should handle missing device ID", async () => {
      req = {
        params: {},
        body: {},
      };
      prismaMock.tbl_device.delete.mockRejectedValueOnce(
        new Error("Database error")
      );
      await removeDeviceRecord(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Device ID was not provided",
      });
      expect(prismaMock.tbl_device.delete).not.toHaveBeenCalled();
    });
  });
});

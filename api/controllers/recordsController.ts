import { Request, Response } from "express";
import prisma from "../prismaClient";
import { deviceRecordValidate } from "../validator/DeviceRecordsRequest";

export const updateDeviceRecord = async (req: Request, res: Response) => {
  const { deviceId } = req.params;
  const body = req.body;

  try {
    const isValidBody = await deviceRecordValidate(body);
    if (!isValidBody) {
      return res.status(400).json({ error: "Invalid body values" });
    }

    await prisma.tbl_device.update({
      where: { device_id: deviceId },
      data: body,
    });

    res.status(200).json({ message: `${deviceId} record update success` });
  } catch (error) {
    const err = error as unknown as Error;
    console.error("Error updating device:", error);
    res
      .status(500)
      .json({ error: "Failed to update device record", reason: err.message });
  }
};

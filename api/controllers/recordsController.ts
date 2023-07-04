import { Request, Response } from "express";
import prisma from "../prismaClient";
import {
  deviceRecordValidate,
  updateDeviceRecordValidate,
} from "../validator/DeviceRecordsRequest";

const handleErrorResponse = (
  res: Response,
  statusCode: number,
  error: string
) => {
  return res.status(statusCode).json({ error: error });
};

export const addDeviceRecord = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const isValidBody = await deviceRecordValidate(body);
    if (!isValidBody) {
      return res.status(400).send({ error: "Invalid body values" });
    }

    await prisma.tbl_device.create({
      data: {
        ...body,
        last_updated_datetime: new Date(Date.now()),
        created_datetime: new Date(Date.now()),
      },
    });

    return res
      .status(200)
      .json({ message: `${body?.device_id} record successfully created` });
  } catch (error) {
    return handleErrorResponse(
      res,
      500,
      "Failed to create record. Please try again later"
    );
  }
};

export const updateDeviceRecord = async (req: Request, res: Response) => {
  const { deviceId } = req.params;
  const body = req.body;

  try {
    const isValidBody = await updateDeviceRecordValidate(body);
    if (!isValidBody) {
      return res.status(400).send({ error: "Invalid body values" });
    }

    await prisma.tbl_device.update({
      where: { device_id: deviceId },
      data: {
        ...body,
        last_updated_datetime: new Date(Date.now()),
      },
    });

    return res
      .status(200)
      .json({ message: `${deviceId} record update success` });
  } catch (error) {
    return handleErrorResponse(
      res,
      500,
      "Failed to update record. Please try again later"
    );
  }
};

export const removeDeviceRecord = async (req: Request, res: Response) => {
  if (!req.params?.deviceId) {
    return res.status(400).send({ error: "Device ID was not provided" });
  }
  const { deviceId } = req.params;
  try {
    await prisma.tbl_device.delete({
      where: { device_id: deviceId },
    });

    return res
      .status(200)
      .json({ message: `${deviceId} record deletion success` });
  } catch (error) {
    const err = error as unknown as Error;
    return handleErrorResponse(res, 500, err.message);
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const allRecords = await prisma.tbl_device.findMany();
    return res.status(200).json(allRecords);
  } catch (error) {
    return handleErrorResponse(
      res,
      500,
      "Failed to retrieve records. Please try again later"
    );
  }
};

import Ajv from "ajv";
import addFormats from "ajv-formats";

import DeviceRecord from "../interfaces/DeviceRecord";
import DeviceRecordWithId from "../interfaces/DeviceRecordWithId";

const ajv = new Ajv();
addFormats(ajv);

export const deviceSchemaProperties = {
  device_status_code: { type: "string", default: "NEW" },
  tenant_id: { type: "string", nullable: true },
  device_make: { type: "string", nullable: true },
  device_model: { type: "string", nullable: true },
  device_activation_code: {
    type: "string",
    default:
      "(floor(((random() * (((99999 - 10000) + 1))::double precision) + (10000)::double precision)))::text",
  },
  device_os_version: { type: "string", nullable: true },
  app_identifier: { type: "string", nullable: true },
  app_version: { type: "string", nullable: true },
  last_updated_ip: { type: "string", nullable: true },
  device_settings_json: { type: "object", nullable: true },
  device_projects_json: { type: "object", nullable: true },
  created_datetime: {
    type: "string",
    format: "date-time",
    nullable: true,
  },
  release_date: {
    type: "string",
    format: "date-time",

    nullable: true,
  },
  last_updated_datetime: {
    type: "string",
    format: "date-time",

    nullable: true,
  },
};

export const deviceRecordSchema = {
  type: "object",
  properties: {
    device_id: { type: "string" },
    ...deviceSchemaProperties,
  },
  required: ["device_id"],
  additionalProperties: false,
};

export const deviceUpdateRecordSchema = {
  type: "object",
  properties: deviceSchemaProperties,
  additionalProperties: false,
};

export const deviceRecordValidate =
  ajv.compile<DeviceRecordWithId>(deviceRecordSchema);

export const updateDeviceRecordValidate = ajv.compile<DeviceRecord>(
  deviceUpdateRecordSchema
);

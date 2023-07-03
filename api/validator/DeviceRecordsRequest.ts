import Ajv, { JSONSchemaType } from "ajv";
import { DeviceRecord } from "../common/types";

const ajv = new Ajv();

export const deviceRecordSchema: JSONSchemaType<DeviceRecord> = {
  type: "object",
  properties: {
    device_id: {
      type: "string",
    },
    device_status_code: {
      type: "string",
    },
    tenant_id: { type: "string", nullable: true },
    device_make: { type: "string", nullable: true },
    device_model: { type: "string", nullable: true },
    device_activation_code: { type: "string", nullable: true },
    device_os_version: { type: "string", nullable: true },
    app_identifier: { type: "string", nullable: true },
    app_version: { type: "string", nullable: true },
    last_updated_ip: { type: "string", nullable: true },
    device_settings_json: { type: "object", nullable: true },
    device_projects_json: { type: "object", nullable: true },
    created_datetime: { type: "number", nullable: true },
    last_updated_datetime: {
      type: "number",
      nullable: true,
    },
  },
  required: ["device_id", "device_status_code"],
  additionalProperties: false,
};

export const deviceRecordValidate =
  ajv.compile<DeviceRecord>(deviceRecordSchema);

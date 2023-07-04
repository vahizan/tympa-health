interface DeviceRecord {
    device_id: string;
    device_status_code: string;
    tenant_id?: string;
    device_make?: string;
    device_model?: string;
    device_activation_code?: string;
    device_os_version?: string;
    device_settings_json?: object;
    device_projects_json?: object;
    app_identifier?: string;
    app_version?: string;
    created_datetime?: number;
    release_date?: number;
    last_updated_datetime?: number;
    last_updated_ip?: string;
}

export default DeviceRecord;

interface DeviceRecord {
    device_status_code?: string;
    tenant_id?: string;
    device_make?: string;
    device_model?: string;
    device_activation_code?: string;
    device_os_version?: string;
    device_settings_json?: object;
    device_projects_json?: object;
    app_identifier?: string;
    app_version?: string;
    created_datetime?: string;
    release_date?: string;
    last_updated_datetime?: string;
    last_updated_ip?: string;
}

export default DeviceRecord;

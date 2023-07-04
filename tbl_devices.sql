CREATE table tbl_device
(
	device_id varchar not null,
	device_status_code varchar default 'NEW' not null,
    tenant_id varchar default NULL,
	device_make varchar default NULL,
	device_model varchar default NULL,
	device_activation_code varchar default  floor(random() * (99999-10000+1) + 10000)::text not null,
	device_os_version varchar default NULL,
	device_settings_json json default NULL,
	device_projects_json json default NULL,
	app_identifier varchar default NULL,
	app_version varchar default NULL,
	created_datetime timestamp default CURRENT_TIMESTAMP not null,
	last_updated_datetime timestamp default CURRENT_TIMESTAMP not null,
	release_date timestamp default NULL,
	last_updated_ip varchar default NULL
);

create unique index tbl_device_device_id_uindex
	on tbl_device (device_id);

alter table tbl_device
	add constraint tbl_device_pk
		primary key (device_id);

INSERT INTO tbl_device (
    device_id,
    device_status_code,
    tenant_id,
    device_make,
    device_model,
    device_activation_code,
    device_os_version,
    device_settings_json,
    device_projects_json,
    app_identifier,
    app_version,
    created_datetime,
    last_updated_datetime,
    release_date,
    last_updated_ip
)
VALUES
    (
        'device_id_1',
        'NEW',
        'tenant_id_1',
        'device_make_1',
        'device_model_1',
        floor(random() * (99999-10000+1) + 10000)::text,
        'device_os_version_1',
        '{"setting_key": "setting_value_1"}',
        '{"project_key": "project_value_1"}',
        'app_identifier_1',
        'app_version_1',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        NULL,
        'last_updated_ip_1'
    ),
    (
        'device_id_2',
        'NEW',
        'tenant_id_2',
        'device_make_2',
        'device_model_2',
        floor(random() * (99999-10000+1) + 10000)::text,
        'device_os_version_2',
        '{"setting_key": "setting_value_2"}',
        '{"project_key": "project_value_2"}',
        'app_identifier_2',
        'app_version_2',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        'last_updated_ip_2'
    ),
    (
        'device_id_3',
        'NEW',
        'tenant_id_3',
        'device_make_3',
        'device_model_3',
        floor(random() * (99999-10000+1) + 10000)::text,
        'device_os_version_3',
        '{"setting_key": "setting_value_3"}',
        '{"project_key": "project_value_3"}',
        'app_identifier_3',
        'app_version_3',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        NULL,
        'last_updated_ip_4'
    ),
    (
        'device_id_4',
        'NEW',
        'tenant_id_4',
        'device_make_4',
        'device_model_4',
        floor(random() * (99999-10000+1) + 10000)::text,
        'device_os_version_4',
        '{"setting_key": "setting_value_4"}',
        '{"project_key": "project_value_4"}',
        'app_identifier_4',
        'app_version_4',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        NULL,
        'last_updated_ip_4'
    );
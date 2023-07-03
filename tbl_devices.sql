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
	last_updated_ip varchar default NULL
);

create unique index tbl_device_device_id_uindex
	on tbl_device (device_id);

alter table tbl_device
	add constraint tbl_device_pk
		primary key (device_id);

INSERT INTO tbl_device (device_id, created_datetime, last_updated_datetime)
VALUES
    ('device1', '2023-07-01 10:00:00', '2023-07-01 10:00:00'),
    ('device2', '2023-07-01 11:30:00', '2023-07-01 11:30:00'),
    ('device3', '2023-07-01 12:45:00', '2023-07-01 12:45:00'),
    ('device4', '2023-07-01 14:20:00', '2023-07-01 14:20:00'),
    ('device5', '2023-07-01 15:55:00', '2023-07-01 15:55:00'),
    ('device6', '2023-07-01 17:10:00', '2023-07-01 17:10:00'),
    ('device7', '2023-07-01 18:30:00', '2023-07-01 18:30:00'),
    ('device8', '2023-07-01 19:45:00', '2023-07-01 19:45:00'),
    ('device9', '2023-07-01 20:55:00', '2023-07-01 20:55:00'),
    ('device10', '2023-07-01 22:15:00', '2023-07-01 22:15:00');
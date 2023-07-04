import React from 'react';
import useApi from '../../hooks/useApi';
import { getAllDevices } from '../../services/api';
import DeviceTable from '../Table/DeviceTable';

const HomePage = () => {
    const { apiLoading, data } = useApi(getAllDevices, []);

    return (
        <main>{data && !apiLoading ? <DeviceTable tableData={data} /> : <div className={'loader'}>Loading</div>}</main>
    );
};

export default HomePage;

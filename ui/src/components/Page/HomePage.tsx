import React from 'react';
import useApi from '../../hooks/useApi';
import { getAllDevices } from '../../services/api';
import DeviceTable from '../Table/DeviceTable';

const HomePage = () => {
    const { apiLoading, data } = useApi(getAllDevices, []);

    return (
        <main>
            {data && <DeviceTable tableData={data} />}
            {apiLoading && <div className="loader">Loading</div>}
            {!apiLoading && !data && <div className="error">Unable to get records</div>}
        </main>
    );
};

export default HomePage;

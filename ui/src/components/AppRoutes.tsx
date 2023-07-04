import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Page/HomePage';
import ErrorPage from './Page/ErrorPage';

import './main.scss';

export const ROUTE_PATHS = {
    ROOT: '/',
    ERROR: '/error'
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTE_PATHS.ROOT} key={'home-page'} element={<HomePage />} />
            <Route path={ROUTE_PATHS.ERROR} key={'error-page'} element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;

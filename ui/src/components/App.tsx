import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import '../i18n/config';
import 'react-datepicker/dist/react-datepicker.css';

import ErrorContextProvider from './Context/ErrorContextProvider';

const App = () => {
    return (
        <Router basename="/">
            <ErrorContextProvider>
                <AppRoutes />
            </ErrorContextProvider>
        </Router>
    );
};

export default App;

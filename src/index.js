import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import ProviderWithHistory from './Components/Auth0/ProviderWithHistory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter >
        <Provider store={store}>
            <ProviderWithHistory>
                <App />
            </ProviderWithHistory>
        </Provider>
    </BrowserRouter>
);

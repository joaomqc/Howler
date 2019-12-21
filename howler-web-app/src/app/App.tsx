import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import PrivateRoute from 'shared/PrivateRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login'>
                    <LoginPage />
                </Route>
                <PrivateRoute exact path="/">
                    <ChatPage />
                </PrivateRoute>
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';

import MainPage from './main/mainPage.js';
import NavBarContainer from './navBar/navBarContainer';

const App = () => (
    <>
        <NavBarContainer />
        <Switch>
            {/*
            Routes:
            - Splash page
            - Sign up page
            - Log in page
            - User home page
                - categories (Tasks assigned to you, your projects, your tasks, settings, sign out)
            */}
            <AuthRoute exact path='/' component={MainPage} />
            {/* <AuthRoute exact path='/signup' component={SignUpFormContainer} />
            <AuthRoute exact path='/login' component={LogInFormContainer} /> */}
        </Switch>
    </>
);

export default App;

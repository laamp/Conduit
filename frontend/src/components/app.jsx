import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';

import { MainPage } from './main/mainPage';
import NavBarContainer from './navBar/navBarContainer';
import SignupFormContainer from './session/signupFormContainer';
import LoginFormContainer from './session/loginFormContainer';
import ProjectShowContainer from './project/projectShowContainer';
import ProjectFormContainer from './project/projectFormContainer';

const App = () => (
    <>
        <NavBarContainer />
        <div className='content'>
            <Switch>
                <AuthRoute exact path='/' component={MainPage} /> {/* splash page */}
                <AuthRoute exact path='/signup' component={SignupFormContainer} /> {/* component for signing up */}
                <AuthRoute exact path='/login' component={LoginFormContainer} /> {/* component for logging in */}
            </Switch>
            <ProtectedRoute path='/project/:projectId' component={ProjectShowContainer} /> {/* render the selected project */}
            <ProtectedRoute path='/project/new' component={ProjectFormContainer} /> {/* render the create new project modal */}
        </div>
    </>
);

export default App;

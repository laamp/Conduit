import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';

import { SplashPage } from './splash/splashPage';
import NavBarContainer from './navBar/navBarContainer';
import SignupFormContainer from './session/signupFormContainer';
import LoginFormContainer from './session/loginFormContainer';
import ProjectShowContainer from './project/projectShowContainer';
import ProjectFormContainer from './project/projectFormContainer';

import { oauthSignin } from '../util/sessionApiUtil';
window.oauth = oauthSignin;

const App = () => (
    <>
        <NavBarContainer />
        <div className='content'>
            <Switch>
                <AuthRoute exact path='/' component={SplashPage} />
                <AuthRoute exact path='/signup' component={SignupFormContainer} />
                <AuthRoute exact path='/login' component={LoginFormContainer} />
            </Switch>
            <ProtectedRoute path='/project/:projectId' component={ProjectShowContainer} /> {/* render the selected project */}
        </div>
        <ProtectedRoute path='/project/new' component={ProjectFormContainer} /> {/* render the create new project modal */}
    </>
);

export default App;

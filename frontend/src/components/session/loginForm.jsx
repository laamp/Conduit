import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            googleSignedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGuestLogin = this.handleGuestLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);

        window.signOut = this.signOut;
    }

    onSuccess(googleUser) {
        window.alert('on success fired');
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log(googleUser.getAuthResponse().id_token);
    }

    signOut() {
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log('google user signed out');
        });
    }

    componentDidMount() {
        // setup google sign in button
        let clientIdStr = '';
        if (process.env.NODE_ENV === 'development') {
            clientIdStr = '903376099996-dmrrs41nfqdtjs0m7203s6k22rk4gset.apps.googleusercontent.com';
        } else {
            clientIdStr = '903376099996-3o4sf17arjo33tn9kjnloatac6i595ka.apps.googleusercontent.com';
        }

        window.gapi.load('auth2', () => {
            this.auth2 = window.gapi.auth2.init({
                clientId: clientIdStr
            });

            window.gapi.load('signin2', () => {
                var opts = {
                    width: 275,
                    height: 37,
                    onsuccess: this.onSuccess.bind(this)
                };
                window.gapi.signin2.render('google-button', opts);
            });
        });
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user);
    }

    handleGuestLogin() {
        this.props.guestLogin();
    }

    renderErrors() {
        return (
            <ul className='session-errors'>
                {Object.keys(this.props.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.props.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className='session-form login'>
                <h1>Login to continue</h1>
                <button onClick={this.handleGuestLogin}>Guest Login</button>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type='email'
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder='Email (you@email.com)'
                        />
                        <br />
                        <input type='password'
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder='Password'
                        />
                        <br />
                        <input type='submit' value='Login' />
                        {this.renderErrors()}
                    </div>
                </form>

                <div id="google-button">Google Sign In</div>

            </div>
        );
    }
}

export default withRouter(LoginForm);

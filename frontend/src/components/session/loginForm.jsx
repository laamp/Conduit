import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGuestLogin = this.handleGuestLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
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
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        );
    }
}

export default withRouter(LoginForm);

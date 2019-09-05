import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors });
    }

    // componentDidUpdate() {
    //     if (this.props.signedIn) {
    //         this.props.history.push('/login');
    //     }
    // }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(newUser, this.props.history);
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type='text'
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder='Your name'
                        />
                        <br />
                        <input type='text'
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
                        <input type='password'
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder='Confirm password'
                        />
                        <br />
                        <input type='submit' value='Signup' />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);

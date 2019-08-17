import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                // add nav bar links here
                <div>
                    <p>You are currently logged in</p>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
                <h1>Conduit</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);

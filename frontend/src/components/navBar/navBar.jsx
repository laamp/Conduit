import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };

        this.renderProjects = this.renderProjects.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.fetchUsersProjects(this.props.currentUser.id);
        }
    }

    componentDidUpdate() {
        // if (this.props.loggedIn) {
        //     this.props.fetchUsersProjects(this.props.currentUser.id);
        // }
    }

    renderProjects() {
        if (this.props.projects.length > 0) {
            return (
                <ul>
                    {Object.keys(this.props.projects).map((project, i) => (
                        <li key={`project-${i}`}>
                            <p>{project}</p>
                        </li>
                    ))}
                </ul>
            );
        }
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
                    {this.renderProjects()}
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

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProjectTile } from './projectTile/projectTile';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bFetchedProjects: false,
            projects: {}
        };

        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn &&
            this.props.currentUser !== undefined &&
            !this.state.bFetchedProjects) {
            this.props.fetchUsersProjects(this.props.currentUser.id)
                .then(res => {
                    this.setState({
                        bFetchedProjects: true,
                        projects: this.props.projects
                    });
                });
        }
    }

    componentDidUpdate() {
        if (this.props.loggedIn &&
            this.props.currentUser !== undefined &&
            !this.state.bFetchedProjects) {
            this.props.fetchUsersProjects(this.props.currentUser.id)
                .then(res => {
                    this.setState({
                        bFetchedProjects: true,
                        projects: this.props.projects
                    });
                });
        }
    }

    renderProjects() {
        if (Object.entries(this.state.projects).length > 0 && this.state.projects.constructor === Object) {
            return (
                <ul>
                    {Object.keys(this.state.projects).map((projectId, i) => (
                        <li key={`project-${i}`}
                            onClick={() => {
                                this.props.setCurrentProject(projectId);
                            }}>
                            <ProjectTile project={this.state.projects[projectId]} />
                        </li>
                    ))}
                </ul>
            );
        }
    }

    logoutUser(e) {
        e.preventDefault();
        this.setState({
            bFetchedProjects: false,
            projects: {}
        });
        this.props.clearProjects();
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

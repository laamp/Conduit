import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProjectTile } from './projectTile/projectTile';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bFetchedProjects: false,
            projects: {},
            bFetchedInboxTasks: false,
            inboxCount: 0,
            lastUser: null
        };

        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
        // actions to dispatch on user log in
        if (this.props.loggedIn && this.props.currentUser) {
            // check if the same user is logged in
            if (this.state.lastUser !== this.props.currentUser.id) {
                this.setState({
                    bFetchedProjects: false,
                    bFetchedInboxTasks: false,
                    lastUser: this.props.currentUser.id
                });
            }

            if (!this.state.bFetchedProjects) {
                this.setState({ bFetchedProjects: true });
                this.props.fetchUsersProjects(this.props.currentUser.id)
                    .then(res => this.setState({ projects: this.props.projects }));
            }

            if (!this.state.bFetchedInboxTasks) {
                this.setState({ bFetchedInboxTasks: true });
                this.props.fetchInboxTasks(this.props.currentUser.id)
                    .then(res => {
                        this.setState({ inboxCount: Object.entries(this.props.inboxTasks).length });
                    });
            }
        }
    }

    componentDidUpdate() {
        // actions to dispatch on user log in
        if (this.props.loggedIn && this.props.currentUser) {
            // check if the same user is logged in
            if (this.state.lastUser !== this.props.currentUser.id) {
                this.setState({
                    bFetchedProjects: false,
                    bFetchedInboxTasks: false,
                    lastUser: this.props.currentUser.id
                });
            }

            if (!this.state.bFetchedProjects) {
                this.setState({ bFetchedProjects: true });
                this.props.fetchUsersProjects(this.props.currentUser.id)
                    .then(res => this.setState({ projects: this.props.projects }));
            }

            if (!this.state.bFetchedInboxTasks) {
                this.setState({ bFetchedInboxTasks: true });
                this.props.fetchInboxTasks(this.props.currentUser.id)
                    .then(res => {
                        this.setState({ inboxCount: Object.entries(this.props.inboxTasks).length });
                    });
            }
        }
    }

    renderProjects() {
        if (Object.entries(this.state.projects).length > 0 && this.state.projects.constructor === Object) {
            return (
                <ul>
                    <li key={`project-inbox`}
                        onClick={() => this.props.setCurrentProject('inbox')}>
                        <p>Inbox</p>
                        <p>{this.state.inboxCount}</p>
                    </li>

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

        return (
            <ul>
                <li key={`project-inbox`}
                    onClick={() => this.props.setCurrentProject('inbox')}>
                    <p>Inbox</p>
                    <p>{this.state.inboxCount}</p>
                </li>
            </ul>
        );
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

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

    componentDidUpdate(prevProps) {
        // actions to dispatch on user log in
        if (this.props.loggedIn && this.props.currentUser) {
            // check if the same user is logged in
            if (this.state.lastUser !== this.props.currentUser.id) {
                this.setState({
                    bFetchedInboxTasks: false,
                    bFetchedProjects: false,
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

    navToProject(projId) {
        this.props.history.push(`/project/${projId}`);
        this.props.setCurrentProject(projId);
    }

    logoutUser(e) {
        e.preventDefault();
        this.setState({
            bFetchedProjects: false,
            projects: {},
            bFetchedInboxTasks: false,
            inboxCount: 0,
            lastUser: null
        });
        this.props.clearProjects();
        this.props.clearTasks();
        this.props.logout();
        this.props.history.push('/');
    }

    renderProjects() {
        return (
            <ul>
                <li key={`project-inbox`}
                    onClick={() => this.navToProject('inbox')}>
                    <p>Inbox</p>
                    <p>{this.state.inboxCount}</p>
                </li>

                {Object.entries(this.props.projects).length > 0 && this.props.projects.constructor === Object ?
                    Object.keys(this.props.projects).map((projectId, i) => (
                        <li key={`project-${i}`}
                            onClick={() => this.navToProject(projectId)}>
                            <ProjectTile project={this.props.projects[projectId]} />
                        </li>
                    )) : null}
            </ul>
        );
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                // add nav bar links here
                <div>
                    <p>You are currently logged in</p>
                    {this.renderProjects()}
                    <button onClick={this.logoutUser}>Logout</button>
                    <button onClick={() => this.props.history.push('/project/new')}>Create Project</button>
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

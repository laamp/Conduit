import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProjectTile } from './projectTile/projectTile';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contextMenuVisible: false,
            contextMenuX: 0,
            contextMenuY: 0,
            projectId: null
        };

        document.addEventListener('click', e => {
            if (e.target.classList.contains('cm-delete-project')) {
                this.props.deleteProject(this.state.projectId);
            }

            this.setState({
                contextMenuVisible: false,
                contextMenuX: 0,
                contextMenuY: 0,
                projectId: null
            });
        });

        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
        // actions to dispatch on user log in
        if (this.props.loggedIn && this.props.currentUser) {
            this.props.fetchUsersProjects(this.props.currentUser.id);
            this.props.fetchAllTasks(this.props.currentUser.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.currentUser && this.props.currentUser) {
            this.props.fetchAllTasks(this.props.currentUser.id);
            this.props.fetchUsersProjects(this.props.currentUser.id);
        }
    }

    navToProject(projId) {
        this.props.history.push(`/project/${projId}`);
        this.props.setCurrentProject(projId);
    }

    logoutUser(e) {
        e.preventDefault();

        this.props.clearProjects();
        this.props.clearTasks();
        this.props.logout();
        this.props.history.push('/');
    }

    deleteProject(projectId) {
        this.props.deleteProject(projectId);
    }

    projectContextMenu(projectId) {
        return e => {
            e.preventDefault();
            e.persist();

            this.setState({
                contextMenuVisible: true,
                contextMenuX: e.clientX,
                contextMenuY: e.clientY,
                projectId
            });
        };
    }

    renderProjects() {
        return (
            <ul>
                <li key={`project-inbox`}
                    onClick={() => this.navToProject('inbox')}
                    className='project-tile'>
                    <p>Inbox</p>
                    <p>{Object.values(this.props.tasks).filter(task => !task.project).length}</p>
                </li>

                {Object.keys(this.props.projects).length > 0 && this.props.projects.constructor === Object ?
                    Object.keys(this.props.projects).map((projectId, i) => {
                        let tasks = Object.values(this.props.tasks).filter(task => task.project === projectId);

                        return (
                            <li key={`project-${i}`}>
                                <div
                                    onClick={() => this.navToProject(projectId)}
                                    onContextMenu={this.projectContextMenu(projectId)}>
                                    <ProjectTile
                                        project={this.props.projects[projectId]}
                                        numOfTasks={tasks.length}
                                    />
                                </div>
                                <button onClick={() => this.deleteProject(projectId)}>Delete</button>
                            </li>
                        );
                    }) : null}
            </ul>
        );
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                // add nav bar links here
                <div>
                    <p className='username'>Welcome, {this.props.currentUser.name}</p>
                    {this.renderProjects()}
                    <button onClick={this.logoutUser}>Logout</button>
                    <button onClick={() => this.props.history.push('/project/new')}>Create Project</button>
                </div>
            );
        } else {
            return (
                <div className='login-links'>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        let contextMenu;
        if (this.state.contextMenuVisible) {
            contextMenu = <div className='cm-custom'>
                <ul>
                    <li className='cm-delete-project'>Delete this project</li>
                </ul>
            </div>;
        } else {
            contextMenu = null;
        }

        return (
            <div className='navbar'>
                <Link to={'/'}>
                    <h1>Conduit</h1>
                </Link>
                {this.getLinks()}
                {contextMenu}
            </div>
        );
    }
}

export default withRouter(NavBar);

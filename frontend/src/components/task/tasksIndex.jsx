import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inboxTasks: {},
            bUpdatedInbox: false,
            lastProjectId: null,
            currentProjectTasks: {}
        };
    }

    componentDidMount() {
        this.props.fetchInboxTasks(this.props.currentUserId)
            .then(res => this.setState({ inboxTasks: this.props.inboxTasks }));

        if (this.props.currentProjectId) {
            this.props.fetchProjectTasks(this.props.currentProjectId)
                .then(res => this.setState({ currentProjectTasks: this.props.tasks }));
        }

        let lsProjId = localStorage.getItem('currentProject');
        if (lsProjId) {
            this.setState({ lastProjectId: lsProjId });
            this.props.fetchProjectTasks(lsProjId)
                .then(res => this.setState({ currentProjectTasks: this.props.tasks }));
        }
    }

    componentDidUpdate() {
        if (!this.state.bUpdatedInbox) {
            this.setState({
                inboxTasks: this.props.inboxTasks,
                bUpdatedInbox: true
            });
        }

        if (this.props.currentProjectId !== this.state.lastProjectId &&
            this.props.currentProjectId !== null &&
            this.props.currentProjectId !== undefined) {
            this.setState({ lastProjectId: this.props.currentProjectId });

            this.props.fetchProjectTasks(this.props.currentProjectId)
                .then(res => this.setState({ currentProjectTasks: this.props.tasks }));

            this.props.fetchInboxTasks(this.props.currentUserId)
                .then(res => this.setState({ inboxTasks: this.props.inboxTasks }));
        }
    }

    render() {
        if (this.props.projectId === 'inbox') {
            return (
                <ul>
                    {Object.entries(this.props.inboxTasks).map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task[1].title}</p>
                            <p>{task[1].description}</p>
                        </li>
                    ))}
                </ul>
            );
        }

        if (this.state.currentProjectTasks) {
            return (
                <ul>
                    {Object.values(this.state.currentProjectTasks).map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default withRouter(TasksIndex);

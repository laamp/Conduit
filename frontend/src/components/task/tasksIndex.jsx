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
            this.props.currentProjectId !== undefined &&
            this.props.currentProjectId !== 'inbox') {
            this.setState({ lastProjectId: this.props.currentProjectId });
            this.props.fetchProjectTasks(this.props.currentProjectId)
                .then(res => {
                    this.setState({ currentProjectTasks: this.props.tasks });
                });
        }
    }

    render() {
        if (this.props.projectId === 'inbox') {
            return (
                <ul>
                    {Object.entries(this.state.inboxTasks).map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task[1].title}</p>
                            <p>{task[1].description}</p>
                        </li>
                    ))}
                </ul>
            );
        }

        if (!this.props.projectId) {
            return (
                <h1>no project to display right now</h1>
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

        return (
            <h1>ERROR: nothing to display right now</h1>
        );
    }
}

export default withRouter(TasksIndex);

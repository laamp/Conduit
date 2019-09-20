import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        if (this.props.currentProjectId &&
            this.props.currentProjectId !== 'inbox') {
            this.props.fetchProjectTasks(this.props.currentProjectId);
        }

        if (this.props.currentUserId) {
            this.props.fetchInboxTasks(this.props.currentUserId);
        }

        let lsProjId = localStorage.getItem('currentProject');
        if (lsProjId && lsProjId !== 'inbox') {
            this.props.fetchProjectTasks(lsProjId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentProjectId !== prevProps.currentProjectId &&
            this.props.currentProjectId &&
            this.props.currentProjectId !== 'inbox') {

            this.props.fetchProjectTasks(this.props.currentProjectId);
            this.props.fetchInboxTasks(this.props.currentUserId);
        }
    }

    render() {
        if (this.props.projectId === 'inbox' && this.props.inboxTasks) {
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

        if (this.props.tasks) {
            return (
                <ul>
                    {Object.values(this.props.tasks).map((task, i) => {
                        if (task.project === this.props.projectId) {
                            return (
                                <li key={`task-${i}`}>
                                    <p>{task.title}</p>
                                    <p>{task.description}</p>
                                </li>
                            );
                        } else { return null; }
                    })}
                </ul>
            );
        }
    }
}

export default withRouter(TasksIndex);

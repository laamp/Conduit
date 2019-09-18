import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderTrigger: false
        };
    }

    componentDidMount() {
        this.props.fetchInboxTasks(this.props.currentUserId);

        if (this.props.currentProjectId) {
            this.props.fetchProjectTasks(this.props.currentProjectId);
        }

        let lsProjId = localStorage.getItem('currentProject');
        if (lsProjId) {
            this.props.fetchProjectTasks(lsProjId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentProjectId !== prevProps.currentProjectId &&
            this.props.currentProjectId !== null &&
            this.props.currentProjectId !== undefined) {

            this.props.fetchProjectTasks(this.props.currentProjectId);
            this.props.fetchInboxTasks(this.props.currentUserId);
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

        if (this.props.tasks) {
            return (
                <ul>
                    {Object.values(this.props.tasks).map((task, i) => (
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

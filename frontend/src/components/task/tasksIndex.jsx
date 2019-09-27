import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.moveTask = this.moveTask.bind(this);
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

    moveTask(task) {
        // send the task and new project id here
        return e => {
            // change the project id of the task
            let movedTask = Object.assign({}, task);
            movedTask.project = e.target.value;

            // send the updated task to the action to send it to the backend
            this.props.updateTask(movedTask);
        };
    }

    projectSelection(task) {
        if (!this.props.projects) return null;

        return (
            <select defaultValue="" onChange={this.moveTask(task)}>
                <option value="" disabled>Move to different project</option>
                {Object.values(this.props.projects).map((project, i) => {
                    if (task.project !== project._id) {
                        return (
                            <option key={`project-${i}`}
                                value={project._id}>
                                {project.title}
                            </option>
                        );
                    } else { return null; }
                })}
            </select>
        );
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
                                    {this.projectSelection(task)}
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

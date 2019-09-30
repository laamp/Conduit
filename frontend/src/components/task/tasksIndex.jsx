import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: {},
            inboxTasks: {}
        };

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

        this.setState({
            tasks: this.props.tasks,
            inboxTasks: this.props.inboxTasks
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentProjectId !== prevProps.currentProjectId &&
            this.props.currentProjectId) {

            this.props.fetchProjectTasks(this.props.currentProjectId);
            this.props.fetchInboxTasks(this.props.currentUserId);
        }

        if (this.props.tasks !== prevProps.tasks) {
            this.setState({ tasks: this.props.tasks });
        }

        if (this.props.inboxTasks !== prevProps.inboxTasks) {
            this.setState({ inboxTasks: this.props.inboxTasks });
        }
    }

    moveTask(task) {
        // send the task and new project id here
        return e => {
            // change the project id of the task
            let movedTask = Object.assign({}, task);
            movedTask.project = e.target.value;

            // send the updated task to the action to send it to the backend
            this.props.updateTask(movedTask).then(() => {
                if (this.props.currentProjectId === 'inbox') {
                    this.props.fetchInboxTasks(this.props.currentUserId);
                } else {
                    this.props.fetchProjectTasks(this.props.currentProjectId);
                }
            });
        };
    }

    projectSelection(task) {
        if (!this.props.projects) return null;

        return (
            <select defaultValue="" onChange={this.moveTask(task)}>
                <option value="" disabled>Move to different project</option>
                <option value="inbox">Move to inbox</option>
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
        if (this.props.projectId === 'inbox') {
            return (
                <ul>
                    {Object.entries(this.state.inboxTasks).map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task[1].title}</p>
                            <p>{task[1].description}</p>
                            {this.projectSelection(task[1])}
                        </li>
                    ))}
                </ul>
            );
        }

        if (this.state.tasks) {
            return (
                <ul>
                    {Object.values(this.state.tasks).map((task, i) => {
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

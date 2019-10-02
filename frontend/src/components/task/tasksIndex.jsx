import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // tasks: {},
            // inboxTasks: {},
            // trigger: false
        };

        this.moveTask = this.moveTask.bind(this);
    }

    componentDidMount() {
        // if (this.props.currentProjectId &&
        //     this.props.currentProjectId !== 'inbox') {
        //     this.props.fetchProjectTasks(this.props.currentProjectId);
        // }

        // if (this.props.currentUserId) {
        //     this.props.fetchInboxTasks(this.props.currentUserId);
        // }

        // let lsProjId = localStorage.getItem('currentProject');
        // if (lsProjId && lsProjId !== 'inbox') {
        //     this.props.fetchProjectTasks(lsProjId);
        // }

        // this.setState({
        //     tasks: this.props.tasks,
        //     inboxTasks: this.props.inboxTasks
        // });
    }

    componentDidUpdate(prevProps) {
        // if (this.props.currentProjectId !== prevProps.currentProjectId &&
        //     this.props.currentProjectId) {

        //     this.props.fetchProjectTasks(this.props.currentProjectId);
        //     this.props.fetchInboxTasks(this.props.currentUserId);
        // }

        // if (this.props.tasks !== prevProps.tasks) {
        //     this.setState({ tasks: this.props.tasks });
        // }

        // if (this.props.inboxTasks !== prevProps.inboxTasks) {
        //     this.setState({ inboxTasks: this.props.inboxTasks });
        // }
    }

    moveTask(task) {
        // send the task and new project id here
        return e => {
            // change the project id of the task
            let movedTask = Object.assign({}, task);
            movedTask.project = e.target.value;

            // send the updated task to the action to send it to the backend
            this.props.updateTask(movedTask);
            let selectors = document.querySelectorAll('.projectSelector');
            selectors.forEach(s => s.value = '');
            // .then(() => {
            //     this.props.fetchInboxTasks(this.props.currentUserId);
            //     this.props.fetchProjectTasks(this.props.currentProjectId).then(() => {
            //         this.setState({ trigger: !this.state.trigger });
            //     });
            // });
        };
    }

    projectSelection(task) {
        if (!this.props.projects) return null;

        return (
            <select className='projectSelector' defaultValue="" onChange={this.moveTask(task)}>
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
        let inboxTasks = Object.values(this.props.tasks).filter(task => !task.project);
        if (this.props.currentProjectId === 'inbox') {
            return (
                <ul>
                    {inboxTasks.map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            {this.projectSelection(task)}
                        </li>
                    ))}
                </ul>
            );
        }

        if (this.props.tasks && this.props.currentProjectId) {
            let currProjectTasks = Object.values(this.props.tasks).filter(task => {
                return task.project === this.props.currentProjectId;
            });

            return (
                <ul>
                    {currProjectTasks.map((task, i) => (
                        <li key={`task-${i}`}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            {this.projectSelection(task)}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default withRouter(TasksIndex);

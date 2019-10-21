import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.moveTask = this.moveTask.bind(this);
    }

    taskChecked(task) {
        return e => {
            let updatedTask = Object.assign({}, task);
            updatedTask.completed = e.target.checked;
            this.props.updateTask(updatedTask);
        };
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
        };
    }

    deleteTask(task) {
        this.props.deleteTask(task._id);
    }

    projectSelection(task) {
        if (!this.props.projects) return null;

        return (
            <select className='projectSelector' defaultValue="" onChange={this.moveTask(task)}>
                <option value="" disabled>Move to different project</option>

                {this.props.currentProjectId !== 'inbox' ?
                    <option value="inbox">Move to inbox</option> :
                    null}

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

    renderTasks(tasks) {
        return (
            <ul className='tasks-index'>
                {tasks.map((task, i) => {
                    let status = '';
                    let checked = '';
                    if (task.completed) {
                        status = 'completed-task';
                        checked = 'checked';
                    }

                    return (
                        <li key={`task-${i}`} className={status}>
                            <input type="checkbox" onChange={this.taskChecked(task)} checked={checked} />
                            <p className='task-title'>{task.title}</p>
                            <p className='task-description'>{task.description}</p>
                            {/* {this.projectSelection(task)} */}
                            {/* <button onClick={() => this.deleteTask(task)}>Delete</button> */}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        let inboxTasks = Object.values(this.props.tasks).filter(task => !task.project);
        if (this.props.currentProjectId === 'inbox') {
            return this.renderTasks(inboxTasks);
        }

        if (this.props.tasks && this.props.currentProjectId) {
            let currProjectTasks = Object.values(this.props.tasks).filter(task => {
                return task.project === this.props.currentProjectId;
            });
            return this.renderTasks(currProjectTasks);
        }
    }
}

export default withRouter(TasksIndex);

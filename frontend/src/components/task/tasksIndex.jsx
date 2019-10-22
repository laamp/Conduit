import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contextMenuVisible: false,
            contextMenuX: 0,
            contextMenuY: 0,
            task: null
        };

        this.resetContextMenu = () => {
            this.resetState();
        };

        document.addEventListener('click', this.resetContextMenu);
        document.addEventListener('contextmenu', this.resetContextMenu);

        this.moveTask = this.moveTask.bind(this);
    }

    resetState() {
        this.setState({
            contextMenuVisible: false,
            contextMenuX: 0,
            contextMenuY: 0,
            task: null
        });
    }

    taskChecked(task) {
        return e => {
            let updatedTask = Object.assign({}, task);
            updatedTask.completed = e.target.checked;
            this.props.updateTask(updatedTask);
        };
    }

    moveTask(task, projectId) {
        // send the task and new project id here
        // change the project id of the task
        let movedTask = Object.assign({}, task);
        movedTask.project = projectId;

        // send the updated task to the action to send it to the backend
        this.props.updateTask(movedTask);

        this.resetState();
    }

    deleteTask() {
        this.props.deleteTask(this.state.task._id);
        this.resetState();
    }

    renderOtherProjects() {
        if (!this.props.projects || !this.state.task) return null;

        return (<ul>
            {this.props.currentProjectId !== 'inbox' ?
                <li key='project-inbox'
                    onClick={() => this.moveTask(this.state.task, 'inbox')}>
                    Inbox
                </li> :
                null}
            {Object.values(this.props.projects).map((project, i) => {
                if (this.state.task.project !== project._id) {
                    return <li key={`project-${i}`}
                        onClick={() => this.moveTask(this.state.task, project._id)}>
                        {project.title}
                    </li>
                } else { return null; }
            })}
        </ul>);
    }

    taskContextMenu(task) {
        return e => {
            e.preventDefault();
            e.persist();

            this.setState({
                contextMenuVisible: true,
                contextMenuX: e.clientX,
                contextMenuY: e.clientY,
                task
            });
        };
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
                        <li key={`task-${i}`} className={status} onContextMenu={this.taskContextMenu(task)}>
                            <input type="checkbox" onChange={this.taskChecked(task)} checked={checked} />
                            <p className='task-title'>{task.title}</p>
                            <p className='task-description'>{task.description}</p>
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        let contextMenu;
        if (this.state.contextMenuVisible) {
            const position = {
                left: this.state.contextMenuX,
                top: this.state.contextMenuY
            };

            contextMenu = <div className='cm-custom' style={position}>
                <h1>this is a context menu</h1>
                {this.renderOtherProjects()}
                <div onClick={() => this.props.deleteTask(this.state.task._id)}>
                    Delete task
                </div>
            </div>;
        } else {
            contextMenu = null;
        }

        let inboxTasks = Object.values(this.props.tasks).filter(task => !task.project);
        if (this.props.currentProjectId === 'inbox') {
            return (
                <>
                    {this.renderTasks(inboxTasks)}
                    {contextMenu}
                </>
            );
        }

        if (this.props.tasks && this.props.currentProjectId) {
            let currProjectTasks = Object.values(this.props.tasks).filter(task => {
                return task.project === this.props.currentProjectId;
            });
            return (
                <>
                    {this.renderTasks(currProjectTasks)}
                    {contextMenu}
                </>
            );
        }
    }
}

export default withRouter(TasksIndex);

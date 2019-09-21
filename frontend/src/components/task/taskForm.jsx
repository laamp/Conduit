import React from 'react';
import { withRouter } from 'react-router-dom';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            dueDate: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const task = {
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.dueDate,
            project: this.props.projectId
        };

        this.props.createTask(task).then(res => {
            if (this.props.projectId !== 'inbox') {
                this.props.fetchProject(this.props.projectId);
            }
        });

        this.setState({
            title: '',
            description: '',
            dueDate: ''
        });
    }

    render() {
        return (
            <form
                onFocus={() => this.props.history.push(`/project/${this.props.projectId}/tasks/new`)}
                onBlur={() => this.props.history.push(`/project/${this.props.projectId}`)}
                onSubmit={this.handleSubmit}
            >
                <input type="text"
                    value={this.state.title}
                    onChange={this.update('title')}
                    placeholder='Enter a title'
                />
                <input type="text"
                    value={this.state.description}
                    onChange={this.update('description')}
                    placeholder='Enter a description'
                />
                <input type="date"
                    value={this.state.dueDate}
                    onChange={this.update('dueDate')}
                />
                <input type="submit" value="Create task" />
            </form>
        );
    }
}

export default withRouter(TaskForm);

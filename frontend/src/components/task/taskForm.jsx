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
            dueDate: this.state.dueDate
        };

        console.log(task);

        // this.props.createTask(task);
    }

    render() {
        return (
            <form onClick={this.handleSubmit}>
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
import React from 'react';
import { withRouter } from 'react-router-dom';

class TasksIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.projectId === 'inbox') {
            return (
                <ul>
                    <p>inbox tasks should be here</p>
                </ul>
            );
        }

        if (!this.props.projectId) {
            return (
                <h1>no project to display right now</h1>
            );
        }

        return (
            <ul>
                <p>tasks index</p>
            </ul>
        );
    }
}

export default withRouter(TasksIndex);

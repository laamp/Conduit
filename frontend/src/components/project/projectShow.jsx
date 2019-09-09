import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProjectId: localStorage.getItem('currentProject')
        };
    }

    componentDidMount() {
        if (!this.state.currentProjectId) {
            this.setState({
                currentProjectId: 'inbox'
            });
        }
    }

    componentDidUpdate() {
        if (this.state.currentProjectId !== localStorage.getItem('currentProject') &&
            localStorage.getItem('currentProject')) {
            this.setState({
                currentProjectId: localStorage.getItem('currentProject')
            });
        }
    }

    projectRender() {
        if (this.state.currentProjectId === 'inbox') {
            return (
                <h1>Inbox</h1>
            );
        }

        if (!this.props.projects[this.state.currentProjectId]) {
            return null;
        }

        return (
            <>
                <h1>{this.props.projects[this.state.currentProjectId].title}</h1>
                {/* display list of all tasks here */}
                {/* Tasks Index Component */}
            </>
        );
    }

    render() {
        return (
            <>
                {this.projectRender()}
            </>
        );
    }
}

export default withRouter(ProjectShow);

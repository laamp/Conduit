import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProjectId: localStorage.getItem('currentProject'),
            thisProject: null
        };
    }

    componentDidMount() {
        console.log('project show did mount');
        if (this.state.currentProjectId) {
            this.setState({
                thisProject: this.props.projects[this.state.currentProjectId]
            });
        }
    }

    componentDidUpdate() {
        console.log('project show did update');
    }

    // make render project function

    render() {
        if (this.state.thisProject) {
            return (
                <h1>{this.state.thisProject.title}</h1>
            );
        } else {
            return (
                <h1>No Project Found</h1>
            );
        }
    }
}

export default withRouter(ProjectShow);

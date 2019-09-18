import React from 'react';
import { withRouter } from 'react-router-dom';
import TasksIndexContainer from '../task/tasksIndexContainer';
import TaskFormContainer from '../task/taskFormContainer';

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

        if (localStorage.getItem('currentProject')) {
            this.setState({
                currentProjectId: localStorage.getItem('currentProject')
            });
        }
    }

    componentDidUpdate(prevProps) {
        const oldUrl = prevProps.match.params.projectId;
        const newUrl = this.props.match.params.projectId;
        if (newUrl !== oldUrl && newUrl !== 'new') {
            this.props.setCurrentProject(newUrl);
        }

        if (this.state.currentProjectId !== localStorage.getItem('currentProject') &&
            localStorage.getItem('currentProject')) {
            this.setState({
                currentProjectId: localStorage.getItem('currentProject')
            });
        }
    }

    projectRender() {
        if (this.props.projects[this.state.currentProjectId] ||
            this.state.currentProjectId === 'inbox') {

            return (<>
                {this.state.currentProjectId === 'inbox' ? <h1>Inbox</h1> :
                    <h1>{this.props.projects[this.state.currentProjectId].title}</h1>}

                <TaskFormContainer projectId={this.state.currentProjectId} />
                <TasksIndexContainer projectId={this.state.currentProjectId} />
            </>);
        }
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

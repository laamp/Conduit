import React from 'react';
import { withRouter } from 'react-router-dom';
import TasksIndexContainer from '../task/tasksIndexContainer';
import TaskFormContainer from '../task/taskFormContainer';

class ProjectShow extends React.Component {
    componentDidMount() {
        let localStorageProjId = localStorage.getItem('currentProject');
        if (localStorageProjId) {
            this.props.setCurrentProject(localStorageProjId);
        } else {
            this.props.setCurrentProject('inbox');
        }
    }

    projectRender() {
        if (this.props.projects[this.props.currentProjectId] ||
            this.props.currentProjectId === 'inbox') {

            return (<>
                {this.props.currentProjectId === 'inbox' ? <h1>Inbox</h1> :
                    <h1>{this.props.projects[this.props.currentProjectId].title}</h1>}

                <TaskFormContainer />
                <TasksIndexContainer />
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

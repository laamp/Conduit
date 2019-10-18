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

            return (
                <div className='project-show'>
                    {this.props.currentProjectId === 'inbox' ? <h1>Inbox</h1> :
                        <>
                            <h1>{this.props.projects[this.props.currentProjectId].title}</h1>
                            <h2>{this.props.projects[this.props.currentProjectId].description}</h2>
                        </>
                    }

                    <TaskFormContainer />
                    <TasksIndexContainer />
                </div>
            );
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

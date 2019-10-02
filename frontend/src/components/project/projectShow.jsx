import React from 'react';
import { withRouter } from 'react-router-dom';
import TasksIndexContainer from '../task/tasksIndexContainer';
import TaskFormContainer from '../task/taskFormContainer';

class ProjectShow extends React.Component {
    // constructor(props) {
    // super(props);

    // this.state = {
    //     currentProjectId: 'inbox'
    // };
    // }

    componentDidMount() {
        // if (!this.state.currentProjectId) {
        //     this.setState({
        //         currentProjectId: 'inbox'
        //     });
        // }

        let localStorageProjId = localStorage.getItem('currentProject');
        if (localStorageProjId) {
            this.props.setCurrentProject(localStorageProjId);
        } else {
            this.props.setCurrentProject('inbox');
        }
    }

    componentDidUpdate() {
        // if (this.state.currentProjectId !== localStorage.getItem('currentProject') &&
        //     localStorage.getItem('currentProject')) {
        //     this.setState({
        //         currentProjectId: localStorage.getItem('currentProject')
        //     });
        // }
    }

    projectRender() {
        if (this.props.projects[this.props.currentProject] ||
            this.props.currentProject === 'inbox') {

            return (<>
                {this.props.currentProject === 'inbox' ? <h1>Inbox</h1> :
                    <h1>{this.props.projects[this.props.currentProject].title}</h1>}

                <TaskFormContainer />
                <TasksIndexContainer />
            </>);
            // remember these components were receiving current project id
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

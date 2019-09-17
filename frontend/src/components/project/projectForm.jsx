import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
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

        const newProject = {
            title: this.state.title,
            description: this.state.description
        };

        this.props.createNewProject(newProject)
            .then(({ project }) => {
                console.log(project);
                this.props.history.push(`/project/${Object.keys(project.data)[0]}`);
                this.props.setCurrentProject(Object.keys(project.data)[0]);
            });
        this.setState({ title: '', description: '' });
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text' id='title'
                    value={this.state.title}
                    onChange={this.update('title')}
                    placeholder='Enter a title for your project'
                />
                <input
                    type='text' id='description'
                    value={this.state.description}
                    onChange={this.update('description')}
                    placeholder='Describe your project'
                />
                <input type='submit' value='Create project' />
            </form>
        );
    }

    render() {
        return (<>
            {this.renderForm()}
        </>);
    }
}

export default withRouter(ProjectForm);

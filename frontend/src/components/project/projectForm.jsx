import React from 'react';
import { withRouter } from 'react-router-dom';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        };

        this.escapeEvent = e => {
            if (e.keyCode === 27) {
                this.cancelNewProject(e);
                document.removeEventListener('keydown', this.escapeEvent);
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelNewProject = this.cancelNewProject.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escapeEvent);
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
                this.props.history.push(`/project/${Object.keys(project.data)[0]}`);
                this.props.setCurrentProject(Object.keys(project.data)[0]);
            });
        this.setState({ title: '', description: '' });
    }

    cancelNewProject(e) {
        e.preventDefault();

        document.removeEventListener('keydown', this.escapeEvent);
        this.props.history.goBack();
    }

    renderForm() {
        return (
            <form className="new-project-form" onSubmit={this.handleSubmit}>
                <h1>Create new project</h1>
                <input
                    className='text-input'
                    type='text' id='title'
                    value={this.state.title}
                    onChange={this.update('title')}
                    placeholder='Enter a title for your project'
                />
                <input
                    className='text-input'
                    type='text' id='description'
                    value={this.state.description}
                    onChange={this.update('description')}
                    placeholder='Describe your project'
                />
                <div>
                    <input className='button-input' type='submit' value='Create project' />
                    <button className='button-input cancel' onClick={this.cancelNewProject}>Cancel</button>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className='scrim'>
                {this.renderForm()}
            </div>
        );
    }
}

export default withRouter(ProjectForm);

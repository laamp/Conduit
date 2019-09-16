import { connect } from 'react-redux';
import { createProject } from '../../actions/projectsActions';
import ProjectForm from './projectForm';

const mapStateToProps = ({ session }) => ({
    currentUser: session.user
});

const mapDispatchToProps = dispatch => ({
    createNewProject: project => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

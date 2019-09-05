import { connect } from 'react-redux';
import { login, guestLogin, clearErrors } from '../../actions/sessionActions';
import LoginForm from './loginForm';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user,
        errors: state.errors.session
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user)),
        guestLogin: () => dispatch(guestLogin()),
        clearErrors: () => dispatch(clearErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

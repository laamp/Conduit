import { connect } from 'react-redux';
import { login, guestLogin } from '../../actions/sessionActions';
import LoginForm from './loginForm';

const mapStateToProps = state => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user)),
        guestLogin: () => dispatch(guestLogin())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

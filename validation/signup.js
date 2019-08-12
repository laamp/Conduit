const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) errors.name = 'Name is required';

    if (Validator.isEmpty(data.email)) errors.email = 'Email is required';
    if (!Validator.isEmail(data.email)) errors.email = 'Email is invalid';

    if (Validator.isEmpty(data.password)) errors.password = 'Password is required';
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if (Validator.isEmpty(data.password2)) errors.password2 = 'Must confirm password';
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
};

const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';

    if (!Validator.isLength(data.title, { min: 1, max: 50 })) {
        errors.title = 'Name must be between 1 and 50 characters';
    }
    if (Validator.isEmpty(data.title)) errors.title = 'Title is required';

    if (!Validator.isLength(data.description, { max: 256 })) {
        errors.description = 'Description must be no more than 256 characters';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
};

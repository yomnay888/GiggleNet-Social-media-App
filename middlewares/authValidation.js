import { body, validationResult } from 'express-validator';

export const validateSignup = [
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character'),
    // body('first_name')
    //     .isString()
    //     .notEmpty()
    //     .withMessage('First name is required'),
    // body('last_name')
    //     .isString()
    //     .notEmpty()
    //     .withMessage('Last name is required'),
    body('bio')
        .optional()
        .isString(),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateLogin = [
    body('usernameOrEmail')
        .notEmpty()
        .withMessage('Username or Email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
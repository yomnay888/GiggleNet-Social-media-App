import {body, validationResult} from 'express-validator';
export const  validatePostCreation=[
    body('title').optional().isString().withMessage('Title must be a string'),
    body('content').notEmpty().isString().withMessage('Content must be a string'),
]
import multer from 'multer';
import path from 'path';
import { 
    PROFILE_PICTURE_SIZE_LIMIT, 
    POST_MEDIA_SIZE_LIMIT
} from '../constants/mediaUploadLimits.js';

function uniqueFileName(originalname) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueSuffix + path.extname(originalname);
}

// Storage configuration for profile pictures
const profilePictureStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/profile-pictures/');
    },
    filename: (request, file, cb) => {
        cb(null, uniqueFileName(file.originalname));
    }
});

const postMediaStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/posts-media/');
    },
    filename: (request, file, cb) => {
        cb(null, uniqueFileName(file.originalname));
    }
});


const fileFilter = (req, file, cb) => {
    // Define allowed file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/mov', 'video/avi',  'video/mkv'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only images and videos are allowed.'), false); // Reject file
    }
};

// Middleware for uploading profile pictures
const uploadProfilePicture = multer({
    storage: profilePictureStorage,
    fileFilter: fileFilter,
    limits: { fileSize: PROFILE_PICTURE_SIZE_LIMIT }  // Set size limit
});


const uploadPostMedia = multer({
    storage: postMediaStorage,
    fileFilter: fileFilter,
    limits: { fileSize: POST_MEDIA_SIZE_LIMIT}  // Set size limit
});


export { uploadProfilePicture, uploadPostMedia };
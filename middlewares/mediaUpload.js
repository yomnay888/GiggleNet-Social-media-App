import multer from 'multer';
import path from 'path';
import { 
    PROFILE_PIC_SIZE_LIMIT, 
    POST_PHOTO_SIZE_LIMIT, 
    POST_VIDEO_SIZE_LIMIT 
} from '../constants/mediaUploadLimits.js';

function uniqueFileName(originalname) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueSuffix + path.extname(originalname);
}

// Storage configuration for profile pictures
const profilePicStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/profile-pictures/');
    },
    filename: (request, file, cb) => {
        cb(null, uniqueFileName(file.originalname));
    }
});

// Storage configuration for post photos
const postPhotoStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/post-photos/');
    },
    filename: (request, file, cb) => {
        cb(null, uniqueFileName(file.originalname));
    }
});

// Storage configuration for post videos
const postVideoStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/post-videos/');
    },
    filename: (request, file, cb) => {
        cb(null, uniqueFileName(file.originalname));
    }
});

// Middleware for uploading profile pictures
const uploadProfilePicture = multer({
    storage: profilePicStorage,
    limits: { fileSize: PROFILE_PIC_SIZE_LIMIT }  // Set size limit
});

// Middleware for uploading post photos
const uploadPostPhoto = multer({
    storage: postPhotoStorage,
    limits: { fileSize: POST_PHOTO_SIZE_LIMIT }  // Set size limit
});


// Middleware for uploading post videos
const uploadPostVideo = multer({
    storage: postVideoStorage,
    limits: { fileSize: POST_VIDEO_SIZE_LIMIT }  // Set size limit
});

export { uploadProfilePicture, uploadPostPhoto, uploadPostVideo };

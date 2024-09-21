import { useState, useRef, useEffect } from 'react';
import './ProfilePictureUpload.css';
const userJson = localStorage.getItem('user');
const currentLoggedUser = JSON.parse(userJson);
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

function ProfilePictureUpload({ profilePictureUrl, isSameUser }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(`${import.meta.env.VITE_BACKEND_BASE_URL}${profilePictureUrl}`);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePicture(fileUrl);
        }
    };
    useEffect(() => {
        setProfilePicture(`${import.meta.env.VITE_BACKEND_BASE_URL}${profilePictureUrl}`);
    }, [profilePictureUrl]);
    
    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}upload-profile-picture`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`,
                },
            });

            const data = await response.json();
            if (response.ok && data.filePath) {
                const imageUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}${data.filePath}`;
                setProfilePicture(imageUrl);
                setSelectedFile(null);                  
                    const userJson = localStorage.getItem('user');
                    const user = JSON.parse(userJson);
                    user.profilePicture = data.filePath;
                    localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload profile picture.');
        }
    };

    const handleImageClick = () => {
        if (isSameUser) {
            fileInputRef.current.click(); 
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setProfilePicture(`${import.meta.env.VITE_BACKEND_BASE_URL}${currentLoggedUser.profilePicture}`);
        fileInputRef.current.value = '';
    };

    useEffect(() => {
        return () => {
            if (profilePicture && profilePicture.startsWith('blob:')) {
                URL.revokeObjectURL(profilePicture);
            }
        };
    }, [profilePicture]);

    return (
        <div className='profilePicture-container'>
            {isSameUser && (
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                />
            )}
            <img 
                src={profilePicture}
                alt="Profile" 
                onClick={handleImageClick} 
                style={{ cursor: isSameUser ? 'pointer' : 'default' }} 
            />
            {selectedFile && isSameUser && (
                <div>
                    <button className='save-button' onClick={handleUpload}>✔️</button>
                    <button className='cancel-button' onClick={handleCancel}>❌</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePictureUpload;

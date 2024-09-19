import { useState, useRef, useEffect } from 'react';
import "./ProfilePictureUpload.css";

const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson);
let latestProfilePicture= `${import.meta.env.VITE_BACKEND_BASE_URL}${user.profilePicture}`;

function ProfilePictureUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Create a URL for the selected file for immediate preview
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePicture(fileUrl);
        }
    };
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleUpload = async () => {
        if (!selectedFile) return;

        // Create a FormData object
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            // Send the form data with fetch
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}upload-profile-picture`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            });
            const data = await response.json();
            if (response.ok && data.filePath) {
                const imageUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}${data.filePath}`;
                latestProfilePicture= imageUrl;
                setProfilePicture(imageUrl); // Update with the URL returned from the server
                setSelectedFile(null); // Reset selected file after upload
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
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setProfilePicture(null);
        fileInputRef.current.value = ''; // Reset the file input
    };

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Clean up the object URL when component unmounts or file changes
    useEffect(() => {
        return () => {
            if (profilePicture && profilePicture.startsWith('blob:')) {
                URL.revokeObjectURL(profilePicture);
            }
        };
    }, [profilePicture]);

    return (
        <div className='profilePicture-container'>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
            />
            <img 
                src={profilePicture||latestProfilePicture} 
                alt="Profile" 
                onClick={handleImageClick} 
                style={{ cursor: 'pointer' }} 
            />
            {selectedFile && (
                <div>
                    <button className='save-button' onClick={handleUpload}>Save</button>
                    <button className='cancel-button' onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePictureUpload;

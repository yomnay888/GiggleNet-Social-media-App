import { useEffect, useState } from 'react';

function ProfilePictureUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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
                    'Authorization': `Bearer ${getCookie('token')}`  // Add your authentication token here
                }
            });
            const data = await response.json();
            console.log(import.meta.env.VITE_BACKEND_BASE_URL+data.filePath);
            setProfilePicture(import.meta.env.VITE_BACKEND_BASE_URL+data.filePath)
            if (response.ok && data.success) {
                alert('Profile picture updated successfully!');
                // Handle the response if needed
            } else {
                alert('Failed to upload profile picture.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload profile picture.');
        }
    };

    return (
        <div>
            <h2>Upload Profile Picture</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {profilePicture && <img src={profilePicture} alt="Profile" />}
        </div>
    );
};

export default ProfilePictureUpload;

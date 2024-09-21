import React, { useState, useEffect, useRef } from 'react';
import './ProfileBio.css';

function ProfileBio({ profileBio, isSameUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [bio, setBio] = useState(profileBio ||(isSameUser?'Add your Bio':''));
    const latestBio = useRef(bio);
    const maxLength = 100;

    useEffect(() => {
        setBio(profileBio ||(isSameUser?'Add your Bio':''));
    }, [isSameUser, profileBio]);

    const handleBioEditToggle = () => {
        setBio(latestBio.current);
        setIsEditing(!isEditing);
        setErrorMessage(''); // Clear any existing error messages
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`); 
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleBioSave = async () => {
        setErrorMessage('');
        // if (bio.length === 0 || bio.length > maxLength) {
        //     setErrorMessage('Bio must be between 1 and 100 characters.');
        //     return;
        // }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}update-bio`, {
                method: 'POST',
                body: JSON.stringify({ bio }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            });

            if (response.ok) {
                latestBio.current = bio;
                handleBioEditToggle(); 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to save bio.');
            }
        } catch (error) {
            console.error('Error saving bio:', error);
            setErrorMessage('Failed to save bio.');
        }
    };

    return (
        <div className="profile-Bio">
            <div className="bio">
                {isEditing ? (
                    <div className='bio-edit'>
                        <textarea
                            className="bio-input"
                            value={bio}
                            onChange={handleBioChange}
                        />
                        <div className={bio.length > maxLength ? "error-message" : "char-count"}>
                            {maxLength - bio.length} characters remaining
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>} 
                        <div className="buttons">
                            <button className="save-button" onClick={handleBioSave} disabled={bio.length > maxLength}>✔️</button>
                            <button className="cancel-button" onClick={handleBioEditToggle}>❌</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>{bio}</p>
                        {isSameUser && (
                            <i
                                className="fa-solid fa-pen-nib fa-lg edit-icon"
                                onClick={handleBioEditToggle}
                            ></i>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileBio;

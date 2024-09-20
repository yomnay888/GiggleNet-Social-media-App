import React, { useState } from 'react';
import './ProfileInfo.css';
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson);
function ProfileInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user.bio || 'Add your Bio'); // Initialize with current bio
    const handleBioEditToggle = () => {
        setIsEditing(!isEditing);
    };


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };


    const handleBioSave = () => {
       try{
        fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}update-bio`, {
            method: 'POST',
            body: JSON.stringify({ bio }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            }
        });
       }catch(error){
              console.error('Error saving bio:', error);
              alert('Failed to save bio.');
       }
        const updatedUser = { ...user, bio };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
    };
    return (
        <div className="profile-info">
            <h2>{user.name}</h2>
            <div className="bio">
                {isEditing ? (
                    <div className='bio-edit'>
                        <input
                            type="text"
                            className="bio-input"
                            value={bio}
                            onChange={handleBioChange}
                        />
                        <div className="buttons">
                          <button className="save-button" onClick={handleBioSave}>Save</button>
                          <button className="cancel-button" onClick={handleBioEditToggle}>Cancel</button>
                        </div>
             
                    </div>
                ) : (
                    <>
                        <p>{bio}</p>
                        <i
                            className="fa-solid fa-pen-nib fa-lg edit-icon"
                            onClick={handleBioEditToggle}
                        ></i>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileInfo;

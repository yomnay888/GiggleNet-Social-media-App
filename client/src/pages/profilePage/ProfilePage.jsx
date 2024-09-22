import "./ProfilePage.css";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import ProfileBio from "../../components/profileBio/ProfileBio";
import Friends from "../../components/friends/Friends";
import Feed from "../../components/feed/Feed";
import { getUserById } from "../../services/userRequests.js";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FriendshipInfo from "../../components/friendshipInfo/FriendshipInfo.jsx";

const userJson = localStorage.getItem("user");
const currentLoggedUser = JSON.parse(userJson);

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSameUser, setIsSameUser] = useState(false); // Use state for isSameUser
  const mainRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
        setIsSameUser(userData.userId === currentLoggedUser.userId); // Set isSameUser in state
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { profilePicture, name, bio } = user || {}; // Destructure user data

  return (
    <div className="profile-page">
      {user && (
        <>
          <div className="top-section">
            <ProfilePictureUpload profilePictureUrl={profilePicture} isSameUser={isSameUser} />
            <div className="friendship-info">
            <div className="name">
              <h2>{name}</h2>
            </div>
              {!isSameUser && <FriendshipInfo userId={user.userId} />}
            </div>  
          </div>
          <div className="bottom-section">
            <div className="side-section">
              <div className="bio-section">
                <h2>Bio</h2>
                <ProfileBio profileBio={bio} isSameUser={isSameUser} />
              </div>
              <div className="friends-section">
                <h2>Friends</h2>
                <Friends userId={user.userId} />
              </div>
            </div>
            <div ref={mainRef} className="posts-section">
              <h2>Your Posts</h2>
              <Feed className="feed-display" mainRef={mainRef} isSameUser={isSameUser} userId={user.userId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;

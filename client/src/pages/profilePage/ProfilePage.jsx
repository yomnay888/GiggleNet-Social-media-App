import "./ProfilePage.css";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import ProfileBio from "../../components/profileBio/ProfileBio";
import Friends from "../../components/friends/Friends";
import Feed from "../../components/feed/Feed";
import { getUserById } from "../../services/userRequests.js";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const userJson = localStorage.getItem("user");
const currentLoggedUser = JSON.parse(userJson);

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const mainRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    fetchUser();
  }, [userId]);

  const isSameUser = user ? user.userId === currentLoggedUser.userId : false;

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="profile-page">
      {user && (
        <>
          <div className="top-section">
            <ProfilePictureUpload profilePictureUrl={user.profilePicture} isSameUser={isSameUser} />
            <div className="name">
              <h2>{user.name}</h2>
            </div>
          </div>
          <div className="bottom-section">
            <div className="side-section">
              <div className="bio-section">
                <h2>Bio</h2>
                <ProfileBio profileBio={user.bio} isSameUser={isSameUser} />
              </div>
              <div className="friends-section">
                <h2>Friends</h2>
                <Friends userId={user.userId} />
              </div>
            </div>
            <div ref={mainRef} className="posts-section">
              <h2>Your Posts</h2>
              {/* <Feed className="feed-display" mainRef={mainRef} isUserFeed={true} /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;

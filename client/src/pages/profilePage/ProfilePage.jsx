import "./ProfilePage.css";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import Friends from "../../components/friends/Friends";
import Feed from "../../components/feed/Feed";
import { useRef } from "react";

function ProfilePage() {
    const mainRef = useRef(null);
    const isUserFeed = true;
    return (
        <div className="profile-page">
            <div className="top-section">
                <ProfilePictureUpload />
                <ProfileInfo />
            </div>

            <div className="friends-section">
                <h2>Friends</h2>
                <Friends />
            </div>
            <div ref={mainRef} className="posts-section">
                <h2>Your Posts</h2>
                <Feed mainRef={mainRef} isUserFeed={isUserFeed}/>
            </div>
        </div>
    );
}

export default ProfilePage;

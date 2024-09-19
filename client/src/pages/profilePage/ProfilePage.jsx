import "./ProfilePage.css";
import ProfilePictureUpload from "../../components/ProfilePictureUpload/ProfilePictureUpload";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import Friends from "../../components/friends/Friends";
import UserPosts from "../../components/userPosts/UserPosts";

function ProfilePage() {
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

            <div className="posts-section">
                <h2>Your Posts</h2>
                <UserPosts />
            </div>
        </div>
    );
}

export default ProfilePage;

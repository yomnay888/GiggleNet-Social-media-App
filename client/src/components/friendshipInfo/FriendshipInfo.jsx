import { useState, useEffect } from "react";
import "./FriendshipInfo.css";
import {
  fetchFriendshipInfo,
  addFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  Unfriend,
} from "../../services/friendsRequests";

const userJson = localStorage.getItem("user");
const user = JSON.parse(userJson);

function FriendshipInfo({ userId }) {
  const [status, setStatus] = useState(null);
  const [initiatorId, setInitiatorId] = useState(null);
  const [error, setError] = useState(null);
  const [showUnfriend, setShowUnfriend] = useState(null);

  useEffect(() => {
    getFriendshipInfo(userId);
  }, [userId]);

  async function getFriendshipInfo(userId) {
    try {
      const info = await fetchFriendshipInfo(userId);
      setStatus(info.status);
      setInitiatorId(info.initiatorId);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    }
  }

  const handleCancelRequest = async () => {
    try {
      await cancelFriendRequest(userId);
      setStatus("none"); // Assuming 'none' indicates no friendship
      setInitiatorId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddFriendRequest = async () => {
    try {
      await addFriendRequest(userId);
      setStatus("pending");
      setInitiatorId(user.userId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await acceptFriendRequest(userId);
      setStatus("accepted");
      setInitiatorId(null); // Reset initiator since friendship is accepted
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnfriendRequest = async () => {
    try {
      await Unfriend(userId);
      setStatus("none"); // Set to 'none' if they are unfriended
      setInitiatorId(null);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleToggleUnfriend = () => {
    setShowUnfriend((prev) => !prev);
  };

  const renderFriendshipStatus = () => {
    switch (status) {
      case "accepted":
        return (
          <>
            <div className="dropdown-box">
            {showUnfriend && (
                <div className="unfriend-dropdown">
                  <button onClick={handleUnfriendRequest}>
                    Unfriend <i className="fa-solid fa-user-minus"></i>
                  </button>
                </div>
              )}
              <button onClick={handleToggleUnfriend}>
                Friends <i className="fa-solid fa-user-group"></i>
              </button>
            </div>
          </>
        );
      case "pending":
        return initiatorId === user.userId ? (
          <button onClick={handleCancelRequest}>
            Cancel Request <i class="fa-solid fa-user-xmark"></i>
          </button>
        ) : (
          <>
            <button onClick={handleAcceptRequest}>
              Accept Request <i class="fa-solid fa-user-check"></i>
            </button>
            <button onClick={handleCancelRequest}>
              Decline Request <i class="fa-solid fa-user-large-slash"></i>
            </button>
          </>
        );
      default:
        return (
          <button onClick={handleAddFriendRequest}>
            Add Friend <i class="fa-solid fa-user-plus"></i>
          </button>
        );
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="friendship-info">
      <div className="friendship-status">{renderFriendshipStatus()}</div>
    </div>
  );
}

export default FriendshipInfo;

import { useEffect, useState, useRef, useContext } from "react";
import "./ComposePost.css";

import { createPost } from "../../services/postRequests";

function ComposePost(props) {
    const [content, setContent] = useState(""); // To track the text content of the post
    const [mediaFiles, setMediaFiles] = useState([]); // To track selected media files
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    // Ref to store object URLs
    const fileURLsRef = useRef([]);
    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);
    // Handle file selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array

        setMediaFiles(prevFiles => {
            // Create new URLs for new files and update refs
            const newURLs = files.map(file => URL.createObjectURL(file));
            fileURLsRef.current = [...fileURLsRef.current, ...newURLs];
            return [...prevFiles, ...files];
        });
        
    };

    const handleFileDelete = (index) => {
        if(index === 0) setCurrentMediaIndex(0);
        else handleShowPrevImage();

        setMediaFiles(prevFiles => {
            // Revoke URL for the deleted file
            URL.revokeObjectURL(fileURLsRef.current[index]);
            // Update the ref array
            fileURLsRef.current = fileURLsRef.current.filter((_, i) => i !== index);
            return prevFiles.filter((_, i) => i !== index);
        });
    };

    // Show the previous image
    function handleShowPrevImage() {
        let newIndex = currentMediaIndex - 1;
        if (newIndex < 0) newIndex = mediaFiles.length - 1;

        setCurrentMediaIndex(newIndex);
    }

    // Show the next image
    function handleShowNextImage() {
        let newIndex = (currentMediaIndex + 1) % mediaFiles.length;
        setCurrentMediaIndex(newIndex);
    }

    // Render the selected files (images and videos)
    function renderMediaFiles() {
        if (mediaFiles.length === 0)
            return null;

        const file = mediaFiles[currentMediaIndex];
        const fileURL = fileURLsRef.current[currentMediaIndex]; // Use URL from ref

        return (
            <>
                <div 
                    className="media-content"
                >
                    {
                        file.type.startsWith("image") ?
                            <img src={fileURL} alt="Selected media" /> :
                            <video src={fileURL} controls />
                    }
                    <i
                        className="fa-solid fa-x delete-icon"
                        style={{top: mediaFiles.length > 1 ? "4%" : "1%"}} // Adjust the position based on the number of files
                        onClick={() => handleFileDelete(currentMediaIndex)}
                    ></i>
                </div>

                {mediaFiles.length > 1 &&
                    <div className="media-control">
                        <i
                            className="fa-solid fa-angle-left left-arrow"
                            onClick={handleShowPrevImage}
                        ></i>
                        <p>{`${currentMediaIndex + 1}/${mediaFiles.length}`}</p>
                        <i
                            className="fa-solid fa-angle-right right-arrow"
                            onClick={handleShowNextImage}
                        ></i>

                    </div>
                }
            </>
        )
    };

    // Handle posting content and media files (to send to backend)
    async function handlePost() {
        const post = await createPost(content, mediaFiles);
        //  handle the return of the new Post
        props.handleAddPost(post);
        setContent(""); // Clear the content
        setMediaFiles([]); // Clear the media files
    };

    return (
        <div className={`compose-section ${mediaFiles.length > 1 ? `const-compose-height` : ``}`}>
            <div className="compose-upper-section">
                <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}${user.profilePicture}`} alt="" />
                <div className="text-and-options">
                    <textarea
                        placeholder="Write a comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)} // Track content
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scrollHeight
                        }}
                    />
                    <div className="options">
                        <input
                            id="media-upload"
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            style={{ display: "none" }} // Hide the default input
                            onChange={handleFileChange} // Handle file selection
                        />
                        {/* Custom button to trigger the file input */}
                        <label htmlFor="media-upload" className="custom-file-upload">
                            Photo/Video
                        </label>
                        <button 
                            onClick={handlePost}
                            className={`${content.trim() === "" && mediaFiles.length === 0 ? `disabled` : `active`}`}
                        >Post</button>
                    </div>
                </div>
            </div>
            <div className="media-container">
                {renderMediaFiles()}
            </div>
        </div>
    );
}

export default ComposePost;
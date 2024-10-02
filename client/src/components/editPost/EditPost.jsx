import { useEffect, useState, useContext } from "react";
import "./EditPost.css"; // Reusing the same CSS
import { PostContext } from "../../contexts/PostContext";
import ConfirmAction from "../confirmAction/ConfirmAction";

function EditPost(props) {
    const [content, setContent] = useState(props.postContent || ""); // Initial content from props
    const [mediaFiles, setMediaFiles] = useState([]); // Track both new and existing media
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    
    const {handleUpdatePost} = useContext(PostContext);
    
    const [showConfirmEdit, setShowConfirmEdit] = useState(false);
    function toggleShowConfirmEdit() {
        setShowConfirmEdit(prevState => !prevState);
    }

    // Load existing media files when component mounts
    useEffect(() => {
        if (props.postMedia) {
            const existingMedia = props.postMedia.map(media => ({
                type: "existing", // Mark this as an existing file
                file: null, // No file object for existing media
                url: `${import.meta.env.VITE_BACKEND_BASE_URL}${media.path}`,
                path: media.path,
                mediaType: media.mediaType
            }));
            setMediaFiles(existingMedia);
        }
    }, []);

    // Handle file selection for new media
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newMedia = files.map(file => ({
            type: "new", // Mark this as a new file
            file, // Store the original file object
            url: URL.createObjectURL(file), // Create URL for display
            path: null, // No path for new media
            mediaType: file.type
        }));

        setMediaFiles(prevFiles => [...prevFiles, ...newMedia]);
    };

    // Handle file deletion
    const handleFileDelete = (index) => {
        console.log("index", index)
        if(index === 0) setCurrentMediaIndex(0);
        else handleShowPrevImage();

        const fileToDelete = mediaFiles[index];


        if (fileToDelete.type === "new") {
            // Revoke the URL for new media
            URL.revokeObjectURL(fileToDelete.url);
        }

        setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

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


    // Render media files (existing and new)
    function renderMediaFiles() {
        if (mediaFiles.length === 0) return null;

        const file = mediaFiles[currentMediaIndex];
        console.log("file", file)

        return (
            <>
                <div className="edit-media-content">
                    {
                        file.mediaType.startsWith("image") ?
                            <img  src={file.url} alt="Selected media" /> :
                            <video src={file.url} controls />
                    }
                    <i
                        className="fa-solid fa-x edit-delete-icon"
                        style={{ top: mediaFiles.length > 1 ? "4%" : "1%" }} // Adjust the position based on the number of files
                        onClick={() => handleFileDelete(currentMediaIndex)}
                    ></i>
                </div>

                {mediaFiles.length > 1 &&
                    <div className="edit-media-control">
                           <i
                            className="fa-solid fa-angle-left edit-left-arrow"
                            onClick={handleShowPrevImage}
                        ></i>
                        <p>{`${currentMediaIndex + 1}/${mediaFiles.length}`}</p>
                        <i
                            className="fa-solid fa-angle-right edit-right-arrow"
                            onClick={handleShowNextImage}
                        ></i>
                    </div>
                }
            </>
        );
    }


    return (
        <div className="edit-post-overlay">
            <div className={`edit-section ${mediaFiles.length > 1 ? `edit-section--const-height` : ``}`}>
                <div className="edit-title">
                    <p >Edit Post</p>    
                    <i 
                        className="fa-solid fa-x"
                        onClick={toggleShowConfirmEdit}            
                    ></i>
                </div>
                {/* <hr /> */}
                <div className="edit-upper-section">
                    <img src={`${import.meta.env.VITE_BACKEND_BASE_URL}uploads/profile-pictures/default-profile-picture.png`} alt="" />
                    <div className="edit-text-and-options">
                        <textarea
                            placeholder="Edit your post..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)} // Track content
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on scrollHeight
                            }}
                        />
                        <div className="edit-options">
                            <input
                                id="edit-media-upload"
                                type="file"
                                accept="image/*, video/*"
                                multiple
                                style={{ display: "none" }} // Hide the default input
                                onChange={handleFileChange} // Handle file selection
                            />
                            {/* Custom button to trigger the file input */}
                            <label htmlFor="edit-media-upload" className="edit-custom-file-upload">
                                Photo/Video
                            </label>
                            <button
                                // onClick={handlePost}
                                className={`${content.trim() === "" && mediaFiles.length === 0 ? `edit-disabled` : `edit-active`}`}
                                onClick={() => {
                                    handleUpdatePost(props.postId, content, mediaFiles);
                                    props.toggleShowEdit();
                                }}
                            >Save</button>
                        </div>
                    </div>
                </div>
                <div className="edit-media-container">
                    {renderMediaFiles()}
                </div>
            </div>
            
            {
                showConfirmEdit &&
                <ConfirmAction
                    header="Unsaved Changes"
                    message="Changes you made will not be saved. Are you sure you want to discard?"
                    confirmText="Discard"
                    cancelText="Keep Editing"
                    handleConfirm={() => {
                        toggleShowConfirmEdit();
                        props.toggleShowEdit();
                    }}
                    handleCancel={toggleShowConfirmEdit}
                />
            }

        </div>
    );
}

export default EditPost;
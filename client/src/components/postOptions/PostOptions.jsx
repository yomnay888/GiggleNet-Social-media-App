import "./PostOptions.css";
import { useState } from 'react';
import ConfirmAction from '../confirmAction/ConfirmAction';


function PostOptions({ deletePost, toggleShowEdit }) {
    const [showOptions, setshowOptions] = useState(false);
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);


    function toggleShowOptions() {
        setshowOptions(prevState => !prevState);
    }

    function toggleShowConfirmDelete() {
        setshowConfirmDelete(prevState => !prevState);
    }

    return (
        <>
            <i
                className="fa-solid fa-ellipsis options-icon"
                onClick={toggleShowOptions}
            >
            </i>
            {showOptions &&

                <div className="options-container">
                    <i className="fa-solid fa-caret-up caret-icon"></i>
                    <div
                        className="option edit-option"
                        onClick={() => {
                            toggleShowEdit();
                            toggleShowOptions();
                        }}
                    >
                        <i className="fa-solid fa-pen edit-icon"></i>
                        <p>Edit Post</p>
                    </div>
                    <div
                        className="option delete-option"
                        onClick={() => {
                            toggleShowConfirmDelete();
                            toggleShowOptions();

                        }}
                    >
                        <i className="fa-solid fa-trash trash-icon"></i>
                        <p>Delete Post</p>
                    </div>

                </div>
            }

            {showConfirmDelete &&
                <ConfirmAction
                    header="Delete Post"
                    message="Are you sure you want to delete this post?"
                    confirmText="Delete"
                    cancelText="Cancel"
                    handleConfirm={deletePost}
                    handleCancel={toggleShowConfirmDelete}
                />
            }

        </>
    );


}


export default PostOptions;
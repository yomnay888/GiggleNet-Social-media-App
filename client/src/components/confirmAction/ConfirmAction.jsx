import './ConfirmAction.css'; // Import the CSS file

const ConfirmAction = ({ header, message, confirmText, cancelText, handleConfirm, handleCancel }) => {
    return (
        <div className="confirm-overlay">
            <div className="confirm-container">
                <div className="confirm-header">
                    <h3>{header}</h3>
                    <i className="fa-solid fa-x close-icon" onClick={handleCancel} ></i>
                </div>
                <p>{message}</p>
                <div className="button-container">
                    <button className="cancel-button" onClick={handleCancel}>{cancelText}</button>
                    <button className="confirm-button" onClick={handleConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAction;

// the gray color of this component is the most accurate color out of all the components
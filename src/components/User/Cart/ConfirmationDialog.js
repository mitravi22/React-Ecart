import React from 'react'
import "./ConfirmationDialog.css"

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog">
            <div className="message">{message}</div>
            <div className="buttons">
                <button className="confirm-btn" onClick={onConfirm}>
                    Yes
                </button>
                <button className="cancel-btn" onClick={onCancel}>
                    No
                </button>
            </div>
        </div>
    )
}

export default ConfirmationDialog
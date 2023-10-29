
import React from 'react';
import './LogoutConfirmation.css'

const LogoutConfirmation = ({ onCancel, onConfirm } : any) => {
  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to exit?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default LogoutConfirmation;
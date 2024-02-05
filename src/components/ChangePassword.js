import React, { forwardRef } from "react";

// This is a presentational component that displays the form to change the user's password. It has input fields to enter the current password, the new password, and the confirm new password. It also has a save button to submit the form and a close button to close the form.
export default forwardRef(function ChangePassword(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
      <form onSubmit={props.handleSubmit}>
        <input
          id="changeName"
          name="currentPassword"
          placeholder="Current Password"
          type="password"
          onChange={props.getCurrent}
        ></input>
        <input
          id="changeName"
          name="newPassword"
          placeholder="New Password"
          type="password"
          onChange={props.getNewPass}
        ></input>
        <input
          id="changeName"
          name="confirmNewPassword"
          placeholder="Confirm Password"
          type="password"
          onChange={props.getConfirmPass}
        ></input>
        <button className="saveBtn" type="submit">
          Save
        </button>
        <button
          className="closeEditBtn"
          type="button"
          onClick={props.handleClosePassword}
        >
          Close
        </button>
      </form>
    </div>
  );
});

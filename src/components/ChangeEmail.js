import React, { forwardRef } from "react";

// This is a presentational component that displays the form to change the user's email. It has an input field to enter the new email, a save button to submit the form, and a close button to close the form.
export default forwardRef(function ChangeEmail(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
      <form onSubmit={props.handleSubmit}>
        <input
          id="changeName"
          name="changeEmail"
          placeholder="Change Email"
          type="email"
          onChange={props.getValue}
        ></input>
        <button className="saveBtn" type="submit">
          Save
        </button>
        <button
          className="closeEditBtn"
          type="button"
          onClick={props.handleCloseEmail}
        >
          Close
        </button>
      </form>
    </div>
  );
});

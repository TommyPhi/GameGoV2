import React, { forwardRef } from "react";

// This is a presentational component that displays the form to change the user's username. It has an input field to enter the new name, a save button to submit the form, and a close button to close the form.
export default forwardRef(function ChangeName(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
      <form onSubmit={props.handleSubmit}>
        <input
          id="changeName"
          name="changeName"
          placeholder="Change Username"
          type="text"
          onChange={props.getValue}
        ></input>
        <button className="saveBtn" type="submit">
          Save
        </button>
        <button
          className="closeEditBtn"
          type="button"
          onClick={props.handleCloseName}
        >
          Close
        </button>
      </form>
    </div>
  );
});

import React, {forwardRef} from 'react'

export default forwardRef(function ChangePassword(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
    <form onSubmit={props.handleSubmit}>
      <input id='changeName' name='currentPassword' placeholder='Current Password' type='password' onChange={props.getCurrent}></input>
      <input id='changeName' name='newPassword' placeholder='New Password' type='password' onChange={props.getNewPass}></input>
      <input id='changeName' name='confirmNewPassword' placeholder='Confirm Password' type='password' onChange={props.getConfirmPass}></input>
      <button className="saveBtn" type='submit'>Save</button>
      <button className="closeEditBtn" type='button' onClick={props.handleClosePassword}>Close</button>
    </form>
    </div>
  )
})

import React, {forwardRef} from 'react'

export default forwardRef(function ChangeEmail(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
    <form onSubmit={props.handleSubmit}>
      <input id='changeName' name='changeEmail' placeholder='Change Email' type='email' onChange={props.getValue}></input>
      <button className="saveBtn" type="submit">Save</button>
      <button className="closeEditBtn" type="button" onClick={props.handleCloseEmail}>Close</button>
    </form>  
    </div>
  )
})

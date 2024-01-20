import React, {forwardRef} from 'react'

export default forwardRef(function ChangeName(props, ref) {
  return (
    <div id="changeNameContainer" ref={ref}>
    <form onSubmit={props.handleSubmit}>
      <input id='changeName' name='changeName' placeholder='Change Username' type='text' onChange={props.getValue}></input>
      <button className="saveBtn" type="submit">Save</button>
      <button className="closeEditBtn" type="button" onClick={props.handleCloseName}>Close</button>
    </form>
    </div>
  )
})

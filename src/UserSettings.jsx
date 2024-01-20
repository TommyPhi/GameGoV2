import React, {useRef,useState} from 'react'
import Header from './components/header'
import ChangeName from './components/ChangeName'
import ChangeEmail from './components/ChangeEmail'
import ChangePassword from './components/ChangePassword'

export default function UserSettings() {

    const editNameInput = useRef(null)
    const userName = useRef(null)
    const editNameBtn = useRef(null)
    const editEmailBtn = useRef(null)
    const editEmailInput = useRef(null)
    const email = useRef(null)
    const editPasswordInput = useRef(null)
    const editPasswordBtn = useRef(null)
    const nameErrorBlock = useRef(null)
    const nameErrorMessage = useRef(null)
    const emailErrorBlock = useRef(null)
    const emailErrorMessage = useRef(null)
    const passErrorBlock = useRef(null)
    const passErrorMessage = useRef(null)
    const [id, setID] = useState(localStorage.getItem('userID'))
    const [username, setUsername] = useState('')
    const [emailValue, setEmailValue] = useState(localStorage.getItem('userEmail'))
    const [currentPassword, setcurrentPassword] = useState('');
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    function handleNameChange(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_URL + '/changeName', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            id: id,
        })
        }).then(async (response) => {
        const result = await response.json();
        if(result.error) {
            console.log(result.error)
            nameErrorBlock.current.style.display = 'block'
            nameErrorMessage.current.textContent = result.error
        } else {
            localStorage.setItem('currentUser', result.newName)
            nameErrorBlock.current.style.display = 'block'
            nameErrorBlock.current.style.backgroundColor = 'rgb(151, 223, 151)'
            nameErrorMessage.current.textContent = 'Username successfully changed!'
            setTimeout(() => {
                nameErrorBlock.current.style.display = 'none'
            }, 2000)
        }
        })
        }

    function handleEmailSubmit(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_URL + '/changeEmail', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailValue,
            id: id,
        })
        }).then(async (response) => {
        const result = await response.json();
        if(result.error) {
            console.log(result.error)
            emailErrorBlock.current.style.display = 'block'
            emailErrorMessage.current.textContent = result.error
        } else {
            localStorage.setItem('userEmail', result.newEmail)
            emailErrorBlock.current.style.display = 'block'
            emailErrorBlock.current.style.backgroundColor = 'rgb(151, 223, 151)'
            emailErrorMessage.current.textContent = 'Email successfully changed!'
            setTimeout(() => {
                emailErrorBlock.current.style.display = 'none'
            }, 2000)
        }
        })
        }

    function handlePasswordSubmit(e) {
        e.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_URL + '/changePassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPass,
            confirmPass: confirmPass,
            id: id
        })
        }).then(async (response) => {
        const result = await response.json();
        if(result.error) {
            console.log(result.error)
            passErrorBlock.current.style.display = 'block'
            passErrorMessage.current.textContent = result.error
        } else {
            passErrorBlock.current.style.display = 'block'
            passErrorBlock.current.style.backgroundColor = 'rgb(151, 223, 151)'
            passErrorMessage.current.textContent = 'Password successfully changed!'
            setTimeout(() => {
                passErrorBlock.current.style.display = 'none'
            }, 2000)
        }
        })
    }

    function handleNameEdit() {
        editNameInput.current.style.display = 'block'
        userName.current.style.display = 'none'
        editNameBtn.current.style.display = 'none'
    }

    function handleCloseName() {
        editNameInput.current.style.display = 'none'
        userName.current.style.display = 'block'
        editNameBtn.current.style.display = 'block'
        nameErrorBlock.current.style.display = 'none'
    }

    function handleEmailEdit() {
        editEmailInput.current.style.display = 'block'
        email.current.style.display = 'none'
        editEmailBtn.current.style.display = 'none'
    }

    function handleCloseEmail() {
        editEmailInput.current.style.display = 'none'
        email.current.style.display = 'block'
        editEmailBtn.current.style.display = 'block'
        emailErrorBlock.current.style.display = 'none'
    }

    function handlePasswordEdit() {
        editPasswordInput.current.style.display = 'block'
        editPasswordBtn.current.style.display = 'none'
    }

    function handleClosePassword() {
        editPasswordInput.current.style.display = 'none'
        editPasswordBtn.current.style.display = 'block'
        passErrorBlock.current.style.display = 'none'
    }


  return (
    <div>
        <Header />
        <h1 id="helloMessage">Welcome, {localStorage.getItem('currentUser').replaceAll('"', '')}</h1>
        <main id='userSettingsMain'>
            <div id='profileContainer'>
                <h1>Profile</h1>
                <div className='profileOption'>
                    <h4>Username</h4>
                    <div id='errorLoginMessage' ref={nameErrorBlock}>
                        <h4 ref={nameErrorMessage}></h4>
                    </div>
                    <div>
                        <p ref={userName}>{localStorage.getItem('currentUser').replaceAll('"', '')}</p>
                        <small ref={editNameBtn} onClick={handleNameEdit} className="editBtns">Edit</small>
                    </div>
                    <ChangeName ref={editNameInput} handleCloseName = {handleCloseName} handleSubmit={handleNameChange} getValue={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='profileOption'>
                    <h4>Email</h4>
                    <div id='errorLoginMessage' ref={emailErrorBlock}>
                        <h4 ref={emailErrorMessage}></h4>
                    </div>
                    <div>
                        <p ref={email}>{localStorage.getItem('userEmail').replaceAll('"', '')}</p>
                        <small ref={editEmailBtn} className="editBtns" onClick={handleEmailEdit}>Edit</small>
                    </div>
                    <ChangeEmail ref={editEmailInput} handleCloseEmail = {handleCloseEmail} handleSubmit={handleEmailSubmit} getValue={(e) => setEmailValue(e.target.value)}/>
                </div>
                <div className='profileOption' id='passwordSettings'>
                    <h4>Change Password</h4>
                    <div id='errorLoginMessage' ref={passErrorBlock}>
                        <h4 ref={passErrorMessage}></h4>
                    </div>
                    <small className="editBtns" ref={editPasswordBtn} onClick={handlePasswordEdit}>Change</small>
                    <ChangePassword ref={editPasswordInput} handleClosePassword={handleClosePassword} handleSubmit={handlePasswordSubmit} getCurrent={(e) => setcurrentPassword(e.target.value)} getNewPass = {(e) => setNewPass(e.target.value)} getConfirmPass = {(e) => setConfirmPass(e.target.value)}/>
                </div>
            </div>
        </main>
    </div>
  )
}

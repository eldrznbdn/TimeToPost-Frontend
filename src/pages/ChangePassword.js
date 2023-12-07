import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()
    const changePassword = () => {
        axios.put("https://time-to-post-08607128c1ae.herokuapp.com/auth/changepassword", { oldPassword: oldPassword, newPassword: newPassword }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(response => {
            if (response.data.error) {
                alert(response.data.error)
            }
        })

        navigate('/')
    }

    return (
        <div className='change__password container'>
                <h1>Change Your Password</h1>
                <input type='text' placeholder='old password' onChange={(event) => { setOldPassword(event.target.value) }} />
                <input type='text' placeholder='new password' onChange={(event) => { setNewPassword(event.target.value) }} />
                <button className='change__password-btn' onClick={() => { changePassword() }}>Save Changes</button>
        </div>
    )
}

export default ChangePassword

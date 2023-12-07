import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { setAuthState } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {

        const data = {
            username: username,
            password: password,
        }

        axios.post('https://time-to-post-08607128c1ae.herokuapp.com/auth/login', data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({
                    username:response.data.username, id: response.data.id, status: true
                  })
                console.log(response.data.username)
                navigate('/')
            }
        })
    }


    return (
        <div className='login container'>
            <h1>Login</h1>

            <div className='form__container' id='form__container'>
                <label>Username:</label>
                <input
                    type='text'
                    id="username"
                    placeholder="Enter username"
                    className='input-field'
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}
                />

                <label>Password</label>
                <input
                    type='password'
                    id="password"
                    placeholder="Enter password"
                    className='input-field'
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <button onClick={login} className='submit-button'>
                    Submit
                </button>
            </div>
        </div>
    )
}
export default Login

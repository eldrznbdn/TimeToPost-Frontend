import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
const Layout = () => {
    const { authState, setAuthState } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("accessToken")
        setAuthState({
            username: "", id: "", status: false
        })
    }
    return (
        <div className='layout'>
            <div className='layout__container container'>
                <div>
                    <Link to={'/news'}>News</Link>
                    <Link to={'/createpost'}>Create a Post</Link>
                </div>
                <Link to={`/profile/${authState.id}`}>{authState.username}</Link>
                {!authState.status ? (
                    <div className='registration__links'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/registration'}>Registration</Link>
                    </div>) : (
                    <div className='logged__in'>
                        <button className='logout__btn' onClick={logout}>Logout</button>
                    </div>

                )
                }
            </div>

        </div>
    )
}

export default Layout

import React, { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'antd'
import { AuthContext } from '../helpers/AuthContext';

const { Meta } = Card;

const Profile = () => {
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext)
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3002/auth/profile/${id}`).then((response) => {
            setUser(response.data)
        })

        axios.get(`http://localhost:3002/posts/byuserid/${id}`).then((response) => {
            setPosts(response.data)
        })

    }, [])

    const deletePost = (id) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this post? You won't be able to restore it!!!`);

        if (isConfirmed) {
            axios.delete(`http://localhost:3002/posts/${id}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(() => {
                setPosts(posts.filter((val) => {
                    return val.id !== id;
                }))
            });
        }
    }

    return (
        <div className='container'>
            <h1>User Account:{user.username}</h1>
            {authState.username === user.username &&
                    <button className='change__password-btn' onClick={() => { navigate('/changepassword') }}>Change my password</button>}
            <div className='users__post'>
                {
                    posts.map((value, key) => {
                        return (
                            <Card
                                hoverable
                                style={{ width: "40%" }}
                                cover={<img className='post__image' alt="example" src={value.srcimage} />}
                            >
                                <Meta title={value.title} description={<div style={{ height: '60px' }}>{value.text}</div>} />
                                <div className='bottom_part'>
                                    <p className='link'>Author:{value.username}</p>
                                </div>
                                {authState.username === value.username && (
                                    <button onClick={()=>{deletePost(value.id)}} className='delete__btn'>Delete Post</button>
                                )}
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile

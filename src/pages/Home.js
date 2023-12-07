import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Home = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('https://time-to-post-08607128c1ae.herokuapp.com/posts').then(response => {
            setPosts(response.data)
        })
    }, [])

    return (
        <div className='posts container'>
            <h1>{}</h1>
            {
                posts.map((value, key) => {
                    return (
                        <Card
                            hoverable
                            style={{ width: "55%" }}
                            cover={<img className='post__image' alt="example" src={value.srcimage} />}
                            onClick={() => navigate(`/post/${value.id}`)}
                        >
                            <Meta title={value.title} description={<div style={{ height: '60px' }}>{value.text}</div>} />
                            <div className='bottom_part'>
                                <p className='link'>Author:{value.username}</p>
                            </div>
                        </Card>
                    )
                })
            }

        </div>
    )
}

export default Home

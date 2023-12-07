import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';

const Post = () => {
    const navigate = useNavigate()
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { id } = useParams();
    const [post, setPost] = useState({})

    const { authState } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3002/posts/byid/${id}`).then(response => {
            setPost(response.data)
        })

        axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [])


    const addComment = () => {
        axios.post(
            "http://localhost:3002/comments",
            {
                commentBody: newComment,
                PostId: id,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then(async (response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = {
                        commentBody: newComment,
                        username: response.data.username,
                    };

                    // Update the state with the new comment
                    setComments([...comments, commentToAdd]);

                    // Fetch the updated comments
                    axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
                        setComments(response.data);
                    });

                    // Clear the input field
                    setNewComment("");
                }
            });
    };



    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3002/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        console.log(val.id)
                        console.log(id)
                        return val.id !== id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios.delete(`http://localhost:3002/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            navigate('/')
        })
    }


    return (
        <div className='container'>
            <div className='post__section'>
                <div className="post">
                    <div className="title"> {post.title} </div>
                    <p className="body">{post.text}</p>
                    <img alt='pic' className='post__img' src={post.srcimage} />
                    <p className="footer">Author:{post.username}</p>
                    {authState.username === post.username && (
                        <button onClick={() => { deletePost(post.id) }} className='delete__post-btn'>Delete Post</button>
                    )}
                </div>
                <div className='right__part'>
                    <div className="addCommentContainer">
                        <h1>Add your comment here :</h1>
                        <input
                            className='comment__input'
                            type="text"
                            placeholder="Comment..."
                            autoComplete="off"
                            value={newComment}
                            onChange={(event) => {
                                setNewComment(event.target.value);
                            }}
                        />
                        <button className='add_comment-btn' onClick={addComment}> Add Comment</button>
                    </div>

                </div>
            </div>
            <div className='comments'>
                {comments.map((comment, key) => {
                    return (
                        <div key={key} className='comment'>
                            <div className='comment__info'>
                                <p className='comment__username'>Author:{comment.username}</p>
                                <p className='comment__body'>{comment.commentBody}</p>
                            </div>
                            {authState.username === comment.username && (
                                <button onClick={() => { deleteComment(comment.id) }} className='delete__comment-btn'>Delete Comment</button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Post

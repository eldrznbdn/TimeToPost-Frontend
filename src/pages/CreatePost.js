import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
    const initialValues = {
        title: '',
        text: '',
        srcimage: ''
    }

    const onSubmit = (data) => {
        axios.post('https://time-to-post-08607128c1ae.herokuapp.com/posts', data, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                navigate('/news')
            }
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        text: Yup.string().required(),
        srcimage: Yup.string().required(),
    })
    return (
        <div className='create__post container'>
            <h1>Create a Post</h1>
            <Formik
                initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
            >
                <Form className='form'>
                    <div className='form__container'>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            className='input-field'
                        />

                        <label htmlFor="text">Text</label>
                        <Field
                            id="text"
                            name="text"
                            placeholder="Enter text"
                            className='input-field'
                        />

                       

                        <label htmlFor="srcimage">Srcimage</label>
                        <Field
                            id="srcimage"
                            name="srcimage"
                            placeholder="Enter srcimage"
                            type="text"
                            className='input-field'
                        />
                        <button type="submit" className='submit-button'>
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;

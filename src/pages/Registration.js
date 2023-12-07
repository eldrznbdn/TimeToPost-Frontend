import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = (data) => {
        axios.post('https://time-to-post-08607128c1ae.herokuapp.com/auth', data).then((response) => {
            navigate('/login')
        })
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    return (
        <div className='registration container'>
            <h1>Registration</h1>
            <Formik
                initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
            >
                <Form className='form'>
                    <div className='form__container'>
                        <label htmlFor="username">Username:</label>
                        <Field
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            className='input-field'
                        />

                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            className='input-field'
                        />
                        <button type="submit" className='submit-button'>
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration

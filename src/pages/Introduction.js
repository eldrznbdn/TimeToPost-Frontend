import React from 'react';

const Introduction = () => {
    return (
        <div className='introduction'>
            <div className="intro-container container">
                <header>
                    <h1 className='introduction__heading'>TimeToPost</h1>
                    <p className='introduction__paragraph'>Welcome to a platform where you can share your thoughts and engage with a community!</p>
                </header>

                <section>
                    <h2 className='introduction__heading'>About This Project</h2>
                    <p className='introduction__paragraph'>
                        TimeToPost is a space for users to create and share posts. To get started:
                    </p>

                    <p className='introduction__paragraph'>
                        1.Register and log in to your account.<br />
                        2.Click on the "Create a Post" button to share your thoughts.<br />
                        3.Explore posts from other users and leave comments to join the discussion.<br />
                        4.Engage with the community and make your voice heard!<br />
                    </p>

                    <p className='introduction__paragraph'>
                        Join us by registering and logging in to be part of our growing community!
                    </p>

                    <a href="/registration" className="btn">Register/Login</a>
                </section>
            </div>
        </div>
    );
};

export default Introduction;

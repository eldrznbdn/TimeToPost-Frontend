import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './components/Layout';
import CreatePost from './pages/CreatePost';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Post from './pages/Post';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import PageNotFound from './pages/PageNotFound';
import Introduction from './pages/Introduction';
function App() {
  const [authState, setAuthState] = useState({
    username: '', id: 0, status: false
  })

  useEffect(() => {
    axios.get('https://time-to-post-08607128c1ae.herokuapp.com/auth/auth', {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({
          ...authState, status: false
        })
      } else {
        setAuthState({
          username: response.data.username, id: response.data.id, status: true
        })
      }
    })

  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Layout />
          <Routes>
            <Route path='/' element={<Introduction />} />
            <Route path='/news' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

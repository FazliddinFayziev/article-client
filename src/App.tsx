import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import Single from './pages/Single/Single';
import Profile from './pages/Profile/Profile';
import AddArticle from './pages/Add/AddArticle';
import AdminPage from './pages/Admin/Admin';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Main />} />
        <Route path='/home/:articleId' element={<Single />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add' element={<AddArticle />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;

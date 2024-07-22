/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import ChatPage from './Pages/ChatPage'

const App = () => {
  return (
    <div className='app'>
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<ChatPage />} />
        </Routes>
    </div>
  )
}

export default App
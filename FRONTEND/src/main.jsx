/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import SharedContextProvider from './Context/SharedContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <SharedContextProvider>
        <App />
      </SharedContextProvider>
    </ChakraProvider>
  </BrowserRouter>
)

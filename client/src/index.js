import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import PharmaProvider from './PharmaProvider'
import './style.css'




ReactDOM.render(
        
        <BrowserRouter>
        <PharmaProvider>

        <App/>
        
        </PharmaProvider>
        </BrowserRouter>,
        
   
document.getElementById('root'))
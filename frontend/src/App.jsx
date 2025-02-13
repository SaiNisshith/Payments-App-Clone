import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { RecoilRoot } from 'recoil'

function App() {
  
  return <RecoilRoot>
  <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp></SignUp>} ></Route>
      <Route path='/signin' element={<SignIn></SignIn>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/send' element={<SendMoney></SendMoney>}></Route>
    </Routes>
  </BrowserRouter>
</RecoilRoot>
}

export default App

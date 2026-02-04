import { useState } from 'react'  
import {Routes,Route} from 'react-router'
import Signup from './components/Signup'
import Signin from './components/Signin'
import ForgotPassword from './components/ForgotPassword'
import ChangeForgotPassword from './components/ChangeForgotPassword'
import VerifyOtp from './components/Verifyotp'
import ProfilePage from './Pages/Profile'
import HomePage from './Pages/Home'
import AboutPage from './Pages/About'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/ChangeForgotPassword' element={<ChangeForgotPassword/>}/>
        <Route path='/ProfilePage' element={<ProfilePage/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/AboutPage' element={<AboutPage/>}/>
      </Routes>
    </>
  )
}

export default App
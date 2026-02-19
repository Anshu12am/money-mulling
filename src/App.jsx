import React from 'react'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import FileUpload from './pages/FileUpload'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fileUpload" element={<FileUpload />} />
      </Routes>
    </div>
  )
}

export default App

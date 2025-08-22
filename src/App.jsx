import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './app/HomePage.jsx'
import CoursesPage from './app/CoursesPage.jsx'
import CourseLearningPage from './app/CourseLearningPage.jsx'
import TestsPage from './app/TestsPage.jsx'
import TestPage from './app/TestPage.jsx'
import WalletPage from './app/WalletPage.jsx'
import ProfilePage from './app/ProfilePage.jsx'
import { Footer } from './components/ui/footer.jsx'
import { Toaster } from './components/ui/sonner.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId/learn" element={<CourseLearningPage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App

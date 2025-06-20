
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import EquipmentPage from './pages/EquipmentPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/equipment" element={
              <ProtectedRoute>
                <EquipmentPage />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/equipment" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

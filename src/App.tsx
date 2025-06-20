
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Equipamentos from './pages/Equipamentos'
import Tecnicos from './pages/Tecnicos'
import OrdensServico from './pages/OrdensServico'
import Usuarios from './pages/Usuarios'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/equipamentos" element={
              <ProtectedRoute>
                <Layout>
                  <Equipamentos />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/tecnicos" element={
              <ProtectedRoute>
                <Layout>
                  <Tecnicos />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/ordens-servico" element={
              <ProtectedRoute>
                <Layout>
                  <OrdensServico />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/usuarios" element={
              <ProtectedRoute>
                <Layout>
                  <Usuarios />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/equipment" element={<Navigate to="/equipamentos" replace />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

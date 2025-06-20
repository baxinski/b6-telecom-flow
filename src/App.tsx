
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/layout/Layout'
import AuthPage from '@/pages/AuthPage'
import Dashboard from '@/pages/Dashboard'
import Equipamentos from '@/pages/Equipamentos'
import Tecnicos from '@/pages/Tecnicos'
import OrdensServico from '@/pages/OrdensServico'
import Usuarios from '@/pages/Usuarios'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/equipamentos" element={<Equipamentos />} />
                  <Route path="/tecnicos" element={<Tecnicos />} />
                  <Route path="/ordens-servico" element={<OrdensServico />} />
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/movimentacao" element={<div className="p-6"><h1 className="text-2xl font-bold">Movimentação</h1><p>Página em desenvolvimento</p></div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

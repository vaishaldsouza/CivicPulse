import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import AdminDashBoard from './pages/AdminDashBoard';
import ReportIssue from './pages/ReportIssue';
import Nav from './components/Layout/Nav'
import Footer from './components/Layout/Footer'
import './index.css'
import { IssueProvider } from './context/IssueContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
function App() {
  return (
    <IssueProvider>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'community', 'guest']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashBoard />
              </ProtectedRoute>
            } />
            <Route path="/report-issue" element={<ReportIssue />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </IssueProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
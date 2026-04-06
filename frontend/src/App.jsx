import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import { DashboardLayout } from './components/layout/DashboardLayout';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? <DashboardLayout>{children}</DashboardLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/records" element={<PrivateRoute><Records /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
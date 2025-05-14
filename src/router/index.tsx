import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Auth/LoginPage";
import HomePage from "@/pages/HomePage";
import { useAuthStore } from "@/store/authStore";

// Exemplo de componentes de página (crie-os em src/pages)
const DashboardPage = () => <div>Dashboard (Privado)</div>;
const PromptsPage = () => <div>Prompts (Privado)</div>;
const FavoritesPage = () => <div>Favoritos (Privado)</div>;
const ProfilePage = () => <div>Perfil (Privado)</div>;
const AdminDashboardPage = () => <div>Admin Dashboard (Privado)</div>;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useAuthStore();

  if (loading) {
    return <div>Carregando...</div>; // Ou um componente de spinner
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />

      {/* Rotas Protegidas */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/prompts" element={<ProtectedRoute><PromptsPage /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Exemplo de Rota de Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      
      {/* Adicione outras rotas aqui */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;


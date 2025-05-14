import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabaseClient';

const HomePage: React.FC = () => {
  const { session, clearSession, loading } = useAuthStore();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      clearSession();
      // Navegação para /login é gerenciada pelo ProtectedRoute ou pode ser feita aqui se necessário
    }
  };

  if (loading) {
    return <div>Carregando informações da sessão...</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bem-vindo ao Meu Prompt!</h1>
      <p>Sua plataforma para gerenciar e descobrir prompts incríveis.</p>
      <div style={{ marginTop: '30px' }}>
        {session ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p>Você está logado como: {session.user?.email}</p>
            <Link to="/dashboard">
              <Button>Acessar Dashboard</Button>
            </Link>
            <Link to="/prompts">
              <Button variant="outline">Ver Prompts</Button>
            </Link>
            <Link to="/favorites">
              <Button variant="outline">Meus Favoritos</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">Meu Perfil</Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p>Faça login para começar a usar a plataforma.</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            {/* Adicionar link para SignUp se houver uma página de cadastro separada */}
            {/* <Link to="/signup"><Button variant="outline">Criar Conta</Button></Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;


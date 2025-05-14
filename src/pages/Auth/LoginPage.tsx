import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button'; // Supondo que você tenha um componente Button
import { useAuthStore } from '@/store/authStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin, // Ou a rota de callback
        },
      });
      if (error) throw error;
      setMessage('Link mágico enviado! Verifique seu e-mail.');
    } catch (error: any) {
      setMessage(`Erro ao enviar link mágico: ${error.error_description || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Exemplo de login com provedor (Google, GitHub, etc.) - descomente e ajuste se necessário
  /*
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin, // Ou a rota de callback
      },
    });
    if (error) {
      setMessage(`Erro ao logar com ${provider}: ${error.error_description || error.message}`);
      setLoading(false);
    }
  };
  */

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <Button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Enviando...' : 'Enviar Link Mágico'}
        </Button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.startsWith('Erro') ? 'red' : 'green' }}>{message}</p>}
      
      {/* Exemplo de botões para OAuth - descomente e ajuste se necessário */}
      {/* 
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button onClick={() => handleOAuthLogin('google')} disabled={loading} variant="outline">
          Login com Google
        </Button>
        <Button onClick={() => handleOAuthLogin('github')} disabled={loading} variant="outline">
          Login com GitHub
        </Button>
      </div>
      */}
      
      <p style={{ marginTop: '20px' }}>
        Não tem uma conta? <button onClick={() => navigate('/')} style={{ color: 'blue', background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}>Voltar para Home</button>
      </p>
    </div>
  );
};

export default LoginPage;


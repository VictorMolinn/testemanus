import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AppRouter from "@/router";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

function App() {
  const { setSession, setLoading } = useAuthStore();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading]);

  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;


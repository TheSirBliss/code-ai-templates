
import { useEffect, useState } from "react";
import { GeneratorForm } from "@/components/GeneratorForm";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      } else {
        setSession(session);
        setUser(session.user);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setSession(session);
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-4 absolute top-0 flex justify-between items-center">
        <span className="text-muted-foreground">{user.email}</span>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Generate Your Perfect Website with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Just describe your vision, and we'll craft a stunning landing page for you in seconds. No code, no hassle.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <GeneratorForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default Index;

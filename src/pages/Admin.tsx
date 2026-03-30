import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Conversation {
  id: string;
  user_id: string;
  messages: Array<{ role: string; content: string }>;
  created_at: string;
}

const Admin = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setConversations((data as unknown as Conversation[]) || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin – Conversations</h1>
          <Link to="/" className="text-sm text-primary hover:underline">← Back to site</Link>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && <p className="text-destructive">{error}</p>}

        {!loading && conversations.length === 0 && (
          <p className="text-muted-foreground text-center py-20">No conversations yet.</p>
        )}

        <div className="space-y-6">
          {conversations.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-mono text-muted-foreground">User: {c.user_id}</p>
                <p className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                {c.messages.map((msg, i) => (
                  <div key={i} className={`text-sm ${msg.role === "user" ? "text-foreground" : "text-primary"}`}>
                    <span className="font-semibold capitalize">{msg.role}: </span>
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

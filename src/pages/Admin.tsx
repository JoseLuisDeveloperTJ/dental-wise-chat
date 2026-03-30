import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, Users, Calendar, Eye, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// IMPORTANTE: Importamos los componentes del Sidebar que SÍ tienes en el proyecto
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

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
    const fetchConvs = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setConversations((data as unknown as Conversation[]) || []);
      }
      setLoading(false);
    };
    fetchConvs();
  }, []);

  const totalChats = conversations.length;
  const uniqueUsers = new Set(conversations.map(c => c.user_id)).size;
  const lastChatDate = conversations[0] ? new Date(conversations[0].created_at).toLocaleDateString() : "--";

  return (
    <SidebarProvider>
      {/* SIDEBAR MANUAL (Sin depender de AppSidebar externo) */}
      <Sidebar>
        <SidebarHeader className="p-4">
          <h2 className="font-bold text-xl text-primary">SmileClinic</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white dark:bg-slate-900">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-slate-200 mx-2" />
          <h1 className="text-sm font-medium text-slate-500">Dashboard administration</h1>
        </header>

        <div className="p-6 bg-[#f8fafc] dark:bg-slate-950 min-h-[calc(100vh-64px)]">
          <div className="max-w-6xl mx-auto">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Chats</CardTitle>
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                </CardHeader>
                <CardContent><div className="text-3xl font-bold">{totalChats}</div></CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Patients</CardTitle>
                  <Users className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent><div className="text-3xl font-bold">{uniqueUsers}</div></CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Last appointment</CardTitle>
                  <Calendar className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent><div className="text-2xl font-bold">{lastChatDate}</div></CardContent>
              </Card>
            </div>

            {/* TABLE */}
            {!loading && conversations.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {conversations.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          {new Date(c.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Sheet>
                            <SheetTrigger asChild>
                              <button className="p-2 text-slate-400 hover:text-primary"><Eye className="w-5 h-5" /></button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader><SheetTitle>Log de Chat</SheetTitle></SheetHeader>
                              <div className="mt-6 space-y-4">
                                {c.messages.map((m, i) => (
                                  <div key={i} className={`p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-blue-50 ml-4' : 'bg-slate-100 mr-4'}`}>
                                    <p className="font-bold text-[10px] uppercase">{m.role}</p>
                                    {m.content}
                                  </div>
                                ))}
                              </div>
                            </SheetContent>
                          </Sheet>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Admin;
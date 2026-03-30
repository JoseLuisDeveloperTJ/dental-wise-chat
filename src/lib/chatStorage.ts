import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const USER_ID_KEY = "dental_chat_user_id";
const MESSAGES_KEY = "dental_chat_messages";

export function getUserId(): string {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

export function getLocalMessages(): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function setLocalMessages(msgs: ChatMessage[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
}

export async function saveConversation(userId: string, messages: ChatMessage[]) {
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("conversations")
      .update({ messages: messages as any })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("conversations")
      .insert({ user_id: userId, messages: messages as any });
  }
}

export async function loadConversation(userId: string): Promise<ChatMessage[]> {
  const { data } = await supabase
    .from("conversations")
    .select("messages")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data?.messages && Array.isArray(data.messages)) {
    return data.messages as unknown as ChatMessage[];
  }
  return [];
}

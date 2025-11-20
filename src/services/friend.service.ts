import { supabase } from "@/lib/supabase/client";

export interface FriendRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  from_user_email?: string;
  to_user_email?: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at?: string;
}

export const friendService = {
  // Send friend request by email
  async sendFriendRequest(fromUserId: string, toUserEmail: string): Promise<void> {
    // First, get the user ID from email
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", toUserEmail)
      .single();

    if (userError) throw new Error("User not found");

    const { error } = await supabase.from("friend_requests").insert({
      from_user_id: fromUserId,
      to_user_id: userData.id,
      status: "pending",
    });

    if (error) throw error;
  },

  // Get pending friend requests for user
  async getFriendRequests(userId: string): Promise<FriendRequest[]> {
    const { data, error } = await supabase
      .from("friend_requests")
      .select(
        `
        *,
        from_user:profiles!friend_requests_from_user_id_fkey(email),
        to_user:profiles!friend_requests_to_user_id_fkey(email)
      `
      )
      .eq("to_user_id", userId)
      .eq("status", "pending");

    if (error) throw error;

    return (data || []).map((item) => ({
      ...item,
      from_user_email: item.from_user?.email,
      to_user_email: item.to_user?.email,
    }));
  },

  // Accept friend request
  async acceptFriendRequest(requestId: string): Promise<void> {
    const { error } = await supabase
      .from("friend_requests")
      .update({ status: "accepted", updated_at: new Date().toISOString() })
      .eq("id", requestId);

    if (error) throw error;
  },

  // Reject friend request
  async rejectFriendRequest(requestId: string): Promise<void> {
    const { error } = await supabase
      .from("friend_requests")
      .update({ status: "rejected", updated_at: new Date().toISOString() })
      .eq("id", requestId);

    if (error) throw error;
  },

  // Get user's friends
  async getFriends(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("friend_requests")
      .select(
        `
        from_user_id,
        to_user_id,
        from_user:profiles!friend_requests_from_user_id_fkey(email),
        to_user:profiles!friend_requests_to_user_id_fkey(email)
      `
      )
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .eq("status", "accepted");

    if (error) throw error;

    // Extract friend emails
    return (data || []).map((item: any) => {
      if (item.from_user_id === userId) {
        return item.to_user?.email;
      } else {
        return item.from_user?.email;
      }
    }).filter(Boolean) as string[];
  },
};


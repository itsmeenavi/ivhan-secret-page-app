import { supabase } from "@/lib/supabase/client";

export interface SecretMessage {
  id?: string;
  user_id: string;
  message: string;
  created_at?: string;
  updated_at?: string;
}

export const secretService = {
  // Get user's secret message
  async getSecretMessage(userId: string): Promise<SecretMessage | null> {
    const { data, error } = await supabase
      .from("secrets")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error
      throw error;
    }

    return data;
  },

  // Save or update secret message
  async saveSecretMessage(userId: string, message: string): Promise<SecretMessage> {
    const { data, error } = await supabase
      .from("secrets")
      .upsert(
        {
          user_id: userId,
          message,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get friend's secret message (if they are friends)
  async getFriendSecretMessage(
    currentUserId: string,
    friendId: string
  ): Promise<SecretMessage | null> {
    // First check if they are friends
    const areFriends = await this.checkFriendship(currentUserId, friendId);
    if (!areFriends) {
      throw new Error("403: Forbidden - Not friends");
    }

    return this.getSecretMessage(friendId);
  },

  // Check if two users are friends
  async checkFriendship(userId1: string, userId2: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("friend_requests")
      .select("*")
      .or(
        `and(from_user_id.eq.${userId1},to_user_id.eq.${userId2}),and(from_user_id.eq.${userId2},to_user_id.eq.${userId1})`
      )
      .eq("status", "accepted")
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  // Get friend's secret message by email
  async getFriendSecretMessageByEmail(
    currentUserId: string,
    friendEmail: string
  ): Promise<SecretMessage | null> {
    // First, get the friend's user ID from their email
    const { data: friendData, error: friendError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", friendEmail)
      .single();

    if (friendError) {
      throw new Error("User not found");
    }

    // Then fetch their secret message (with friendship check)
    return this.getFriendSecretMessage(currentUserId, friendData.id);
  },
};


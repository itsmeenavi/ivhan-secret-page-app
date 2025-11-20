import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Create Supabase client with service role for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function DELETE(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify the token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // Delete user's data from database tables
    // 1. Delete secrets
    await supabaseAdmin.from("secrets").delete().eq("user_id", userId);

    // 2. Delete friend requests (both sent and received)
    await supabaseAdmin
      .from("friend_requests")
      .delete()
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`);

    // 3. Delete the user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete user account" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete-account API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


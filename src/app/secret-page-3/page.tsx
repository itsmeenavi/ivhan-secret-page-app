"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import { SecretView } from "@/components/secret-view";
import { SecretForm } from "@/components/secret-form";
import { FriendManager } from "@/components/friend-manager";

export default function SecretPage3() {
  const { user, loading, signOut, deleteAccount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-linear-to-br from-emerald-50/30 via-white to-green-50/20 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-emerald-700">
              Secret Page 3
            </h1>
            <p className="text-gray-600">
              Connect with friends and share secrets
            </p>
          </div>

          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-emerald-600" />
                Secret Messages & Friends
              </CardTitle>
              <CardDescription className="text-base">
                View the secret message, create your own, and connect with friends
                to share secrets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Original Secret Message - Inherited from Page 1 */}
              <SecretView
                title="🎉 Original Secret"
                message="You've successfully accessed Secret Page 3. This is a protected area only visible to authenticated users. The secret of the universe is... patience and persistence!"
              />

              {/* User's Secret Message Form - Inherited from Page 2 */}
              <SecretForm
                labelColor="text-emerald-700"
                buttonColor="bg-emerald-600 hover:bg-emerald-700 text-white"
              />

              {/* Friend Management & Viewing - New Feature for Page 3 */}
              <FriendManager accentColor="text-emerald-700" />
            </CardContent>
            <CardFooter className="flex gap-2 flex-wrap">
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button onClick={handleDeleteAccount} variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

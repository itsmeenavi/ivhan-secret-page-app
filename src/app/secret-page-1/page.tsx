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

export default function SecretPage1() {
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
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-[hsl(var(--color-primary))]">
              Secret Page 1
            </h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Your first secret destination
            </p>
          </div>

          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                Secret Message
              </CardTitle>
              <CardDescription className="text-base">
                This is your first secret page. Only authenticated users can view
                this.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecretView
                title="🎉 Congratulations!"
                message="You've successfully accessed Secret Page 1. This is a protected area only visible to authenticated users. The secret of the universe is... patience and persistence!"
              />
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

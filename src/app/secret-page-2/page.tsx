"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Trash2, Lock, Save, Sparkles, PenLine } from "lucide-react";
import { toast } from "sonner";
import { useSecretMessage } from "@/hooks/use-secret-message";

export default function SecretPage2() {
  const { user, loading, signOut, deleteAccount } = useAuth();
  const router = useRouter();
  const { secretMessage, saveMessage, isSaving } = useSecretMessage();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (secretMessage) {
      setMessage(secretMessage);
    }
  }, [secretMessage]);

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

  const handleSaveMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    saveMessage(message);
    toast.success(
      secretMessage ? "Message updated!" : "Message saved successfully!"
    );
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
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20 p-4 md:p-8">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-[hsl(var(--color-secondary))]">
              Secret Page 2
            </h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Your personal secret vault
            </p>
          </div>

          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-[hsl(var(--color-secondary))]" />
                Secret Message
              </CardTitle>
              <CardDescription className="text-base">
                View the secret message and create or update your own personal
                secret.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Original Secret Message */}
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-8 border-2 border-emerald-200 shadow-inner">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-[hsl(var(--color-primary))] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-emerald-900">
                      🎉 Original Secret
                    </h3>
                    <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
                      You've successfully accessed Secret Page 2. This is a
                      protected area only visible to authenticated users. The
                      secret of the universe is...{" "}
                      <span className="font-semibold text-[hsl(var(--color-primary))]">
                        patience and persistence!
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* User's Secret Message */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <PenLine className="h-5 w-5 text-[hsl(var(--color-secondary))]" />
                  <Label htmlFor="secret-message" className="text-lg font-semibold">
                    Your Secret Message
                  </Label>
                </div>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Create or overwrite your personal secret message below. This will
                  be saved securely.
                </p>
                <Textarea
                  id="secret-message"
                  placeholder="Write your secret message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[150px] text-base resize-none"
                />
                <Button
                  onClick={handleSaveMessage}
                  className="w-full h-12 bg-[hsl(var(--color-secondary))] hover:bg-[hsl(var(--color-secondary))]/90"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving
                    ? "Saving..."
                    : secretMessage
                    ? "Update Secret Message"
                    : "Save Secret Message"}
                </Button>

                {secretMessage && (
                  <div className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-6 border-2 border-teal-200 shadow-inner">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-teal-900">
                      <Lock className="h-5 w-5" />
                      💎 Your Saved Secret
                    </h3>
                    <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
                      {secretMessage}
                    </p>
                  </div>
                )}
              </div>
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

"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LogOut,
  Trash2,
  Lock,
  Save,
  UserPlus,
  Check,
  X,
  Sparkles,
  Users,
  Eye,
  PenLine,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useSecretMessage, useFriendSecretMessage } from "@/hooks/use-secret-message";
import { useFriends } from "@/hooks/use-friends";

export default function SecretPage3() {
  const { user, loading, signOut, deleteAccount } = useAuth();
  const router = useRouter();
  const { secretMessage, saveMessage, isSaving } = useSecretMessage();
  const {
    friends,
    friendRequests,
    isLoading: loadingFriends,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriends();

  const [message, setMessage] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [viewingFriendEmail, setViewingFriendEmail] = useState("");
  const [attemptedView, setAttemptedView] = useState(false);

  const {
    secretMessage: friendSecret,
    error: friendSecretError,
  } = useFriendSecretMessage(attemptedView ? viewingFriendEmail : "");

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

  const handleSendFriendRequest = () => {
    if (!friendEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (friendEmail === user?.email) {
      toast.error("You cannot send a friend request to yourself!");
      return;
    }

    if (friends.includes(friendEmail)) {
      toast.error("This user is already your friend!");
      return;
    }

    const emailToSend = friendEmail;
    sendFriendRequest(emailToSend);
    toast.success(`Friend request sent to ${emailToSend}!`);
    setFriendEmail("");
  };

  const handleAcceptRequest = (requestId: string, fromEmail: string) => {
    acceptFriendRequest(requestId);
    toast.success(`You are now friends with ${fromEmail}!`);
  };

  const handleRejectRequest = (requestId: string, fromEmail: string) => {
    rejectFriendRequest(requestId);
    toast.info(`Friend request from ${fromEmail} rejected`);
  };

  const handleViewFriendMessage = () => {
    if (!viewingFriendEmail.trim()) {
      toast.error("Please enter a friend's email address");
      return;
    }

    setAttemptedView(true);
  };

  useEffect(() => {
    if (attemptedView && friendSecretError) {
      if (friendSecretError.message.includes("403")) {
        toast.error("403 Forbidden: You can only view messages from friends.");
      } else {
        toast.error("Failed to load friend's secret message");
      }
    } else if (attemptedView && friendSecret) {
      toast.success("Friend's secret loaded successfully!");
    }
  }, [attemptedView, friendSecretError, friendSecret]);

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
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-[hsl(var(--color-accent))]">
              Secret Page 3
            </h1>
            <p className="text-[hsl(var(--color-muted-foreground))]">
              Connect with friends and share secrets
            </p>
          </div>

          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-[hsl(var(--color-accent))]" />
                Secret Messages & Friends
              </CardTitle>
              <CardDescription className="text-base">
                View the secret message, create your own, and connect with friends
                to share secrets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Original Secret Message */}
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-8 border-2 border-emerald-200 shadow-inner">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-[hsl(var(--color-primary))] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-emerald-900">
                      🎉 Original Secret
                    </h3>
                    <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
                      You've successfully accessed Secret Page 3. This is a
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
                  <PenLine className="h-5 w-5 text-[hsl(var(--color-accent))]" />
                  <Label htmlFor="secret-message" className="text-lg font-semibold">
                    Your Secret Message
                  </Label>
                </div>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Create or overwrite your personal secret message.
                </p>
                <Textarea
                  id="secret-message"
                  placeholder="Write your secret message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] text-base resize-none"
                />
                <Button
                  onClick={handleSaveMessage}
                  className="w-full h-12 bg-[hsl(var(--color-accent))] hover:bg-[hsl(var(--color-accent))]/90"
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

              {/* Friend Requests */}
              {friendRequests.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-semibold">
                      Friend Requests ({friendRequests.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {friendRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50"
                      >
                        <span className="font-medium">{request.from_user_email}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleAcceptRequest(
                                request.id,
                                request.from_user_email || ""
                              )
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleRejectRequest(
                                request.id,
                                request.from_user_email || ""
                              )
                            }
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Friends */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-[hsl(var(--color-accent))]" />
                  <Label htmlFor="friend-email" className="text-lg font-semibold">
                    Add Friend
                  </Label>
                </div>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Send a friend request by entering their email address.
                </p>
                <div className="flex gap-2">
                  <Input
                    id="friend-email"
                    type="email"
                    placeholder="friend@example.com"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className="h-12"
                  />
                  <Button onClick={handleSendFriendRequest} className="h-12">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Send Request
                  </Button>
                </div>
              </div>

              {/* Friends List */}
              {friends.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold">
                      Your Friends ({friends.length})
                    </h3>
                  </div>
                  <div className="rounded-lg border-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <ul className="space-y-2">
                      {friends.map((friend) => (
                        <li
                          key={friend}
                          className="flex items-center gap-2 font-medium"
                        >
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          {friend}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* View Friend's Secret Message */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-[hsl(var(--color-secondary))]" />
                  <Label
                    htmlFor="view-friend-email"
                    className="text-lg font-semibold"
                  >
                    View Friend's Secret Message
                  </Label>
                </div>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                  Enter a friend's email to view their secret message. You must be
                  friends to view their secret.
                </p>
                <div className="flex gap-2">
                  <Input
                    id="view-friend-email"
                    type="email"
                    placeholder="friend@example.com"
                    value={viewingFriendEmail}
                    onChange={(e) => {
                      setViewingFriendEmail(e.target.value);
                      setAttemptedView(false);
                    }}
                    className="h-12"
                  />
                  <Button
                    onClick={handleViewFriendMessage}
                    variant="outline"
                    className="h-12"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>

                {attemptedView && friendSecretError && (
                  <div className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 p-6 border-2 border-red-200 shadow-inner">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-red-900">
                      <AlertCircle className="h-5 w-5" />
                      🔒 Access Denied
                    </h3>
                    <p className="text-red-700 font-mono text-sm">
                      403 Forbidden: You can only view messages from friends.
                    </p>
                  </div>
                )}

                {attemptedView && !friendSecretError && friendSecret && (
                  <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-2 border-green-200 shadow-inner">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-900">
                      <Lock className="h-5 w-5" />
                      🔓 Friend's Secret
                    </h3>
                    <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
                      {friendSecret}
                    </p>
                  </div>
                )}

                {attemptedView && !friendSecretError && !friendSecret && (
                  <div className="rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-2 border-gray-200">
                    <p className="text-[hsl(var(--color-muted-foreground))] text-center">
                      Your friend hasn't set a secret message yet.
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

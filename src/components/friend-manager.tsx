"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Check,
  X,
  Users,
  Eye,
  Lock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useFriendSecretMessage } from "@/hooks/use-secret-message";
import { useFriends } from "@/hooks/use-friends";
import { useAuth } from "@/contexts/auth-context";

interface FriendManagerProps {
  accentColor?: string;
  className?: string;
}

export function FriendManager({
  accentColor = "text-emerald-700",
  className = "",
}: FriendManagerProps) {
  const { user } = useAuth();
  const {
    friends,
    friendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriends();

  const [friendEmail, setFriendEmail] = useState("");
  const [viewingFriendEmail, setViewingFriendEmail] = useState("");
  const [attemptedView, setAttemptedView] = useState(false);

  const {
    secretMessage: friendSecret,
    error: friendSecretError,
  } = useFriendSecretMessage(attemptedView ? viewingFriendEmail : "");

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

  return (
    <div className={`space-y-8 ${className}`}>
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
                className="flex items-center justify-between p-4 border-2 rounded-lg bg-linear-to-r from-orange-50 to-amber-50"
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
          <UserPlus className={`h-5 w-5 ${accentColor}`} />
          <Label htmlFor="friend-email" className="text-lg font-semibold">
            Add Friend
          </Label>
        </div>
        <p className="text-sm text-gray-600">
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
          <div className="rounded-lg border-2 p-4 bg-linear-to-r from-green-50 to-emerald-50">
            <ul className="space-y-2">
              {friends.map((friend) => (
                <li key={friend} className="flex items-center gap-2 font-medium">
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
          <Eye className="h-5 w-5 text-emerald-600" />
          <Label htmlFor="view-friend-email" className="text-lg font-semibold">
            View Friend's Secret Message
          </Label>
        </div>
        <p className="text-sm text-gray-600">
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
          <div className="rounded-xl bg-linear-to-r from-red-50 to-rose-50 p-6 border-2 border-red-200 shadow-inner">
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
          <div className="rounded-xl bg-linear-to-br from-green-50 to-emerald-50 p-6 border-2 border-green-200 shadow-inner">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-900">
              <Lock className="h-5 w-5" />
              🔓 Friend's Secret
            </h3>
            <p className="text-gray-900 leading-relaxed">
              {friendSecret}
            </p>
          </div>
        )}

        {attemptedView && !friendSecretError && !friendSecret && (
            <div className="rounded-xl bg-linear-to-r from-gray-50 to-slate-50 p-6 border-2 border-gray-200">
            <p className="text-gray-600 text-center">
              Your friend hasn't set a secret message yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


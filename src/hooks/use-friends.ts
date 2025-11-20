import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { friendService } from "@/services/friend.service";
import { useAuth } from "@/contexts/auth-context";

export function useFriends() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends", user?.id],
    queryFn: () => friendService.getFriends(user?.id || ""),
    enabled: !!user?.id,
  });

  const { data: friendRequests = [], isLoading: loadingRequests } = useQuery({
    queryKey: ["friend-requests", user?.id],
    queryFn: () => friendService.getFriendRequests(user?.id || ""),
    enabled: !!user?.id,
  });

  const sendRequestMutation = useMutation({
    mutationFn: (email: string) =>
      friendService.sendFriendRequest(user?.id || "", email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"] });
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (requestId: string) =>
      friendService.acceptFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: (requestId: string) =>
      friendService.rejectFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests", user?.id] });
    },
  });

  return {
    friends,
    friendRequests,
    isLoading: loadingFriends || loadingRequests,
    sendFriendRequest: sendRequestMutation.mutate,
    acceptFriendRequest: acceptRequestMutation.mutate,
    rejectFriendRequest: rejectRequestMutation.mutate,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { secretService } from "@/services/secret.service";
import { useAuth } from "@/contexts/auth-context";

export function useSecretMessage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: secretMessage, isLoading } = useQuery({
    queryKey: ["secret", user?.id],
    queryFn: () => secretService.getSecretMessage(user?.id || ""),
    enabled: !!user?.id,
  });

  const saveMessageMutation = useMutation({
    mutationFn: (message: string) =>
      secretService.saveSecretMessage(user?.id || "", message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secret", user?.id] });
    },
  });

  return {
    secretMessage: secretMessage?.message || "",
    isLoading,
    saveMessage: saveMessageMutation.mutate,
    isSaving: saveMessageMutation.isPending,
  };
}

export function useFriendSecretMessage(friendEmail: string) {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["friend-secret", friendEmail],
    queryFn: async () => {
      if (!friendEmail) return null;
      return secretService.getFriendSecretMessageByEmail(user?.id || "", friendEmail);
    },
    enabled: !!user?.id && !!friendEmail,
    retry: false,
  });

  return {
    secretMessage: data?.message || "",
    isLoading,
    error: error as Error | null,
  };
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Lock, PenLine } from "lucide-react";
import { toast } from "sonner";
import { useSecretMessage } from "@/hooks/use-secret-message";

interface SecretFormProps {
  labelColor?: string;
  buttonColor?: string;
  className?: string;
}

export function SecretForm({
  labelColor = "text-[hsl(var(--color-secondary))]",
  buttonColor = "bg-[hsl(var(--color-secondary))] hover:bg-[hsl(var(--color-secondary))]/90",
  className = "",
}: SecretFormProps) {
  const { secretMessage, saveMessage, isSaving } = useSecretMessage();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (secretMessage) {
      setMessage(secretMessage);
    }
  }, [secretMessage]);

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

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <PenLine className={`h-5 w-5 ${labelColor}`} />
        <Label htmlFor="secret-message" className="text-lg font-semibold">
          Your Secret Message
        </Label>
      </div>
      <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
        Create or overwrite your personal secret message below. This will be
        saved securely.
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
        className={`w-full h-12 ${buttonColor}`}
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
        <div className="rounded-xl bg-linear-to-br from-teal-50 to-cyan-50 p-6 border-2 border-teal-200 shadow-inner">
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
  );
}


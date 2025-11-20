"use client";

import { Sparkles } from "lucide-react";

interface SecretViewProps {
  title?: string;
  message?: string;
  className?: string;
}

export function SecretView({
  title = "🎉 Original Secret",
  message = "You've successfully accessed this secret page. This is a protected area only visible to authenticated users. The secret of the universe is... patience and persistence!",
  className = "",
}: SecretViewProps) {
  return (
    <div
        className={`rounded-xl bg-linear-to-br from-emerald-50 to-green-50 p-8 border-2 border-emerald-200 shadow-inner ${className}`}
    >
      <div className="flex items-start gap-3">
        <Sparkles className="h-6 w-6 text-[hsl(var(--color-primary))] shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold mb-3 text-emerald-900">{title}</h3>
          <p className="text-[hsl(var(--color-foreground))] leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}


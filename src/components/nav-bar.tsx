"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NavBar() {
  const { user, signOut, deleteAccount } = useAuth();
  const router = useRouter();

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

  if (!user) return null;

  return (
    <nav className="border-b bg-[hsl(var(--color-card))] backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold text-[hsl(var(--color-primary))] hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <Lock className="h-6 w-6 text-[hsl(var(--color-primary))]" />
              Ivhan Salazar
            </Link>
            <div className="hidden md:flex gap-4">
              <Link
                href="/secret-page-1"
                className="text-sm font-medium hover:text-[hsl(var(--color-primary))] transition-colors"
              >
                Page 1
              </Link>
              <Link
                href="/secret-page-2"
                className="text-sm font-medium hover:text-[hsl(var(--color-primary))] transition-colors"
              >
                Page 2
              </Link>
              <Link
                href="/secret-page-3"
                className="text-sm font-medium hover:text-[hsl(var(--color-primary))] transition-colors"
              >
                Page 3
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[hsl(var(--color-muted-foreground))] hidden sm:inline">
              {user.email}
            </span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <Button onClick={handleDeleteAccount} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

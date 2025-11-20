"use client";

import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { LogOut, Trash2, Lock, Mail, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { user, loading, signIn, signUp, signOut, deleteAccount } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Welcome back!");
      } else {
        await signUp(email, password);
        toast.success("Account created successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
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
    } catch (err: any) {
      toast.error(err.message || "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--color-primary))]" />
          <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20 p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-2">
          <CardHeader className="text-center space-y-3 pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-[hsl(var(--color-primary))]">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-base">
              <span className="font-semibold text-[hsl(var(--color-foreground))]">
                {user.email}
              </span>
              <br />
              Choose a secret page to explore
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Link href="/secret-page-1">
                <Button
                  className="w-full h-16 text-lg font-semibold bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary))]/90 shadow-lg transition-all hover:scale-105"
                  size="lg"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Secret Page 1
                </Button>
              </Link>
              <Link href="/secret-page-2">
                <Button
                  className="w-full h-16 text-lg font-semibold bg-[hsl(var(--color-secondary))] hover:bg-[hsl(var(--color-secondary))]/90 shadow-lg transition-all hover:scale-105"
                  size="lg"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Secret Page 2
                </Button>
              </Link>
              <Link href="/secret-page-3">
                <Button
                  className="w-full h-16 text-lg font-semibold bg-[hsl(var(--color-accent))] hover:bg-[hsl(var(--color-accent))]/90 shadow-lg transition-all hover:scale-105"
                  size="lg"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Secret Page 3
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-center pt-6">
            <Button onClick={handleSignOut} variant="outline" size="lg">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              size="lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-[hsl(var(--color-primary))]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-base">
            {isLogin
              ? "Enter your credentials to access your secret pages"
              : "Sign up to start your secret journey"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-5 w-5 text-[hsl(var(--color-muted-foreground))]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                  Must be at least 6 characters
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary))]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Sign Up"}</>
              )}
            </Button>
            <div className="text-center text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail("");
                  setPassword("");
                }}
                className="text-[hsl(var(--color-primary))] font-semibold underline-offset-4 hover:underline"
                disabled={isSubmitting}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

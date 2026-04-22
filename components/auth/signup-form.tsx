"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        role,
        location,
      },
      {
        onSuccess: () => {
          if (role === "farmer") {
            router.push("/dashboard");
          } else {
            router.push("/marketplace");
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <span className="text-2xl">🌱</span>
        </div>
        <CardTitle className="text-2xl">Join HarvestHub</CardTitle>
        <CardDescription>
          Create your account to start trading crops
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-4">
            {/* Role Selector */}
            <div className="grid gap-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                    role === "farmer"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">👨‍🌾</span>
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                    role === "buyer"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">🛒</span>
                  Buyer
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="Ramesh Kumar"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="ramesh@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-location">Location</Label>
              <Input
                id="signup-location"
                type="text"
                placeholder="Patna, Bihar"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

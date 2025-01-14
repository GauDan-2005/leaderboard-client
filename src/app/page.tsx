"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const USER = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (USER.email) {
      router.push("/home");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Leaderboard App
          </CardTitle>
          <CardDescription className="text-center">
            Track points and compete with friends!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Join our community, earn points, and climb the leaderboard.
            Challenge your friends and see who can reach the top!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              Create your account and join the community.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              Participate in activities and challenges to earn points.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Climb the Ranks</CardTitle>
            </CardHeader>
            <CardContent>
              Watch your position rise on the leaderboard as you earn more
              points.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

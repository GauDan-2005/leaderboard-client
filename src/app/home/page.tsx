"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  Points: number;
}

export default function HomePage() {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/v1/get-users"
      );

      if (response.status == 200) {
        const data = response.data.data;
        // const message = response.data.message;
        // const success = response.data.success;

        // toast({
        //   title: message,
        //   description: success ? "Users fethced successfully" : "",
        // });

        setFriends(data);
      } else {
        const message = response.data.message;
        toast({
          title: "Users fetched Failed",
          description: message || "An error occurred during fetching.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
      toast({
        title: "Users fetched Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during fetching.",
        variant: "destructive",
      });
    }
  };

  const claimPoints = async (username: string) => {
    try {
      const response = await axios.patch(
        "http://localhost:7000/api/user/v1/claim-points",
        {
          username,
        }
      );

      if (response.status === 200) {
        const message = response.data.message;
        const success = response.data.success;

        toast({
          title: message,
          description: success ? "Successfully claimed points" : "",
        });
        fetchFriends();
      } else {
        const message = response.data.message;
        toast({
          title: message,
          description: "Error while claiming points!",
        });
      }
    } catch (error) {
      console.error("Error claiming points:", error);
      toast({
        title: "Claiming points Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during claiming.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <Card key={friend.id}>
              <CardHeader>
                <CardTitle>{`${friend.firstName} ${friend.lastName}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Points: {friend.Points}</p>
                <Button
                  onClick={() => claimPoints(friend.username)}
                  className="mt-2"
                >
                  Claim Points
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

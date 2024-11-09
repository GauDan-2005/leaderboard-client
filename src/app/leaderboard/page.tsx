"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  Points: number;
}

interface HistoryEntry {
  pointsAwarded: number;
  date: string;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/v1/get-users"
      );

      if (response.status == 200) {
        const data = response.data.data;
        setUsers(data.sort((a: User, b: User) => b.Points - a.Points));
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

  const fetchHistory = async (username: string) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/v1/your-history",
        { username },
        { headers: { "Content-Type": "application/json" } }
      );

      const message = response.data.message;
      const success = response.data.success;

      if (success) {
        const historyList = response.data.data;
        setHistory(historyList);
      }
      toast({
        title: message,
        description: success ? "History fetched Successfully" : "",
        variant: "default",
      });
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    fetchHistory(user.username);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.Points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}'s History`
                  : "User History"}
              </DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Points</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.pointsAwarded}</TableCell>
                    <TableCell>
                      {new Date(entry.date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/app/userSlice";
import { RootState } from "@/app/store";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const USER = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Leaderboard App
        </Link>
        <div className="space-x-4 flex items-center">
          {USER.email && (
            <>
              <Link href="/home">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="ghost">Leaderboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${USER.firstName} ${USER.lastName}`}
                      />
                      <AvatarFallback>{USER.firstName?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <div>
                      <p>{USER.firstName}</p>
                      <p>{USER.email}</p>
                      <p>Points: {USER.Points}</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

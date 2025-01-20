import React from "react";
import { Bell, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "@/firebase";
import { useUserContext } from "@/context/userContext";
const Header = () => {
  const navigate = useNavigate();

  const { loggedInUser, isFetching } = useUserContext();


  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase logout
      localStorage.removeItem("authToken"); // Remove the auth token from local storage
      toast.success("Logout successful!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      toast.error("Failed to log out: " + error?.message);
    }
  };
  return (
    <header className="w-fit rounded-lg border bg-card p-4 shadow-sm">
      {isFetching && <div className="text-center text-2xl">Loading...</div>}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={loggedInUser?.profileImage} alt={loggedInUser?.username} />
            <AvatarFallback>{loggedInUser?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{loggedInUser?.username}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{loggedInUser?.role}</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-orange-400" />
                {loggedInUser?.coins}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
        </Button>
        <Button onClick={handleLogout} variant="ghost" className="flex items-center gap-2">
          <LogOut className="h-5 w-5 text-red-500" /> <span className="text-sm text-red-500">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;

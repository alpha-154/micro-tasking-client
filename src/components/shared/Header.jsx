import React from "react";
import { Bell, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const Header = ({
  username = "johndoe",
  role = "Member",
  coins = 100,
  avatarUrl,
}) => {
  return (
    <header className="w-fit rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{username}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{role}</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-orange-400" />
                {coins}
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
      </div>
    </header>
  );
};

export default Header;

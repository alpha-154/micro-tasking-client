import React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Pencil, Trash2 } from "lucide-react";

// Available roles
const ROLES = ["ADMIN", "BUYER", "WORKER"];

const ManageUser = () => {
  // State to manage users list
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex.t@example.com",
      role: "ADMIN",
      coins: 1500,
      avatarUrl:
        "https://images.pexels.com/photos/30217125/pexels-photo-30217125/free-photo-of-contemplative-portrait-of-a-man-in-monochrome.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      role: "BUYER",
      coins: 750,
      avatarUrl:
        "https://images.pexels.com/photos/30217125/pexels-photo-30217125/free-photo-of-contemplative-portrait-of-a-man-in-monochrome.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.c@example.com",
      role: "WORKER",
      coins: 1200,
      avatarUrl:
        "https://images.pexels.com/photos/30217125/pexels-photo-30217125/free-photo-of-contemplative-portrait-of-a-man-in-monochrome.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ]);

  // State to manage which user's role is being edited
  const [editingUserId, setEditingUserId] = useState(null);

  // State to store the new role before confirming
  const [newRole, setNewRole] = useState(null);

  // Handler for toggling role edit mode
  const handleToggleEdit = (userId) => {
    if (editingUserId === userId) {
      // If we're already editing this user, update the role
      if (newRole) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setNewRole(null);
      }
      setEditingUserId(null);
    } else {
      // Start editing this user
      setEditingUserId(userId);
      setNewRole(null);
    }
  };

  // Handler for user deletion
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="w-full px-4">
         <div className="rounded-md border px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {editingUserId === user.id ? (
                    <Select
                      value={newRole || user.role}
                      onValueChange={(value) => setNewRole(value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {user.role}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleToggleEdit(user.id)}
                  >
                    {editingUserId === user.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {editingUserId === user.id
                        ? "Confirm role change"
                        : "Edit role"}
                    </span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>{user.coins}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(user.id)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete user</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
   
  );
};

export default ManageUser;

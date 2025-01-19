import React from "react";
import { useState, useEffect } from "react";
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
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAllUsersAsAdmin,
  removeAnUserAsAdmin,
  updateUserRoleAsAdmin,
} from "@/services/api";
import { toast } from "sonner";

// Available roles
const ROLES = ["ADMIN", "BUYER", "WORKER"];

const ManageUser = () => {
  const [user] = useAuthState(auth);
  // State to manage users list
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsersAsAdmin(user?.uid);
        if (response.status === 200) {
          setUsers(response.data.users);
          console.log("users -> ", response.data.users);
        }
      } catch (error) {
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  // State to manage which user's role is being edited
  const [editingUserId, setEditingUserId] = useState(null);

  // State to store the new role before confirming
  const [newRole, setNewRole] = useState(null);

  // Handler for toggling role edit mode
  const handleToggleEdit = async (userFirebaseUid) => {
    if (editingUserId === userFirebaseUid) {
      // If we're already editing this user, update the role
      if (newRole) {
        try {
          const apiData = {
            adminUid: user?.uid,
            userUid: userFirebaseUid,
            newRole,
          };
          console.log("apiData -> ", apiData);
          const response = await updateUserRoleAsAdmin(apiData);
          if (response.status === 200) {
            toast.success(
              response.data?.message || "User role updated successfully!"
            );
            setUsers(
              users.map((user) =>
                user.firebaseUid === userFirebaseUid
                  ? { ...user, role: newRole }
                  : user
              )
            );
          }
        } catch (error) {
          toast.error(
            error?.message || "Something went wrong. Please try again."
          );
        } finally {
          setNewRole(null);
          setEditingUserId(null);
        }
      }
    } else {
      // Start editing this user
      setEditingUserId(userFirebaseUid);
      setNewRole(null);
    }
  };

  // Handler for user deletion
  const handleDelete = async (userFirebaseUid) => {
    if (!user || !userFirebaseUid) return;
    try {
      const response = await removeAnUserAsAdmin(user?.uid, userFirebaseUid);
      if (response.status === 200) {
        toast.success(response.data?.message || "User deleted successfully!");
        setUsers(users.filter((user) => user.firebaseUid !== userFirebaseUid));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  // return (
  //   <div className="w-full mt-5">
  //     <div className="rounded-md border px-4 py-2">
  //       <Table>
  //         <TableHeader>
  //           <TableRow>
  //             <TableHead className="w-[50px]"></TableHead>
  //             <TableHead>Name</TableHead>
  //             <TableHead>Email</TableHead>
  //             <TableHead>Role</TableHead>
  //             <TableHead>Coins</TableHead>
  //             <TableHead className="text-right">Actions</TableHead>
  //           </TableRow>
  //         </TableHeader>
  //         {loading ? (
  //           <p className="text-center text-3xl">Loading...</p>
  //         ) : (
  //           <>
  //             {users?.length > 0 ? (
  //               <TableBody>
  //                 {users.map((user) => (
  //                   <TableRow key={user._id}>
  //                     <TableCell>
  //                       <Avatar className="h-10 w-10">
  //                         <AvatarImage
  //                           src={user.profileImage}
  //                           alt={user.username}
  //                         />
  //                         <AvatarFallback>
  //                           {user.username.charAt(0)}
  //                         </AvatarFallback>
  //                       </Avatar>
  //                     </TableCell>
  //                     <TableCell>
  //                       <div>
  //                         <div className="font-medium">{user.username}</div>
  //                         <div className="text-sm text-muted-foreground">
  //                           {user.email}
  //                         </div>
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>{user.email}</TableCell>
  //                     <TableCell>
  //                       <div className="flex items-center gap-2">
  //                         {editingUserId === user.firebaseUid ? (
  //                           <Select
  //                             value={newRole || user.role}
  //                             onValueChange={(value) => setNewRole(value)}
  //                           >
  //                             <SelectTrigger className="w-[130px]">
  //                               <SelectValue />
  //                             </SelectTrigger>
  //                             <SelectContent>
  //                               {ROLES.map((role) => (
  //                                 <SelectItem key={role} value={role}>
  //                                   {role}
  //                                 </SelectItem>
  //                               ))}
  //                             </SelectContent>
  //                           </Select>
  //                         ) : (
  //                           <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
  //                             {user.role}
  //                           </span>
  //                         )}
  //                         <Button
  //                           variant="ghost"
  //                           size="icon"
  //                           className="h-8 w-8"
  //                           onClick={() => handleToggleEdit(user.firebaseUid)}
  //                         >
  //                           {editingUserId === user.firebaseUid ? (
  //                             <Check className="h-4 w-4" />
  //                           ) : (
  //                             <Pencil className="h-4 w-4" />
  //                           )}
  //                           <span className="sr-only">
  //                             {editingUserId === user.firebaseUid
  //                               ? "Confirm role change"
  //                               : "Edit role"}
  //                           </span>
  //                         </Button>
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>{user.coins}</TableCell>
  //                     <TableCell className="text-right">
  //                       <Button
  //                         variant="outline"
  //                         size="icon"
  //                         onClick={() => handleDelete(user.firebaseUid)}
  //                         className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
  //                       >
  //                         <Trash2 className="h-4 w-4" />
  //                         <span className="sr-only">Delete user</span>
  //                       </Button>
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             ) : (
  //               <p className="text-center text-3xl">
  //                 No users registered yet!.
  //               </p>
  //             )}
  //           </>
  //         )}
  //       </Table>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full mt-5">
      <h1 className="text-3xl font-semibold mt-2 mb-4">Manage Users</h1>
      <div className="rounded-md border px-4 py-2">
        {loading ? (
          <p className="text-center text-3xl">Loading...</p>
        ) : users?.length > 0 ? (
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
                <TableRow key={user._id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.profileImage}
                        alt={user.username}
                      />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {editingUserId === user.firebaseUid ? (
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
                        onClick={() => handleToggleEdit(user.firebaseUid)}
                      >
                        {editingUserId === user.firebaseUid ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Pencil className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {editingUserId === user.firebaseUid
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
                      onClick={() => handleDelete(user.firebaseUid)}
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
        ) : (
          <p className="text-center text-3xl">No users registered yet!</p>
        )}
      </div>
    </div>
  );
};

export default ManageUser;

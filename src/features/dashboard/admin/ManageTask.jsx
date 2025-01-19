import React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { fetchTasksbyAdminUid, removeTaskByAdmin } from "@/services/api";
import { toast } from "sonner";

const ManageTask = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchTasksbyAdminUid(user?.uid);
        if (response.status === 200) {
          setTasks(response.data.tasks);
          console.log("all tasks -> ", response.data.tasks);
        }
      } catch (error) {
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  const handleDelete = async (taskId) => {
    if (!taskId || !user) return;
    try {
      const response = await removeTaskByAdmin(user?.uid, taskId);
      if (response.status === 200) {
        toast.success(response.data?.message || "Tasks removed successfully!");
        console.log(response.data?.message);
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen w-full px-8 py-10">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {loading ? (
        <p className="text-3xl text-center">Loading...</p>
      ) : (
        <>
          {tasks?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Detail
                    </TableHead>
                    <TableHead>Workers</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Completion Date
                    </TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell className="font-medium">
                        {truncateText(task.title, 20)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {truncateText(task.detail, 30)}
                      </TableCell>
                      <TableCell>{task.requiredWorkers}</TableCell>
                      <TableCell>${task.payableAmount}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {format(task.completionDate, "PPP")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={task.createdBy.profileImage}
                              alt={task.createdBy.username}
                            />
                            <AvatarFallback>
                              {task.createdBy.username.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hidden sm:inline">
                            {truncateText(task.createdBy.username, 15)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(task._id)}
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete task</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete task</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-3xl text-center">No tasks found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ManageTask;

import React from "react";
import { useState } from "react";
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

const mockTasks = [
  {
    _id: "1",
    title: "Design new logo",
    detail: "Create a modern and versatile logo for our brand",
    requiredWorkers: 2,
    payableAmount: 500,
    completionDate: new Date("2023-12-31"),
    createdBy: {
      _id: "user1",
      name: "John Doe",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    _id: "2",
    title: "Develop mobile app",
    detail: "Build a cross-platform mobile app using React Native",
    requiredWorkers: 4,
    payableAmount: 2000,
    completionDate: new Date("2024-03-15"),
    createdBy: {
      _id: "user2",
      name: "Jane Smith",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    _id: "3",
    title: "Write content for website",
    detail: "Create engaging content for the company's new website",
    requiredWorkers: 1,
    payableAmount: 300,
    completionDate: new Date("2023-11-30"),
    createdBy: {
      _id: "user3",
      name: "Alice Johnson",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
  },
];

const ManageTask = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen w-full px-8 py-10">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Detail</TableHead>
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
                  {format(task.completionDate, "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={task.createdBy.avatarUrl}
                        alt={task.createdBy.name}
                      />
                      <AvatarFallback>
                        {task.createdBy.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">
                      {truncateText(task.createdBy.name, 15)}
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
    </div>
  );
};

export default ManageTask;

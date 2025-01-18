import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteTask, fetchTasksbyUser, updateTask } from "@/services/api";

const MyTask = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchTasksbyUser(user?.uid);
        if (response.status === 200) {
          setTasks(response.data.tasks);
          console.log("my tasks -> ", response.data.tasks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  // Sort tasks by completion date in descending order
  // const sortedTasks = [...tasks].sort(
  //   (a, b) => b.completionDate.getTime() - a.completionDate.getTime()
  // );

  const handleUpdate = async (taskId) => {
    console.log("handleUpdate function called");
    if (!taskId) return;
    if (editingTask === taskId) {
      try {
        setUpdateLoading(true);
        const editedTaskData = {
          uid: user?.uid,
          taskId,
          title: editedValues?.title || "",
          detail: editedValues?.detail || "",
          submissionInfo: editedValues?.submissionInfo || "",
        };
        const response = await updateTask(editedTaskData);
        if (response.status === 200) {
          toast.success("Task updated successfully!");
          // Save the changes
          setTasks(
            tasks.map((task) =>
              task._id === taskId ? { ...task, ...editedValues } : task
            )
          );
        }
      } catch (error) {
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setUpdateLoading(false);
      }

      setEditingTask(null);
      setEditedValues({});

      // Here you would typically make an API call to update the task
      console.log("Updating task:", taskId, editedValues);
    } else {
      // Start editing
      setEditingTask(taskId);
      setEditedValues({});
    }
  };

  const handleDelete = async (taskId) => {
    console.log("handleDelete function called");
    if (!taskId) return;
    try {
      setDeleteLoading(true);
      const response = await deleteTask(user?.uid, taskId);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully!");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  return (
    <div className="w-full py-10 flex flex-col items-start gap-5">
      <h1 className="text-2xl text-neutral-700 font-bold">My Tasks</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {tasks?.length > 0 ? (
            <div className="w-fit border border-gray-300 shadow-md rounded-xl p-4">
              <Table className="max-w-5xl">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Detail</TableHead>
                    <TableHead>Submission Info</TableHead>
                    <TableHead className="text-right">
                      Required Workers
                    </TableHead>
                    <TableHead className="text-right">Payable Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks?.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell className="max-w-[15rem]">
                        {editingTask === task._id ? (
                          <Input
                            value={editedValues?.title ?? task.title}
                            onChange={(e) =>
                              handleInputChange("title", e.target.value)
                            }
                          />
                        ) : (
                          <div className="truncate">{task.title}</div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[15rem]">
                        {editingTask === task._id ? (
                          <Input
                            value={editedValues?.detail ?? task.detail}
                            onChange={(e) =>
                              handleInputChange("detail", e.target.value)
                            }
                          />
                        ) : (
                          <div className="truncate">{task.detail}</div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[15rem]">
                        {editingTask === task._id ? (
                          <Input
                            value={
                              editedValues.submissionInfo ?? task.submissionInfo
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "submissionInfo",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <div className="truncate">{task.submissionInfo}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {task.requiredWorkers}
                      </TableCell>
                      <TableCell className="text-right">
                        ${task.payableAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right flex flex-col gap-2 items-end ml-2">
                        <Button
                          variant="outline"
                          onClick={() => handleUpdate(task._id)}
                        >
                          {editingTask === task._id ? "Save" : "Update"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(task._id)}
                        >
                          {deleteLoading ? "deleting..." : "delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-600">You have no tasks yet!</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyTask;

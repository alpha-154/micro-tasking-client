import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchTaskForWorker } from "@/services/api";
import { toast } from "sonner";
import { format } from "date-fns";


const TaskLIst = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchTaskForWorker();
        if (response.status === 200) {
          setTasks(response.data.tasks);
          console.log("my tasks -> ", response.data.tasks);
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

    fetchTasks();
    
  }, []);

  return (
    <div className="w-full py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Available Tasks</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          {tasks?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <Card
                  key={task._id}
                  className="flex flex-col overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full pt-[50%] overflow-hidden">
                    <img
                      src={task.imageUrl || "/placeholder.svg"}
                      alt={task.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 mb-2">
                      Buyer: {task?.createdBy?.username}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {task.completionDate &&
                        format(task.completionDate, "PPP")}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <DollarSign className="w-4 h-4 mr-2" />$
                      {task.payableAmount.toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {task.requiredWorkers} worker
                      {task.requiredWorkers > 1 ? "s" : ""} needed
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      to={`/dashboard/worker/task-details/${task._id}`}
                      className="w-full"
                    >
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No tasks available yet!.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskLIst;

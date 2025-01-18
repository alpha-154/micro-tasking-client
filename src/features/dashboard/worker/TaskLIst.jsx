import React from "react";
import { useState } from "react";
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

// Fake data for demonstration
const initialTasks = [
  {
    id: "1",
    taskTitle: "Create a logo design",
    buyerName: "John Doe",
    completionDate: new Date("2023-07-30"),
    payableAmount: 50,
    requiredWorkers: 5,
    imageUrl:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    taskTitle: "Write product descriptions",
    buyerName: "Jane Smith",
    completionDate: new Date("2023-08-15"),
    payableAmount: 20,
    requiredWorkers: 10,
    imageUrl:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    taskTitle: "Translate website content",
    buyerName: "Alex Johnson",
    completionDate: new Date("2023-08-05"),
    payableAmount: 30,
    requiredWorkers: 3,
    imageUrl:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    taskTitle: "Test mobile application",
    buyerName: "Sarah Brown",
    completionDate: new Date("2023-07-25"),
    payableAmount: 40,
    requiredWorkers: 8,
    imageUrl:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const TaskLIst = () => {
  const [tasks] = useState(initialTasks);

  const filteredTasks = tasks.filter((task) => task.requiredWorkers > 0);

  return (
    <div className="w-full py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Available Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="flex flex-col overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-full pt-[50%] overflow-hidden">
              <img
                src={task.imageUrl || "/placeholder.svg"}
                alt={task.taskTitle}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{task.taskTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-2">
                Buyer: {task.buyerName}
              </p>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {task.completionDate.toLocaleDateString()}
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
              <Link to={`/dashboard/worker/task-details/${task.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskLIst;

import React from "react";
import WorkerStateCard from "./components/WorkerStateCard";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockSubmissions = [
  {
    id: 1,
    buyer_name: "John Doe",
    task_title: "Design Logo",
    payable_amount: 100,
    status: "approved",
  },
  {
    id: 2,
    buyer_name: "Jane Smith",
    task_title: "Write Article",
    payable_amount: 50,
    status: "approved",
  },
  // Add more mock data as needed
];

const WorkerHome = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-5">
      <div className="w-full flex flex-row gap-5">
        <WorkerStateCard cardTitle="Total Task Submissions" state="15000" />
        <WorkerStateCard cardTitle="Pending Task Submissions" state="45000" />
        <WorkerStateCard cardTitle="Total Earnings" state="35000" />
      </div>
      <div className="w-full mt-5">
        <h1 className="text-2xl font-bold mb-4">Approved Task Submissions</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Buyer Name</TableHead>
              <TableHead>Task Title</TableHead>
              <TableHead>Payable Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.buyer_name}</TableCell>
                <TableCell>{submission.task_title}</TableCell>
                <TableCell>${submission.payable_amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500 text-white">{submission.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkerHome;

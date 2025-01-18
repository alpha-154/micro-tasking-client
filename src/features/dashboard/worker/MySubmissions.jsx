import React from 'react'
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
    submittedAt: "2023-07-30",
    status: "pending",

  },
  {
    id: 2,
    buyer_name: "Jane Smith",
    task_title: "Write Article",
    payable_amount: 50,
    submittedAt: "2023-07-30",
    status: "approved",
  },
  // Add more mock data as needed
];
const MySubmissions = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-5">
   
    <div className="w-full mt-5">
      <h1 className="text-2xl font-bold mb-4">All Task Submissions</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Buyer Name</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Payable Amount</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.buyer_name}</TableCell>
              <TableCell>{submission.task_title}</TableCell>
              <TableCell>${submission.payable_amount}</TableCell>
              <TableCell>{submission.submittedAt}</TableCell>
              <TableCell>
                <Badge  className={`${submission.status === "pending" ? "bg-red-500" : "bg-green-500"} text-white`}>{submission.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
  )
}

export default MySubmissions

import React from "react";
import BuyerStateCard from "./components/BuyerStateCard";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for demonstration
const mockSubmissions = [
  {
    id: 1,
    worker_name: "John Doe",
    task_title: "Design Logo",
    payable_amount: 100,
    submission_detail: "Logo design files attached",
  },
  {
    id: 2,
    worker_name: "Jane Smith",
    task_title: "Write Article",
    payable_amount: 50,
    submission_detail: "1500 word article on AI",
  },
  // Add more mock data as needed
];

const BuyerHome = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleApprove = (id) => {
    console.log(`Approved submission ${id}`);
    // Implement approve logic here
  };

  const handleReject = (id) => {
    console.log(`Rejected submission ${id}`);
    // Implement reject logic here
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-5">
      <div className="w-full flex flex-row gap-5">
        <BuyerStateCard cardTitle="Total Added Tasks" state="15000" />
        <BuyerStateCard cardTitle="Pending Tasks" state="45000" />
        <BuyerStateCard cardTitle="Total Payment Paid" state="35000" />
      </div>
      <div className="w-full mt-5">
        <h1 className="text-2xl font-bold mb-4">Pending Task Submissions</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Worker Name</TableHead>
              <TableHead>Task Title</TableHead>
              <TableHead>Payable Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.worker_name}</TableCell>
                <TableCell>{submission.task_title}</TableCell>
                <TableCell>${submission.payable_amount}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button onClick={() => handleViewSubmission(submission)}>
                      View Submission
                    </Button>
                    <Button
                      onClick={() => handleApprove(submission.id)}
                      variant="outline"
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(submission.id)}
                      variant="outline"
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div>
                <p>
                  <strong>Worker:</strong> {selectedSubmission.worker_name}
                </p>
                <p>
                  <strong>Task:</strong> {selectedSubmission.task_title}
                </p>
                <p>
                  <strong>Amount:</strong> ${selectedSubmission.payable_amount}
                </p>
                <p>
                  <strong>Details:</strong>{" "}
                  {selectedSubmission.submission_detail}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BuyerHome;

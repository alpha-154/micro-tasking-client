import React, { useEffect } from "react";
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
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchBuyerStatsWithPendingSubmissions } from "@/services/api";

const BuyerHome = () => {
  const [user] = useAuthState(auth);
  const [taskStats, setTaskStats] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubmissionsWithStates = async () => {
      try {
        setLoading(true);
        const response = await fetchBuyerStatsWithPendingSubmissions(user?.uid);
        if (response.status === 200) {
          setTaskStats(response.data.stats);
          setSubmissions(response.data.pendingTasks);
          console.log("buyer stats -> ", response.data.stats);
          console.log("buyer pending tasks -> ", response.data.pendingTasks);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        toast.error(error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSubmissionsWithStates();
  }, [user]);

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
    <div className="min-h-screen w-full flex flex-col gap-5 py-8">
      <div className="w-full flex flex-row gap-5">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            <BuyerStateCard
              cardTitle="Total Added Tasks"
              state={taskStats.totalTasks}
            />
            <BuyerStateCard
              cardTitle="Pending Tasks"
              state={taskStats.totalPendingWorkers}
            />
            <BuyerStateCard
              cardTitle="Total Payment Paid"
              state={taskStats.totalPaid}
            />
          </>
        )}
      </div>
      <div className="w-full mt-5">
        <h1 className="text-2xl font-bold mb-4">Pending Task Submissions</h1>
        {loading ? (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            {submissions?.length > 0 ? (
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
                  {submissions.map((submission) =>
                    submission.pendingSubmissions.map((pendingSubmission) => (
                      <TableRow key={pendingSubmission._id}>
                        <TableCell>{pendingSubmission.workerName}</TableCell>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>${submission.payableAmount}</TableCell>
                        <TableCell>
                          <div className="space-x-2">
                            <Button
                              onClick={() =>
                                handleViewSubmission({
                                  workerName: pendingSubmission.workerName,
                                  title: submission.title,
                                  payableAmount: submission.payableAmount,
                                  submissionDetails:
                                    pendingSubmission.submissionDetails,
                                })
                              }
                            >
                              View Submission
                            </Button>
                            <Button
                              onClick={() =>
                                handleApprove(pendingSubmission._id)
                              }
                              variant="outline"
                              className="bg-green-500 text-white hover:bg-green-600"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() =>
                                handleReject(pendingSubmission._id)
                              }
                              variant="outline"
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-600">
                You have no pending task submissions.
              </p>
            )}
          </>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div>
                <p>
                  <strong>Worker:</strong> {selectedSubmission?.workerName}
                </p>
                <p>
                  <strong>Task:</strong> {selectedSubmission?.title}
                </p>
                <p>
                  <strong>Amount:</strong> ${selectedSubmission?.payableAmount}
                </p>
                <p>
                  <strong>Details:</strong>{" "}
                  {selectedSubmission?.submissionDetails}
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

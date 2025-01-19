import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import { fetchWorkerAllTaskSubmissions } from "@/services/api";
import { format } from "date-fns";

const MySubmissions = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchWorkerTaskSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkerAllTaskSubmissions(user?.uid);
        if (response.status === 200) {
          setSubmissions(response.data.submissions);
          console.log("worker approved tasks -> ", response.data.submissions);
        }
      } catch (error) {
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
        console.log(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchWorkerTaskSubmissions();
  }, [user]);

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
          {loading ? (
            <p className="text-center text-2xl">Loading...</p>
          ) : (
            <>
              {submissions?.length > 0 ? (
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>{submission.buyerName}</TableCell>
                      <TableCell>{submission.taskTitle}</TableCell>
                      <TableCell>${submission.taskInfo.payableAmount}</TableCell>
                      <TableCell>{format(submission.submittedAt, "PPP")}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            submission.status === "pending"
                              ? "bg-red-500"
                              : "bg-green-500"
                          } text-white`}
                        >
                          {submission.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <p className="text-center text-2xl">
                  No task submission done yet!
                </p>
              )}
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default MySubmissions;

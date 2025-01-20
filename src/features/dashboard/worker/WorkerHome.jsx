import React from "react";
import WorkerStateCard from "./components/WorkerStateCard";
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
import { fetchApprovedTaskForWorkerWithStats } from "@/services/api";

const WorkerHome = () => {
  const [stats, setStats] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatsWithApprovedTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchApprovedTaskForWorkerWithStats(user?.uid);
        if (response.status === 200) {
          setStats(response.data.stats);
          setSubmissions(response.data.approvedSubmissions);
          console.log("worker stats -> ", response.data.stats);
          console.log(
            "worker approved tasks -> ",
            response.data.approvedSubmissions
          );
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
    if (user) fetchStatsWithApprovedTasks();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-5">
      {loading && <div>Loading...</div>}
      {stats && (
        <div className="w-full flex flex-row gap-5 mt-5">
          <WorkerStateCard
            cardTitle="Total Task Submissions"
            state={stats.totalSubmissions}
          />
          <WorkerStateCard
            cardTitle="Pending Task Submissions"
            state={stats.totalPendingSubmissions}
          />
          <WorkerStateCard
            cardTitle="Total Earnings"
            state={stats.totalEarning}
          />
        </div>
      )}

      <div className="w-full mt-5">
        <h1 className="text-2xl font-bold mb-4">Approved Task Submissions</h1>
        {submissions?.length > 0 ? (
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
              {submissions.map((submission) => (
                <TableRow key={submission._id}>
                  <TableCell>{submission.buyerName}</TableCell>
                  <TableCell>{submission.taskTitle}</TableCell>
                  <TableCell>${submission.taskInfo?.payableAmount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-white"
                    >
                      {submission.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full flex justify-center items-center">
            <h1 className="text-2xl font-bold">No Task Submitted Yet!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;

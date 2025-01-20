import React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchAdminDashboardData,
  approveWithdrawalRequest,
} from "@/services/api";
import { toast } from "sonner";
import AdminStateCard from "./components/AdminStateCard";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AdminHome = () => {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [dashboardDataLoading, setDashboardDataLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  useEffect(() => {
    const fetchAdminDashboardStatsWithWithdrawals = async () => {
      try {
        setDashboardDataLoading(true);
        const response = await fetchAdminDashboardData(user?.uid);
        if (response.status === 200) {
          setStats(response.data.data.stats);
          setWithdrawals(response.data.data.pendingWithdrawals);
          console.log("admin stats -> ", response.data.data.stats);
          console.log(
            "admin pending withdrawals -> ",
            response.data.data.pendingWithdrawals
          );
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setDashboardDataLoading(false);
      }
    };

    if (user) fetchAdminDashboardStatsWithWithdrawals();
  }, [user]);

  const handleApprove = async (withdrawalId) => {
    if (!withdrawalId || !user) return;
    try {
      setApproveLoading(true);
      const apiData = {
        adminUid: user?.uid,
        withdrawalId: withdrawalId,
      };
      console.log("apiData -> ", apiData);
      const response = await approveWithdrawalRequest(apiData);
      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Withdrawal approved successfully!"
        );
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((withdrawals) =>
            withdrawals._id === withdrawalId
              ? { ...withdrawals, status: "approved" }
              : withdrawals
          )
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 py-8">
      <div className="w-full flex flex-row gap-5">
        {dashboardDataLoading ? (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            {stats && (
              <>
                <AdminStateCard
                  cardTitle="Total Workers"
                  state={stats?.totalWorkers}
                />
                <AdminStateCard
                  cardTitle="Total Buyers"
                  state={stats?.totalBuyers}
                />
                <AdminStateCard
                  cardTitle="Total Available coins"
                  state={stats?.totalAvailableCoins}
                />
              </>
            )}
          </>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">Withdrawals</h1>
        {dashboardDataLoading ? (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            {withdrawals?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Withdrawal By</TableHead>
                    <TableHead>Coins</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Account No</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal._id}>
                      <TableCell>{withdrawal.worker.username}</TableCell>
                      <TableCell>{withdrawal.coins}</TableCell>
                      <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                      <TableCell>{withdrawal.paymentSystem}</TableCell>
                      <TableCell>{withdrawal.accountNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            withdrawal.status === "approved"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {withdrawal.status}
                        </Badge>
                      </TableCell>
                      {withdrawal.status === "pending" && (
                        <TableCell>
                          <Button
                            onClick={() => handleApprove(withdrawal._id)}
                            className="bg-green-500 text-white hover:text-white hover:bg-green-600"
                          >
                            {approveLoading ? "Approving..." : "Approve"}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl font-bold">
                  No Withdrawals Submitted Yet!
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;

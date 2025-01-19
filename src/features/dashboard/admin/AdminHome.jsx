import React from "react";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchAdminStats } from "@/services/api";
import { toast } from "sonner";
import AdminStateCard from "./components/AdminStateCard";
const AdminHome = () => {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    const fetchAdminStates = async () => {
      try {
        setStatsLoading(true);
        const response = await fetchAdminStats(user?.uid);
        if (response.status === 200) {
          setStats(response.data.stats);
          console.log("admin stats -> ", response.data.stats);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setStatsLoading(false);
      }
    };

    if (user) fetchAdminStates();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 py-8">
      <div className="w-full flex flex-row gap-5">
        {statsLoading ? (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <>
            <AdminStateCard
              cardTitle="Total Workers"
              state={stats.totalWorkers}
            />
            <AdminStateCard
              cardTitle="Total Buyers"
              state={stats.totalBuyers}
            />
            <AdminStateCard
              cardTitle="Total Available coins"
              state={stats.totalAvailableCoins}
            />
          </>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">Withdrawals</h1>
      </div>
    </div>
  )
};

export default AdminHome;

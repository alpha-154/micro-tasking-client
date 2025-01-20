import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getBuyerPayments } from "@/services/api";
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/userContext";
import { toast } from "sonner";

export default function PaymentHistory() {
  const { loggedInUser } = useUserContext();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const response = await getBuyerPayments(loggedInUser?.firebaseUid);
        if (response.status === 200) {
          console.log("payment history -> ", response.data.payments);
          setPaymentHistory(response.data.payments);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    if (loggedInUser) fetchPayment();
  }, [loggedInUser]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">Payment History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {paymentHistory?.length > 0 ? (
            <Table>
              <TableCaption>A list of your recent coin purchases.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Coins Purchased</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead className="text-right">Payment Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">
                      {record.coinsPurchased}
                    </TableCell>
                    <TableCell>${record.amountPaid.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {new Date(record.paymentDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No payment history found.</p>
          )}
        </>
      )}
    </div>
  );
}

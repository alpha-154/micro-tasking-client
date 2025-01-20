// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { auth } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { toast } from "sonner";
// import { fetchWorkerAllTaskSubmissions } from "@/services/api";
// import { format } from "date-fns";

// const MySubmissions = () => {
//   const [user] = useAuthState(auth);
//   const [loading, setLoading] = useState(false);
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     const fetchWorkerTaskSubmissions = async () => {
//       try {
//         setLoading(true);
//         const response = await fetchWorkerAllTaskSubmissions(user?.uid);
//         if (response.status === 200) {
//           setSubmissions(response.data.submissions);
//           console.log("worker approved tasks -> ", response.data.submissions);
//         }
//       } catch (error) {
//         toast.error(
//           error?.message || "Something went wrong. Please try again."
//         );
//         console.log(
//           error?.message || "Something went wrong. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchWorkerTaskSubmissions();
//   }, [user]);

//   return (
//     <div className="min-h-screen w-full flex flex-col gap-5">
//       <div className="w-full mt-5">
//         <h1 className="text-2xl font-bold mb-4">All Task Submissions</h1>
//         {loading ? (
//           <p className="text-center text-2xl">Loading...</p>
//         ) : submissions?.length > 0 ? (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Buyer Name</TableHead>
//                 <TableHead>Task Title</TableHead>
//                 <TableHead>Payable Amount</TableHead>
//                 <TableHead>Submitted At</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {submissions.map((submission) => (
//                 <TableRow key={submission._id}>
//                   <TableCell>{submission.buyerName}</TableCell>
//                   <TableCell>{submission.taskTitle}</TableCell>
//                   <TableCell>${submission.taskInfo?.payableAmount}</TableCell>
//                   <TableCell>{format(submission.submittedAt, "PPP")}</TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`${
//                         submission.status === "pending"
//                           ? "bg-red-500"
//                           : "bg-green-500"
//                       } text-white`}
//                     >
//                       {submission.status}
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         ) : (
//           <p className="text-center text-2xl">
//             No task submission done yet!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MySubmissions;


import React, { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fetchWorkerTaskSubmissions = async (currentPage) => {
    try {
      setLoading(true);
      const response = await fetchWorkerAllTaskSubmissions(user?.uid, currentPage, 6);
      if (response.status === 200) {
        setSubmissions(response.data.submissions);
        setTotalPages(response.data.totalPages);
        console.log("Worker approved tasks -> ", response.data.submissions);
      }
    } catch (error) {
      toast.error(
        error?.response?.message?.data || "Something went wrong. Please try again."
      );
      console.log(error?.response?.message?.data || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchWorkerTaskSubmissions(page);
  }, [user, page]);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-5">
      <div className="w-full mt-5">
        <h1 className="text-2xl font-bold mb-4">All Task Submissions</h1>
        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : submissions?.length > 0 ? (
          <>
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
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell>{submission.buyerName}</TableCell>
                    <TableCell>{submission.taskTitle}</TableCell>
                    <TableCell>${submission.taskInfo?.payableAmount}</TableCell>
                    <TableCell>{format(new Date(submission.submittedAt), "PPP")}</TableCell>
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
            </Table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <p>
                Page {page} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-2xl">No task submission done yet!</p>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;

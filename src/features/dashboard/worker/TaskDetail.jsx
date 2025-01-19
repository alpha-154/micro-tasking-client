import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, DollarSign, Users, Mail } from "lucide-react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchTaskDetailsForWoker, submitTaskAsWorker } from "@/services/api";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function TaskDetail() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Task Detail - MicroTask";
  }, []);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchTaskDetailsForWoker(taskId);
        if (response.status === 200) {
          setTaskDetails(response.data.task);
          console.log("task details -> ", response.data.task);
        }
      } catch (error) {
        toast.error(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTaskDetails();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      taskId: taskDetails._id,
      title: taskDetails.title,
      workerUid: user?.uid, // This would come from authenticated user in a real app
      submissionDetails: submissionDetails,
      buyerId: taskDetails.createdBy?._id,
      currentDate: new Date(),
    };
    console.log("Submission data:", submissionData);
    try {
      setIsSubmitting(true);
      const response = await submitTaskAsWorker(submissionData);
      if (response.status === 201) {
        toast.success("Task submitted successfully!");
        navigate("/dashboard/worker/my-submissions");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmissionDetails("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task Details</h1>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {taskDetails && (
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {taskDetails.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={taskDetails.imageUrl || "/placeholder.svg"}
                      alt={taskDetails.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Task Details</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {taskDetails.detail}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Completion Date:{" "}
                        {format(taskDetails.completionDate, "PPP")}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Payable Amount: ${taskDetails?.payableAmount.toFixed(2)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        Required Workers: {taskDetails.requiredWorkers}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Buyer Information</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Name: {taskDetails.createdBy?.username}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        Email: {taskDetails.createdBy?.email}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="submissionDetails"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Submission Details
                      </label>
                      <Textarea
                        id="submissionDetails"
                        value={submissionDetails}
                        onChange={(e) => setSubmissionDetails(e.target.value)}
                        placeholder="Provide details about your submission..."
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addTask } from "@/services/api";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Task title must be at least 4 characters.",
  }),
  detail: z.string().min(10, {
    message: "Task detail must be at least 10 characters.",
  }),
  requiredWorkers: z.number().min(1, {
    message: "At least 1 worker is required.",
  }),
  payableAmount: z.number().min(0.01, {
    message: "Payable amount must be greater than 0.",
  }),
  completionDate: z.date({
    required_error: "Completion date is required.",
  }),
  submissionInfo: z.string().min(5, {
    message: "Submission info must be at least 5 characters.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the task image.",
  }),
});

const AddTask = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { loggedInUser ,updateCoins } = useUserContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      detail: "",
      requiredWorkers: undefined,
      payableAmount: undefined,
      submissionInfo: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    const taskData = {
      uid: loggedInUser?.firebaseUid,
      title: values.title,
      detail: values.detail,
      requiredWorkers: values.requiredWorkers,
      payableAmount: values.payableAmount,
      completionDate: values.completionDate,
      submissionInfo: values.submissionInfo,
      imageUrl: values.imageUrl,
    };
    console.log("taskData -> ", taskData);
    try {
      setLoading(true);
      const response = await addTask(taskData);
      if (response.status === 201) {
        toast.success("Task added successfully!");
        updateCoins("dec", Number(values.payableAmount * values.requiredWorkers));
        navigate("/dashboard/buyer/my-task");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-start py-8">
      <div className="border border-gray-200 shadow-md rounded-xl px-8 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Watch my YouTube video and make a comment"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a concise title for your task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the task"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the task in detail.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="requiredWorkers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Workers</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : +value);
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of workers needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payableAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payable Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : +value);
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Amount to pay each worker.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Completion Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Deadline for completing the task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="submissionInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submission Info</FormLabel>
                  <FormControl>
                    <Input placeholder="Screenshot / proof" {...field} />
                  </FormControl>
                  <FormDescription>
                    What to submit as proof of completion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL of an image to attract workers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{loading ? "Adding..." : "Add Task"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;

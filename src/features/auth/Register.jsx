import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";
import { registerUser } from "@/services/api";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Full name must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  profileImage: z
    .string()
    .url({ message: "Please provide a valid URL for the profile image." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character.",
    }),
  role: z.enum(["WORKER", "BUYER"], {
    message: "Please select a valid role.",
  }),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Register - MicroTask";
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      profileImage: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(userCredential.user, {
        displayName: values.username,
        photoURL: values.profileImage,
      });
      const firebaseUser = userCredential.user;
      console.log("user-> ", firebaseUser);
      console.log("userUid-> ", firebaseUser.uid);

      const response = await registerUser({
        firebaseUid: firebaseUser.uid,
        username: firebaseUser.displayName,
        email: firebaseUser.email,
        profileImage: firebaseUser.photoURL,
        role: values.role,
      });
      if (response.status === 201) {
        toast.success("Registration successful!");
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
     
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="absolute left-0 -top-3 flex w-full justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-purple-600" />
          <span className="text-sm text-gray-600">
            <strong>MicroTask</strong>
          </span>
        </div>
      </div>

      {/* Background with wave and dots */}
      <div className="absolute bottom-0 h-1/2 w-full">
        {/* Wave Pattern */}
        <svg
          className="absolute -top-px left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          height="120"
        >
          <path
            d="M0 120V47.0877C240 79.0877 480 95.0877 720 79.0877C960 63.0877 1200 15.0877 1440 3.08765V120H0Z"
            className="fill-purple-500"
          />
        </svg>

        {/* Gradient Background */}
        <div className="h-full w-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500">
          {/* Decorative Dots */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-4 w-4 rounded-full bg-white" />
            <div className="absolute left-3/4 top-1/2 h-6 w-6 rounded-full bg-white" />
            <div className="absolute left-1/2 top-3/4 h-3 w-3 rounded-full bg-white" />
            <div className="absolute left-1/6 top-2/3 h-5 w-5 rounded-full bg-white" />
            <div className="absolute left-5/6 top-1/3 h-4 w-4 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-[400px] md:max-w-[450px] rounded-lg bg-white p-8 shadow-[0_0_20px_rgba(0,0,0,0.10)]">
          <div className="space-y-1">
            <h1 className="text-center text-3xl mb-4 font-bold text-gray-900">
              Seconds to sign up!
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-950">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-950">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@site.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-950">
                        Image Url
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://image.jpeg.unsplash"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-950">
                        Choose Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 8 characters"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Role Selector */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-950">Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="WORKER">Worker</SelectItem>
                            <SelectItem value="BUYER">Buyer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 text-purple-700 dark:text-white" />{" "}
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register Account"
                  )}
                </Button>
              </form>
            </Form>

            <div className="flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                className="text-gray-500 bg-white hover:bg-white "
                asChild
              >
                <p>
                  Already have an account?
                  <Link to="/login" className="text-purple-600 hover:underline">
                    Login
                  </Link>
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 right-4 z-20 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
      >
        ?
      </Button>
    </div>
  );
}

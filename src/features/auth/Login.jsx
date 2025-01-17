import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateToken, registerUserWithGoogle } from "@/services/api";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Login - MicroTask";
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("logged user's credentials", userCredential);
      // Get user details from Firebase
      const { user } = userCredential;
      const { uid, email, displayName, photoURL } = user;

      // Call the backend to generate a JWT
      const response = await generateToken({
        firebaseUid: uid,
        username: displayName,
        email: email,
        profileImage: photoURL,
      });
      if (response.status === 200) {
        // Store the token in localStorage
        const { token, user } = response.data;
        dispatch(setUser(user));
        localStorage.setItem("authToken", token);
        toast.success("Redirecting to dashboard...");
        navigate(`/dashboard/${user?.role.toLowerCase()}`);
      }

     
    } catch (error) {
      console.error("Error in SignInForm:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  //Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      let result;

      // Use popup for desktop
      result = await signInWithPopup(auth, provider);

      const user = result?.user || auth?.currentUser;

      // Extract user information
      const userData = {
        firebaseUid: user.uid,
        username: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
      };

      // Make an API call to check if the user exists and save if not
      const response = await registerUserWithGoogle(userData);

      if (response.status === 201) {
        toast.success("Google Login successful! Account created.");
        dispatch(setUser(response.data.user));
      } else if (response.status === 200) {
        toast.success("Google Login successful!");
      }

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An error occurred during Google login.");
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="absolute left-0 -top-1 flex w-full justify-between p-6">
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
        <div className="w-full max-w-[350px] md:max-w-[400px] rounded-lg bg-white p-8   shadow-[0_0_20px_rgba(0,0,0,0.10)]">
          <div className="space-y-6">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Welcome Back!
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 text-purple-700" />{" "}
                      <span>Logging In...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
            <Button
              onClick={handleGoogleLogin}
              className="bg-red-600 hover:bg-red-500 text-white p-2 w-full mb-4 border rounded-lg"
            >
              Login with Google
            </Button>

            <div className="flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                className="text-gray-500 bg-white hover:bg-white "
                asChild
              >
                <p>
                  Don&apos;t have an account?
                  <Link
                    to="/register"
                    className="text-purple-600 hover:underline"
                  >
                    Register
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

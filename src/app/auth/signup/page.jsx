'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate Full Name
    if (!fullName) {
      newErrors.fullName = "Full Name is required.";
    }

    // Validate Email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Validate Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.values(newErrors).every((err) => err === "")) {
      console.log("Form submitted");
      router.push('/onboarding')
      // Perform form submission logic here
    }
  };

  return (
    <CardContent>
      <img className="md:flex lg:hidden hidden w-[160px] mb-10" src={'/logo-on-light.png'} />
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sign up</h2>
      <p className="text-sm text-gray-500 mb-4">Join our community and start your learning journey today!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name Field */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            placeholder="Enter your full name"
            type="text"
            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>

        {/* Email Address Field */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <Input
            placeholder="Enter your email"
            type="email"
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            placeholder="Enter your password"
            type="password"
            className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <Input
            placeholder="Confirm your password"
            type="password"
            className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right text-sm text-blue-600 cursor-pointer">Forgot password?</div>

        {/* Create Account Button */}
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Create Account
        </Button>

        {/* Google Button */}
        <Separator className="my-2" />
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Don&apos;t have an account yet?{" "}
        <Link href={'/auth/login'}>
          <span className="text-blue-600 cursor-pointer">Login</span>
        </Link>
      </p>
    </CardContent>
  );
}

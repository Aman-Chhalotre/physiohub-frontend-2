'use client'

import { Button } from "../../../components/ui/button.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { CardContent } from "../../../components/ui/card.jsx";
import { Separator } from "../../../components/ui/separator.jsx";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide icons
import { useRouter } from "next/navigation.js";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted");  
      router.push("/onboarding")
      // Submit form logic
    }
  };

  return (
    <CardContent>
      <img className="md:flex lg:hidden hidden w-[160px] mb-10" src={'/logo-on-light.png'} />
      <h2 className="text-xl font-bold text-gray-900 mb-4">Login to Your Account</h2>
      <p className="text-sm text-gray-500 mb-4">Access your personalized dashboard by logging into your account.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="text-xl" /> : <Eye className="text-xl" />}
            </span>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right text-sm text-blue-600 cursor-pointer">Forgot password?</div>

        {/* Login Button */}
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Login
        </Button>

        {/* Google Button */}
        <Separator className="my-2" />
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Don&apos;t have an account yet?{" "}
        <Link href={'/auth/signup'}>
          <span className="text-blue-600 cursor-pointer">Sign up</span>
        </Link>
      </p>
    </CardContent>
  );
}

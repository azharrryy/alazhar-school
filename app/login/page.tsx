"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, BookOpen, GraduationCap, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function LoginPage() {
  const { login } = useUser();
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Use Supabase authentication
      await login(email, password);
      
      // Show success message
      alert(`Welcome back! You are logged in as a ${userType}.`);
      
      // Redirect to dashboard
        router.push("/dashboard");
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific Supabase errors
      if (error.message?.includes('Invalid login credentials')) {
        setErrors({ password: "Invalid email or password. Please try again." });
      } else if (error.message?.includes('Email not confirmed')) {
        setErrors({ email: "Please check your email and confirm your account." });
      } else {
      alert("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen py-20 px-4 relative"
      style={{
        backgroundImage: 'url("/backgrund1.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Hero Section */}
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="max-w-5xl mx-auto rounded-3xl shadow-2xl p-12 border-4 border-amber-600 relative overflow-hidden"
            style={{
              backgroundImage: 'url("/islamic-pattern-bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '2rem',
              border: '4px solid #FFD700',
              boxShadow: '0 8px 32px #00000077, 0 2px 8px #FFD70099, 0 1.5px 0 #fff',
            }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" style={{borderRadius: '1.5rem'}}></div>
            <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
              style={{
                  color: '#8B4513',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                  fontFamily: 'Noto Serif, serif',
                  fontWeight: 900,
                  marginTop: '-40px'
                }}
              >
                Welcome Back
              </h1>
              <p className="text-xl md:text-2xl font-semibold mb-10"
                style={{
                  color: '#8B4513',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                  fontFamily: 'Noto Serif, serif',
                  fontWeight: 600
                }}
              >
                Sign in to continue your Islamic education journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card 
            className="rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 bg-white/95 backdrop-blur-sm"
            style={{
              boxShadow: '0 8px 32px #00000077, 0 2px 8px #FFD70099, 0 1.5px 0 #fff',
            }}
          >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <User className="w-8 h-8 text-amber-600 mr-3" />
                  Sign In
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Choose account type and enter your details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Steps Guide */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Login Steps:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-amber-700">
                    <li>Choose account type (Student or Teacher)</li>
                    <li>Enter your email address</li>
                    <li>Enter your password</li>
                    <li>Click "Sign In"</li>
                  </ol>
                </div>

                {/* Password Information */}
                {userType === "student" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Student Password:
                    </h4>
                    <div className="text-sm text-blue-700">
                      <p><strong>All students use:</strong> <code className="bg-blue-100 px-2 py-1 rounded">student123</code></p>
                      <p className="text-xs text-blue-600 mt-1">
                        Each student has a unique email address, but the same password for simplicity.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Account Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("student")}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "student"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-amber-300"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                        <span className="font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("teacher")}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      userType === "teacher"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-amber-300"
                    }`}
                  >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Teacher</span>
                  </button>
                    </div>
                </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                      />
                    </div>
                  {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                      />
                    </div>
                  {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  </div>

                  {/* Submit Button */}
                <Button
                    type="submit"
                  disabled={isLoading}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                  {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      Signing In...
                      </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                </form>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-amber-600 hover:text-amber-700 font-semibold">
                      Register here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Comprehensive Education */}
            <div
              className="text-center p-8 rounded-3xl border-4 shadow-2xl transition-all duration-500 bg-white/95 relative group hover:scale-105 hover:shadow-3xl"
              style={{
                borderColor: '#FFD700',
                boxShadow: '0 8px 32px #00000055, 0 2px 8px #FFD70099, 0 1.5px 0 #fff',
                background: 'linear-gradient(135deg, #fffbe6 60%, #f8f3eb 100%)',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fffbe6 60%, #FFD700 100%)',
                  boxShadow: '0 4px 16px #8B4513AA, 0 2px 8px #FFD70099, 0 0 0 6px #fffbe6',
                    border: '3px solid #FFD700',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <BookOpen 
                    className="w-12 h-12 text-amber-600 drop-shadow-lg transition-transform duration-300 group-hover:scale-125" 
                  style={{ filter: 'drop-shadow(0 2px 4px #8B4513AA)' }} 
                />
              </div>
                <h3 className="card-title">
                Comprehensive Education
              </h3>
              <p
                  className="text-base font-medium leading-relaxed px-2"
                style={{
                    color: '#8B4513',
                    textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  fontFamily: 'Noto Serif, serif',
                  fontWeight: 600,
                    lineHeight: '1.8',
                    fontSize: '15px'
                }}
              >
                Access to Quran, Arabic language, and Islamic studies in one place
              </p>
              </div>
            </div>

            {/* Card 2 - Expert Teachers */}
            <div
              className="text-center p-8 rounded-3xl border-4 shadow-2xl transition-all duration-500 bg-white/95 relative group hover:scale-105 hover:shadow-3xl"
              style={{
                borderColor: '#FFD700',
                boxShadow: '0 8px 32px #00000055, 0 2px 8px #FFD70099, 0 1.5px 0 #fff',
                background: 'linear-gradient(135deg, #fffbe6 60%, #f8f3eb 100%)',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fffbe6 60%, #FFD700 100%)',
                  boxShadow: '0 4px 16px #8B4513AA, 0 2px 8px #FFD70099, 0 0 0 6px #fffbe6',
                    border: '3px solid #FFD700',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <User 
                    className="w-12 h-12 text-amber-600 drop-shadow-lg transition-transform duration-300 group-hover:scale-125" 
                  style={{ filter: 'drop-shadow(0 2px 4px #8B4513AA)' }} 
                />
              </div>
                <h3 className="card-title">
                Expert Teachers
              </h3>
              <p
                  className="text-base font-medium leading-relaxed px-2"
                style={{
                    color: '#8B4513',
                    textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  fontFamily: 'Noto Serif, serif',
                  fontWeight: 600,
                    lineHeight: '1.8',
                    fontSize: '15px'
                }}
              >
                Learn from certified Al-Azhar scholars with years of experience
              </p>
              </div>
            </div>

            {/* Card 3 - Flexible Schedule */}
            <div
              className="text-center p-8 rounded-3xl border-4 shadow-2xl transition-all duration-500 bg-white/95 relative group hover:scale-105 hover:shadow-3xl"
              style={{
                borderColor: '#FFD700',
                boxShadow: '0 8px 32px #00000055, 0 2px 8px #FFD70099, 0 1.5px 0 #fff',
                background: 'linear-gradient(135deg, #fffbe6 60%, #f8f3eb 100%)',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fffbe6 60%, #FFD700 100%)',
                  boxShadow: '0 4px 16px #8B4513AA, 0 2px 8px #FFD70099, 0 0 0 6px #fffbe6',
                    border: '3px solid #FFD700',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <GraduationCap 
                    className="w-12 h-12 text-amber-600 drop-shadow-lg transition-transform duration-300 group-hover:scale-125" 
                  style={{ filter: 'drop-shadow(0 2px 4px #8B4513AA)' }} 
                />
              </div>
                <h3 className="card-title">
                Flexible Schedule
              </h3>
              <p
                  className="text-base font-medium leading-relaxed px-2"
                style={{
                    color: '#8B4513',
                    textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  fontFamily: 'Noto Serif, serif',
                  fontWeight: 600,
                    lineHeight: '1.8',
                    fontSize: '15px'
                }}
              >
                Study at your own pace with 24/7 access to educational materials
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
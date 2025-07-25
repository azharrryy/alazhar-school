"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Phone, BookOpen, GraduationCap, Globe } from "lucide-react";
import { FadeInSection } from "@/components/fade-in-section";
import { AnimatedButton } from "@/components/animated-button";
import { ShimmerBackground } from "@/components/shimmer-background";
import { useState } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    age: "",
    experience: ""
  });

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      alert("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return false;
    }
    if (!formData.country) {
      alert("Please select your country");
      return false;
    }
    if (!formData.age || parseInt(formData.age) < 6) {
      alert("Please enter a valid age (minimum 6 years)");
      return false;
    }
    if (userType === "teacher" && (!formData.experience || parseInt(formData.experience) < 1)) {
      alert("Please enter your teaching experience (minimum 1 year)");
      return false;
    }
    
    // For students, use standard password
    if (userType === "student") {
      if (formData.password !== "student123") {
        alert("For students, please use the standard password: student123");
        return false;
      }
    } else {
      // For teachers, validate custom password
      if (!formData.password) {
        alert("Password is required");
        return false;
      }
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success message
      alert(`Welcome ${formData.firstName}! Your account has been created successfully.`);
      
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (userType === "student" && field === "password") {
      // For students, always set password to student123
      setFormData(prev => ({ ...prev, password: "student123", confirmPassword: "student123" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const isFormValid = () => {
    const basicValidation = (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.email.includes("@") &&
      formData.phone.trim() &&
      formData.country &&
      formData.age &&
      parseInt(formData.age) >= 6 &&
      (userType !== "teacher" || (formData.experience && parseInt(formData.experience) >= 1))
    );

    if (userType === "student") {
      return basicValidation && formData.password === "student123";
    } else {
      return basicValidation && 
             formData.password && 
             formData.password.length >= 6 && 
             formData.password === formData.confirmPassword;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <ShimmerBackground />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeInSection>
            <div
              className="content-overlay max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl"
              style={{
                border: '4px solid #8B4513',
                boxShadow: '0 8px 32px #8B451344',
                borderRadius: '2rem'
              }}
            >
              <h1 className="text-3xl md:text-4xl font-black text-[#5a2600] mb-4 text-center" style={{ fontFamily: 'Noto Serif', fontWeight: 900 }}>
                Join Our Community
              </h1>
              <p className="text-lg text-[#8b4513] font-semibold mb-8" style={{ fontFamily: "Noto Serif", fontWeight: 600 }}>
                Start your Islamic education journey with Al-Azhar School
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeInSection>
            <Card className="enhanced-card rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <User className="w-8 h-8 text-amber-600 mr-3" />
                  Create Account
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Type Selection */}
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setUserType("student");
                      // Reset password fields for students
                      setFormData(prev => ({ ...prev, password: "student123", confirmPassword: "student123" }));
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "student"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-semibold">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserType("teacher");
                      // Clear password fields for teachers
                      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "teacher"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold">Teacher</span>
                  </button>
                </div>

                {/* Password Information for Students */}
                {userType === "student" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Student Password Information:
                    </h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>Standard Password:</strong> <code className="bg-blue-100 px-2 py-1 rounded">student123</code></p>
                      <p className="text-xs text-blue-600">
                        All students use the same password for simplicity. Each student has a unique email address.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                          value={formData.firstName}
                          onChange={e => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                          value={formData.lastName}
                          onChange={e => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                          value={formData.email}
                          onChange={e => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                          value={formData.phone}
                          onChange={e => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-700 font-semibold">Country</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="egypt">Egypt</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-gray-700 font-semibold">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        className="border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                        value={formData.age}
                        onChange={e => handleInputChange("age", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Teacher-specific fields */}
                  {userType === "teacher" && (
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-gray-700 font-semibold">Teaching Experience (Years)</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Enter your teaching experience"
                        className="border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                        value={formData.experience}
                        onChange={e => handleInputChange("experience", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {/* Password Fields */}
                  {userType === "student" ? (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-semibold">Password (Standard for Students)</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="student123 (pre-filled)"
                          className="pl-10 border-2 border-blue-200 focus:border-blue-400 rounded-xl hover:shadow-md transition-all duration-300 bg-blue-50"
                          value="student123"
                          readOnly
                        />
                      </div>
                      <p className="text-xs text-blue-600">
                        Standard password for all students. Cannot be changed.
                      </p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10 border-2 border-amber-200 focus:border-amber-400 rounded-xl hover:shadow-md transition-all duration-300"
                            value={formData.password}
                            onChange={e => handleInputChange("password", e.target.value)}
                            required
                          />
                        </div>
                        {formData.password && (
                          <div className="flex gap-1 mt-1">
                            <div className={`h-1 flex-1 rounded ${
                              formData.password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                            }`}></div>
                            <div className={`h-1 flex-1 rounded ${
                              formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                            }`}></div>
                            <div className={`h-1 flex-1 rounded ${
                              /[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                            }`}></div>
                            <div className={`h-1 flex-1 rounded ${
                              /[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                            }`}></div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className={`pl-10 border-2 rounded-xl hover:shadow-md transition-all duration-300 ${
                              formData.confirmPassword && formData.password !== formData.confirmPassword
                                ? "border-red-400 focus:border-red-500"
                                : "border-amber-200 focus:border-amber-400"
                            }`}
                            value={formData.confirmPassword}
                            onChange={e => handleInputChange("confirmPassword", e.target.value)}
                            required
                          />
                        </div>
                        {formData.confirmPassword && (
                          <p className={`text-xs ${
                            formData.password === formData.confirmPassword 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}>
                            {formData.password === formData.confirmPassword 
                              ? "✓ Passwords match" 
                              : "✗ Passwords do not match"}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" required />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms" className="text-amber-600 hover:text-amber-700 font-semibold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-semibold">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid()}
                    className={`w-full py-3 text-lg rounded-xl font-bold transition-all duration-300 ${
                      isLoading 
                        ? "bg-gray-400 cursor-not-allowed text-gray-600" 
                        : !isFormValid()
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-amber-600 hover:bg-amber-700 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
} 
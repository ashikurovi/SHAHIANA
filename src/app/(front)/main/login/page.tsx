"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../../api/authApi";
import { createUser } from "../../../../api/userApi";

export default function LoginPage() {
  const router = useRouter();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await loginUser({ email: loginEmail, password: loginPassword });
      if (res.statusCode === 200 || res.statusCode === 201) {
        if (res.data?.user?.role === 'admin') {
          window.location.href = "/dotadmin";
        } else {
          window.location.href = "/main/dashboard";
        }
      } else {
        setLoginError(res.message || "Login failed");
      }
    } catch (err) {
      setLoginError("An error occurred during login.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setRegisterLoading(true);
    try {
      const res = await createUser({ name: registerName, email: registerEmail, password: registerPassword });
      if (res.statusCode === 201) {
        setRegisterSuccess("Registration successful! You can now log in.");
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        setRegisterError(res.message || "Registration failed");
      }
    } catch (err) {
      setRegisterError("An error occurred during registration.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#590403] via-[#760604] to-[#590403] py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 w-16 h-16 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-2 right-12 w-24 h-24 border-2 border-white/20 rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 border border-white/20 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Leaf className="w-6 h-6 text-[#E69A06]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-[#E69A06]/90 font-medium">Sign in to your account or create a new one</p>
        </div>
      </div>

      {/* Forms */}
      <div className="flex-1 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LOGIN SECTION */}
          <div>
            <div className="bg-white border-[1px] border-[#760604]/10 rounded-2xl p-8 sm:p-10 shadow-lg shadow-[#760604]/5 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#760604]/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#760604]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#590403] tracking-tight">Log In</h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                {loginError && <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">{loginError}</p>}
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#590403] mb-2">
                    Email Address <span className="text-[#E69A06]">*</span>
                  </label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border-[1px] border-[#760604]/20 rounded-lg py-3 px-4 text-sm font-medium text-[#590403] focus:outline-none focus:border-[#760604] focus:ring-1 focus:ring-[#760604] transition-all placeholder-[#760604]/30 bg-[#FDFBF7]"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#590403] mb-2">
                    Password <span className="text-[#E69A06]">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type={showLoginPassword ? "text" : "password"} 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border-[1px] border-[#760604]/20 rounded-lg py-3 px-4 pr-12 text-sm font-medium text-[#590403] focus:outline-none focus:border-[#760604] focus:ring-1 focus:ring-[#760604] transition-all placeholder-[#760604]/30 bg-[#FDFBF7]"
                      placeholder="Enter your password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#760604]/40 hover:text-[#760604] focus:outline-none transition-colors"
                    >
                      {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loginLoading}
                    className="w-full bg-[#760604] text-white hover:bg-[#590403] font-semibold text-sm py-4 rounded-lg transition-all shadow-lg shadow-[#760604]/20 hover:shadow-xl hover:shadow-[#760604]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loginLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* REGISTER SECTION */}
          <div>
            <div className="bg-white border-[1px] border-[#760604]/10 rounded-2xl p-8 sm:p-10 shadow-lg shadow-[#760604]/5 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#E69A06]/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#E69A06]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#590403] tracking-tight">Register</h2>
              </div>
              <form onSubmit={handleRegister} className="space-y-5">
                {registerError && <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">{registerError}</p>}
                {registerSuccess && <p className="text-[#760604] text-sm font-medium bg-[#760604]/5 px-4 py-2 rounded-lg">{registerSuccess}</p>}
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#590403] mb-2">
                    Full Name <span className="text-[#E69A06]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full border-[1px] border-[#760604]/20 rounded-lg py-3 px-4 text-sm font-medium text-[#590403] focus:outline-none focus:border-[#760604] focus:ring-1 focus:ring-[#760604] transition-all placeholder-[#760604]/30 bg-[#FDFBF7]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#590403] mb-2">
                    Email Address <span className="text-[#E69A06]">*</span>
                  </label>
                  <input 
                    type="email" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full border-[1px] border-[#760604]/20 rounded-lg py-3 px-4 text-sm font-medium text-[#590403] focus:outline-none focus:border-[#760604] focus:ring-1 focus:ring-[#760604] transition-all placeholder-[#760604]/30 bg-[#FDFBF7]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#590403] mb-2">
                    Password <span className="text-[#E69A06]">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type={showRegisterPassword ? "text" : "password"} 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full border-[1px] border-[#760604]/20 rounded-lg py-3 px-4 pr-12 text-sm font-medium text-[#590403] focus:outline-none focus:border-[#760604] focus:ring-1 focus:ring-[#760604] transition-all placeholder-[#760604]/30 bg-[#FDFBF7]"
                      placeholder="Create a password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#760604]/40 hover:text-[#760604] focus:outline-none transition-colors"
                    >
                      {showRegisterPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Register Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={registerLoading}
                    className="w-full bg-[#E69A06] text-white hover:bg-[#c88204] font-semibold text-sm py-4 rounded-lg transition-all shadow-lg shadow-[#E69A06]/20 hover:shadow-xl hover:shadow-[#E69A06]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {registerLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


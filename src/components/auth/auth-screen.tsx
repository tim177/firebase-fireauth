"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              isLogin
                ? "text-gray-900 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              !isLogin
                ? "text-gray-900 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6">
          <div className="transition-all duration-300 ease-in-out">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>

      {/* Toggle Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

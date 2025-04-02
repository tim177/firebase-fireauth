"use client";

import { useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { registerSchema } from "../../lib/validations/auth";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      // Successful registration will redirect or update UI based on your app's flow
      console.log("🥳 successfully created account");
    } catch (error: any) {
      console.error("Registration failed:", error);

      if (error.code === "auth/email-already-in-use") {
        setAuthError(
          "Email already in use. Please use a different email or sign in."
        );
      } else {
        setAuthError("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {authError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
          {authError}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="name"
          placeholder="John Doe"
          disabled={isLoading}
          {...register("name")}
          className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register("email")}
          className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isLoading}
            {...register("password")}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <div className="mt-1">
            <p className="text-sm text-red-500 font-medium">
              Password requirements:
            </p>
            <ul className="text-xs text-red-500 list-disc list-inside">
              {errors.password.message
                ?.split(". ")
                .map((error, index) => <li key={index}>{error}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isLoading}
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          {...register("terms")}
          className={`h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 ${
            errors.terms ? "border-red-500" : ""
          }`}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none text-gray-700"
        >
          I agree to the{" "}
          <a href="#" className="text-purple-600 hover:text-purple-800">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-600 hover:text-purple-800">
            privacy policy
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-sm text-red-500">{errors.terms.message}</p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Please wait
            </span>
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </form>
  );
}

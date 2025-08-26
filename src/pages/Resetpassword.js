// 'use client';

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import toast, { Toaster } from "react-hot-toast";
// import { BASE_URL } from "@/utils/BASE_URL";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [token, setToken] = useState("");

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   useEffect(() => {
//     const resetToken = searchParams.get("token");
//     if (resetToken) {
//       setToken(resetToken);
//     } else {
//       toast.error("No token found in URL");
//     }
//   }, [searchParams]);

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token,
//           newPassword: password,
//         }),
//       });

//       if (response.ok) {
//         toast.success("Password successfully reset. You can now log in!");
//         router.push("/");
//       } else {
//         const errorData = await response.json();
//         toast.error(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       toast.error("An unexpected error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center mt-8 mb-8 bg-blue-500">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4 text-center">New Password</h2>
//         <p className="text-sm text-center font-bold mb-6">
//           Please create a new password here.
//         </p>
//         <form onSubmit={handlePasswordReset}>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               placeholder="Create new password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="p-3 w-full border border-gray-300 outline-sky-500 rounded my-2"
//             />
//             <span
//               className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               placeholder="Confirm your password"
//               className="p-3 w-full border border-gray-300 outline-sky-500 rounded my-2"
//             />
//             <span
//               className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-sky-500 text-white p-3 rounded hover:text-black hover:bg-transparent transition border hover:border-gray-300"
//           >
//             Change
//           </button>
//           <div className="flex justify-center">
//             <Link
//               href="/"
//               className="block mt-2 font-bold text-gray-500 text-sm underline focus:outline-none"
//             >
//               Back?
//             </Link>
//           </div>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default ResetPassword;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/utils/BASE_URL";



export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    } else {
      toast.error("No token found in URL");
    }
  }, [searchParams]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        toast.success("Password successfully reset. You can now log in!");
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-8 bg-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">New Password</h2>
        <p className="text-sm text-center font-bold mb-6">
          Please create a new password here.
        </p>
        <form onSubmit={handlePasswordReset}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Create new password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 w-full border border-gray-300 outline-sky-500 rounded my-2"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="p-3 w-full border border-gray-300 outline-sky-500 rounded my-2"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white p-3 rounded hover:text-black hover:bg-transparent transition border hover:border-gray-300"
          >
            Change
          </button>
          <div className="flex justify-center">
            <Link
              href="/"
              className="block mt-2 font-bold text-gray-500 text-sm underline focus:outline-none"
            >
              Back?
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

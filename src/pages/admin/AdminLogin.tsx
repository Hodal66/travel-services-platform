// import React, { useState, useEffect } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { useAdmin } from '@/contexts/AdminContext';
// import { Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
// import toast from 'react-hot-toast';

// const AdminLogin: React.FC = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();
//   const { login, isAuthenticated, loading: contextLoading } = useAdmin();

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (isAuthenticated && !contextLoading) {
//       navigate('/admin/dashboard', { replace: true });
//     }
//   }, [isAuthenticated, contextLoading, navigate]);

//   // Show loading while context is checking authentication
//   if (contextLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-white/70">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Already authenticated - redirect
//   if (isAuthenticated) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     const { email, password } = credentials;

//     if (!email.trim() || !password.trim()) {
//       setError('Please enter both email and password.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const success = await login(email.trim(), password);
      
//       if (success) {
//         toast.success('Welcome to TravelHub Admin Dashboard!');
//         // Navigation handled by useEffect
//       } else {
//         setError('Invalid credentials. Please check your email and password.');
//         toast.error('Authentication failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred. Please try again.');
//       toast.error('Login service temporarily unavailable.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCredentials(prev => ({ ...prev, [field]: e.target.value }));
//     if (error) setError(''); // Clear error when user starts typing
//   };

//   const handleBackToHome = () => {
//     navigate('/', { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0  opacity-20"></div>
      
//       <div className="relative w-full max-w-md">
//         {/* Back Button */}
//         <button
//           onClick={handleBackToHome}
//           className="absolute -top-16 left-0 flex items-center text-white/70 hover:text-white transition-colors duration-200"
//           aria-label="Back to Home"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Home
//         </button>

//         {/* Login Card */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
//           <div className="text-center mb-8">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
//               <Lock className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
//             <p className="text-white/70">Secure access to TravelHub management</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email/Username Field */}
//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-white/90 font-medium">
//                 Email or Username
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                 <input
//                   id="email"
//                   type="text"
//                   value={credentials.email}
//                   onChange={handleInputChange('email')}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your email or username"
//                   required
//                   autoComplete="username"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-white/90 font-medium">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={credentials.password}
//                   onChange={handleInputChange('password')}
//                   className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your password"
//                   required
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center text-red-200 text-sm">
//                 <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                   Authenticating...
//                 </div>
//               ) : (
//                 'Access Dashboard'
//               )}
//             </button>

//             {/* Demo Credentials */}
//             <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-blue-200 text-sm">
//               <p className="font-medium mb-2 flex items-center">
//                 <AlertCircle className="w-4 h-4 mr-1" />
//                 Demo Access:
//               </p>
//               <div className="space-y-1 pl-5">
//                 <p><strong>Username:</strong> <code className="bg-blue-600/30 px-1 rounded">admin</code></p>
//                 <p><strong>Email:</strong> <code className="bg-blue-600/30 px-1 rounded text-xs">admin@travelservices.com</code></p>
//                 <p><strong>Password:</strong> <code className="bg-blue-600/30 px-1 rounded">admin123</code></p>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


// src/pages/admin/AdminLogin.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated, contextLoading } = useAdmin();

  // Already authenticated → redirect
  useEffect(() => {
    if (isAuthenticated && !contextLoading) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, contextLoading, navigate]);

  if (contextLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { email, password } = credentials;

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(email.trim(), password);
      if (success) {
        toast.success("Welcome to TravelHub Admin Dashboard!");
      } else {
        setError("Invalid credentials. Please check your email and password.");
        toast.error("Authentication failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      toast.error("Login service temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError("");
    };

  const handleBackToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <button
          onClick={handleBackToHome}
          className="absolute -top-16 left-0 flex items-center text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/70">Secure access to TravelHub management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white/90 font-medium">Email or Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={credentials.email}
                  onChange={handleInputChange("email")}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white"
                  placeholder="Enter your email or username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/90 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleInputChange("password")}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg"
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

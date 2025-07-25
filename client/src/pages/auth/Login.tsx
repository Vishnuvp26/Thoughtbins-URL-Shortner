import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/api/auth.api";
import { setUser } from "@/redux/slice/auth.slice";
import { VALIDATION_MESSAGES } from "@/constants/messages/message.constants";

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        
        let hasError = false;
        if (!email) {
            setEmailError(VALIDATION_MESSAGES.EMAIL.REQUIRED);
            hasError = true;
        }
        if (!password) {
            setPasswordError(VALIDATION_MESSAGES.PASSWORD.REQUIRED);
            hasError = true;
        }
        if (hasError) return;

        setLoading(true);
        setError("");
        try {
            const response = await loginUser(email, password);
            dispatch(setUser({
                _id: response.user?._id || "",
                name: response.user?.name || "",
                email: response.user?.email || "",
                accessToken: response.accessToken || null,
            }));
            navigate('/')
        } catch (err: any) {
            setError(err.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white not-first:px-4">
            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="w-full max-w-md rounded-2xl shadow-none bg-none p-8">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                    Welcome Back
                </h2>
                <h4 className="text-md font-medium text-center mb-6 text-gray-800">
                    Log in to your account
                </h4>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            className={`h-12 px-4 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                placeholder="Enter your password"
                                className={`h-12 px-4 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <Eye className="h-5 w-5" />
                                ) : (
                                    <EyeOff className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        <span className="px-2 text-gray-500 dark:text-gray-400">OR</span>
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                        Don’t have an account?
                        <Link to="/sign-up" className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"> Sign up</Link>
                    </p>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 font-semibold rounded-mdtransition-colors duration-300"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                Please wait...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
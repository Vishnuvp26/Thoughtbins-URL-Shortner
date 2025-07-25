import { registerUser } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MESSAGES } from "@/constants/messages/message.constants";
import { validateRegistration } from "@/utils/validation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        const { errors } = validateRegistration({ ...formData, [name]: value });
        setError((prev) => ({ ...prev, [name]: errors[name] || "" }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { valid, errors } = validateRegistration(formData);
        if (!valid) {
            setError(errors);
            return;
        }

        try {
            setLoading(true);
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setError({});

            toast(response.message, {
                description: MESSAGES.ACCOUNT_CREATED,
                action: {
                    label: "Ok",
                    onClick: () => navigate('/login'),
                },
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error: any) {
            setError({ general: error.error || MESSAGES.SOMETHING_WRONG });
        } finally {
            setLoading(false);
        }
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
                    Welcome
                </h2>
                <h4 className="text-md font-medium text-center mb-6 text-gray-800">
                    Create an account
                </h4>
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Name Input */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className={`h-12 px-4 border ${error.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        {error.name && <p className="text-sm text-red-500 mt-1">{error.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="johndoe@gmail.com"
                            className={`h-12 px-4 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {error.email && <p className="text-sm text-red-500 mt-1">{error.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className={`h-12 px-4 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {error.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className={`h-12 px-4 border ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {error.confirmPassword && <p className="text-sm text-red-500 mt-1">{error.confirmPassword}</p>}
                    </div>
                    {error.general && <p className="text-sm text-red-500 text-center mt-2">{error.general}</p>}
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        <span className="px-2 text-gray-500 dark:text-gray-400">OR</span>
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                        Already have an account?
                        <Link to="/login" className="text-[#0077B6] dark:text-[#00FFE5] font-medium hover:underline"> Login</Link>
                    </p>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 font-semibold rounded-md transition-colors duration-300 text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Signing up...
                            </>
                        ) : (
                            "Signup"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
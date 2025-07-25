import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UrlShortenerForm = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (url.trim() === "") {
            setError(true);
            return;
        }
        setError(false);
    };

    return (
        <div className="mt-10 w-full max-w-2xl px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3"
            >
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your long URL here..."
                    className={`w-full h-12 sm:h-14 text-sm sm:text-base bg-white text-black shadow-md px-4 ${error ? "border-red-500" : "border-gray-400"
                        }`}
                />
                <Button
                    type="submit"
                    className="w-full sm:w-auto h-12 sm:h-14 px-6 bg-gradient-to-r from-[#FFA500] via-[#FFCC00] to-[#FFF700] text-gray-900 font-semibold transition-transform duration-300 shadow-lg hover:brightness-95"
                >
                    Shorten URL
                </Button>
            </form>
            {error && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                    Please enter a valid URL before submitting.
                </p>
            )}
        </div>
    );
};

export default UrlShortenerForm;
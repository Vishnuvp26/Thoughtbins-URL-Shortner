import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { shortenUrl } from "@/api/url.api";
import { MESSAGES } from "@/constants/messages/message.constants";
import ShortenedUrlCard from "./CopyUrl";

const UrlShortenerForm = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [copyStatus, setCopyStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setErrorMessage("");
        setShortUrl("");

        if (url.trim() === "") {
            setError(true);
            setErrorMessage(MESSAGES.URL_REQUIRED);
            return;
        }
        try {
            setLoading(true);
            const response = await shortenUrl({ originalUrl: url.trim() });
            setShortUrl(response.shortUrl);
        } catch (err: any) {
            setError(true);
            setErrorMessage(err.error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleReset = () => {
        setUrl("");
        setError(false);
        setShortUrl("");
        setErrorMessage("");
        setCopyStatus(false);
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
                    disabled={loading}
                    className="w-full sm:w-auto h-12 sm:h-14 px-6 bg-gradient-to-r from-[#FFA500] via-[#FFCC00] to-[#FFF700] text-gray-900 font-semibold transition-transform duration-300 shadow-lg hover:brightness-95"
                >
                    {loading && (
                        <Loader2 className="animate-spin h-5 w-5" />
                    )}
                    {loading ? "Shortening..." : "Shorten URL"}
                </Button>
            </form>

            {error && errorMessage && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                    {errorMessage}
                </p>
            )}

            {shortUrl && (
                <div className="mt-6">
                    <ShortenedUrlCard
                        shortUrl={shortUrl}
                        copyStatus={copyStatus}
                        handleCopy={handleCopy}
                    />
                    <div className="mt-4 flex justify-center">
                        <Button
                            onClick={handleReset}
                            className="px-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-md transition-colors duration-200"
                        >
                            Try Another
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlShortenerForm;
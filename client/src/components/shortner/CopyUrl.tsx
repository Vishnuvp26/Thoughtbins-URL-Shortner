import { Button } from "@/components/ui/button";
import type { ShortenedUrlCardProps } from "@/types/types";
import { Copy, Check } from "lucide-react";

const ShortenedUrlCard = ({
  shortUrl,
  copyStatus,
  handleCopy,
}: ShortenedUrlCardProps) => {
    return (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium break-all mr-4">
                    {shortUrl}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleCopy}
                        variant="ghost"
                        size="icon"
                        className={`min-w-[40px] h-10 ${copyStatus ? "text-green-600" : "text-gray-600"
                            }`}
                    >
                        {copyStatus ? (
                            <Check className="h-5 w-5" />
                        ) : (
                            <Copy className="h-5 w-5" />
                        )}
                    </Button>
                    {copyStatus && (
                        <span className="text-green-700 text-xs font-medium">
                            Copied!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShortenedUrlCard;
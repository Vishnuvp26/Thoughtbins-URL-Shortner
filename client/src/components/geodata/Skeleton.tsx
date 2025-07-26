import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsSkeleton = () => {
    return (
        <div className="w-full p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Loading analytics...</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-[300px] w-full lg:col-span-2" />
            </div>
        </div>
    );
};

export default AnalyticsSkeleton;
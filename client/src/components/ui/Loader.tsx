const BarLoader = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-600">
                <span>Loading</span>
                <span className="animate-bounce delay-[0ms]">.</span>
                <span className="animate-bounce delay-[150ms]">.</span>
                <span className="animate-bounce delay-[300ms]">.</span>
            </div>
        </div>
    );
};

export default BarLoader;
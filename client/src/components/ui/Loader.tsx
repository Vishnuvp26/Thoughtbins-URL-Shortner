const BarLoader = () => {
  const bars = [0, 100, 200, 300, 400];

    return (
        <div className="flex gap-1 items-end h-12">
            {bars.map((delay, i) => (
                <div
                    key={i}
                    className="w-2 h-4 bg-black animate-bar"
                    style={{ animationDelay: `${delay}ms` }}
                />
            ))}
        </div>
    );
};

export default BarLoader;
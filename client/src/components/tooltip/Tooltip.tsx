export const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className=" p-4 rounded-lg shadow-lg border">
                <p className="font-semibold">{label}</p>
                <p className="text-[#8884d8]">
                    Clicks: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getAnalytics } from "@/api/url.api";
import TablePagination from "../pagination/Pagination";
import { CustomTooltip } from "../tooltip/Tooltip";
import { MESSAGES } from "@/constants/messages/message.constants";
import type { Analytics } from "@/types/types";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart, Pie, Cell, Legend, CartesianGrid, Label} from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store/store";
import AnalyticsSkeleton from "./Skeleton";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const ITEMS_PER_PAGE = 5;

const GeoData = () => {
    const [analytics, setAnalytics] = useState<Analytics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const shortCode = useSelector((state: RootState) => state.shortCode.value);
    console.log('shortCode use selector :', shortCode);

    useEffect(() => {
        if (!shortCode) {
            setLoading(false);
            return;
        }
        fetchAnalytics();
    }, [shortCode]);

    const fetchAnalytics = async () => {
        try {
            const data = await getAnalytics();
            setAnalytics(data);
        } catch (err: any) {
            setError(err.message || MESSAGES.ANALYTICS_FAILED);
        } finally {
            setLoading(false);
        }
    };

    if (!loading && analytics.length === 0) return

    const prepareCountryData = () => {
        const countryData: { name: string; value: number }[] = [];
        analytics.forEach(item => {
            Object.entries(item.countryDistribution).forEach(([country, count]) => {
                const existingCountry = countryData.find(d => d.name === country);
                if (existingCountry) {
                    existingCountry.value += count;
                } else {
                    countryData.push({ name: country, value: count });
                }
            });
        });
        return countryData;
    };

    const prepareClickData = () => {
        return analytics.map(item => ({
            shortCode: item.shortCode,
            clicks: item.clickCount
        }));
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return percent > 0.05 ? (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    const paginatedData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return analytics.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(analytics.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <AnalyticsSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[400px] text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full p-4 sm:p-6">
            <div className="container pt-6 mx-auto bg-white bg-[radial-gradient(rgba(0,0,0,0.2)_0.8px,transparent_1px)] [background-size:20px_20px]">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Click Distribution */}
                    <Card className="p-4 sm:p-6 shadow-lg min-w-0 w-full">
                        <h3 className="text-lg font-semibold mb-4">Click Distribution</h3>
                        <div className="h-[300px] sm:h-[400px] min-w-0 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={prepareClickData()}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis
                                        dataKey="shortCode"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        tick={{ fontSize: 12 }}
                                    >
                                        <Label value="Short URLs" position="bottom" offset={-0.5} className="-mb:3" />
                                    </XAxis>
                                    <YAxis tick={{ fontSize: 12 }}>
                                        <Label
                                            value="Number of Clicks"
                                            angle={-90}
                                            position="left"
                                            style={{ textAnchor: 'middle' }}
                                        />
                                    </YAxis>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="clicks"
                                        fill="#8884d8"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Country Distribution */}
                    <Card className="p-4 sm:p-6 shadow-lg min-w-0 w-full">
                        <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
                        <div className="h-[300px] sm:h-[400px] min-w-0 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={prepareCountryData()}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius="80%"
                                        innerRadius="40%"
                                        fill="#8884d8"
                                        dataKey="value"
                                        paddingAngle={2}
                                    >
                                        {prepareCountryData().map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        layout="horizontal"
                                        align="center"
                                        verticalAlign="bottom"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* URLs Table */}
                    <Card className="p-4 sm:p-6 shadow-lg min-w-0 w-full lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">URL Details</h3>
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-3 font-semibold w-1/4">Short URL</th>
                                        <th className="p-3 font-semibold w-2/4">Original URL</th>
                                        <th className="p-3 font-semibold w-1/4">Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData().map((item) => (
                                        <tr
                                            key={item.shortCode}
                                            className="border-b hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-3">{item.shortUrl}</td>
                                            <td className="p-3 max-w-[180px] truncate text-ellipsis overflow-hidden">
                                                {item.originalUrl}
                                            </td>
                                            <td className="p-3">{item.clickCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <TablePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                className="mt-4"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GeoData; 
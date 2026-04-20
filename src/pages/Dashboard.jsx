import {useState, useEffect} from 'react';
import Layout from '../components/Layout';

{/* Bear in mind functions are for demo purposes only currently */
}
export default function Dashboard() {
    // Simulate the backend API data fetch
    const [data, setData] = useState({
        activeCensus: 0,
        newAdmissions: 0,
        insuranceRate: 0,
        isLoading: true
    });

    // State for our live clock and date
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Fetch simulated data
        setTimeout(() => {
            setData({
                activeCensus: 1248,
                newAdmissions: 42,
                insuranceRate: 94,
                isLoading: false
            });
        }, 800);

        // Start the ticking clock
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer); // Cleanup when leaving page
    }, []);

    // Generate the last 7 weekdays for the chart. Can be useful later on
    const chartDays = (() => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const targetDay = new Date(currentTime);
            targetDay.setDate(currentTime.getDate() - i);
            days.push(weekdays[targetDay.getDay()]);
        }
        return days;
    })();

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = currentTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});

    return (
        <Layout>
            <div className="p-6 md:p-12 max-w-[1600px] mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-1">
                            Dashboard Overview
                        </h1>
                        <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>{formattedDate}</span>&nbsp;·&nbsp;
                            <span className="material-symbols-outlined text-[16px]">nest_clock_farsight_analog</span>
                            <span>{formattedTime}</span>&nbsp;· System Normal
                        </p>
                    </div>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Top Row: Summary Cards */}
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Active Census */}
                        <div
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1rem] p-6 shadow-sm dark:shadow-none relative overflow-hidden group transition-colors duration-200">
                            <div
                                className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span
                                    className="material-symbols-outlined text-6xl text-primary dark:text-primary-dark">groups</span>
                            </div>
                            <p className="text-[0.65rem] uppercase tracking-[0.05rem] font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-4 font-label">
                                Active Census
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.activeCensus.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span
                                    className="bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark px-2 py-0.5 rounded-md flex items-center gap-1 font-medium text-xs">
                                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +12
                                </span>
                                <span className="text-on-surface-variant dark:text-on-surface-variant-dark text-xs">from yesterday</span>
                            </div>
                        </div>

                        {/* New Admissions */}
                        <div
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1rem] p-6 shadow-sm dark:shadow-none relative overflow-hidden group transition-colors duration-200">
                            <div
                                className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span
                                    className="material-symbols-outlined text-6xl text-primary dark:text-primary-dark">assignment_ind</span>
                            </div>
                            <p className="text-[0.65rem] uppercase tracking-[0.05rem] font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-4 font-label">
                                New Admissions
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.newAdmissions}
                            </h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span
                                    className="bg-surface-container-high dark:bg-surface-container-high-dark text-on-surface-variant dark:text-on-surface-variant-dark px-2 py-0.5 rounded-md flex items-center gap-1 font-medium text-xs">
                                    Pending Triage: 8
                                </span>
                            </div>
                        </div>

                        {/* Insurance Status */}
                        <div
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1rem] p-6 shadow-sm dark:shadow-none relative overflow-hidden group transition-colors duration-200">
                            <div
                                className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span
                                    className="material-symbols-outlined text-6xl text-primary dark:text-primary-dark">verified_user</span>
                            </div>
                            <p className="text-[0.65rem] uppercase tracking-[0.05rem] font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-4 font-label">
                                Insurance Verification
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.insuranceRate}<span
                                className="text-2xl text-on-surface-variant dark:text-on-surface-variant-dark">%</span>
                            </h3>
                            <div
                                className="w-full bg-surface-container-high dark:bg-surface-container-high-dark h-1.5 rounded-full mt-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark h-full rounded-full transition-all duration-1000"
                                    style={{width: data.isLoading ? "0%" : `${data.insuranceRate}%`}}
                                ></div>
                            </div>
                            <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark mt-2">14
                                records require attention</p>
                        </div>
                    </div>

                    {/* Middle Row: Charts */}
                    <div
                        className="md:col-span-8 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm dark:shadow-none flex flex-col transition-colors duration-200">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark">Registration
                                    Velocity</h3>
                                <p className="text-sm text-on-surface-variant dark:text-on-surface-variant-dark font-body">Trailing
                                    7 days admission volume</p>
                            </div>
                            <button
                                className="text-primary dark:text-primary-dark hover:bg-surface-container-low dark:hover:bg-surface-container-low-dark p-2 rounded-full transition-colors">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>

                        {/* Chart Bars */}
                        <div className="flex-1 flex items-end gap-2 mt-auto h-48 relative">
                            <div
                                className="absolute w-full flex flex-col justify-between h-full top-0 left-0 pointer-events-none opacity-20">
                                <div className="border-t border-outline-variant dark:border-outline-dark w-full"></div>
                                <div className="border-t border-outline-variant dark:border-outline-dark w-full"></div>
                                <div className="border-t border-outline-variant dark:border-outline-dark w-full"></div>
                                <div className="border-t border-outline-variant dark:border-outline-dark w-full"></div>
                            </div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[40%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[60%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[50%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[80%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[70%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[90%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                            <div
                                className="flex-1 bg-gradient-to-t from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark rounded-t-sm h-[100%] shadow-lg cursor-pointer"></div>
                        </div>

                        {/* Dynamic Chart Labels */}
                        <div
                            className="flex justify-between mt-4 text-xs font-label uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant-dark px-2">
                            {chartDays.map((day, index) => (
                                <span key={index}>{day}</span>
                            ))}
                        </div>
                    </div>

                    {/* Demographics Narrow Bento Right Side */}
                    <div
                        className="md:col-span-4 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm dark:shadow-none flex flex-col transition-colors duration-200">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-6">Demographics</h3>
                        <div className="space-y-6">
                            <div>
                                <div
                                    className="flex justify-between text-sm font-medium text-on-surface dark:text-on-surface-dark mb-2">
                                    <span>65+ Years</span>
                                    <span className="font-bold">42%</span>
                                </div>
                                <div
                                    className="w-full bg-surface-container-high dark:bg-surface-container-high-dark h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary dark:bg-primary-dark h-full rounded-full"
                                         style={{width: "42%"}}></div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex justify-between text-sm font-medium text-on-surface dark:text-on-surface-dark mb-2">
                                    <span>45-64 Years</span>
                                    <span className="font-bold">38%</span>
                                </div>
                                <div
                                    className="w-full bg-surface-container-high dark:bg-surface-container-high-dark h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#5c5c5c] dark:bg-outline-dark h-full rounded-full"
                                         style={{width: "38%"}}></div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="flex justify-between text-sm font-medium text-on-surface dark:text-on-surface-dark mb-2">
                                    <span>18-44 Years</span>
                                    <span className="font-bold">15%</span>
                                </div>
                                <div
                                    className="w-full bg-surface-container-high dark:bg-surface-container-high-dark h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-outline-variant dark:bg-surface-container-highest-dark h-full rounded-full"
                                        style={{width: "15%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div
                        className="md:col-span-8 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm dark:shadow-none transition-colors duration-200">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-4">Recent
                            Activity</h3>
                        <p className="text-on-surface-variant dark:text-on-surface-variant-dark text-sm">Activity feed
                            will be implemented here. (Pending data from Persistence Team)</p>
                    </div>

                    {/* Quick Actions */}
                    <div
                        className="md:col-span-4 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm dark:shadow-none transition-colors duration-200">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-4">Quick
                            Actions</h3>
                        <p className="text-on-surface-variant dark:text-on-surface-variant-dark text-sm">Quick action
                            buttons will be implemented here.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
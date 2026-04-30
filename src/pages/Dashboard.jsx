import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export default function Dashboard() {
    const {t} = useTranslation();
    const [data, setData] = useState({activeCensus: 0, newAdmissions: 0, insuranceRate: 0, isLoading: true});
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setTimeout(() => {
            setData({activeCensus: 1248, newAdmissions: 42, insuranceRate: 94, isLoading: false});
        }, 800);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

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
        <>
            <div className="p-6 md:p-12 max-w-[1600px] mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-1">
                            {t('sidebar.dashboard')}
                        </h1>
                        <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>{formattedDate}</span>&nbsp;·&nbsp;
                            <span className="material-symbols-outlined text-[16px]">nest_clock_farsight_analog</span>
                            <span>{formattedTime}</span>&nbsp;·&nbsp; System Normal
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
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
                                {t('dashboard.activeCensus')}
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.activeCensus.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span
                                    className="bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark px-2 py-0.5 rounded-md flex items-center gap-1 font-medium text-xs">
                                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +12
                                </span>
                                <span
                                    className="text-on-surface-variant dark:text-on-surface-variant-dark text-xs">{t('dashboard.fromYesterday')}</span>
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
                                {t('dashboard.newAdmissions')}
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.newAdmissions}
                            </h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span
                                    className="bg-surface-container-high dark:bg-surface-container-high-dark text-on-surface-variant dark:text-on-surface-variant-dark px-2 py-0.5 rounded-md flex items-center gap-1 font-medium text-xs">
                                    {t('dashboard.pendingTriage')}: 8
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
                                {t('dashboard.insuranceRate')}
                            </p>
                            <h3 className="text-5xl font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter mb-2">
                                {data.isLoading ? "..." : data.insuranceRate}<span
                                className="text-2xl text-on-surface-variant dark:text-on-surface-variant-dark">%</span>
                            </h3>
                            <div
                                className="w-full bg-surface-container-high dark:bg-surface-container-high-dark h-1.5 rounded-full mt-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark h-full rounded-full transition-all duration-1000"
                                    style={{width: data.isLoading ? "0%" : `${data.insuranceRate}%`}}></div>
                            </div>
                            <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark mt-2">14 {t('dashboard.recordsAttention')}</p>
                        </div>
                    </div>

                    <div
                        className="md:col-span-8 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm dark:shadow-none flex flex-col transition-colors duration-200">
                        <div className="flex justify-between items-start mb-8">
                            <div><h3
                                className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark">Registration
                                Velocity</h3></div>
                        </div>
                        <div className="flex-1 flex items-end gap-2 mt-auto h-48 relative">
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[40%]"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[60%]"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[50%]"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[80%]"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[70%]"></div>
                            <div
                                className="flex-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-t-sm h-[90%]"></div>
                            <div
                                className="flex-1 bg-gradient-to-t from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark rounded-t-sm h-[100%] shadow-lg"></div>
                        </div>
                        <div
                            className="flex justify-between mt-4 text-xs font-label uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant-dark px-2">
                            {chartDays.map((day, index) => (<span key={index}>{day}</span>))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
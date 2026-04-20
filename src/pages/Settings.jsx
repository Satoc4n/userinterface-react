import { useState } from 'react';
import Layout from '../components/Layout';

export default function Settings() {
    // State for our placeholder toggle switches
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    return (
        <Layout>
            <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-8">
                {/* Header */}
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">
                        System Settings
                    </h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">
                        Manage your account preferences and application configuration.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Left Column: Navigation / Tabs (Placeholder) */}
                    <div className="md:col-span-3 space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark rounded-lg font-label font-bold text-sm transition-colors text-left">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                            Account Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container hover:text-on-surface dark:hover:bg-surface-container-dark dark:hover:text-on-surface-dark rounded-lg font-label font-bold text-sm transition-colors text-left">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                            Notifications
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container hover:text-on-surface dark:hover:bg-surface-container-dark dark:hover:text-on-surface-dark rounded-lg font-label font-bold text-sm transition-colors text-left">
                            <span className="material-symbols-outlined text-[20px]">shield_lock</span>
                            Security
                        </button>
                    </div>

                    {/* Right Column: Settings Content */}
                    <div className="md:col-span-9 space-y-6">

                        {/* Profile Section */}
                        <section className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none">
                            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-6">Profile Information</h3>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center text-2xl font-bold shadow-md">
                                    DR
                                </div>
                                <div>
                                    <button className="bg-surface-container-high dark:bg-surface-container-high-dark hover:bg-surface-container-highest dark:hover:bg-surface-container-highest-dark text-on-surface dark:text-on-surface-dark px-4 py-2 rounded-lg font-label font-bold text-sm transition-colors mb-2">
                                        Upload New Avatar
                                    </button>
                                    <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Full Name</label>
                                    <input type="text" defaultValue="Dr. Sarah Jenkins" disabled className="w-full bg-surface-container-high dark:bg-surface-container-high-dark border-none p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body text-sm opacity-70 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Provider ID</label>
                                    <input type="text" defaultValue="PRV-88349" disabled className="w-full bg-surface-container-high dark:bg-surface-container-high-dark border-none p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body text-sm opacity-70 cursor-not-allowed" />
                                </div>
                            </div>
                        </section>

                        {/* Notification Preferences */}
                        <section className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none">
                            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-6">Alerts & Notifications</h3>

                            <div className="space-y-6">
                                {/* Toggle 1 */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-on-surface dark:text-on-surface-dark text-sm mb-1">Email Notifications</h4>
                                        <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark">Receive daily census summaries via email.</p>
                                    </div>
                                    <button
                                        onClick={() => setEmailNotifs(!emailNotifs)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${emailNotifs ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest dark:bg-surface-container-highest-dark'}`}
                                    >
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>

                                {/* Toggle 2 */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-on-surface dark:text-on-surface-dark text-sm mb-1">SMS Critical Alerts</h4>
                                        <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark">Get text messages for triage escalations.</p>
                                    </div>
                                    <button
                                        onClick={() => setSmsNotifs(!smsNotifs)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${smsNotifs ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest dark:bg-surface-container-highest-dark'}`}
                                    >
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${smsNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Security Section */}
                        <section className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none flex items-center justify-between">
                            <div>
                                <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-1">Two-Factor Authentication</h3>
                                <p className="text-xs text-on-surface-variant dark:text-on-surface-variant-dark">Add an extra layer of security to your account.</p>
                            </div>
                            <button
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${twoFactor ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest dark:bg-surface-container-highest-dark'}`}
                            >
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </section>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
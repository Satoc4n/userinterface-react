import {useState} from 'react';
import {useTranslation} from 'react-i18next';

export default function Settings() {
    const {t} = useTranslation();
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    return (
        <>
            <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">{t('settings.title')}</h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">{t('settings.subtitle')}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 space-y-2">
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark rounded-lg font-label font-bold text-sm text-left">
                            <span
                                className="material-symbols-outlined text-[20px]">person</span>{t('settings.tabProfile')}
                        </button>
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container rounded-lg font-label font-bold text-sm text-left">
                            <span
                                className="material-symbols-outlined text-[20px]">notifications</span>{t('settings.tabNotifs')}
                        </button>
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container rounded-lg font-label font-bold text-sm text-left">
                            <span
                                className="material-symbols-outlined text-[20px]">shield_lock</span>{t('settings.tabSecurity')}
                        </button>
                    </div>

                    <div className="md:col-span-9 space-y-6">
                        <section
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none">
                            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-6">{t('settings.secProfile')}</h3>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                                <div
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center text-2xl font-bold shadow-md">DR
                                </div>
                                <div>
                                    <button
                                        className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label font-bold text-sm mb-2">{t('settings.uploadAvatar')}</button>
                                    <p className="text-xs text-on-surface-variant">{t('settings.avatarDesc')}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant uppercase mb-2">{t('settings.fullName')}</label><input
                                    type="text" defaultValue="Dr. Sarah Jenkins" disabled
                                    className="w-full bg-surface-container-high border-none p-3 rounded-lg opacity-70"/>
                                </div>
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant uppercase mb-2">{t('settings.providerId')}</label><input
                                    type="text" defaultValue="PRV-88349" disabled
                                    className="w-full bg-surface-container-high border-none p-3 rounded-lg opacity-70"/>
                                </div>
                            </div>
                        </section>

                        <section
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none">
                            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-6">{t('settings.secAlerts')}</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div><h4 className="font-bold text-sm mb-1">{t('settings.emailNotifs')}</h4><p
                                        className="text-xs text-on-surface-variant">{t('settings.emailDesc')}</p></div>
                                    <button onClick={() => setEmailNotifs(!emailNotifs)}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${emailNotifs ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest'}`}>
                                        <div
                                            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div><h4 className="font-bold text-sm mb-1">{t('settings.smsNotifs')}</h4><p
                                        className="text-xs text-on-surface-variant">{t('settings.smsDesc')}</p></div>
                                    <button onClick={() => setSmsNotifs(!smsNotifs)}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${smsNotifs ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest'}`}>
                                        <div
                                            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${smsNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section
                            className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none flex items-center justify-between">
                            <div><h3
                                className="font-headline text-xl font-bold text-on-surface dark:text-on-surface-dark mb-1">{t('settings.sec2fa')}</h3>
                                <p className="text-xs text-on-surface-variant">{t('settings.2faDesc')}</p></div>
                            <button onClick={() => setTwoFactor(!twoFactor)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${twoFactor ? 'bg-primary dark:bg-primary-dark' : 'bg-surface-container-highest'}`}>
                                <div
                                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
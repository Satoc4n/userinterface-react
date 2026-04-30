import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export default function Login() {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'de' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleRealLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div
            className="min-h-screen bg-surface-container-lowest dark:bg-background-dark flex items-center justify-center p-4 relative">

            {/* Main Login Card */}
            <div
                className="max-w-md w-full bg-surface-container dark:bg-surface-container-dark rounded-[1.5rem] p-8 shadow-lg border border-outline-variant/20 dark:border-none">
                <div
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center mb-6 shadow-md">
                    <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-headline font-bold text-on-surface dark:text-on-surface-dark mb-2">
                        {t('common.appName')}
                    </h1>
                    <p className="text-on-surface-variant dark:text-on-surface-variant-dark text-sm">
                        {t('login.subtitle')}
                    </p>
                </div>

                <form onSubmit={handleRealLogin} className="space-y-6 text-left">
                    <div>
                        <label
                            className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">
                            {t('login.email')}
                        </label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-container-high dark:bg-surface-container-high-dark border border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label
                                className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest">
                                {t('login.password')}
                            </label>
                            <a href="#"
                               className="text-xs font-bold text-primary dark:text-primary-dark hover:underline">
                                {t('login.forgot')}
                            </a>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface-container-high dark:bg-surface-container-high-dark border border-transparent focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body outline-none transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary dark:bg-primary-dark text-on-primary font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        {t('login.signIn')}
                        <span className="material-symbols-outlined text-[18px]">login</span>
                    </button>
                </form>
            </div>

            {/* Language Toggle */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <div
                    className="hidden sm:flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant-dark">
                    <span className="material-symbols-outlined">translate</span>
                    <span className="font-body text-sm font-medium">{t('sidebar.language')}</span>
                </div>
                <button
                    onClick={toggleLanguage}
                    className="w-14 h-8 bg-surface-container-high dark:bg-surface-container-highest-dark rounded-full flex items-center justify-center font-label font-bold text-xs text-primary dark:text-primary-dark shadow-sm hover:brightness-95 transition-all"
                >
                    {i18n.language.toUpperCase()}
                </button>
            </div>

            {/* Developer Shortcut: Simulate Login ------ On the bottom right. */}
            <button
                onClick={() => navigate('/dashboard')}
                className="absolute bottom-8 right-8 bg-surface-container-high dark:bg-surface-container-highest-dark text-on-surface-variant dark:text-on-surface-variant-dark hover:text-primary dark:hover:text-primary-dark font-label font-bold text-xs py-2 px-4 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 border border-outline-variant/20 dark:border-outline-variant-dark/20"
            >
                <span className="material-symbols-outlined text-[16px]">skip_next</span>
                {t('login.simulate')}
            </button>

        </div>
    );
}
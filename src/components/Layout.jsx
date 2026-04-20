import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

/*
@todo Find a way to share layout components such as SideBar etc. that way we wont have to copy/paste code. Like python {% extends %}
*/


export default function Layout({children}) {
    const location = useLocation(); // Knows which page you are on to highlight the sidebar
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check local storage for dark mode preference on load
    useEffect(() => {
        const isDark = localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark); // ??
        if (isDark) document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            setIsDarkMode(false);
        }
    };

    return (
        <div
            className="bg-background dark:bg-background-dark text-on-surface dark:text-on-surface-dark font-body min-h-screen antialiased transition-colors duration-200">

            {/* Mobile TopAppBar incase someone decides to use it */}
            <header
                className="md:hidden flex justify-between items-center w-full px-8 py-3 fixed top-0 z-50 bg-surface-container-lowest dark:bg-background-dark shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary dark:text-primary-dark">menu</span>
                    <h1 className="font-headline font-extrabold text-primary dark:text-primary-dark tracking-tighter text-xl">Clinical
                        Curator</h1>
                </div>
            </header>

            {/* Desktop SideNavBar */}
            <nav
                className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface-container-low dark:bg-surface-container-low-dark z-40 transition-colors duration-200 border-r border-outline-variant/20 dark:border-outline-variant-dark/20">
                <div className="p-8 pb-12 flex flex-col items-start">
                    <div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark text-on-primary flex items-center justify-center mb-4 shadow-lg">
                        <span className="material-symbols-outlined text-2xl"
                              style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
                    </div>
                    <h2 className="font-headline font-bold text-on-surface dark:text-on-surface-dark text-lg tracking-tight">Clinical
                        Curator</h2>
                    <p className="font-body text-sm font-medium text-on-surface-variant dark:text-on-surface-variant-dark">Precision
                        Care Unit</p>
                </div>
                {/* Sidebar Links */}
                <div className="flex-1 flex flex-col gap-1 w-full px-4">
                    <Link to="/dashboard"
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-label font-bold text-sm ${location.pathname === '/dashboard' ? 'bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark' : 'text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container hover:text-on-surface dark:hover:bg-surface-container-dark dark:hover:text-on-surface-dark'}`}>
                        <span className="material-symbols-outlined"
                              style={{fontVariationSettings: location.pathname === '/dashboard' ? "'FILL' 1" : "'FILL' 0"}}>dashboard</span>
                        Dashboard
                    </Link>

                    <Link to="/settings"
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-label font-bold text-sm ${location.pathname === '/settings' ? 'bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark' : 'text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container hover:text-on-surface dark:hover:bg-surface-container-dark dark:hover:text-on-surface-dark'}`}>
                        <span className="material-symbols-outlined"
                              style={{fontVariationSettings: location.pathname === '/settings' ? "'FILL' 1" : "'FILL' 0"}}>settings</span>
                        Settings
                    </Link>

                    <Link to="/registry"
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-label font-bold text-sm ${location.pathname === '/registry' ? 'bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark' : 'text-on-surface-variant dark:text-on-surface-variant-dark hover:bg-surface-container hover:text-on-surface dark:hover:bg-surface-container-dark dark:hover:text-on-surface-dark'}`}>
                        <span className="material-symbols-outlined"
                              style={{fontVariationSettings: location.pathname === '/registry' ? "'FILL' 1" : "'FILL' 0"}}>app_registration</span>
                        Patient Registry
                    </Link>
                </div>


                {/* Dark Mode Toggle */}
                <div className="mt-auto flex flex-col gap-1 w-full pb-8">
                    <div className="flex items-center justify-between px-8 py-3">
                        <div
                            className="flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant-dark">
                            <span className="material-symbols-outlined">contrast</span>
                            <span className="font-body text-sm font-medium">Theme</span>
                        </div>
                        <label htmlFor="theme-toggle"
                               className="flex items-center cursor-pointer relative scale-[0.8] origin-right">
                            <input type="checkbox" id="theme-toggle" className="sr-only peer" checked={isDarkMode}
                                   onChange={toggleTheme}/>
                            <div
                                className="block bg-surface-container-high dark:bg-primary-dark w-14 h-8 rounded-full transition-colors duration-300"></div>
                            <div
                                className="dot absolute left-1 top-1 bg-white dark:bg-primary-container-dark w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center shadow-md peer-checked:translate-x-full">
                                <span
                                    className="material-symbols-outlined text-[14px] text-primary dark:text-primary-dark">
                                    {isDarkMode ? 'dark_mode' : 'light_mode'}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </nav>

            {/* Main Canvas - This is where the specific pages get injected! */}
            <main className="md:ml-64 pt-20 md:pt-0 min-h-screen transition-colors duration-200">
                {children}
            </main>
        </div>
    );
}
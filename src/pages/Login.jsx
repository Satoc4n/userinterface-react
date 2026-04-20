import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay, then redirect to dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div
            className="bg-background dark:bg-background-dark text-on-surface dark:text-on-surface-dark font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container transition-colors duration-200">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-center lg:justify-start">
                <div
                    className="text-xl font-bold font-headline tracking-tight text-on-surface dark:text-on-surface-dark flex items-center gap-2">
                    <span
                        className="material-symbols-outlined text-primary dark:text-primary-dark"
                        style={{fontVariationSettings: "'FILL' 1"}}
                    >
                        medical_services
                    </span>
                    Clinical Curator
                </div>
            </header>

            {/* Main Canvas */}
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* First box */}
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark mb-2 tracking-tight">
                            Access Your Workspace
                        </h1>
                        <p className="text-on-surface-variant dark:text-on-surface-variant-dark text-sm font-label">
                            Secure authentication required for clinical records.
                        </p>
                    </div>

                    {/* Login box */}
                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark p-8 rounded-xl shadow-sm dark:shadow-none border border-outline-variant/15">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username */}
                            <div
                                className="bg-surface-container-high dark:bg-surface-container-high-dark p-4 rounded-lg relative group transition-colors focus-within:bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary">
                                <label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1"
                                    htmlFor="username">
                                    Username
                                </label>
                                <div className="flex items-center gap-3">
                                    <span
                                        className="material-symbols-outlined text-outline dark:text-outline-dark group-focus-within:text-primary transition-colors text-xl">person</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-on-surface dark:text-on-surface-dark focus:ring-0 font-body placeholder:text-outline-variant text-base outline-none"
                                        id="username" name="username" placeholder="Enter provider ID" type="text"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div
                                className="bg-surface-container-high dark:bg-surface-container-high-dark p-4 rounded-lg relative group transition-colors focus-within:bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary">
                                <div className="flex justify-between items-center mb-1">
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest"
                                        htmlFor="password">
                                        Password
                                    </label>
                                    <button
                                        className="text-xs font-label text-primary dark:text-primary-dark hover:text-primary-container dark:hover:text-primary-container-dark transition-colors focus:outline-none"
                                        type="button">
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className="material-symbols-outlined text-outline dark:text-outline-dark group-focus-within:text-primary transition-colors text-xl">lock</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-on-surface dark:text-on-surface-dark focus:ring-0 font-body placeholder:text-outline-variant text-base outline-none"
                                        id="password" name="password" placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                    <button
                                        className="text-outline dark:text-outline-dark hover:text-on-surface dark:hover:text-on-surface-dark transition-colors focus:outline-none flex items-center justify-center"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface-container-lowest bg-surface-container-lowest cursor-pointer"
                                    id="remember-me" name="remember-me" type="checkbox"
                                />
                                <label
                                    className="ml-2 flex items-center gap-1 text-sm text-on-surface-variant dark:text-on-surface-variant-dark font-label cursor-pointer"
                                    htmlFor="remember-me">
                                    Remember me
                                    <span className="material-symbols-outlined text-[16px]"
                                          title="This will keep you logged in for 30 days. Make sure no one else has access to this computer!">error</span>
                                </label>
                            </div>

                            {/* Sign In Button */}
                            <button
                                className={`w-full bg-gradient-to-br from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark text-on-primary font-headline font-semibold text-lg py-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xl'}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span
                                            className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Additional Information */}
                    <div
                        className="mt-6 flex items-start gap-3 p-4 bg-tertiary-container/30 dark:bg-tertiary-container-dark/30 rounded-lg">
                        <span
                            className="material-symbols-outlined text-tertiary dark:text-tertiary-dark text-xl mt-0.5">info</span>
                        <p className="text-xs text-on-tertiary-container dark:text-on-tertiary-container-dark font-label leading-relaxed">
                            By logging in, you agree to the terms of our access policy. All actions are logged.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
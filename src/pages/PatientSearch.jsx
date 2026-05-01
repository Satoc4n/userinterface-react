import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";

export default function PatientSearch() {
    const {t} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    // State to hold backend results and loading status
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const navigate = useNavigate();

    // Function to trigger the API call
    const handleSearch = async (e) => {
        // Only search if they press Enter or press the button (button doesn't exist rn)
        if (e.key !== 'Enter' || searchQuery.trim() === '') return;

        setIsSearching(true);
        setHasSearched(true);

              // @TODO Change to the real address when available
        try { // Change the localhost to the real address when availabe
            const response = await fetch('http://localhost:3000/patients/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    last_name: searchQuery.trim()
                })
            });

            if (response.status === 200) {
                const data = await response.json();
                setSearchResults(data.results || []);
            } else {
                console.error("Search failed with status:", response.status);
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Network Error during search:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <>
            <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">{t('search.title')}</h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">{t('search.subtitle')}</p>
                </header>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-outline text-2xl">search</span>
                    </div>
                    <input
                        type="text"
                        placeholder={t('search.placeholder', 'Search by last name and press Enter...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full bg-surface-container-lowest dark:bg-surface-container-lowest-dark border border-outline-variant/30 py-5 pl-12 pr-4 rounded-2xl text-on-surface dark:text-on-surface-dark font-body text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {isSearching && <p className="text-center mt-4 text-on-surface-variant font-label tracking-widest text-xs uppercase animate-pulse">Searching database...</p>}

                {hasSearched && !isSearching && (
                    <div className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] shadow-sm border border-outline-variant/15 dark:border-none overflow-hidden">

                        <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low flex justify-between items-center">
                            <h3 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant">{t('search.results')}</h3>
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-bold text-xs">{searchResults.length} {t('search.found')}</span>
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="border-b border-outline-variant/10 text-xs font-label uppercase text-on-surface-variant">
                                        <th className="px-6 py-4">{t('search.colPid')}</th>
                                        <th className="px-6 py-4">{t('search.colName')}</th>
                                        <th className="px-6 py-4 hidden md:table-cell">{t('search.colDob')}</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">{t('search.colIns')}</th>
                                        <th className="px-6 py-4">{t('search.colStatus')}</th>
                                        <th className="px-6 py-4 text-right">{t('search.colAction')}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/10">
                                    {searchResults.map(p => (
                                        <tr key={p.pid} className="hover:bg-surface-container-low/50 group">
                                            <td className="px-6 py-4 font-mono text-sm">{p.pid}</td>
                                            <td className="px-6 py-4 font-bold">{p.last_name}, {p.first_name}</td>
                                            <td className="px-6 py-4 hidden md:table-cell text-sm">{p.date_of_birth}</td>
                                            <td className="px-6 py-4 hidden sm:table-cell font-mono text-sm">{p.insurance_number}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold">Active</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => navigate(`/patient/${p.pid}`)}
                                                    className="text-primary font-label font-bold text-sm hover:underline flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    {t('search.viewFile')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center">
                                <span className="material-symbols-outlined text-3xl text-outline mb-4">person_off</span>
                                <h3 className="text-lg font-headline font-bold text-on-surface mb-1">{t('search.noMatch')}</h3>
                                <p className="text-on-surface-variant text-sm max-w-md">{t('search.noMatchDesc')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";

// Fake "Database" to test the search functionality. Arrays for searching, Objects for finding.
const MOCK_DATABASE = [
    {
        pid: 'PID-8839',
        firstName: 'Said',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active'
    },
    {
        pid: 'PID-8840',
        firstName: 'Said Kemal',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active'
    },
    {
        pid: 'PID-8841',
        firstName: 'Said',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active'
    },
    {
        pid: 'PID-8842',
        firstName: 'Dan',
        lastName: 'Weber',
        dob: '1965-08-30',
        gender: 'M',
        insurance: '11223344D555',
        status: 'Discharged'
    },
    {
        pid: 'PID-8843',
        firstName: 'Mina',
        lastName: 'Schmidt',
        dob: '2001-03-14',
        gender: 'F',
        insurance: '99887766E444',
        status: 'Active'
    },
    {
        pid: 'PID-8844',
        firstName: 'Lukas',
        lastName: 'Müller',
        dob: '1988-07-22',
        gender: 'M',
        insurance: '55566677F888',
        status: 'Transferred'
    },
];

export default function PatientSearch() {
    const {t} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredPatients = MOCK_DATABASE.filter(patient => {
        if (searchQuery.trim() === '') return false;
        const query = searchQuery.toLowerCase();
        return patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query) || patient.pid.toLowerCase().includes(query);
    });

    return (
        <>
            <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">{t('search.title')}</h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">{t('search.subtitle')}</p>
                </header>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span
                        className="material-symbols-outlined text-outline text-2xl">search</span></div>
                    <input type="text" placeholder={t('search.placeholder')} value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full bg-surface-container-lowest dark:bg-surface-container-lowest-dark border border-outline-variant/30 py-5 pl-12 pr-4 rounded-2xl text-on-surface dark:text-on-surface-dark font-body text-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>

                {searchQuery.trim() !== '' && (
                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] shadow-sm border border-outline-variant/15 dark:border-none overflow-hidden">

                        <div
                            className="px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low flex justify-between items-center">
                            <h3 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant">{t('search.results')}</h3>
                            <span
                                className="bg-primary/10 text-primary px-2 py-1 rounded-md font-bold text-xs">{filteredPatients.length} {t('search.found')}</span>
                        </div>

                        {filteredPatients.length > 0 ? (
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
                                    {filteredPatients.map(p => (
                                        <tr key={p.pid} className="hover:bg-surface-container-low/50 group">
                                            <td className="px-6 py-4 font-mono text-sm">{p.pid}</td>
                                            <td className="px-6 py-4 font-bold">{p.lastName}, {p.firstName}</td>
                                            <td className="px-6 py-4 hidden md:table-cell text-sm">{p.dob}</td>
                                            <td className="px-6 py-4 hidden sm:table-cell font-mono text-sm">{p.insurance}</td>
                                            <td className="px-6 py-4"><span
                                                className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold">{p.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => navigate(`/patient/${p.pid}`)}
                                                    className="text-primary font-label font-bold text-sm hover:underline flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    {t('search.viewFile')} <span
                                                    className="material-symbols-outlined text-[16px]">arrow_forward</span>
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
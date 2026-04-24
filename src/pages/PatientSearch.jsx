import {useState} from 'react';
import {Link} from 'react-router-dom';

// Simulated JSON response from the Interface Layer
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
    const [searchQuery, setSearchQuery] = useState('');

    // Real-time filtering logic
    // This runs instantly every time the user types a character!
    const filteredPatients = MOCK_DATABASE.filter(patient => {
        if (searchQuery.trim() === '') return false; // Show nothing if search is empty

        const query = searchQuery.toLowerCase();

        // Primarily search by First Name or Last Name (per requirements)
        // We also added PID search just to make it extra robust!
        return (
            patient.firstName.toLowerCase().includes(query) ||
            patient.lastName.toLowerCase().includes(query) ||
            patient.pid.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-8">
                {/* Header */}
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">
                        Patient Directory
                    </h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">
                        Search the clinical registry by patient name or identifier.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span
                            className="material-symbols-outlined text-outline dark:text-outline-dark group-focus-within:text-primary transition-colors text-2xl">
                            search
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by First Name, Last Name, or PID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface-container-lowest dark:bg-surface-container-lowest-dark border border-outline-variant/30 dark:border-outline-variant-dark/30 py-5 pl-12 pr-4 rounded-2xl text-on-surface dark:text-on-surface-dark font-body text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />

                    {/* Clear Button */}
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors focus:outline-none"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>

                {/* Search Results Area */}
                {searchQuery.trim() !== '' && (
                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] shadow-sm border border-outline-variant/15 dark:border-none overflow-hidden">

                        {/* Results Count Header */}
                        <div
                            className="px-6 py-4 border-b border-outline-variant/10 dark:border-outline-variant-dark/10 bg-surface-container-low dark:bg-surface-container-low-dark flex justify-between items-center">
                            <h3 className="font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant dark:text-on-surface-variant-dark">
                                Search Results
                            </h3>
                            <span
                                className="bg-primary/10 text-primary dark:text-primary-dark px-2 py-1 rounded-md font-bold text-xs">
                                {filteredPatients.length} Found
                            </span>
                        </div>

                        {/* The Results Table */}
                        {filteredPatients.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="border-b border-outline-variant/10 dark:border-outline-variant-dark/10 text-xs font-label uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant-dark">
                                        <th className="px-6 py-4">PID</th>
                                        <th className="px-6 py-4">Full Name</th>
                                        <th className="px-6 py-4 hidden md:table-cell">DOB</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">Insurance KVNR</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className="divide-y divide-outline-variant/10 dark:divide-outline-variant-dark/10">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.pid}
                                            className="hover:bg-surface-container-low/50 dark:hover:bg-surface-container-low-dark/50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
                                                {patient.pid}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-on-surface dark:text-on-surface-dark">
                                                    {patient.lastName}, {patient.firstName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
                                                {patient.dob}
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell font-mono text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
                                                {patient.insurance}
                                            </td>
                                            <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-bold flex items-center w-max gap-1
                                                        ${patient.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        patient.status === 'Discharged' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}
                                                    >
                                                        <span
                                                            className="block w-1.5 h-1.5 rounded-full bg-current"></span>
                                                        {patient.status}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {/* This would link to the individual patient's file later! */}
                                                <button
                                                    className="text-primary dark:text-primary-dark font-label font-bold text-sm hover:underline flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    View File <span
                                                    className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            // Empty State if no results
                            <div className="p-12 text-center flex flex-col items-center justify-center">
                                <div
                                    className="w-16 h-16 bg-surface-container dark:bg-surface-container-dark rounded-full flex items-center justify-center mb-4">
                                    <span
                                        className="material-symbols-outlined text-3xl text-outline dark:text-outline-dark">person_off</span>
                                </div>
                                <h3 className="text-lg font-headline font-bold text-on-surface dark:text-on-surface-dark mb-1">No
                                    matching patients</h3>
                                <p className="text-on-surface-variant dark:text-on-surface-variant-dark text-sm max-w-md">
                                    We couldn't find any records matching "{searchQuery}". Check the spelling or try
                                    searching by a different criteria.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

// Fake "Database" to test the search functionality. Arrays for searching, Objects for finding.
const MOCK_DATABASE = [
    {
        pid: 'PID-8839',
        firstName: 'Said',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active',
        bloodType: 'A+',
        height: '180 cm',
        weight: '75 kg',
        allergies: ['Penicillin', 'Latex'],
        medications: ['Lisinopril 10mg'],
        history: [{date: '2023-10-15', event: 'Routine Checkup'}]
    },
    {
        pid: 'PID-8840',
        firstName: 'Said Kemal',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active',
        bloodType: 'O-',
        height: '182 cm',
        weight: '78 kg',
        allergies: [],
        medications: [],
        history: [{date: '2023-12-01', event: 'ER Visit'}]
    },
    {
        pid: 'PID-8841',
        firstName: 'Said',
        lastName: 'Timucin',
        dob: '1999-03-16',
        gender: 'M',
        insurance: '12123456A123',
        status: 'Active',
        bloodType: 'B+',
        height: '175 cm',
        weight: '70 kg',
        allergies: ['Ibuprofen'],
        medications: [],
        history: [{date: '2024-01-10', event: 'Cardiology Consult'}]
    },
    {
        pid: 'PID-8842',
        firstName: 'Dan',
        lastName: 'Weber',
        dob: '1965-08-30',
        gender: 'M',
        insurance: '11223344D555',
        status: 'Discharged',
        bloodType: 'AB+',
        height: '178 cm',
        weight: '82 kg',
        allergies: [],
        medications: ['Amlodipine 5mg'],
        history: [{date: '2021-08-22', event: 'Knee Replacement'}]
    },
    {
        pid: 'PID-8843',
        firstName: 'Mina',
        lastName: 'Schmidt',
        dob: '2001-03-14',
        gender: 'F',
        insurance: '99887766E444',
        status: 'Active',
        bloodType: 'A-',
        height: '165 cm',
        weight: '60 kg',
        allergies: ['Peanuts'],
        medications: ['Omeprazole 20mg'],
        history: [{date: '2023-05-11', event: 'General Consult'}]
    },
    {
        pid: 'PID-8844',
        firstName: 'Lukas',
        lastName: 'Müller',
        dob: '1988-07-22',
        gender: 'M',
        insurance: '55566677F888',
        status: 'Transferred',
        bloodType: 'O+',
        height: '185 cm',
        weight: '88 kg',
        allergies: [],
        medications: [],
        history: [{date: '2024-02-14', event: 'Transfer to ICU'}]
    },
];

export default function PatientProfile() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const foundPatient = MOCK_DATABASE.find(p => p.pid === id);

            if (foundPatient) {
                setPatient(foundPatient);
            } else {
                setPatient(null);
            }
            setIsLoading(false);
        }, 600);
    }, [id]);

    if (isLoading) {
        return (
            <div
                className="p-12 flex flex-col items-center justify-center min-h-[50vh] text-on-surface-variant dark:text-on-surface-variant-dark">
                <span
                    className="material-symbols-outlined text-4xl animate-spin mb-4 text-primary dark:text-primary-dark">refresh</span>
                <p className="font-label font-bold tracking-widest uppercase text-xs">{t('profile.loading')}</p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div
                className="p-12 flex flex-col items-center justify-center min-h-[50vh] text-on-surface-variant dark:text-on-surface-variant-dark">
                <span className="material-symbols-outlined text-5xl mb-4 text-error">error</span>
                <h2 className="text-xl font-headline font-bold text-on-surface dark:text-on-surface-dark mb-2">{t('profile.notFound')}</h2>
                <button onClick={() => navigate('/search')} className="text-primary hover:underline font-bold text-sm">
                    {t('profile.back')}
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-6">

            <button
                onClick={() => navigate('/search')}
                className="flex items-center gap-2 text-on-surface-variant dark:text-on-surface-variant-dark hover:text-primary dark:hover:text-primary-dark font-label font-bold text-xs uppercase tracking-widest transition-colors mb-4"
            >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                {t('profile.back')}
            </button>

            <div
                className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center text-3xl font-headline font-bold shadow-md">
                        {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div>
                        <h1 className="text-3xl font-headline font-extrabold text-on-surface dark:text-on-surface-dark tracking-tight mb-1">
                            {patient.lastName}, {patient.firstName}
                        </h1>
                        <div
                            className="flex items-center gap-3 text-sm text-on-surface-variant dark:text-on-surface-variant-dark font-mono">
                            <span
                                className="bg-surface-container-high dark:bg-surface-container-highest-dark px-2 py-1 rounded font-bold">{patient.pid}</span>
                            <span>•</span>
                            <span>{patient.dob}</span>
                            <span>•</span>
                            <span>{patient.gender}</span>
                        </div>
                    </div>
                </div>
                <span className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm
                    ${patient.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                >
                    <span className="block w-2 h-2 rounded-full bg-current"></span>
                    {patient.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 space-y-6">
                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/15 dark:border-none">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-4 flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-primary">monitor_heart</span> {t('profile.vitals')}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                                <span className="text-sm text-on-surface-variant">{t('profile.bloodType')}</span>
                                <span className="font-bold text-error dark:text-error-dark">{patient.bloodType}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                                <span className="text-sm text-on-surface-variant">{t('profile.height')}</span>
                                <span
                                    className="font-bold text-on-surface dark:text-on-surface-dark">{patient.height}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-on-surface-variant">{t('profile.weight')}</span>
                                <span
                                    className="font-bold text-on-surface dark:text-on-surface-dark">{patient.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/15 dark:border-none">
                        <h3 className="font-headline text-lg font-bold text-error dark:text-error-dark mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">warning</span> {t('profile.allergies')}
                        </h3>
                        {patient.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((allergy, index) => (
                                    <span key={index}
                                          className="bg-error/10 text-error dark:text-error-dark px-3 py-1 rounded-full text-sm font-bold border border-error/20">
                                        {allergy}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-on-surface-variant italic">{t('profile.none')}</p>
                        )}
                    </div>
                </div>

                <div className="md:col-span-8 space-y-6">
                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/15 dark:border-none">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-4 flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-secondary">vaccines</span> {t('profile.medications')}
                        </h3>
                        <ul className="space-y-3">
                            {patient.medications.length > 0 ? (
                                patient.medications.map((med, index) => (
                                    <li key={index}
                                        className="bg-surface-container-low dark:bg-surface-container-dark p-3 rounded-xl text-sm font-bold text-on-surface dark:text-on-surface-dark flex items-center gap-3">
                                        <span className="material-symbols-outlined text-outline">medication</span>
                                        {med}
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-on-surface-variant italic">No active medications.</p>
                            )}
                        </ul>
                    </div>

                    <div
                        className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/15 dark:border-none">
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-on-surface-dark mb-6 flex items-center gap-2">
                            <span
                                className="material-symbols-outlined text-tertiary">history</span> {t('profile.history')}
                        </h3>
                        <div
                            className="relative border-l-2 border-surface-container-high dark:border-surface-container-highest-dark ml-4 space-y-8">
                            {patient.history.map((event, index) => (
                                <div key={index} className="relative pl-6">
                                    <div
                                        className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-container-lowest dark:bg-surface-container-lowest-dark border-4 border-tertiary dark:border-tertiary-dark"></div>
                                    <p className="font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-1">{event.date}</p>
                                    <p className="font-body text-on-surface dark:text-on-surface-dark font-medium">{event.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
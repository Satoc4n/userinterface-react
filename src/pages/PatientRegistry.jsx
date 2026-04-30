import {useState} from 'react';
import {useTranslation} from 'react-i18next';

// Added translation function
export default function PatientRegistry() {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        street: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        phone: '',
        email: '',
        insuranceNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [showWarning, setShowWarning] = useState(false);

    const today = new Date();
    const maxDateStr = today.toISOString().split("T")[0];
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    const minDateStr = minDate.toISOString().split("T")[0];

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'insuranceNumber') {
            const upperValue = value.toUpperCase();
            if (upperValue.length > 12) return;

            let isValid = true;
            let instantError = null;

            for (let i = 0; i < upperValue.length; i++) {
                const char = upperValue[i];
                if (i < 8 || i > 8) {
                    if (!/^\d$/.test(char)) {
                        isValid = false;
                        instantError = t('registry.errors.mustBeNumber', {pos: i + 1});
                        break;
                    }
                } else if (i === 8) {
                    if (!/^[A-Z]$/.test(char)) {
                        isValid = false;
                        instantError = t('registry.errors.mustBeLetter');
                        break;
                    }
                }
            }

            if (!isValid) {
                setErrors(prev => ({...prev, insuranceNumber: instantError}));
                return;
            }
            setErrors(prev => ({...prev, insuranceNumber: null}));
            setFormData(prev => ({...prev, [name]: upperValue}));
            return;
        }

        if (errors[name]) setErrors(prev => ({...prev, [name]: null}));
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const validateForm = () => {
        let newErrors = {};
        const hasNumber = /\d/;
        if (hasNumber.test(formData.firstName)) newErrors.firstName = t('registry.errors.noNumberFirst');
        if (hasNumber.test(formData.lastName)) newErrors.lastName = t('registry.errors.noNumberLast');
        const dob = new Date(formData.dateOfBirth);
        if (dob > today) newErrors.dateOfBirth = t('registry.errors.dobFuture');
        if (dob < minDate) newErrors.dateOfBirth = t('registry.errors.dobOld');
        const insuranceRegex = /^\d{8}[A-Z]\d{3}$/;
        if (!insuranceRegex.test(formData.insuranceNumber)) newErrors.insuranceNumber = t('registry.errors.insuranceFormat');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSuccessMessage('');
            return;
        }

        const hasPhone = formData.phone.trim() !== '';
        const hasEmail = formData.email.trim() !== '';
        const hasAddress = formData.street.trim() !== '' || formData.city.trim() !== '' || formData.postalCode.trim() !== '';

        // If no contact info is provided AND we haven't shown the warning yet, show it and stop!
        if (!hasPhone && !hasEmail && !hasAddress && !showWarning) {
            setShowWarning(true);
            return;
        }

        // If contact info exists OR they clicked "Proceed Anyway", fire the API
        executeSubmission();
    };

    // Submit function
    const executeSubmission = () => {
        setIsSubmitting(true);
        setSuccessMessage('');
        setShowWarning(false); // Hide the warning box if it was open

        let addressObj = null;
        if (formData.street || formData.houseNumber || formData.city || formData.postalCode) {
            addressObj = {
                street: `${formData.street} ${formData.houseNumber}`.trim() || null,
                city: formData.city || null,
                postal_code: formData.postalCode ? parseInt(formData.postalCode) : null
            };
        }

        // Raw payload
        const rawPayload = {
            last_name: formData.lastName,
            first_name: formData.firstName,
            date_of_birth: formData.dateOfBirth,
            insurance_number: formData.insuranceNumber,
            gender: formData.gender || null,
            address: addressObj,
            phone: formData.phone || null,
            email: formData.email || null
        };

        // Strip out all keys that have a value of `null` or `""`
        const cleanPayload = Object.fromEntries(
            Object.entries(rawPayload).filter(([_, value]) => value !== null && value !== "")
        );

        // Print to console
        console.log("Sending Clean JSON DTO to Server:", JSON.stringify(cleanPayload, null, 2));

        // Simulate API response time
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage(`${t('registry.success')} ${formData.lastName}, ${formData.firstName}`);
            setFormData({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                street: '',
                houseNumber: '',
                postalCode: '',
                city: '',
                phone: '',
                email: '',
                insuranceNumber: ''
            });
        }, 1200);
    };

    const inputClass = (fieldName) => `w-full bg-surface-container-high dark:bg-surface-container-high-dark border p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body focus:outline-none transition-colors ${errors[fieldName] ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:ring-2 focus:ring-primary'}`;

    // Alert Box
    return (
        <>
            <div className="p-6 md:p-12 max-w-[1000px] mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">{t('registry.title')}</h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">{t('registry.subtitle')}</p>
                </header>

                <div
                    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none relative">

                    {/* Soft Warning Alert Box */}
                    {showWarning && (
                        <div
                            className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                            <div className="flex items-start gap-4">
                                <span
                                    className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-3xl">warning</span>
                                <div>
                                    <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">{t('registry.warningTitle')}</h4>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300">{t('registry.warningDesc')}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button type="button" onClick={() => setShowWarning(false)}
                                        className="px-4 py-2 bg-surface-container dark:bg-surface-container-dark text-on-surface dark:text-on-surface-dark font-bold text-sm rounded-lg hover:brightness-95 transition-all">
                                    {t('registry.cancel')}
                                </button>
                                <button type="button" onClick={executeSubmission}
                                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-sm rounded-lg transition-all shadow-sm">
                                    {t('registry.proceed')}
                                </button>
                            </div>
                        </div>
                    )}

                    {successMessage && <div
                        className="mb-8 p-4 bg-[#d1f5d3] dark:bg-[#0f5223] text-[#0f5223] dark:text-[#a3f0b6] rounded-lg flex items-center gap-3 font-label font-bold text-sm">
                        <span className="material-symbols-outlined">check_circle</span>{successMessage}</div>}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span className="material-symbols-outlined">badge</span> {t('registry.coreIdentity')}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase mb-2">{t('registry.firstName')}</label><input
                                    required type="text" name="firstName" value={formData.firstName}
                                    onChange={handleChange} className={inputClass('firstName')}/>{errors.firstName &&
                                    <p className="text-red-500 text-xs mt-1 font-bold">{errors.firstName}</p>}</div>
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase mb-2">{t('registry.lastName')}</label><input
                                    required type="text" name="lastName" value={formData.lastName}
                                    onChange={handleChange} className={inputClass('lastName')}/>{errors.lastName &&
                                    <p className="text-red-500 text-xs mt-1 font-bold">{errors.lastName}</p>}</div>
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase mb-2">{t('registry.dob')}</label><input
                                    required type="date" name="dateOfBirth" max={maxDateStr} min={minDateStr}
                                    value={formData.dateOfBirth} onChange={handleChange}
                                    className={inputClass('dateOfBirth')}/>{errors.dateOfBirth &&
                                    <p className="text-red-500 text-xs mt-1 font-bold">{errors.dateOfBirth}</p>}</div>
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase mb-2">{t('registry.gender')}</label><select
                                    required name="gender" value={formData.gender} onChange={handleChange}
                                    className={inputClass('gender')}>
                                    <option value="" disabled>{t('registry.selectGender')}</option>
                                    <option value="M">{t('registry.male')}</option>
                                    <option value="F">{t('registry.female')}</option>
                                    <option value="D">{t('registry.diverse')}</option>
                                </select></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span
                                    className="material-symbols-outlined">contact_mail</span> {t('registry.contactInfo')}
                            </h3>
                            <div
                                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 bg-surface-container-low dark:bg-surface-container-dark p-4 rounded-xl border border-outline-variant/10">
                                <div className="md:col-span-3"><label
                                    className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">{t('registry.street')}</label><input
                                    type="text" name="street" value={formData.street} onChange={handleChange}
                                    className={inputClass('street')}/></div>
                                <div className="md:col-span-1"><label
                                    className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">{t('registry.houseNo')}</label><input
                                    type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange}
                                    className={inputClass('houseNumber')}/></div>
                                <div className="md:col-span-1"><label
                                    className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">{t('registry.postalCode')}</label><input
                                    type="text" name="postalCode" value={formData.postalCode} onChange={handleChange}
                                    className={inputClass('postalCode')}/></div>
                                <div className="md:col-span-3"><label
                                    className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">{t('registry.city')}</label><input
                                    type="text" name="city" value={formData.city} onChange={handleChange}
                                    className={inputClass('city')}/></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">{t('registry.phone')}</label><input
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    className={inputClass('phone')}/></div>
                                <div><label
                                    className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">{t('registry.email')}</label><input
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    className={inputClass('email')}/></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span
                                    className="material-symbols-outlined">health_and_safety</span> {t('registry.insurance')}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase mb-2">{t('registry.insuranceNumber')}</label>
                                    <input required type="text" name="insuranceNumber" maxLength="12"
                                           value={formData.insuranceNumber} onChange={handleChange}
                                           placeholder="12123456A123"
                                           className={`${inputClass('insuranceNumber')} uppercase font-mono`}/>
                                    {errors.insuranceNumber &&
                                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.insuranceNumber}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={isSubmitting}
                                    className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold px-8 py-3 rounded-full shadow-md flex items-center gap-2">
                                <span
                                    className={`material-symbols-outlined ${isSubmitting ? 'animate-spin' : ''}`}>{isSubmitting ? 'refresh' : 'person_add'}</span> {isSubmitting ? t('common.processing') : t('registry.button')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
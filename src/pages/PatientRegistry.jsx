import {useState} from 'react';
import Layout from '../components/Layout';

export default function PatientRegistry() {
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

    const today = new Date();
    const maxDateStr = today.toISOString().split("T")[0];
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    const minDateStr = minDate.toISOString().split("T")[0];

    // Real time input validation. Now when we try to input a character or a number where it doesnt belong, we cant continue
    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'insuranceNumber') {
            const upperValue = value.toUpperCase();

            // Hard block anything over 12 characters
            if (upperValue.length > 12) return;

            let isValid = true;
            let instantError = null;

            // Loop through the entire current string to check EVERY position. We dont loop every x ms, we check the input only in the case of an onChange
            // Also we block the copy/paste action if the insurance number doesnt match our definition
            for (let i = 0; i < upperValue.length; i++) {
                const char = upperValue[i];

                // Positions 1-8 and 10-12 MUST be numbers
                if (i < 8 || i > 8) {
                    if (!/^\d$/.test(char)) {
                        isValid = false;
                        instantError = `Position ${i + 1} must be a number.`;
                        break; // Stop checking further
                    }
                }
                // Position 9 MUST be a letter
                else if (i === 8) {
                    if (!/^[A-Z]$/.test(char)) {
                        isValid = false;
                        instantError = `Position 9 must be a letter.`;
                        break; // Stop checking further
                    }
                }
            }

            // If they typed the wrong thing, set the error and STOP
            // We DO NOT update the form data, effectively blocking their keystroke
            if (!isValid) {
                setErrors(prev => ({...prev, insuranceNumber: instantError}));
                return;
            }

            // Clear the error and update the box if the input matches our definition
            setErrors(prev => ({...prev, insuranceNumber: null}));
            setFormData(prev => ({...prev, [name]: upperValue}));
            return;
        }

        // Clear general errors when typing in other fields
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: null}));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        const hasNumber = /\d/;
        if (hasNumber.test(formData.firstName)) newErrors.firstName = "First name cannot contain numbers.";
        if (hasNumber.test(formData.lastName)) newErrors.lastName = "Last name cannot contain numbers.";

        const dob = new Date(formData.dateOfBirth);
        if (dob > today) newErrors.dateOfBirth = "Date of birth cannot be in the future.";
        if (dob < minDate) newErrors.dateOfBirth = "Date of birth cannot be older than 120 years.";

        // Final check on submit to ensure they actually finished typing all 12 characters
        const insuranceRegex = /^\d{8}[A-Z]\d{3}$/;
        if (!insuranceRegex.test(formData.insuranceNumber)) {
            newErrors.insuranceNumber = "Incomplete format. Must be exactly 12 characters (e.g., 12123456A123).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSuccessMessage('');
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        const formattedAddress = `${formData.street} ${formData.houseNumber}, ${formData.postalCode} ${formData.city}`.trim();

        const dtoPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            address: formattedAddress,
            phone: formData.phone,
            email: formData.email,
            insuranceNumber: formData.insuranceNumber
        };

        const jsonPayload = JSON.stringify(dtoPayload);
        console.log("Sending Validated JSON DTO to Interface Layer:", jsonPayload);

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage(`Successfully registered patient: ${formData.lastName}, ${formData.firstName}`);
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

    const inputClass = (fieldName) => `
        w-full bg-surface-container-high dark:bg-surface-container-high-dark border p-3 rounded-lg text-on-surface dark:text-on-surface-dark font-body focus:outline-none transition-colors
        ${errors[fieldName] ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:ring-2 focus:ring-primary'}
    `;

    return (
        <Layout>
            <div className="p-6 md:p-12 max-w-[1000px] mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface dark:text-on-surface-dark tracking-tight mb-2">
                        Patient Registry
                    </h1>
                    <p className="font-body text-on-surface-variant dark:text-on-surface-variant-dark text-sm">
                        Enter Identification Data (IDAT) to generate a new Patient Identifier (PID).
                    </p>
                </header>

                <div
                    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-[1.5rem] p-8 shadow-sm border border-outline-variant/15 dark:border-none">

                    {successMessage && (
                        <div
                            className="mb-8 p-4 bg-[#d1f5d3] dark:bg-[#0f5223] text-[#0f5223] dark:text-[#a3f0b6] rounded-lg flex items-center gap-3 font-label font-bold text-sm transition-all">
                            <span className="material-symbols-outlined">check_circle</span>
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Core IDAT */}
                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span className="material-symbols-outlined">badge</span> Core Identity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">First
                                        Name (Vorname) *</label>
                                    <input required type="text" name="firstName" value={formData.firstName}
                                           onChange={handleChange} className={inputClass('firstName')}/>
                                    {errors.firstName &&
                                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Last
                                        Name (Name) *</label>
                                    <input required type="text" name="lastName" value={formData.lastName}
                                           onChange={handleChange} className={inputClass('lastName')}/>
                                    {errors.lastName &&
                                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.lastName}</p>}
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Date
                                        of Birth (Geburtsdatum) *</label>
                                    <input
                                        required type="date" name="dateOfBirth"
                                        max={maxDateStr} min={minDateStr}
                                        value={formData.dateOfBirth} onChange={handleChange}
                                        className={inputClass('dateOfBirth')}
                                    />
                                    {errors.dateOfBirth &&
                                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.dateOfBirth}</p>}
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Gender
                                        (Geschlecht) *</label>
                                    <select required name="gender" value={formData.gender} onChange={handleChange}
                                            className={inputClass('gender')}>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="D">Diverse / Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span className="material-symbols-outlined">contact_mail</span> Contact Information
                            </h3>

                            <div
                                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 bg-surface-container-low dark:bg-surface-container-dark p-4 rounded-xl border border-outline-variant/10">
                                <div className="md:col-span-3">
                                    <label
                                        className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">Street</label>
                                    <input type="text" name="street" value={formData.street} onChange={handleChange}
                                           placeholder="Main Street" className={inputClass('street')}/>
                                </div>
                                <div className="md:col-span-1">
                                    <label
                                        className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">House
                                        No.</label>
                                    <input type="text" name="houseNumber" value={formData.houseNumber}
                                           onChange={handleChange} placeholder="42b"
                                           className={inputClass('houseNumber')}/>
                                </div>
                                <div className="md:col-span-1">
                                    <label
                                        className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">Postal
                                        Code</label>
                                    <input type="text" name="postalCode" value={formData.postalCode}
                                           onChange={handleChange} placeholder="12345"
                                           className={inputClass('postalCode')}/>
                                </div>
                                <div className="md:col-span-3">
                                    <label
                                        className="block text-[10px] font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-1">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                                           placeholder="Berlin" className={inputClass('city')}/>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Phone
                                        (Telefonnummer)</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                           className={inputClass('phone')}/>
                                </div>
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                           className={inputClass('email')}/>
                                </div>
                            </div>
                        </div>

                        {/* Insurance */}
                        <div>
                            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-primary dark:text-primary-dark mb-4 border-b border-outline-variant/20 dark:border-outline-variant-dark/20 pb-2">
                                <span className="material-symbols-outlined">health_and_safety</span> Insurance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-xs font-bold font-label text-on-surface-variant dark:text-on-surface-variant-dark uppercase tracking-widest mb-2">Insurance
                                        Number (Versichertennummer) *</label>
                                    <input
                                        required
                                        type="text"
                                        name="insuranceNumber"
                                        maxLength="12"
                                        value={formData.insuranceNumber}
                                        onChange={handleChange}
                                        placeholder="12123456A123"
                                        className={`${inputClass('insuranceNumber')} uppercase font-mono tracking-wider`}
                                    />
                                    {errors.insuranceNumber &&
                                        <p className="text-red-500 text-xs mt-1 font-bold">{errors.insuranceNumber}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-gradient-to-br from-primary to-primary-container dark:from-primary-dark dark:to-primary-container-dark text-on-primary font-headline font-bold px-8 py-3 rounded-full shadow-md transition-all duration-200 flex items-center gap-2 ${isSubmitting ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span
                                            className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                                        Register Patient
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
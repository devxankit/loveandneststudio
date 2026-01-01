import { useState } from 'react';

/**
 * Custom hook for managing form state and submission.
 * @param {object} initialValues - Initial state of the form fields.
 * @param {function} onSubmitCallback - Function to execute on form submission (should return a promise).
 * @returns {object} - Form state and handlers (values, handleChange, handleSubmit, status, errors).
 */
const useForm = (initialValues, onSubmitCallback) => {
    const [values, setValues] = useState(initialValues);
    const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrors({});

        try {
            await onSubmitCallback(values);
            setStatus('success');
            setValues(initialValues); // Auto-reset on success, can be made optional

            // Auto clear success message after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error("Form submission error:", err);
            setStatus('error');
            setErrors(err);
        }
    };

    return {
        values,
        handleChange,
        handleSubmit,
        status,
        setStatus,
        errors,
        setValues
    };
};

export default useForm;

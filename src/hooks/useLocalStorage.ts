import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
) {
    // We use a state to store the value and initialize it to the initial value.
    // This state will update whenever the value in localStorage changes.
    const [value, setValue] = useState<T>(() => {
        // Check if window is defined (i.e., we are running in the browser)
        if (typeof window === 'undefined') {
            // If not, return initial value directly or execute it if it's a function
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        }

        // If window is defined, proceed with localStorage
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        // If no value in localStorage and initialValue is a function, execute it to get the value
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    // useEffect to update localStorage whenever key or value changes
    useEffect(() => {
        // Ensure localStorage logic runs only in the browser
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    // Return the current value and the function to update it
    return [value, setValue] as [typeof value, typeof setValue];
}

"use client"

import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)){
    const [value, setValue] = useState<T>(() => {
        try {
            const jsonValue = localStorage.getItem(key);
            if (jsonValue != null) return JSON.parse(jsonValue);

            if (typeof initialValue === "function"){
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } catch (error) {
            // Handle error, e.g., fallback to initialValue
            console.error("Error accessing localStorage:", error);
            return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // Handle error, e.g., gracefully degrade without localStorage
            console.error("Error setting item in localStorage:", error);
        }
    }, [key, value]);

    return [value, setValue] as [typeof value, typeof setValue]
}
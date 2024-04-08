"use client"

import React, { createContext, useState, ReactNode } from 'react';

// Define types for the context value
interface ActiveSectionContextType {
    activeSection: string;
    setActiveSection: (section: string) => void;
    scrollAnimation: boolean;
    setScrollAnimation: (value: boolean) => void;
}

// Create the context with the specified type
export const ActiveSectionContext = createContext<ActiveSectionContextType>({
    activeSection: "",
    setActiveSection: () => {},
    scrollAnimation: false,
    setScrollAnimation: () => {}
});

// Define the props type for ActiveSectionProvider
interface ActiveSectionProviderProps {
    children: ReactNode;
}

// Use the defined props type
export function ActiveSectionProvider({ children }: ActiveSectionProviderProps) {
    const [activeSection, setActiveSection] = useState("");
    const [scrollAnimation, setScrollAnimation] = useState(false);

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollAnimation, setScrollAnimation }}>
            {children}
        </ActiveSectionContext.Provider>
    );
}
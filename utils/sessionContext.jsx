"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Create Context
const SessionContext = createContext();

// Create Provider Component
export const SessionProviderWrapper = ({ children }) => {
    const { data: session, status } = useSession();
    const [currentSession, setCurrentSession] = useState(session);

    useEffect(() => {
        if (status === 'authenticated') {
            setCurrentSession(session);
        } else {
            setCurrentSession(null);
        }
    }, [session, status]);

    return (
        <SessionContext.Provider value={{ currentSession, setCurrentSession }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom Hook to use Session Context
export const useSessionContext = () => useContext(SessionContext);

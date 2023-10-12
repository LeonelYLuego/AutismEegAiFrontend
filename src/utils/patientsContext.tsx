"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface PatientContextProps {
  patientId: string | null;
  setPatientId: (id: string) => void;
}

const initialContext: PatientContextProps = {
  patientId: null,
  setPatientId: () => {},
};

const PatientContext = createContext(initialContext);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Nuevo patientId:", patientId);
  }, [patientId]);

  return (
    <PatientContext.Provider value={{ patientId, setPatientId }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;

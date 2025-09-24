// "use client" directive to ensure this file is treated as a client-side component
"use client"; 

import React, { createContext, useContext, useState } from 'react';

// Creating the FormContext
const FormContext = createContext({
  isFormOpen: false,
  setIsFormOpen: () => {}, // Default function (empty) before provider is set
});

// FormProvider component to provide context value
export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false); // Client-side state

  return (
    <FormContext.Provider value={{ isFormOpen, setIsFormOpen }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the context
export const useForm = () => useContext(FormContext);

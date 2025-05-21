import React, { createContext, useReducer, useContext } from 'react';

// Estado inicial
const initialState = {
  errors: [],
};

// Reducer para manejar las acciones
const errorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, errors: [...state.errors, action.payload] };
    case 'REMOVE_ERROR':
      return { ...state, errors: state.errors.filter((_, index) => index !== action.payload) };
    case 'CLEAR_ERRORS':
      return { ...state, errors: [] };
    default:
      return state;
  }
};

// Crear el contexto
const ErrorContext = createContext();

// Proveedor del contexto
export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  return (
    <ErrorContext.Provider value={{ state, dispatch }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Hook para usar el contexto
export const useErrorContext = () => {
  return useContext(ErrorContext);
};
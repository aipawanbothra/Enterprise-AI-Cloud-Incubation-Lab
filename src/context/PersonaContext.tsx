import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Persona } from '../data/programData';

interface PersonaContextType {
  persona: Persona;
  togglePersona: () => void;
  setPersona: (p: Persona) => void;
  isStudent: boolean;
  isProfessor: boolean;
  accentColor: string;
}

const PersonaContext = createContext<PersonaContextType | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>('student');

  const togglePersona = useCallback(() => {
    setPersona(p => (p === 'student' ? 'professor' : 'student'));
  }, []);

  const value: PersonaContextType = {
    persona,
    togglePersona,
    setPersona,
    isStudent: persona === 'student',
    isProfessor: persona === 'professor',
    accentColor: persona === 'student' ? '#38BDF8' : '#10B981',
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextType {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}

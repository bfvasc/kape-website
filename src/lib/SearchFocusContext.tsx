"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SearchFocusContextValue = {
  focused: boolean;
  setFocused: (focused: boolean) => void;
};

const SearchFocusContext = createContext<SearchFocusContextValue | null>(null);

export function SearchFocusProvider({ children }: { children: ReactNode }) {
  const [focused, setFocused] = useState(false);
  return (
    <SearchFocusContext.Provider value={{ focused, setFocused }}>
      {children}
    </SearchFocusContext.Provider>
  );
}

export function useSearchFocus() {
  const context = useContext(SearchFocusContext);
  if (!context) {
    throw new Error("useSearchFocus must be used within a SearchFocusProvider");
  }
  return context;
}

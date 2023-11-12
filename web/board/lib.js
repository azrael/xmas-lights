import { createContext, useContext } from 'react';

export const boardContext = createContext({
    mode: 'simple',
    state: [],
    update: () => {},
    reset: () => {}
});

export const useBoard = () => useContext(boardContext);

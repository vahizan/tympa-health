import React, { useContext, FunctionComponent, useState, SetStateAction, Dispatch } from 'react';

export interface ExampleContextProps {
    themeMode: string | undefined;
    setThemeMode: Dispatch<SetStateAction<string | undefined>>;
}

export const ExampleContext = React.createContext<ExampleContextProps>({
    themeMode: undefined,
    setThemeMode: (): void => {
        return;
    }
});

export const ExampleProvider: FunctionComponent<Partial<React.ReactChild>> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<string>();
    const contextPayload = React.useMemo(
        () => ({
            themeMode,
            setThemeMode
        }),
        [themeMode, setThemeMode]
    );

    return <ExampleContext.Provider value={contextPayload}>{children}</ExampleContext.Provider>;
};

export const useExampleContext = () => {
    return useContext(ExampleContext);
};

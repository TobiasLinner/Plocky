import * as Location from 'expo-location';
import React, { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

export interface UserLocation {
    latitude: number;
    longitude: number;
}

interface LocationContextType {
    userLocation: UserLocation | null;
    loading: boolean;
    error: string | null;
    hasPermission: boolean;
    requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType>({
    userLocation: null,
    loading: false,
    error: null,
    hasPermission: false,
    requestLocation: async () => { },
});

export function LocationProvider({ children }: PropsWithChildren) {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(false);

    const requestLocation = async () => {
        setLoading(true);
        setError(null);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setError('Tillåtelse för platsinformation nekad');
            setHasPermission(false);
            setLoading(false);
            return;
        }

        setHasPermission(true);

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });

        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        setLoading(false);
    };

    useEffect(() => {
        const checkPermission = async () => {
            const { status } = await Location.getForegroundPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        checkPermission();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                userLocation,
                loading,
                error,
                hasPermission,
                requestLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
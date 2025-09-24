import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type Coord = { latitude: number; longitude: number };

type MapContextType = {
  focusedLocation: Coord | null;
  setFocusedLocation: (coord: Coord | null) => void;
};

const MapContext = createContext({} as MapContextType);

export function MapProvider({ props }: { props: PropsWithChildren }) {
  const [focusedLocation, setFocusedLocation] = useState<Coord | null>(null);
  return (
    <MapContext.Provider value={{ focusedLocation, setFocusedLocation }}>
      {props.children}
    </MapContext.Provider>
  );
}

export const useMap = () => useContext(MapContext);

import { atom, useAtom } from "jotai";

import api from "./Api";

const locationAtom = atom(null);

export const useLocationsStore = () => {
  const [location, setLocation] = useAtom(locationAtom);

  const fetchLocation = async (name) => {
    const response = await api.get("/locations", { name });

    setLocation(response);

    return response;
  };

  return { location, fetchLocation };
};

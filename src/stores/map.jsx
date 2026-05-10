import { atom, useAtom } from "jotai";

const activeTabAtom = atom("all");

export const useMapStore = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return { activeTab, setActiveTab };
};

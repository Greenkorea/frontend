import { atom, useAtom } from "jotai";

const modalsState = atom([]);

export const useModalStore = () => {
  const [modals, setModals] = useAtom(modalsState);

  const openModal = (component) => {
    setModals([...modals, component]);
  };

  const closeModal = () => {
    setModals([...modals.slice(0, -1)]);
  };

  const state = {
    modals,
  };

  return { state, openModal, closeModal };
};

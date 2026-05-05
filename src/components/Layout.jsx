import { useModalStore } from "../stores/hooks";

import Nav from "./Nav";

const Layout = ({ children }) => {
  const { modals } = useModalStore().state;

  return (
    <main className="min-h-screen">
      <div className="px-20 w-[1320px] mx-auto">
        <Nav />
        {children}
        {modals?.map((modal) => modal)}
      </div>
    </main>
  );
};

export default Layout;

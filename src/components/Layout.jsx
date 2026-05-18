import { useEffect } from "react";
import { useModalStore } from "../stores/hooks";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { modals } = useModalStore().state;
  const hasModal = modals?.length > 0;

  useEffect(() => {
    document.body.style.overflow = hasModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasModal]);

  return (
    <main className="min-h-screen">
      <div className="px-80 w-[1440px] mx-auto">
        <Nav />
        {children}
        {modals?.map((modal) => modal)}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;

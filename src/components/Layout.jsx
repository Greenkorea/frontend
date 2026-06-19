import { useEffect } from "react";
import { useModalStore } from "../stores/hooks";

import Footer from "./Footer";

const Layout = ({ children }) => {
  const { modals } = useModalStore().state;
  const hasModal = modals?.length > 0;

  useEffect(() => {
    if (hasModal) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [hasModal]);

  return (
    <main className="min-h-screen">
      <div className="px-80 w-[1440px] mx-auto">
        {children}
        {modals?.map((modal) => modal)}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;

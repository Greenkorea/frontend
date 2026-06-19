import Layout from "./components/Layout";

import Nav from "./components/Nav";
import SectionTabs from "./components/Sections/Tabs";
import SectionAccordion from "./components/Sections/Accordion";
import SectionsMap from "./components/Sections/Map";

import FloatingButton from "./components/FloatingButton";

function App() {
  return (
    <Layout>
      <div className="relative">
        <SectionsMap />
        <div className="absolute top-0 left-0 w-full z-[1000]">
          <Nav /> {/* Nav를 지도 위에 올림 */}
        </div>
      </div>
      <SectionTabs />
      <SectionAccordion />
      <FloatingButton />
    </Layout>
  );
}

export default App;

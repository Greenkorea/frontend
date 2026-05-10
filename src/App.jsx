import Layout from "./components/Layout";

import SectionTabs from "./components/Sections/Tabs";
import SectionAccordion from "./components/Sections/Accordion";
import SectionsMap from "./components/Sections/Map";

import FloatingButton from "./components/FloatingButton";

function App() {
  return (
    <Layout>
      <SectionsMap />
      <SectionTabs />
      <SectionAccordion />
      <FloatingButton />
    </Layout>
  );
}

export default App;

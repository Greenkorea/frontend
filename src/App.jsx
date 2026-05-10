import Layout from "./components/Layout";

import SectionTabs from "./components/Sections/Tabs";
import SectionAccordion from "./components/Sections/Accordion";

function App() {
  return (
    <Layout>
      <SectionTabs />
      <SectionAccordion />
    </Layout>
  );
}

export default App;

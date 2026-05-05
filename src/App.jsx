import { useState } from "react";

import Nav from "./components/Nav";

function App() {
  return (
    <main className="min-h-screen">
      <div className="px-20 w-[1320px] mx-auto">
        <Nav />
        <section>
          <h1 className="text-40 font-bold">Hello World</h1>
        </section>
      </div>
    </main>
  );
}

export default App;

import React, { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Center } from "./components/Center.jsx";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <>
      <div>
        {/*Header*/}
        <Header
          boardModalOpen={boardModalOpen}
          setBoardModalOpen={setBoardModalOpen}
        />
        {/*Main*/}
        <Center />
      </div>
    </>
  );
}

export default App;

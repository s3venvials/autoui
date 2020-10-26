import Header from "./Header";
import React, { useState } from "react";
import Footer from "./Footer";
import TestRunnerTable from "./TestRunnerTable";
import Container from "@material-ui/core/Container";

function App() {
  const [value, setValue] = useState(false);

  const isRunning = (value) => setValue(value);

  return (
    <>
      <Header isRunning={value} />
      <Container>
        <TestRunnerTable isRunning={isRunning} />
      </Container>
      <Footer />
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Routers from "./routers/router.tsx";
import { GlobalContextProvider } from "./contexts/GlobalContexts.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalContextProvider>
        <Routers />
      </GlobalContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

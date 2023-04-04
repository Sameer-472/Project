import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ContextProvider } from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <ContextProvider>
        <BrowserRouter
          key={window.location.href}
          // basename="could-you-tell/user"
        >
          <App />
        </BrowserRouter>
      </ContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

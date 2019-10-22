import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import { CitysProvider } from "./views/CitysContext";

ReactDOM.render(
  <CitysProvider>
    <App />
  </CitysProvider>,
  document.getElementById("root")
);

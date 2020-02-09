import React from "react";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

import Routes from "./router";

export default function App() {
  return <Routes />;
}

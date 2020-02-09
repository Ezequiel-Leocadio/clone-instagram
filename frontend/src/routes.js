import React from "react";
import { Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import New from "./pages/New";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/new" component={New} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}

export default Routes;

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import Login from "./views/Login/Login";
import Links from "./views/Links/Links";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/my-links"} exact component={Links} />
        <Route path={"/login_success"} exact component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

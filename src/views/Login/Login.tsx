/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import * as React from "react";
import { Redirect } from "react-router-dom";

export default function Login() {

  const params = new URLSearchParams(location.search);

  if (params.has("token") && params.has("username")) {
    localStorage.setItem("access", JSON.stringify({
      username: params.get("username"),
      token: params.get("token")
    }))
    return <Redirect to={"/"} />
  } else {
    window.location.assign("https://account.craftions.net/oauth?redirect=" +
      encodeURIComponent(
        "http://" +
        location.host + "/login_success"
      ))
    return <></>;
  }
}
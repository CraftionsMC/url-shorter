/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { WebClient } from "@incodelang/accounts-client";

const User = new WebClient("https://account.craftions.net");

export default function Home() {
  if (localStorage.getItem("access") === null) {
    window.location.assign(
      "https://account.craftions.net/oauth?redirect=" +
        encodeURIComponent("http://" + location.host + "/login_success")
    );
  }

  return (
    <>
      <div className="m-6 p-6">
        <form className="has-text-centered" action={"javascript:void(0)"}>
          <h1 className="title has-text-centered has-text-primary">
            Short URL
          </h1>
          <p id="final_url" className="has-text-primary has-text-centered" />
          <p id="create_error" className="has-text-danger has-text-centered" />
          <br />
          <input
            type="url"
            className="input"
            placeholder="Enter your URL"
            id="url_input"
            required
          />
          <button
            type="submit"
            className="is-primary button m-2"
            onClick={() => {
              const url = (
                document.querySelector("#url_input") as HTMLInputElement
              ).value;

              const x = new XMLHttpRequest();
              x.open("POST", "/api/v1/url/create", false);
              x.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
              );
              x.send('{"target": "' + url + '"}');

              const r = JSON.parse(x.responseText);

              const fUrl = location.protocol + "//" + location.host + r.url;

              const uData = JSON.parse(
                localStorage.getItem("access") as string
              );

              User.getData_u(uData.username, uData.token, "url_shorter_links")
                .then((x) => {
                  let data = [];
                  if (x) {
                    data = x;
                  }

                  data.push({
                    url: fUrl,
                    target: url,
                  });

                  User.storeData_u(
                    uData.username,
                    uData.token,
                    data,
                    "url_shorter_links"
                  )
                    .then((a) => {
                      (
                        document.querySelector(
                          "#final_url"
                        ) as HTMLParagraphElement
                      ).innerHTML =
                        "<span>Your URL: </span>" +
                        "<a href='" +
                        fUrl +
                        "' target='_blank' rel='noreferrer' class='has-text-link'>" +
                        fUrl +
                        "</a>";
                    })
                    .catch((err) => {
                      (
                        document.querySelector(
                          "#create_url"
                        ) as HTMLParagraphElement
                      ).innerText = "Error: " + err;
                    });
                })
                .catch((err) => {
                  (
                    document.querySelector(
                      "#create_url"
                    ) as HTMLParagraphElement
                  ).innerText = "Error: " + err;
                });

              return;
            }}
          >
            Short!
          </button>
        </form>
      </div>
    </>
  );
}

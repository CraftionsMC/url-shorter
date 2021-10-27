/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { WebClient } from "@incodelang/accounts-client";

const User = new WebClient("https://account.craftions.net");

interface LinkObject {
  url: string;
  target: string;
}

export default class Links extends React.Component {
  render() {
    if (localStorage.getItem("access") === null) {
      window.location.assign(
        "https://account.craftions.net/oauth?redirect=" +
          encodeURIComponent("http://" + location.host + "/login_success")
      );
    }

    return (
      <>
        <h1 className={"title has-text-centered"}>My Links</h1>
        <table className="table is-fullwidth m-6">
          <thead>
            <tr>
              <th>Link</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody id={"my-links-table-body"}>
            <tr>
              <td className={"is-italic"}>Loading...</td>
              <td className={"is-italic"}>Loading...</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  componentDidMount() {
    const uData = JSON.parse(localStorage.getItem("access") as string);

    const container = document.querySelector(
      "#my-links-table-body"
    ) as HTMLTableSectionElement;

    container.innerHTML =
      "<tr><td class='is-italic has-text-danger'>No Links</td><td class='is-italic has-text-danger'>Created yet</td></tr>";

    User.getData_u(uData.username, uData.token, "url_shorter_links")
      .then((x) => {
        let usedLinks: string[] = [];
        let hasCleared: boolean = false;

        x.forEach((link: LinkObject) => {
          if (!hasCleared) {
            container.innerHTML = "";
            hasCleared = true;
          }
          if (!usedLinks.includes(link.url)) {
            usedLinks.push(link.url);

            const row = document.createElement("tr");
            const col0 = document.createElement("td");
            const col1 = document.createElement("td");

            col0.innerHTML =
              "<a href='" +
              link.url +
              "' rel='noreferrer' target='_blank'>" +
              link.url +
              "</a>";

            col1.innerHTML =
              "<a href='" +
              link.target +
              "' rel='noreferrer' target='_blank'>" +
              link.target +
              "</a>";

            row.appendChild(col0);
            row.appendChild(col1);
            container.appendChild(row);
          }
        });
      })
      .catch((err) => {
        alert("An error occured: " + err);
      });
  }
}

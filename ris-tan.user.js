// ==UserScript==
// @name         ris-tan
// @namespace    https://github.com/emeraldraspberry/ris-tan
// @updateUrl    https://github.com/emeraldraspberry/ris-tan/raw/main/ris-tan.user.js
// @downloadUrl  https://github.com/emeraldraspberry/ris-tan/raw/main/ris-tan.user.js
// @version      0.1
// @description  Companion userscript that aids with reverse image search on Reddit.
// @author       EmeraldRaspberry
// @match        https://*.reddit.com/*/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  class UserApp {
    constructor() {
      this.posts = this._getPosts();

      this.appendSearchButton();
    }

    _getPosts() {
      return document.body.querySelectorAll(
        "div#siteTable>div.thing:not(.promoted)"
      );
    }

    _getDataUrl(post) {
      return String(post.getAttribute("data-url"));
    }

    reverseSearch(dataUrl) {
      const saucenaoLink = "https://saucenao.com/search.php?url=" + dataUrl;
      const googleLink =
        "https://www.google.com/searchbyimage?&image_url=" + dataUrl;
      const iqdbLink = "https://iqdb.org/?url=" + dataUrl;
      const ascii2dLink = "https://ascii2d.net/search/url/" + dataUrl;

      window.open(saucenaoLink, "_blank");
      window.open(googleLink, "_blank");
      window.open(iqdbLink, "_blank");
      window.open(ascii2dLink, "_blank");
    }

    searchButton(dataUrl) {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.innerText = "reverse search";
      a.href = "javascript: void 0;";
      a.onclick = () => {
        this.reverseSearch(dataUrl);
      };

      li.appendChild(a);

      return li;
    }

    appendSearchButton() {
      this.posts.forEach((post) => {
        const dataUrl = this._getDataUrl(post);
        const root = post.querySelector("ul.flat-list.buttons");

        // Data format checking
        if (dataUrl.endsWith(".jpg") || dataUrl.endsWith(".png")) {
          root.appendChild(this.searchButton(dataUrl));
        }
      });
    }
  }

  const App = new UserApp();
  App;
})();

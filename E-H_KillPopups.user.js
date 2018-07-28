// ==UserScript==
// @name         E-H - Kill popups
// @namespace    garoz+gh@protonmail.com
// @description  Convert some popups in E-Hentai Galleries to regular links
// @include      http://e-hentai.org/g/*
// @include      https://e-hentai.org/g/*
// @include      http://exhentai.org/g/*
// @include      https://exhentai.org/g/*
// @match        http://e-hentai.org/g/*
// @match        https://e-hentai.org/g/*
// @match        http://exhentai.org/g/*
// @match        https://exhentai.org/g/*
// @version     1
// @grant       none
// ==/UserScript==

'use strict';

/* Links with title matching this regular expression will no longer give a pop-up */
const KillPopupRegex = /\b(Download|External Gallery)/gi;

/* generic regular expression for detecting links*/
const urlRegex = /https?:\/\/[^\s+\"\<\>\'\(\)]+/gi;

/* XPath expression for searching links with popups (on the right of the gallery header*/
var snapPopups = document.evaluate(".//div/p/a[@href='#']",
		document.getElementById("gright"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var j = snapPopups.snapshotLength - 1; j >= 0; j--) {
  var elmAnchorPopUp = snapPopups.snapshotItem(j);
  var IsPopupToKill = elmAnchorPopUp.innerHTML.match(KillPopupRegex);
  if (!IsPopupToKill) {
    continue;
  }
  var ActionOnClick = elmAnchorPopUp.getAttribute('onclick');
  var RealDestination = ActionOnClick.match(urlRegex);
  if (RealDestination) {
    elmAnchorPopUp.setAttribute('href', RealDestination);
    elmAnchorPopUp.removeAttribute('onclick');
  }
}

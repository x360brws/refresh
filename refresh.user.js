// ==UserScript==
// @name         Random Auto Refresh (5-10 min)
// @namespace    https://violmonkey.local/refresh
// @version      1.0.0
// @description  Refreshes a target URL every 5 to 10 minutes
// @match        https://vibbletv.blogspot.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const MIN_MS = 5 * 60 * 1000;  // 5 minutes
  const MAX_MS = 10 * 60 * 1000; // 10 minutes

  const delayMs = Math.floor(Math.random() * (MAX_MS - MIN_MS + 1)) + MIN_MS;
  const seconds = Math.round(delayMs / 1000);

  console.log(`[AutoRefresh] Reloading in ${seconds}s (${(seconds / 60).toFixed(1)} min)`);

  setTimeout(() => {
    window.location.reload();
  }, delayMs);
})();

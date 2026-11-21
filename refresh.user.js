// ==UserScript==
// @name         Random Auto Refresh HUD (2-3 min)
// @namespace    https://violentmonkey.local/refresh-hud
// @version      1.1.0
// @description  Displays a non-interactive countdown HUD and refreshes every 2-3 minutes
// @match        https://vibbletv.blogspot.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const MIN_MS = 2 * 60 * 1000; // 2 minutes
  const MAX_MS = 3 * 60 * 1000; // 3 minutes

  const totalMs = Math.floor(Math.random() * (MAX_MS - MIN_MS + 1)) + MIN_MS;
  const endTime = Date.now() + totalMs;

  const hud = document.createElement('div');
  hud.id = 'vm-refresh-hud';
  hud.style.cssText = [
    'position: fixed',
    'top: 10px',
    'right: 10px',
    'z-index: 2147483647',
    'padding: 5px 9px',
    'border-radius: 6px',
    'background: rgba(15, 15, 20, 0.78)',
    'color: #ffffff',
    'font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, monospace',
    'pointer-events: none',
    'user-select: none',
    'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25)'
  ].join(';');

  function formatRemaining(ms) {
    const sec = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(sec / 60);
    const remSec = sec % 60;
    return `${mins}:${String(remSec).padStart(2, '0')}`;
  }

  function tick() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      hud.textContent = 'Reloading...';
      window.location.reload();
      return;
    }
    hud.textContent = `Refresh in ${formatRemaining(remaining)}`;
  }

  (document.body || document.documentElement).appendChild(hud);
  tick();
  setInterval(tick, 1000);
})();

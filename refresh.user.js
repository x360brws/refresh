// ==UserScript==
// @name         Random Auto Refresh HUD (2-3 min)
// @namespace    https://violentmonkey.local/refresh-hud
// @version      1.2.0
// @description  Displays a non-interactive bottom-left countdown HUD at max z-index and refreshes every 2-3 minutes
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
    'position: fixed !important',
    'bottom: calc(12px + env(safe-area-inset-bottom, 0px)) !important',
    'left: calc(12px + env(safe-area-inset-left, 0px)) !important',
    'top: auto !important',
    'right: auto !important',
    'z-index: 2147483647 !important',
    'padding: 5px 9px !important',
    'border-radius: 6px !important',
    'background: rgba(15, 15, 20, 0.82) !important',
    'color: #ffffff !important',
    'font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, monospace !important',
    'pointer-events: none !important',
    'user-select: none !important',
    '-webkit-user-select: none !important',
    'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important'
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

  function ensureMounted() {
    const root = document.body || document.documentElement;
    if (root && !document.getElementById('vm-refresh-hud')) {
      root.appendChild(hud);
    }
  }

  ensureMounted();
  tick();
  setInterval(() => {
    ensureMounted();
    tick();
  }, 1000);
})();

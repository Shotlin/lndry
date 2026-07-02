/**
 * Browser-agent launcher with Google OAuth fix.
 *
 * The "Couldn't sign you in / This browser may not be secure" error
 * from Google OAuth happens because puppeteer exposes automation signals
 * even with the stealth plugin:
 *   - navigator.webdriver = true (or detectable via CDP)
 *   - Chrome DevTools Protocol port open on a known pipe
 *   - Missing standard Chrome user flags
 *
 * Fix: patch the launch args BEFORE the agent boots by monkey-patching
 * the puppeteer-extra launch call to inject the additional args that
 * defeat Google's checks, and set PUPPETEER_EXECUTABLE_PATH to the
 * puppeteer-managed Chrome (the one that works with CDP).
 */

// ── 1. env vars ──────────────────────────────────────────────────────
process.env.RELAY_URL         = 'ws://localhost:3001';
process.env.AGENT_SECRET      = 'B29WE8hEO4nDEINMTPmrWAE2Mry9SRus';
process.env.AGENT_PROFILE_DIR = 'C:\\Users\\sayan\\AppData\\Local\\kiro-gpt-bridge-profile';
process.env.AGENT_HEADLESS    = 'false';

// Use puppeteer's own managed Chrome (NOT the Playwright one).
// Puppeteer knows the exact CDP pipe this binary uses.
process.env.PUPPETEER_EXECUTABLE_PATH =
  'C:\\Users\\sayan\\.cache\\puppeteer\\chrome\\win64-127.0.6533.88\\chrome-win64\\chrome.exe';

// ── 2. Patch puppeteer-extra launch to add Google-bypass flags ────────
// We intercept the module BEFORE the agent imports it so we can inject
// extra args without touching the compiled agent code.
const Module = require('module');
const originalLoad = Module._load;
const PATCHED = new Set();

Module._load = function(request, parent, isMain) {
  const result = originalLoad.apply(this, arguments);

  // Only patch puppeteer-extra once, and only the default export.
  if (
    (request === 'puppeteer-extra' || request.includes('puppeteer-extra')) &&
    result &&
    result.default &&
    typeof result.default.launch === 'function' &&
    !PATCHED.has(result.default)
  ) {
    PATCHED.add(result.default);
    const originalLaunch = result.default.launch.bind(result.default);

    result.default.launch = async function(opts) {
      const extraArgs = [
        // Removes the "Chrome is being controlled by automated software" banner
        '--disable-infobars',
        // Prevents Google from detecting navigator.webdriver via excludeSwitches
        '--exclude-switches=enable-automation',
        // Disables the automation extension that sets webdriver=true
        '--disable-extensions-except=',
        // Disables the use-automation-extension flag
        '--disable-useAutomationExtension',
        // Makes Chrome behave like a normal user session
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-default-apps',
        '--disable-popup-blocking',
        '--disable-translate',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--disable-ipc-flooding-protection',
        // Google OAuth specific: allow sign-in from embedded views
        '--enable-features=NetworkService,NetworkServiceLogging',
        '--auth-server-whitelist=*',
        '--auth-negotiate-delegate-whitelist=*',
        // Prevent the "browser is controlled" flag in navigator
        '--disable-blink-features=AutomationControlled',
      ];

      // Merge with existing args without duplicating
      const existing = (opts && opts.args) ? opts.args : [];
      const merged = [
        ...existing.filter(a => !extraArgs.some(e => e.split('=')[0] === a.split('=')[0])),
        ...extraArgs,
      ];

      const patched = { ...(opts || {}), args: merged };
      return originalLaunch(patched);
    };
  }

  return result;
};

// ── 3. Boot the agent ────────────────────────────────────────────────
require('C:\\Users\\sayan\\Desktop\\image-gpt\\browser-agent\\dist\\index.js');

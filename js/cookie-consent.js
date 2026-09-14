// Cookie consent gate for Google Analytics (GA4).
// GA is NOT loaded until the visitor accepts. See privacy-policy.html.

const GA_MEASUREMENT_ID = 'G-CWY00FKP9J';

function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function showBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.hidden = false;
}

function hideBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.hidden = true;
}

const CONSENT_COOKIE_NAME = 'ais_cookie_consent';
const CONSENT_COOKIE_DAYS = 365; // ponytail: arbitrary re-ask cadence for an accept, change if you want a different one

function setConsentCookie(value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

function getConsentCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`));
  return match ? match[1] : null;
}

// A real cookie, per your call. Accept is remembered for a year (see
// CONSENT_COOKIE_DAYS above). Decline is never stored, so the banner
// re-asks on the next page load, per your call.
function handleConsentChoice(accepted) {
  if (accepted) {
    setConsentCookie('accepted', CONSENT_COOKIE_DAYS);
    loadGoogleAnalytics();
  }
  hideBanner();
}

function getStoredConsent() {
  return getConsentCookie();
}

document.addEventListener('DOMContentLoaded', function () {
  if (getStoredConsent() === 'accepted') {
    loadGoogleAnalytics();
  } else {
    showBanner();
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  if (acceptBtn) acceptBtn.addEventListener('click', () => handleConsentChoice(true));
  if (declineBtn) declineBtn.addEventListener('click', () => handleConsentChoice(false));
});

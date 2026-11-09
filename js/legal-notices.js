// Collapses the shared footer's legal notices under a toggle.
// Labs use the same footer and do not load this file.
function collapseLegalNotices() {
  const notice = document.querySelector('.footer-plain-notice');
  if (!notice) return false;
  const details = document.createElement('details');
  details.className = notice.className;
  details.innerHTML = '<summary>Legal notices</summary>' + notice.innerHTML;
  notice.replaceWith(details);
  return true;
}

// The footer may load before or after this script runs.
if (!collapseLegalNotices()) {
  new MutationObserver((records, observer) => {
    if (collapseLegalNotices()) observer.disconnect();
  }).observe(document.getElementById('footer-placeholder'), { childList: true });
}

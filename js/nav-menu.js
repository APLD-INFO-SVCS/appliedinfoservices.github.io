// Close the mobile Menu when one of its links is tapped. Delegated from
// document because the header is injected after load via innerHTML.
document.addEventListener('click', function (e) {
  var link = e.target.closest('.nav-menu a');
  if (link) link.closest('details').removeAttribute('open');
});

(function () {
  "use strict";

  var links = document.querySelectorAll("[data-asrs-popup]");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var width = Math.min(920, Math.max(360, window.screen.availWidth - 48));
      var height = Math.min(880, Math.max(520, window.screen.availHeight - 64));
      var left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
      var top = Math.max(0, Math.round((window.screen.availHeight - height) / 2));
      var features = [
        "popup=yes",
        "width=" + width,
        "height=" + height,
        "left=" + left,
        "top=" + top,
        "resizable=yes",
        "scrollbars=yes"
      ].join(",");

      var popup = window.open(link.href, "adhd-junction-asrs", features);

      if (popup) {
        event.preventDefault();
        popup.opener = null;
        popup.focus();
      }
    });
  });
})();

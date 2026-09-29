(function () {
  "use strict";

  var preferenceKey = "adhd-junction-anonymous-analytics-off";
  var productionHosts = ["adhdjunction.org", "www.adhdjunction.org"];

  function isOptedOut() {
    try {
      return window.localStorage.getItem(preferenceKey) === "1";
    } catch (error) {
      return false;
    }
  }

  function setOptedOut(value) {
    try {
      if (value) window.localStorage.setItem(preferenceKey, "1");
      else window.localStorage.removeItem(preferenceKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadAnalytics() {
    if (isOptedOut() || productionHosts.indexOf(window.location.hostname) === -1) return;

    var beacon = document.createElement("script");
    beacon.type = "module";
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({
      token: "28d90a7c40454b4195ea47f30c95e50d"
    }));
    document.head.appendChild(beacon);
  }

  function initialiseChoice() {
    var choice = document.querySelector("[data-analytics-choice]");
    if (!choice) return;

    var status = choice.querySelector("[data-analytics-status]");
    var button = choice.querySelector("[data-analytics-toggle]");
    var enabled = !isOptedOut();

    if (status) status.textContent = enabled ? "On" : "Off";
    if (!button) return;

    button.setAttribute("aria-pressed", enabled ? "true" : "false");
    button.textContent = enabled ? "Turn anonymous analytics off" : "Turn anonymous analytics on";

    button.addEventListener("click", function () {
      if (!setOptedOut(enabled)) {
        button.textContent = "Your browser could not save this choice";
        button.disabled = true;
        return;
      }
      window.location.reload();
    });
  }

  loadAnalytics();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseChoice);
  } else {
    initialiseChoice();
  }
})();

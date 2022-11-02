import { App } from "./App.js";
import api from "./helpers/wp_api.js";

document.addEventListener("change", (e) => {
  if (!e.target.matches("#history")) {
    return false;
  }
  location.hash = `#/search?search=${e.target.value}`;
});
document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", () => {
  App();
  api.page = 1;
});

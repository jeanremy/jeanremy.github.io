const toggleMode = document.getElementById("sidebar__toggle-mode");

// Select the button
const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

// If no current has been set, we set one
if (!currentTheme) {
  localStorage.setItem("theme", prefersDarkScheme ? "dark" : "light");
  if (prefersDarkScheme) {
    document.body.classList.add("dark");
  }
}

// On each page load, we set the theme accordingly to the storage
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  // Otherwise, if the user's preference in localStorage is light...
}

// Listen for a click on the button
toggleMode.addEventListener("click", function () {
  const theme = document.body.classList.contains("dark") ? "light" : "dark";
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", theme);
});

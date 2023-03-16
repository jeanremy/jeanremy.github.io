const toggleMode = document.getElementById("page-header__toggle-mode");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
} else if (currentTheme === "light") {
  document.body.classList.remove("dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark");
}

// Listen for a click on the button
toggleMode.addEventListener("click", function () {
  if (document.body.className.includes("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

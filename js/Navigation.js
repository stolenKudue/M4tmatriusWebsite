function toggleBurgerNav() {
  let links = document.getElementById("navLinks");
  if (links.style.display === "block") {
    links.style.display = "none";
  } else {
    links.style.display = "block";
  }
}

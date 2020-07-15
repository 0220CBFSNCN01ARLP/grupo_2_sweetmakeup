var marker = document.querySelector("#marker");
var item = document.querySelectorAll("#a-section");
var nav = document.querySelector("#nav-section");

function indicator(e) {
  marker.style.display = "block";
  marker.style.left = e.offsetLeft + "px";
  marker.style.width = e.offsetWidth + "px";
}

item.forEach((Link) => {
  Link.addEventListener("mouseover", (e) => {
    indicator(e.target);
  });
});

nav.addEventListener("mouseout", () => {
  marker.style.display = "none";
});

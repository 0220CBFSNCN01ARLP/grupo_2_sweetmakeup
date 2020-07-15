var marker = document.querySelector("#marker");
var item = document.querySelectorAll("#a-section");

function indicator(e) {
  marker.style.left = e.offsetLeft + "px";
  marker.style.width = e.offsetWidth + "px";
}

item.forEach((Link) => {
  Link.addEventListener("mouseover", (e) => {
    indicator(e.target);
  });
});

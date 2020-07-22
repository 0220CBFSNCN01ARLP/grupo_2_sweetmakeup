let thumbnails = document.querySelectorAll(".thumbnail")
for (const img of thumbnails) {
    img.addEventListener("click", changeImg)
}
let mainImg = document.getElementById("mainImg");

function changeImg(e){
    mainImg.src = e.target.src
}

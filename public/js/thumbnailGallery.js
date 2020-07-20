let thumbnail = document.querySelector(".thumbnail");
let mainImg = document.getElementById("mainImg");

function changeImg(e){
    mainImg.src = e.target.src
}

thumbnail.addEventListener("click", changeImg)
let buttons = document.getElementsByClassName("addToCart");

function addToCart(id){
    fetch(`http://localhost:3000/addToCart/${id}`)
}

for (const button of buttons) {
    button.addEventListener("click", (evt)=>{
        addToCart(evt.target.id)
    })
}

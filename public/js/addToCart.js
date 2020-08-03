let buttons = document.getElementsByClassName("addToCart");

async function addToCart(id){
    let response = await fetch(`http://localhost:3000/addToCart/${id}`);
    if (response.ok){
        // método de jQuery que muestra el modal
        $('#addToCartOk').modal()
    }
}

for (const button of buttons) {
    button.addEventListener("click", (evt)=>{
        addToCart(evt.target.id)
    })
}

alert("hola");

function isNotEmpty(fieldId, errorMsgId) {
  let field = document.getElementById(fieldId);
  let errorMsg = document.getElementById(errorMsgId);
  if ((field.value == "")) {
    console.log("alsdkfjalsdkfjañlsdkfj")
    errorMsg.style.display = "block";
  }
}

document.getElementById("productName").addEventListener("blur", ()=>{
    isNotEmpty("productName", "nameEmptyMsg")
})
document.getElementById("price").addEventListener("blur", ()=>{
    isNotEmpty("price", "priceEmptyMsg")
})
document.getElementById("description").addEventListener("blur", ()=>{
    isNotEmpty("description", "descriptionEmptyMsg")
})

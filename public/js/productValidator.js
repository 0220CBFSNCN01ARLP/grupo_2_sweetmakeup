
let form = document.getElementById("createForm");

function notEmpty(fieldId, errorMsgId, errors) {
  let field = document.getElementById(fieldId);
  let errorMsg = document.getElementById(errorMsgId);
  if (field.value == "") {
    errorMsg.style.display = "block";
    field.style.borderColor = "red";
    errors.push(`${fieldId} está vacío`)
  } else {
    errorMsg.style.display = "none";
  }
}

function selectNotEmpty(fieldId, errorMsgId, errors) {
  let field = document.getElementById(fieldId);
  let errorMsg = document.getElementById(errorMsgId);
  if (field.value == "default") {
    errorMsg.style.display = "block";
    field.style.borderColor = "red";
    errors.push(`${fieldId} está vacío`)
  } else {
    errorMsg.style.display = "none";
  }
}

function minCharacters (fieldId, min, errorMsgId, errors) {
  let field = document.getElementById(fieldId);
  let errorMsg = document.getElementById(errorMsgId);
  if (field.value != "" && field.value.length < min) {
    errorMsg.style.display = "block";
    field.style.borderColor = "red";
    errors.push(`${fieldId} tiene menos de ${min} caracteres`)
  } else {
    errorMsg.style.display = "none";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors = [];
  console.log("hola")
  notEmpty("productName", "nameEmptyMsg", errors);
  notEmpty("price", "priceEmptyMsg", errors);
  notEmpty("description", "descriptionEmptyMsg", errors);
  notEmpty("ingredients", "ingredientsEmptyMsg", errors);
  notEmpty("returnPol", "returnPolEmptyMsg", errors);
  notEmpty("shipping", "shippingEmptyMsg", errors);
  selectNotEmpty("brand", "brandEmptyMsg", errors);
  selectNotEmpty("thematic", "thematicEmptyMsg", errors);
  minCharacters("productName", 3, "nameShortMsg", errors);
  minCharacters("description", 20, "descriptionShortMsg", errors);
  minCharacters("ingredients", 20, "ingredientsShortMsg", errors);
  minCharacters("returnPol", 20, "returnPolShortMsg", errors);
  minCharacters("shipping", 20, "shippingShortMsg", errors)
  console.log(errors)

  if (errors.length == 0){
    form.submit();
  } else {
    document.documentElement.scrollTop = 0;
  }
  return false;
});

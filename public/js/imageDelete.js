let deleteButtons = document.getElementsByClassName("imgDeleteBtn");

for (let i = 0; i < deleteButtons.length; i++) {
  let cardId = "imgCard" + i;
  let btn = deleteButtons[i];
  let card = document.getElementById(cardId);
  btn.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/api/images/${e.target.id}`, {method: "DELETE"})
    card.remove();
  });
}

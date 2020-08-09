let deleteButtons = document.getElementsByClassName("imgDeleteBtn");

for (let i = 0; i < deleteButtons.length; i++) {
  let cardId = "imgCard" + i;
  let btn = deleteButtons[i];
  let card = document.getElementById(cardId);
  console.log(btn);
  console.log(card);
  btn.addEventListener("click", (e) => {
    card.remove();
  });
}

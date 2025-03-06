const content = document.querySelector(".content");

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(title, imageSource, deleteCardTemplate) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = title;
  card.querySelector(".card__image").src = imageSource;
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCardTemplate(card);
  });
  return card;
}

// @todo: Функция удаления карточки
function deleteCardTemplate(thisCard) {
  thisCard.remove();
}

// @todo: Вывести карточки на страницу
function renderCard (initialCards) {
  initialCards.forEach(element => {
    placesList.prepend(createCard(element.name, element.link, deleteCardTemplate));
  });
  
}

renderCard(initialCards);

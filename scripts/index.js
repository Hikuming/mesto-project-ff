const content = document.querySelector(".content");

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCardTemplate(title, imageSource, deleteCardTemplate) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__title").textContent = title;
  card.querySelector(".card__image").src = imageSource;
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCardTemplate(card);
  });
  placesList.append(card);
  return card;
}

// @todo: Функция удаления карточки
function deleteCardTemplate(thisCard) {
  thisCard.remove();
}

// @todo: Вывести карточки на страницу
function initCards(initialCards) {
  initialCards.forEach((element) => {
    addCardTemplate(element.name, element.link, deleteCardTemplate);
  });
}

//производим инициализацию карточек
initCards(initialCards);

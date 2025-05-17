import {
  deleteCardFromSrv,
  putLike,
  deleteLike
} from "./api"

export function createCard(
  title,
  imageSource,
  deleteCard,
  likeCard,
  openImageHandler,
  likeArrayUsers,
  deleteButtonActive,
  cardId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeButtonClassActive = likeButton.classList[0] + "_is-active";
  const likeCount = card.querySelector(".card__like-count");
  card.querySelector(".card__title").textContent = title;
  cardImage.src = imageSource;
  cardImage.alt = title;
  likeCount.textContent = likeArrayUsers.length;

  if (deleteButtonActive) {
    deleteButton.addEventListener("click", function () {
    deleteCard(card,cardId);
    });
  } else {
    deleteButton.disabled = true;
    deleteButton.classList.add('card__delete-button-disabled');
  }
  
  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, likeButtonClassActive, cardId, likeCount);
  });

  cardImage.addEventListener("click", function () {
    openImageHandler(imageSource, title);
  });
  return card;
}

export function likeCardHandler(currentTarget, likeButtonClassActive, cardId, likeCount) {
  currentTarget.target.classList.toggle(likeButtonClassActive);
  if (currentTarget.target.classList.contains(likeButtonClassActive)){
    //отправка лайка на сервер 
    putLike(cardId)
    .then((res) => {
      console.log(res.likes.length);
      //увеличиваем число лайков с ответа от сервера
      likeCount.textContent = res.likes.length;
    });
    console.log("получили айдишник для лайка "+ cardId);
  } else {
    //отправка дизлайка на сервер 
    deleteLike(cardId)
    .then((res) => {
      console.log(res.likes.length);
      //уменьшаем число лайков с ответа от сервера
      likeCount.textContent = res.likes.length;
    });
    console.log("получили айдишник для дизлайка "+ cardId);
  }
}

export function deleteCardTemplate(thisCard, cardId) {
  deleteCardFromSrv(cardId);
  thisCard.remove();
}

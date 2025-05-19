import { deleteCardFromSrv, putLike, deleteLike } from "./api";

export function createCard(
  title,
  imageSource,
  deleteCard,
  likeCard,
  openImageHandler,
  likeArrayUsers,
  deleteButtonActive,
  cardId,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeButtonClassActive = likeButton.classList[0] + "_is-active";
  const likeCount = card.querySelector(".card__like-count");
  const isLikeActive = likeArrayUsers.some(
    (likeUser) => likeUser._id === userId
  );
  card.querySelector(".card__title").textContent = title;
  cardImage.src = imageSource;
  cardImage.alt = title;
  likeCount.textContent = likeArrayUsers.length;

  if (deleteButtonActive) {
    deleteButton.addEventListener("click", function () {
      deleteCard(card, cardId);
    });
  } else {
    deleteButton.remove();
  }

  if (isLikeActive) {
    likeButton.classList.add(likeButtonClassActive);
  }

  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, likeButtonClassActive, cardId, likeCount);
  });

  cardImage.addEventListener("click", function () {
    openImageHandler(imageSource, title);
  });
  return card;
}

export function likeCardHandler(
  currentTarget,
  likeButtonClassActive,
  cardId,
  likeCount
) {
  // currentTarget.target.classList.toggle(likeButtonClassActive);
  if (!currentTarget.target.classList.contains(likeButtonClassActive)) {
    //отправка лайка на сервер
    putLike(cardId)
      .then((res) => {
        //увеличиваем число лайков с ответа от сервера
        likeCount.textContent = res.likes.length;
        currentTarget.target.classList.add(likeButtonClassActive);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    //отправка дизлайка на сервер
    deleteLike(cardId)
      .then((res) => {
        //уменьшаем число лайков с ответа от сервера
        likeCount.textContent = res.likes.length;
        currentTarget.target.classList.remove(likeButtonClassActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCardTemplate(thisCard, cardId) {
  deleteCardFromSrv(cardId)
    .then(() => thisCard.remove())
    .catch((err) => {
      console.log(err);
    });
}
